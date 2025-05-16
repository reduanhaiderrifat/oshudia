
import ExtraButton from '@/components/shared/ExtraButton';
import React from 'react';
export const metadata = {
  title: "Privacy Policy | Health Core",
  description: "Learn how Earn To Click collects, uses, and protects your personal information. Your privacy and data security are important to us.",
  keywords: [
    "Earn To Click privacy",
    "privacy policy",
    "data protection",
    "user information security",
    "ERC platform privacy"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}/privacy&policy` }],
  creator: "Earn To Click",
  openGraph: {
    title: "Privacy Policy | Earn To Click",
    description: "Read our privacy policy to understand how we handle your data at Earn To Click.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/privacy&policy`,
    siteName: "Earn To Click",
    images: [
      {
        url: "/medical-banner.jpg", // Replace with a relevant image or use a general banner
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "article",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
};

const Privacy = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-lg">Health & Wellness Website</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Health & Wellness, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website ("Service"). By using the Service, you consent to the practices described in this policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li><strong>Personal Information</strong>: Name, email address, phone number, or other details you provide when contacting us or using our services.</li>
            <li><strong>Health Information</strong>: Information you voluntarily share, such as medical history or wellness preferences, which is treated with strict confidentiality.</li>
            <li><strong>Usage Data</strong>: Information about how you interact with the Service, such as IP address, browser type, and pages visited.</li>
            <li><strong>Cookies</strong>: We use cookies to enhance your experience. You can manage cookie preferences via your browser settings.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Provide and improve our health and wellness services.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Personalize content and recommendations.</li>
            <li>Analyze usage to enhance the Service’s functionality.</li>
            <li>Comply with legal obligations, such as health data regulations.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We do not sell or rent your personal information. We may share information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>With trusted service providers (e.g., cloud hosting) who follow strict privacy standards.</li>
            <li>To comply with legal requirements, such as HIPAA, GDPR, or court orders.</li>
            <li>With your consent, such as for sharing health data with a medical professional.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We implement industry-standard security measures to protect your data, including encryption and secure servers. However, no method is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Access, correct, or delete your personal information.</li>
            <li>Opt out of data collection or marketing communications.</li>
            <li>Request data portability or restrict processing.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            To exercise these rights, contact us at support@healthwellness.com.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Health Data Compliance</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We comply with applicable health data regulations, such as HIPAA for US users. Health information is stored securely and shared only with your explicit consent or as required by law.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Your continued use of the Service after changes constitutes acceptance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            For questions about this Privacy Policy, please contact us at:
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

export default Privacy;
