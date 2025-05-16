

import ProductDetails from "@/components/Product/ProductDetails";
import React from "react";
import medicineData from "../../../../data/madecine.json";

export const generateMetadata = async ({ params }) => {
 const { img_id } = await params;

  const item = medicineData.data.find((item) => item.img_id.split(".")[0] === img_id);
  return {
    title: `${item?.name} | Health core`,
    description: `${item?.name} is a trusted medicine used to treat common conditions such as fever, headache, and body aches. Get detailed information, uses, and benefits.`,
    keywords: item?.active_ingredients,
    authors: [{ name: "Health core", url: process.env.NEXT_PUBLIC_DOMAIN }],
    creator: "Health core",
    openGraph: {
      title: `${item?.name} || Health core`,
      description: `${item?.name} is used for treating fever, pain, and inflammation. Learn about dosage, side effects, and uses.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/products/${img_id}`,
      images: [
        {
          url: `https://i.imgur.com/${item?.img_id}`, 
          width: 1200,
          height: 630,
        },
      ],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
  };
};



const MedicineDetails = ({ params }) => {

  const img_id = React.use(params).img_id;
 return (
    <div >
      <ProductDetails img_id={img_id} />
    </div>
  )
}

export default MedicineDetails;
