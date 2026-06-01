import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Poppins as PoppinsGoogle, Nunito } from "next/font/google";
import { BackToTop } from "@/components/site/BackToTop";
import "./globals.css";

const gotham = localFont({
  src: [
    { path: "../../public/fonts/Gotham-Book.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Gotham-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Gotham-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Gotham-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-gotham",
});

const poppins = localFont({
  src: [
    { path: "../../public/fonts/Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});

const avenir = localFont({
  src: [
    { path: "../../public/fonts/AvenirNextLTPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/AvenirNextLTPro-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/AvenirNextLTPro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-avenir",
});

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppinsGoogle = PoppinsGoogle({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins-google" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Raymond Gray | Remote Support Services",
  description: "Reliable remote support for SMEs worldwide — spanning back-office administration, customer service operations, and IT helpdesk coverage.",
  openGraph: {
    title: "Raymond Gray | Remote Support Services",
    description: "Reliable remote support for SMEs worldwide — spanning back-office administration, customer service operations, and IT helpdesk coverage.",
    url: "https://remotesupport.raymond-gray.org",
    siteName: "Raymond Gray",
    images: [
      {
        url: "/images/hero-bg.png", // Will be relative to domain
        width: 1200,
        height: 630,
        alt: "Raymond Gray Remote Support Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raymond Gray | Remote Support Services",
    description: "Reliable remote support for SMEs worldwide.",
    images: ["/images/hero-bg.png"],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gotham.variable} ${poppins.variable} ${avenir.variable} ${montserrat.variable} ${poppinsGoogle.variable} ${nunito.variable} scroll-smooth`}>
      <body className="antialiased text-rg-ink bg-rg-bg font-sans">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
