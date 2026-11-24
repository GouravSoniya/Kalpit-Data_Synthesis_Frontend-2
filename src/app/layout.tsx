import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";

const serif = Noto_Serif({ subsets: ["latin"], variable: "--font-noto-serif", style: ["normal", "italic"] });
const sans = Noto_Sans({ subsets: ["latin", "devanagari"], variable: "--font-noto-sans" });

export const metadata: Metadata = {
  title: "Kalpit Labs",
  description: "A Data-Synthesis and AI Research Lab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
