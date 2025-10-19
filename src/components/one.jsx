import React from "react";
import { Star } from "lucide-react";

export default function Header() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      {/* Header Bar */}
      <header className="text-blue-500 text-left p-4">
        <h1 className="text-3xl font-semibold">Jobs</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Client Section */}
        <div className="w-full bg-white shadow-md rounded-2xl p-2 transition-all">
          <div className="flex items-center gap-4 flex-wrap">
            <img
              src="/images/client.jpg"
              alt="Client"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">Client Name</h2>
              <p className="text-gray-600">Job: Website Development</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Job Description: Build a responsive freelance marketplace using React
            and Node.js.
          </p>
        </div>

        {/* Freelancer Section */}
        <div className="w-full bg-white shadow-md rounded-2xl p-2 transition-all">
          <div className="flex items-center gap-4 flex-wrap">
            <img
              src="/images/freelancer.jpg"
              alt="Freelancer"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">Freelancer Name</h2>
              <p className="text-gray-600">React Developer</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-700 font-medium">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < 4 ? "#facc15" : "none"}
                color="#facc15"
              />
            ))}
            <span className="text-gray-600 text-sm ml-1">(4.0)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
