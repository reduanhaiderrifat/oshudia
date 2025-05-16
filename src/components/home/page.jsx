import Image from "next/image";
import React from "react";
import "./home.css";
const HomePage = () => {
  return (
    
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Fullscreen Background Image */}
        <Image
          src="/medical-banner.jpg"
          alt="Healthcare Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Your Health, Our Priority
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 drop-shadow-md">
            We provide trusted, accessible, and professional healthcare
            services. From expert consultation to life-saving medicines, we're
            here to care for you every step of the way.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-md transition duration-300">
            Explore Services
          </button>
              <div className="pulse mt-24">
        <span style={{ "--i": 1 }}></span>
        <span style={{ "--i": 2 }}></span>
        <span style={{ "--i": 3 }}></span>
        <span style={{ "--i": 4 }}></span>
        <span style={{ "--i": 5 }}></span>
        <span style={{ "--i": 6 }}></span>
      </div>
        </div>
        
  
      </div>

  );
};

export default HomePage;
