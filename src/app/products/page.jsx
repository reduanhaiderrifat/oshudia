import MedicineCards from '@/components/Product/page';
import React from 'react';
export const metadata = {
  title: "Products | Oshudia",
  description: "Explore our featured digital products, tools, and services that help boost your online earnings on Earn To Click.",
  keywords: [
    "Earn To Click products",
    "digital tools",
    "online income tools",
    "reward products",
    "ERC tools",
    "task-based earning products",
    "Oshudia"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Products | Earn To Click",
    description: "Discover tools and digital products that support your earning journey on Earn To Click.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/products`,
    siteName: "Earn To Click",
    images: [
      {
        url: "/medical-banner.jpg", // Replace with your actual banner image if available
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
      <MedicineCards/>
    </div>
  );
};

export default page;