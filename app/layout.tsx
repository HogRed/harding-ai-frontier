import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const body = Space_Grotesk({ variable: "--font-body", subsets: ["latin"] });
const display = Syne({ variable: "--font-display", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Harding AI — Build What’s Next";
  const description = "Explore Harding University’s Artificial Intelligence major, curriculum, career pathways, and the people ready to help you build the future.";

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/ai-bison.jpg" },
    openGraph: { title, description, images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
