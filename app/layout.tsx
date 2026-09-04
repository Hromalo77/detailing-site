import type {Metadata} from "next";
import "./globals.css";
import "./mobile.css";

export const metadata: Metadata = {
    title: "Cape Cod Mobile Detailing",
    description: "Premium mobile auto detailing across Cape Cod and Southeast Massachusetts. We bring the detail to you."
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    return <html lang="en">
    <body>{children}</body>
    </html>
}
