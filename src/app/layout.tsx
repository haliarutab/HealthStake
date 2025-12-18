import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GAProvider from "@/components/GAProvider";

/* Load Inter with all needed weights */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HealthStake – Digital Healthcare",
  description: "Your care partner in digital healthcare.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GAProvider /> {/* Client Component for GA */}
        {children}
      </body>
    </html>
  );
}
