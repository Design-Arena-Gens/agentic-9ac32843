import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Meme Generator - Instagram Trends",
  description: "Generate memes based on daily viral Instagram trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
