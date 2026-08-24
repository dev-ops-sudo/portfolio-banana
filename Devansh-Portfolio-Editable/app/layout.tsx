import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/caveat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://devansh-motion-portfolio.dm7903337.chatgpt.site",
  ),
  title: "Devansh Mishra — Creative Developer",
  description:
    "Full-stack developer crafting fast, expressive digital experiences with React, Node.js, SQL, and motion.",
  openGraph: {
    title: "Devansh Mishra — Creative Developer",
    description: "Full-stack systems with a designer's obsession for motion.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Devansh Mishra — Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Mishra — Creative Developer",
    description: "Full-stack systems with a designer's obsession for motion.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
