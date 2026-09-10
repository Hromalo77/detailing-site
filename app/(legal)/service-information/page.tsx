import type { Metadata } from "next";
export const metadata: Metadata = { title: "Service information | Cape Cod Mobile Detailing" };

export default function ServiceInformation() {
  return <>
    <p className="legal-eyebrow">Before you request a detail</p>
    <h1>Quotes &amp; service information</h1>
    <p className="legal-date">Last updated September 11, 2026</p>
    <h2>Requests and bookings</h2>
    <p>This website sends an inquiry. Submitting it does not confirm an appointment, enter you into a subscription, or charge you. Arrange the appointment and service details directly with the business.</p>
    <h2>Prices and optional add-ons</h2>
    <p>Prices labeled “starting at” are starting estimates. The displayed total adds the optional extras you select to the starting price. Vehicle size, condition, location, and the scope of work may affect the quote. Ask for the complete price, including any mandatory charges and applicable taxes, before authorizing work.</p>
    <p>The website does not collect payments. Confirm payment arrangements, any deposit, and cancellation or rescheduling conditions with the business before booking. This page does not establish a cancellation fee or refund restriction.</p>
    <h2>Changes and questions</h2>
    <p>If you need to change a request or have a concern about completed work, use the <a href="/#contact">contact information on the website</a>. Keep your quote and any agreed service details for reference.</p>
    <h2>Help accessing the website</h2>
    <p>If a form or other feature is difficult to use with assistive technology, contact the business by phone or email for help requesting service. Include the page and problem when reporting an accessibility issue.</p>
    <h2>Your rights</h2>
    <p>Nothing on this page limits rights or remedies available under applicable consumer-protection law.</p>
  </>;
}
