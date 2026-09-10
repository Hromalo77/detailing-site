import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <div className="legal-shell">
    <header className="legal-header"><Link href="/">← Back to the detailing website</Link></header>
    <main id="main-content" className="legal-document">{children}</main>
    <footer className="legal-footer"><Link href="/privacy">Privacy notice</Link><Link href="/service-information">Service information</Link><Link href="/#contact">Contact</Link></footer>
  </div>;
}
