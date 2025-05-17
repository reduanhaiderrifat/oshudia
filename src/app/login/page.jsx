import Login from "@/components/shared/Login";
import React from "react";
export const metadata = {
  title: "Login | Oshudia",
  description: "Log in to your Earn To Click account to access task-based rewards, ERC earnings, and your online income dashboard.",
  keywords: [
    "Earn To Click login",
    "login to earn",
    "online income login",
    "ERC reward login",
    "earn money login",
    "Oshudia"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}/login` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Login | Earn To Click",
    description: "Securely log in to Earn To Click and start earning through online tasks and rewards.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/login`,
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
const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
