import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
export const SESSION_SECONDS = 60 * 60 * 12;
function signature(value: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("Admin password is not configured.");
  return createHmac("sha256", password).update(`wedding-admin:${value}`).digest("hex");
}
export function createAdminSession(now = Date.now()) {
  const payload = `${now + SESSION_SECONDS * 1000}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${signature(payload)}`;
}
export function validAdminSession(value?: string, now = Date.now()) {
  if (!value || !process.env.ADMIN_PASSWORD) return false;
  const [expires, nonce, mac, extra] = value.split(".");
  if (extra || !/^\d+$/.test(expires) || !/^[a-f0-9]{32}$/.test(nonce ?? "") || !/^[a-f0-9]{64}$/.test(mac ?? "")) return false;
  if (Number(expires) <= now || Number(expires) > now + SESSION_SECONDS * 1000) return false;
  return timingSafeEqual(Buffer.from(mac, "hex"), Buffer.from(signature(`${expires}.${nonce}`), "hex"));
}
