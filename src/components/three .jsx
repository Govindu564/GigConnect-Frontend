import React from "react";
import { useNavigate } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();

  return (
    <aside className="bg-white min-h-screen shadow-md p-6 flex flex-col items-center w-full">
      {/* Profile Picture */}
      <img
        src="/images/profile.jpg"
        alt="User"
        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
      />

      {/* User Info */}
      <h2 className="text-xl font-semibold mt-4">Alex Johnson</h2>
      <p className="text-gray-600 text-sm">UI/UX Designer</p>
          <div
      className="flex items-center gap-1 mt-3 cursor-pointer"
                  onClick={() => navigate("/reviews")}>

            <p className="text-gray-500">
              ⭐ 4.5 (24 reviews)
            </p>
      </div>
      {/* Description */}
      <div className="w-full mt-6">
        <h3 className="text-left text-gray-200 font-semibold mb-2">Description</h3>
        <p className="text-gray-700 text-sm leading-relaxed text-justify">
          Passionate about crafting engaging user experiences and clean UI
          interfaces. Available for freelance design and front-end projects.
        </p>
      </div>

      {/* Contact / Action Buttons */}
      <div className="mt-6 flex flex-col gap-3 w-full">
        <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => navigate("/pform")}>
          Pay
        </button>

      </div>

      {/* Files Section */}
      <div className="w-full mt-6">
        <h3 className="text-left text-gray-700 font-semibold mb-2">Files</h3>
        <div className="bg-gray-100 rounded-lg p-3 text-gray-600 text-sm">
          No files uploaded yet.
        </div>
      </div>
    </aside>
  );
}
