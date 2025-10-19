import React from 'react';
import { useNavigate } from "react-router-dom";

import Header from './one';
import MainContent from './two';
import Footer from './three ';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-stretch min-h-screen w-full">
      {/* Left Section (hidden on md and smaller) */}
      <div className="hidden lg:block w-1/4 bg-gray-200">
        <Header />
      </div>

      {/* Middle Section (always visible) */}
      <div className="flex-grow w-full lg:w-1/2 bg-white">
        <MainContent />
      </div>

      {/* Right Section (hidden on sm and smaller) */}
      <div className="hidden md:block lg:w-1/4 bg-gray-100">
        <Footer />
      </div>
    </div>
  );
}
