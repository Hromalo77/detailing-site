# Massachusetts website review — September 11, 2026

This is an implementation review, not a legal opinion or certification of compliance. The app is a Massachusetts detailing inquiry site, with no checkout, subscriptions, advertising trackers, or marketing automation in the reviewed code. The owner supplied capeshinedetailingma@gmail.com and indicated no marketing/sale of customer details. The legal entity/DBA, postal address, hosting configuration, retention practices, and business operations remain unverified.

## Implemented

- Website privacy notice describing the actual form, Gmail delivery, provider processing, temporary throttling, administrator cookie, and email retention limitations.
- Privacy and service-information links in the footer and at the point of collection. No forced marketing consent or unsupported cookie banner.
- Inquiry-versus-booking and starting-estimate disclosures. No fabricated cancellation fees, refund rules, liability waivers, or arbitration terms.
- Skip navigation, visible keyboard focus, responsive readable policy pages, and a way to report accessibility problems. These are not a substitute for an accessibility audit.

## Owner actions before publication

1. Confirm the legal operating name/DBA and that the public phone number and privacy inbox are monitored. Verify all published statements match actual practices. Define an email/backup retention schedule; the application does not automatically delete Gmail messages.
2. Review all advertised prices against Massachusetts 940 CMR 38.00. Include mandatory charges in advertised totals when required. A starting-estimate label or disclaimer does not excuse omitting a required fee. Confirm vehicle categories, location charges, and any mandatory extras, then update the plan data/pricing model. Do not add arbitrary tax calculations; confirm tax treatment with Massachusetts DOR or your accountant.
3. Verify every testimonial, rating, customer count, insurance claim, guarantee, and gallery item before publication. Existing sample-looking testimonials are not verified by this review. Remove any fictional or unsupported claims and obtain appropriate permissions for customer photos. The code was not changed to invent evidence or silently erase existing reviews.
4. Use HTTPS on the live site, Google 2-Step Verification, an app password kept only in server secrets, restricted mailbox/admin access, and hosting-level spam controls. Confirm actual host logs, cookies, providers, and retention; update the notice for any differences. Gmail SMTP needs compatible Node hosting; Sites requires a different transport.
5. Assess Massachusetts 201 CMR 17.00 and Chapter 93H against all business records, including employee/payroll and offline payment records. Their defined personal information includes a resident's name together with SSN, license/state ID, or qualifying financial-account/card information. The current inquiry fields alone do not establish that all business records fall outside the rules. Where applicable, maintain a written information security program and a breach-response process. Do not collect sensitive identifiers in the inquiry form.
6. Have a Massachusetts attorney confirm applicable requirements for your actual business, service areas, and customer population. Review other-state privacy obligations if you collect residents' information there. General terms, an accessibility statement, and a cookie popup are not automatically mandatory merely because the business is in MA. This review does not cover permits, wastewater/environmental rules, insurance, employment obligations, or every operational law.
7. Before adding promotions, SMS automation, payments, analytics, or ad pixels, reassess notice, consent, security, and retention requirements. The current form only requests a reply about an inquiry; it does not authorize promotional campaigns.

## Primary sources consulted

- Massachusetts personal-information safeguards: https://www.mass.gov/regulations/201-CMR-1700-standards-for-the-protection-of-personal-information-of-ma-residents
- Massachusetts fee disclosures: https://www.mass.gov/regulations/940-CMR-3800-unfair-and-deceptive-fees
- Massachusetts sales/use tax: https://www.mass.gov/guides/sales-and-use-tax
- FTC privacy promises and security: https://www.ftc.gov/business-guidance/privacy-security
- FTC reviews/testimonials rule: https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- DOJ web accessibility: https://www.ada.gov/resources/web-guidance/
- California privacy-policy disclosures (potential out-of-state applicability): https://oag.ca.gov/sites/all/files/agweb/pdfs/cybersecurity/making_your_privacy_practices_public.pdf
