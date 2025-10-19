import React, { useState } from "react";
import { FaPaperPlane, FaPaperclip, FaSmile } from "react-icons/fa";

export default function MainContent() {
  const [message, setMessage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
    }
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-6 w-full">
      {/* Chat Container */}
      <div className="w-full  bg-white shadow-md flex flex-col h-[100vh]">
        
        {/* Header Section */}
        <div className="flex bg-blue-500 items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/user1.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <h2 className="text-black font-semibold">Alex Johnson</h2>
              <p className="text-sm text-white">UI/UX Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <i className="fa-regular fa-bell"></i>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
          <div className="self-start bg-gray-200 px-3 py-2 rounded-xl max-w-[75%]">
            Hello! How are you?
          </div>
          <div className="self-end bg-blue-500 text-white px-3 py-2 rounded-xl max-w-[75%]">
            I'm good, thank you!
          </div>
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-3 rounded-xl  px-4 py-3 bg-gray-100">
          {/* File Upload Button */}
          <label className="cursor-pointer text-gray-500 hover:text-blue-500">
            <FaPaperclip size={18} />
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Emoji Button */}
          <button className="text-gray-500 hover:text-yellow-500">
            <FaSmile size={20} />
          </button>

          {/* Message Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

