const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const { parseInvitationInput, invitationHref, arrivalText, eventDate, isInvitationToken } = require('../lib/invitation.ts');
const { invitationRSVP } = require('../lib/invitation-rsvp.ts');
const { createAdminSession, validAdminSession, SESSION_SECONDS } = require('../lib/admin-session.ts');
const invitation = { token: 'a'.repeat(48), guestName: 'Linh & Chris', eventGroup: 'reception', maxGuests: 2, createdAt: '2026-10-06T00:00:00Z' };
let cookie;
let storageFailure = false;
let receipts = [];
const originalLoad = Module._load;
Module._load = function(request, ...args) {
  if (request.endsWith('/invitation-store')) return {
    getInvitation: async token => token === invitation.token ? invitation : null,
    saveInvitationResponse: async response => { if (storageFailure) throw new Error('Storage unavailable'); receipts.push(response); },
    listInvitations: async () => [invitation], createInvitation: async input => ({ ...invitation, ...input }),
    InvitationStorageError: class extends Error {},
  };
  if (request === 'next/headers') return { cookies: async () => ({ get: () => cookie ? { value: cookie } : undefined }) };
  return originalLoad.call(this, request, ...args);
};
const rsvpRoute = require('../app/api/mobile-rsvp/route.ts');
const adminRoute = require('../app/api/admin/invitations/route.ts');
const publicRoute = require('../app/api/invitations/[token]/route.ts');
Module._load = originalLoad;
const rsvpBody = { invitationToken: invitation.token, attending: 'yes', guestCount: 2, guests: [{ name: 'Linh' }, { name: 'Chris' }], message: '' };
function request(body, path = '/api/mobile-rsvp', origin = 'https://wedding.example') {
  return new Request(`https://wedding.example${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
}
test('household names retain ampersands and Vietnamese accents; invalid inputs rejected', () => {
  assert.deepEqual(parseInvitationInput({ guestName: ' Linh & Chris ', eventGroup: 'reception', maxGuests: 2 }), { guestName: 'Linh & Chris', eventGroup: 'reception', maxGuests: 2 });
  assert.equal(parseInvitationInput({ guestName: 'Gia đình Nguyễn', eventGroup: 'ceremony' }).guestName, 'Gia đình Nguyễn');
  for (const value of [{ guestName: '', eventGroup: 'ceremony' }, { guestName: 'Linh', eventGroup: 'other' }, { guestName: 'Linh', eventGroup: 'ceremony', maxGuests: 7 }]) assert.throws(() => parseInvitationInput(value));
  assert.ok(isInvitationToken(invitation.token)); assert.equal(isInvitationToken('../admin'), false);
});
test('links preserve guest identity and anchors; external and admin links stay unchanged', () => {
  assert.equal(invitationHref('/rsvp', invitation.token), `/rsvp?invite=${invitation.token}`);
  assert.equal(invitationHref('/#mobile-schedule', invitation.token), `/?invite=${invitation.token}#mobile-schedule`);
  assert.equal(invitationHref('/rsvp'), '/rsvp');
  assert.equal(invitationHref('https://maps.google.com', invitation.token), 'https://maps.google.com');
  assert.equal(invitationHref('/admin', invitation.token), '/admin');
});
test('both languages and countdown use the assigned event in Vietnam time', () => {
  assert.match(arrivalText('reception', 'eng'), /5:00 PM.*6:00 PM/);
  assert.doesNotMatch(arrivalText('reception', 'eng'), /4:00|ceremony/);
  assert.match(arrivalText('reception', 'viet'), /17:00.*18:00/);
  assert.match(arrivalText('ceremony', 'eng'), /3:30 PM.*4:00 PM/);
  assert.equal(new Date(eventDate('reception')).toISOString(), '2027-03-13T11:00:00.000Z');
});
test('server rejects over-limit parties and empty names; submitted group cannot override invitation', () => {
  const response = invitationRSVP({ ...rsvpBody, eventGroup: 'ceremony', invitationGuestName: 'Wrong' }, invitation);
  assert.equal(response.eventGroup, 'reception'); assert.equal(response.invitationGuestName, 'Linh & Chris');
  assert.throws(() => invitationRSVP({ ...rsvpBody, guestCount: 3 }, invitation));
  assert.throws(() => invitationRSVP({ ...rsvpBody, guests: [{ name: '' }, { name: 'Chris' }] }, invitation));
  assert.equal(invitationRSVP({ attending: 'no', guests: [], message: '' }, invitation).guestCount, 0);
});
test('admin sessions reject legacy, forged, expired and password-rotated cookies', () => {
  process.env.ADMIN_PASSWORD = 'test-only-password';
  const now = Date.now(); const session = createAdminSession(now);
  assert.equal(validAdminSession(session, now), true);
  assert.equal(validAdminSession('authenticated', now), false);
  assert.equal(validAdminSession(session.slice(0, -1) + 'z', now), false);
  assert.equal(validAdminSession(session, now + SESSION_SECONDS * 1000), false);
  process.env.ADMIN_PASSWORD = 'rotated-test-password'; assert.equal(validAdminSession(session, now), false);
  delete process.env.ADMIN_PASSWORD; assert.equal(validAdminSession(session, now), false);
});
test('admin APIs require valid signed sessions and same-origin creation', async () => {
  process.env.ADMIN_PASSWORD = 'test-only-password'; cookie = undefined;
  assert.equal((await adminRoute.GET()).status, 401);
  assert.equal((await adminRoute.POST(request({ guestName: 'Linh', eventGroup: 'ceremony' }, '/api/admin/invitations'))).status, 401);
  cookie = createAdminSession();
  assert.equal((await adminRoute.GET()).status, 200);
  assert.equal((await adminRoute.POST(request({ guestName: 'Linh', eventGroup: 'ceremony' }, '/api/admin/invitations', 'https://other.example'))).status, 403);
  assert.equal((await adminRoute.POST(request({ guestName: '', eventGroup: 'ceremony' }, '/api/admin/invitations'))).status, 400);
  assert.equal((await adminRoute.POST(request({ guestName: 'Linh & Chris', eventGroup: 'reception', maxGuests: 2 }, '/api/admin/invitations'))).status, 201);
});
test('same-origin creation works behind a proxy and rejects a different origin', async () => {
  process.env.ADMIN_PASSWORD = 'test-only-password'; cookie = createAdminSession();
  const proxied = origin => new Request('http://internal.example/api/admin/invitations', {
    method: 'POST', headers: { Origin: origin, 'x-forwarded-host': 'wedding.example', 'x-forwarded-proto': 'https', 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestName: 'Linh & Chris', eventGroup: 'reception', maxGuests: 2 }),
  });
  assert.equal((await adminRoute.POST(proxied('https://wedding.example'))).status, 201);
  assert.equal((await adminRoute.POST(proxied('https://other.example'))).status, 403);
});
test('public invitation lookup is token scoped and never cached', async () => {
  const result = await publicRoute.GET(new Request('https://wedding.example'), { params: Promise.resolve({ token: invitation.token }) });
  assert.equal(result.status, 200); assert.match(result.headers.get('Cache-Control'), /no-store/);
  assert.equal((await result.json()).invitation.guestName, 'Linh & Chris');
  assert.equal((await publicRoute.GET(new Request('https://wedding.example'), { params: Promise.resolve({ token: 'unknown' }) })).status, 404);
});
test('RSVP route saves assigned group and only confirms after Google success', async () => {
  const originalFetch = global.fetch; let forwarded;
  global.fetch = async (_url, options) => { forwarded = JSON.parse(options.body); return Response.json({ success: true }); };
  try {
    receipts = []; storageFailure = false;
    const response = await rsvpRoute.POST(request({ ...rsvpBody, eventGroup: 'ceremony' }));
    assert.equal((await response.json()).success, true); assert.equal(forwarded.eventGroup, 'reception');
    assert.equal(receipts.length, 2); assert.equal(receipts[1].googleSaved, true);
    forwarded = undefined;
    assert.equal((await rsvpRoute.POST(request({ ...rsvpBody, guestCount: 3 }))).status, 400); assert.equal(forwarded, undefined);
    assert.equal((await rsvpRoute.POST(request({ ...rsvpBody, invitationToken: '' }))).status, 404);
    global.fetch = async () => Response.json({ success: false });
    assert.equal((await rsvpRoute.POST(request(rsvpBody))).status, 502);
    global.fetch = async () => new Response('<html>Error</html>');
    assert.equal((await rsvpRoute.POST(request(rsvpBody))).status, 502);
  } finally { global.fetch = originalFetch; }
});
test('storage failure prevents forwarding, and generic RSVPs preserve the existing payload', async () => {
  const originalFetch = global.fetch; let forwarded;
  global.fetch = async (_url, options) => { forwarded = JSON.parse(options.body); return Response.json({ success: true }); };
  try {
    storageFailure = true;
    assert.equal((await rsvpRoute.POST(request(rsvpBody))).status, 502); assert.equal(forwarded, undefined);
    const generic = { attending: 'no', guestCount: 0, guests: [{ name: '' }], message: 'Thank you' };
    assert.equal((await rsvpRoute.POST(request(generic))).status, 200); assert.deepEqual(forwarded, generic);
  } finally { storageFailure = false; global.fetch = originalFetch; }
});
