// Built using Hyperiux Vault: https://vault.hyperiux.com
import "./haven-styles.css";
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import ogImage from "@/assets/hero/villa.png";
import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";

const headFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-haven-head",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-haven-body",
  display: "swap",
});

const numberFont = Geist({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-haven-number",
  display: "swap",
});

const title = "Haven Spaces - Architecture Studio Template";
const description =
  "An architecture studio template with a cloud sky hero, a flying birds overlay, studio statistics and a villa showcase.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vault.hyperiux.com"),
  title,
  description,
  alternates: { canonical: "https://vault.hyperiux.com/templates/haven-spaces" },
  openGraph: {
    title,
    description,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.src],
  },
};

export default function Home() {
  return (
    <div className={`haven-page relative ${headFont.variable} ${bodyFont.variable} ${numberFont.variable}`}>
      <LenisSmoothScroll />
      <ScrollTopOnLoad />
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
}
