# Personalized bilingual invitations

## Admin workflow

1. Sign in at `/admin/login`, then open **Guest Invitations**.
2. Enter the guest label exactly as it should appear, for example `Linh & Chris` or `Gia đình Nguyễn`.
3. Select **4 PM ceremony + reception** or **6 PM reception**. Choose a maximum party size from 1 to 6.
4. Click **Create Invitation**, open **Preview**, switch between US / VN, then copy the invitation link.

Both languages are included in every invitation. Names remain as entered; English uses Noelle & Nathan and Vietnamese uses Tấn Cường & Lãm Nghi. A household label is not prefilled into an individual RSVP name field. Guests still enter the names of attendees.

The 4 PM group sees the existing full schedule, with arrival at 3:30 PM. The 6 PM group sees arrival/photos at 5 PM, reception at 6 PM, first dance and send-off. The 5 PM reception arrival is preserved from the site's existing FAQ. Countdown times on invitation links use Vietnam's UTC+7 timezone. Generic links retain the existing site behavior.

The token is kept in the URL during desktop navigation and refreshes, including RSVP and FAQ. The language selector, intro and music components retain their existing behavior. Invalid or unavailable invitation links show an error instead of falling back to ceremony information.

## Required private storage setup

The gallery uses its existing public Blob store. Invitation records must use a **separate private Blob store**.

1. In Vercel, create a private Blob store named `wedding-private-invitations` under the wedding project's team.
2. Add its read/write token as an encrypted environment variable named `INVITATIONS_READ_WRITE_TOKEN` to the wedding project. Include Preview for testing and Production when ready to release.
3. Keep the gallery's existing `BLOB_READ_WRITE_TOKEN` unchanged. Do not replace it with the private token.
4. Ensure `ADMIN_PASSWORD` exists in the same environments. The existing password still works, but old admin cookies require signing in again.
5. Redeploy the preview after adding the variable, then use the admin workflow above.

Private Blob storage documentation: https://vercel.com/docs/vercel-blob/private-storage

No guest names are stored in source control or public gallery assets. Each invitation uses a random 192-bit bearer token. Anyone with the copied link can see that invitation, so links should be shared directly with the intended guest.

## RSVP compatibility and records

The shared `/api/mobile-rsvp` route still sends the existing `attending`, `guestCount`, `guests`, and `message` fields to the existing Google Apps Script endpoint. Invitation submissions also send `invitationToken`, `invitationGuestName`, `eventGroup`, and `eventTime`, looked up on the server. Guests cannot override their group or party limit by editing a request.

The Apps Script source is not in this repository. Extra fields may be ignored by its existing spreadsheet logic. The assigned group and response are independently retained in private storage under `invitation-responses/<token>/<submission-id>.json`; existing spreadsheet columns do not have to change for the group to be retained. Exposing these extra fields as sheet columns requires a coordinated Apps Script update.

A private receipt is saved before Google is called. If Google confirms success, that receipt is marked `googleSaved: true`. A receipt with `googleSaved: false` needs reconciliation with the Google sheet; it is not proof that the sheet rejected the submission. If saving the confirmation fails after Google has confirmed, the API still returns success to avoid asking the guest to duplicate their submission. The original response and group remain in private storage.

## Verification

Run `npm test`, `npx next typegen`, `npx tsc --noEmit`, and `npm run build`.

Automated tests cover names/accents, both group times, token-preserving links, signed and expired admin sessions, unauthorized admin APIs, same-origin creation, public token lookup, server-side party limits, group tampering, Google errors and generic RSVP compatibility. External storage and Google calls are mocked in these tests; no test responses are sent to the live wedding sheet.

Before merging, verify on the configured preview:

- Create one test invitation per group; reload Admin to confirm durable storage.
- Open each link on mobile and desktop in both languages. Verify names, schedule, FAQ arrival times, navigation, and party limits.
- Verify music starts after mobile language selection and switches songs with the language.
- Submit clearly labeled test RSVPs, check the Google sheet and private receipt, and clean up the test sheet rows.
- Check a generic URL and an invalid token separately.

Production should be released only after this live storage and spreadsheet verification.
