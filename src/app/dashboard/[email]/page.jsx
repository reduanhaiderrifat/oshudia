import Dashboard from '@/components/dashboard/page';
import React from 'react';
export const metadata = {
  title: "Dashboard | Oshudia",
  description: "Access your Earn To Click dashboard to track tasks, rewards, ERC earnings, and manage your online income profile.",
  keywords: [
    "Earn To Click dashboard",
    "task tracking",
    "ERC earnings",
    "online income management",
    "reward platform",
    "Oshudia"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Dashboard | Earn To Click",
    description: "Manage your account, view earnings, and complete tasks through your Earn To Click dashboard.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
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

const page = ({ params }) => {
    const email = React.use(params).email
    const encoded = decodeURIComponent(email);
  return (
    <div>
      <Dashboard encoded={encoded}/>
    </div>
  );
};

export default page;