import Link from 'next/link';
import React from 'react';

const ExtraButton = () => {
    return (
        <div>
             <section className="text-center mt-12">
          <p className="text-gray-600 mb-6">Return to our homepage or explore our health resources.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mr-4">Home</Link>
          <a href="mailto:earntoclick.core@gmail.com" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Contact Us</a>
        </section>
        </div>
    );
};

export default ExtraButton;