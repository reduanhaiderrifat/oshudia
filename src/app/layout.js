import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  { Toaster } from 'react-hot-toast';
import AuthProvider from "@/services/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Oshudia",
  description: "Earn To Click is a platform for online income, task-based rewards, and ERC earnings. Start earning from home today! Oshudia",
   manifest: '/manifest.json',
  keywords: [
    "earn money online",
    "ERC",
    "Oshudia",
    "Earn To Click",
    "online income",
    "reward platform",
    "make money from home",
    "task-based income"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Earn To Click",
    description: "Earn To Click is a platform for online income, task-based rewards, and ERC earnings. Start earning from home today!",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "Earn To Click",
    images: [
      {
        url: "/medical-banner.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#0070f3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar/>
        <div className="min-h-[calc(100vh-229px)]">
          {children}
        </div>
        <Toaster/>
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
