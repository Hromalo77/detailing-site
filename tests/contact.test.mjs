import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function moduleUrl(path, replacements = {}) {
  let source = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  for (const [from, to] of Object.entries(replacements)) source = source.replaceAll(`"${from}"`, JSON.stringify(to));
  return `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
}
const price = moduleUrl("app/service-price.ts");
const contact = moduleUrl("app/contact-request.ts", { "./service-price": price });
const { validateContact, serviceSummary } = await import(contact);
const service = { name: "Full detail", price: "$149", addOns: [{ name: "Pet hair", price: "25.50" }] };
const valid = { name: "Test", phone: "555", email: "customer@example.com", message: "SUV & dog hair", selection: { serviceIndex: 0, serviceName: service.name, addOns: [{ index: 0, name: "Pet hair" }] } };
assert.ok(validateContact(valid));
for (const email of ["bad", "x@example.com\r\nBcc: y@example.com"]) assert.ok(!validateContact({ ...valid, email }));
assert.ok(!validateContact({ ...valid, message: "a".repeat(4001) }));
assert.match(serviceSummary(service, [0]), /174\.50/);
assert.match(serviceSummary(service, []), /149\.00/);
globalThis.contactTest = { service, mode: "success", messages: [] };
const mock = (source) => `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const { POST } = await import(moduleUrl("app/api/contact/route.ts", {
  "@/app/service-price": price,
  "@/app/contact-request": contact,
  "@/db/content": mock('export async function getSiteContent(){return {services:[globalThis.contactTest.service]}}'),
  nodemailer: mock('export default {createTransport(){return {async sendMail(message){globalThis.contactTest.messages.push(message); if(globalThis.contactTest.mode === "error") throw new Error("private SMTP failure"); return {accepted:[message.to]}}}}}'),
}));
const send = (data, origin = "https://example.com") => POST(new Request("https://example.com/api/contact", { method: "POST", headers: { origin }, body: JSON.stringify(data) }));
delete process.env.GMAIL_USER;
delete process.env.GMAIL_APP_PASSWORD;
assert.equal((await send(valid)).status, 503);
process.env.GMAIL_USER = "owner@gmail.com";
process.env.GMAIL_APP_PASSWORD = "fake-test-only";
delete process.env.CONTACT_TO_EMAIL;
assert.equal((await send(valid, "https://other.example")).status, 403);
assert.equal((await send({ ...valid, website: "bot" })).status, 400);
assert.equal((await send(valid)).status, 200);
const message = globalThis.contactTest.messages[0];
assert.equal(message.to, "owner@gmail.com");
assert.equal(message.replyTo, valid.email);
assert.match(message.text, /174\.50/);
assert.match(message.text, /SUV & dog hair/);
globalThis.contactTest.mode = "error";
const failure = await send(valid);
assert.equal(failure.status, 503);
assert.ok(!(await failure.text()).includes("private SMTP"));
assert.equal((await send({ ...valid, selection: { ...valid.selection, serviceName: "Deleted" } })).status, 400);
assert.equal((await send(valid)).status, 429);
console.log("Contact validation, totals, SMTP payload, errors, throttling passed; no email sent.");

