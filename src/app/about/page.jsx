
import ExtraButton from '@/components/shared/ExtraButton';
import React from 'react';
export const metadata = {
  title: "About Us | Health Core",
  description: "Learn more about Earn To Click — a platform dedicated to helping users earn online through task-based rewards and ERC systems.",
  keywords: [
    "about Earn To Click",
    "online income platform",
    "ERC rewards",
    "reward platform",
    "Earn To Click team"
  ],
  authors: [{ name: "Earn To Click Team", url: `${process.env.NEXT_PUBLIC_DOMAIN}` }],
  creator: "Earn To Click",
  openGraph: {
    title: "About Us | Earn To Click",
    description: "Get to know the mission, vision, and team behind Earn To Click — your partner in online income opportunities.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/about`,
    siteName: "Earn To Click",
    images: [
      {
        url: "/medical-banner.jpg", // Place a suitable image in the `public/` folder or use an existing one
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
};

const About = () => {
    return (
        <div className="bg-gray-100 font-sans">
            {/* Header */}
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">About Us</h1>
                    <p className="mt-2 text-lg">Empowering Your Health Journey</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Mission Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Health & Wellness, we are committed to providing accurate, accessible, and compassionate health information and services. Our mission is to empower individuals to make informed decisions about their well-being through trusted medical resources, expert advice, and innovative solutions.
                    </p>
                </section>

                {/* Values Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-blue-600 mb-2">Trust</h3>
                            <p className="text-gray-600">We prioritize evidence-based information to build trust with our community.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-blue-600 mb-2">Accessibility</h3>
                            <p className="text-gray-600">Health resources should be available to everyone, anytime, anywhere.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-blue-600 mb-2">Compassion</h3>
                            <p className="text-gray-600">We approach every interaction with empathy and care for your well-being.</p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our team of healthcare professionals, including doctors, nutritionists, and wellness experts, is dedicated to supporting your health journey. We combine expertise with a passion for helping others to deliver high-quality resources and services.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <img src="https://via.placeholder.com/100" alt="Dr. Jane Smith" className="w-24 h-24 rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Dr. Jane Smith</h3>
                                <p className="text-gray-600">Chief Medical Advisor</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <img src="https://via.placeholder.com/100" alt="Dr. John Doe" className="w-24 h-24 rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Dr. John Doe</h3>
                                <p className="text-gray-600">Wellness Consultant</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Join Our Health Community</h2>
                <ExtraButton />  
            </main>


        </div>
    );
};

export default About;
