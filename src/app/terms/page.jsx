
import ExtraButton from '@/components/shared/ExtraButton';
import React from 'react';
export const metadata = {
  title: "Terms & Conditions | Health Core",
  description: "Review the Terms & Conditions for using Earn To Click — your trusted platform for online income and ERC rewards.",
  keywords: [
    "Earn To Click terms",
    "terms and conditions",
    "ERC platform rules",
    "online income policy",
    "reward platform terms"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}/terms` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Terms & Conditions | Earn To Click",
    description: "Understand the rules and responsibilities when using Earn To Click's platform for online earnings.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/terms`,
    siteName: "Earn To Click",
    images: [
      {
        url: "/medical-banner.jpg", // Replace with a relevant image or keep as fallback
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "article",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
};


const Terms = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-lg">Health & Wellness Website</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            By accessing or using the Health & Wellness website ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Service. These Terms apply to all visitors, users, and others who access the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of the Service</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Service provides general health and medical information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. You agree to use the Service only for lawful purposes and in accordance with these Terms.
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>You must be at least 18 years old or have parental consent to use the Service.</li>
            <li>You agree not to reproduce, distribute, or modify content without permission.</li>
            <li>You will not use the Service to engage in harmful or illegal activities.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Medical Disclaimer</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The content provided on the Service is for informational purposes only. Always seek the advice of a qualified healthcare provider for medical conditions or concerns. Health & Wellness is not responsible for any actions taken based on the information provided.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            All content, including text, images, and logos, is the property of Health & Wellness or its licensors and is protected by copyright and trademark laws. You may not use, reproduce, or distribute content without express written permission.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Health & Wellness is not liable for any damages arising from the use of the Service, including but not limited to direct, indirect, incidental, or consequential damages. The Service is provided "as is" without warranties of any kind.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            For questions about these Terms, please contact us at:
            <br />
            Email: support@healthwellness.com
            <br />
            Address: 123 Wellness Way, Health City, USA
          </p>
        </section>

        {/* Call to Action */}
       <ExtraButton/>
      </main>

    </div>
  );
};

export default Terms;
