import type { Metadata } from "next";
import { connection } from "next/server";
import { getPublicSiteContent } from "@/db/public-content";

export const metadata: Metadata = { title: "Privacy notice | Cape Cod Mobile Detailing" };

export default async function PrivacyPage() {
  await connection();
  const content = await getPublicSiteContent();
  const name = `${content.brand.name} ${content.brand.highlight} ${content.brand.subline}`;
  return <>
    <p className="legal-eyebrow">Your information</p>
    <h1>Website privacy notice</h1>
    <p className="legal-date">Last updated September 11, 2026</p>
    <p>This notice explains how the {name} website handles information when you browse or request mobile detailing in Massachusetts. It covers this website’s inquiry form; other services you use may have their own privacy notices.</p>
    <h2>Information you provide</h2>
    <p>The inquiry form collects your name, phone number, email address, message, and any selected service and add-ons. Your message may include vehicle details or a requested service location. Please do not send payment-card details, Social Security numbers, driver’s license numbers, or other sensitive information through this form.</p>
    <h2>How the website uses information</h2>
    <p>Your details are used to deliver your request to the business and help respond about availability, a quote, or your requested service. They are not used for marketing or sold. Submitting the form does not subscribe you to marketing messages. The website also uses a temporary email-based request counter to limit repeated submissions.</p>
    <h2>Email, hosting, and storage</h2>
    <p>When sending is enabled, requests are transmitted through Google’s Gmail service to the business’s configured inbox. Google and the website’s hosting providers process information needed to deliver and operate these services. Hosting systems may process technical information such as IP addresses, request times, browser details, and security logs.</p>
    <p>The website does not save inquiry messages in its content database. Sent requests may remain in email folders, backups, or provider logs until removed under the applicable account or provider settings. The temporary request counter expires after ten minutes and is cleared on subsequent requests or when the server instance restarts. This website does not automatically delete email copies on a fixed schedule.</p>
    <h2>Cookies and tracking</h2>
    <p>The website application does not include advertising pixels or third-party analytics scripts. Administrators use a sign-in cookie that lasts up to eight hours; it is not used for advertising. Hosting services may use additional technology for security or access control.</p>
    <p>The application does not track visitors across other websites or change its behavior in response to a browser’s Do Not Track signal. The inquiry form does not send customer details to advertising networks or data brokers.</p>
    <h2>Questions and requests</h2>
    <p>You can choose not to submit the form and contact the business by phone instead. To ask about information you submitted, request a correction or deletion, or raise a privacy concern, email <a href="mailto:capeshinedetailingma@gmail.com">capeshinedetailingma@gmail.com</a> or call <a href={`tel:${content.contact.phone}`}>{content.contact.phoneDisplay}</a>. Please identify your request without including sensitive documents. Available rights and any retention obligations depend on applicable law.</p>
    <h2>Children</h2>
    <p>This website is intended for people requesting vehicle services, not children under 13. Children under 13 should not submit personal information. Contact the business if you believe a child has submitted information so it can be reviewed.</p>
    <h2>Changes to this notice</h2>
    <p>Updates will be posted on this page with a revised date. Review this notice before submitting another request.</p>
  </>;
}
