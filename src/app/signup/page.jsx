import Register from '@/components/shared/Register';
import React from 'react';
export const metadata = {
  title: "Signup | Oshudia",
  description: "Log in to your Earn To Click account to access task-based rewards, ERC earnings, and your online income dashboard.",
  keywords: [
    "Earn To Click Signup",
    "Signup to earn",
    "online income Signup",
    "ERC reward Signup",
    "earn money Signup",
    "Oshudia"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}/signup` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Signup | Earn To Click",
    description: "Securely log in to Earn To Click and start earning through online tasks and rewards.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/signup`,
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
            <Register/>
        </div>
    );
};

export default page;