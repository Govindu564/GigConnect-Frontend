import React, { useState } from 'react';

// Mock data for demonstration
const mockChatMessages = [
  { id: 1, text: "Hi! I saw your proposal for the UI/UX design project. It looks great.", sender: 'client' },
  { id: 2, text: "Thanks! I'm ready to start as soon as we finalize the scope. Do you have the wireframes ready?", sender: 'freelancer' },
  { id: 3, text: "Yes, I just uploaded them to the shared drive. Let me know if you have any questions.", sender: 'client' },
  { id: 4, text: "Got it. I'll review them now and get back to you with an estimated timeline.", sender: 'freelancer' },
];

const mockFreelancerProfile = {
  name: 'Alex Johnson',
  title: 'Senior UI/UX Designer',
  rating: 4.8,
  hourlyRate: '$50/hr',
  projectBudget: '$1,500',
  avatar: 'https://i.pravatar.cc/150?img=68' // Placeholder avatar
};

const mockJobList = [
  { id: 101, title: 'E-commerce Website Redesign', status: 'Active' },
  { id: 102, title: 'Mobile App Wireframing', status: 'Pending' },
  { id: 103, title: 'Logo and Branding Package', status: 'Completed' },
];


const ClientFreelancerChat = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'client' // Assuming the user viewing is the client
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const isClientSender = (sender) => sender === 'client';

  return (
    <div className="flex h-screen bg-gray-50 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">

        {/* 1. Left Sidebar - Job/Freelancer List */}
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r border-gray-200">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="text-xl font-bold text-indigo-600">Workspaces</div>
          </div>
          <div className="flex flex-col mt-8 overflow-y-auto">
            <p className="text-xs text-gray-500 uppercase mb-2 font-semibold">Active Projects</p>
            {mockJobList.map(job => (
              <button
                key={job.id}
                className="flex flex-row items-center hover:bg-indigo-50 rounded-xl p-2 transition duration-300 ease-in-out"
              >
                <div className="ml-2 flex flex-col text-left">
                  <span className="font-semibold text-sm">{job.title}</span>
                  <span className={`text-xs ${job.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {job.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Middle - Chat Window */}
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4 shadow-lg">
            
            {/* Chat Messages Area */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2 overflow-y-auto pr-3">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`col-span-12 ${isClientSender(msg.sender) ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-row items-end ${isClientSender(msg.sender) ? 'justify-end' : ''}`}>
                        <div 
                          className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 ${isClientSender(msg.sender) ? 'items-end' : 'items-start'}`}
                        >
                          <div>
                            <span 
                              className={`px-4 py-2 rounded-lg inline-block ${isClientSender(msg.sender) ? 'rounded-br-none bg-indigo-600 text-white' : 'rounded-bl-none bg-gray-200 text-gray-600'}`}
                            >
                              {msg.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input Area */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-gray-100 w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white px-4 py-1 flex-shrink-0 transition duration-300"
                  onClick={handleSendMessage}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Right Sidebar - Freelancer Profile/Details & Pay Button */}
        <div className="flex flex-col py-8 pr-6 pl-2 w-80 bg-white flex-shrink-0 border-l border-gray-200">
          <div className="flex flex-col items-center border-b border-gray-200 pb-6">
            <img 
              src={mockFreelancerProfile.avatar} 
              alt="Freelancer Avatar" 
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-indigo-100"
            />
            <h2 className="text-xl font-bold">{mockFreelancerProfile.name}</h2>
            <p className="text-sm text-gray-500">{mockFreelancerProfile.title}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">
                ⭐
              </span>
              <span className="ml-1 text-sm font-semibold">{mockFreelancerProfile.rating}</span>
            </div>
          </div>

          <div className="flex flex-col mt-6 border-b border-gray-200 pb-6">
            <h3 className="text-md font-bold mb-3">Project Details</h3>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Hourly Rate:</span>
                <span className="font-semibold">{mockFreelancerProfile.hourlyRate}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Agreed Budget:</span>
                <span className="font-semibold text-green-600">{mockFreelancerProfile.projectBudget}</span>
            </div>
          </div>

          {/* Pay Button */}
          <div className="mt-8">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01]">
              💰 Release Payment ($1,500)
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">Funds are held securely in escrow until released.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFreelancerChat;