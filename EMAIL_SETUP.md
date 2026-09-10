# Gmail contact form

1. Enable Google 2-Step Verification and create an app password at https://myaccount.google.com/apppasswords (availability depends on the account's security policy).
2. Add these server-only values to `.env` locally and your hosting environment:

   ```dotenv
   GMAIL_USER=your-address@gmail.com
   GMAIL_APP_PASSWORD=your-google-app-password
   # Optional; defaults to the sending Gmail inbox:
   CONTACT_TO_EMAIL=your-address@gmail.com
   ```

   Use an app password, never your normal Google password. Do not commit `.env` or expose these variables with a `NEXT_PUBLIC_` prefix.
3. Restart the server after changing environment variables. Submit a test request and confirm receipt in the configured inbox. A successful website response means Gmail accepted the message, not proof of inbox delivery.

The route uses Node.js and Gmail SMTP over TLS on port 465. Deploy on a Node host that permits outbound SMTP. This transport is incompatible with the Sites runtime in `.openai/hosting.json`, which does not support raw TCP sockets; a Gmail HTTP API integration would be needed there.

Requests go only to the configured inbox, with the customer in Reply-To. Names and prices are loaded from the database. The form retains values on failure and does not automatically retry ambiguous SMTP failures. Basic spam controls include a honeypot and three attempts per email per ten minutes per server instance; configure host-level rate limiting for distributed deployments.

Run `node tests/contact.test.mjs` for isolated mocked delivery tests. No real emails are sent by those tests.
