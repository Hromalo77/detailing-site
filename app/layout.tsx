import type {Metadata} from "next";
import "./globals.css";
import "./mobile.css";

export const metadata: Metadata = {
    title: "Cape Shine Mobile Detailing | Cape Cod, MA",
    description: "Expert mobile car detailing services in Cape Cod, MA. We bring premium auto detailing, interior cleaning, and exterior protection directly to your home or office across Cape Cod and Southeastern Massachusetts. Book your appointment today."
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Cape Shine Mobile Detailing",
        "description": "Expert mobile car detailing services in Cape Cod, MA.",
        "url": "https://capeshinemobiledetailing.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cape Cod",
            "addressRegion": "MA",
            "addressCountry": "US"
        },
        "priceRange": "$$"
    };
    return <html lang="en">
    <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
    </body>
    </html>
}
