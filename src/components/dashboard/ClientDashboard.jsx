import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const socket = io("http://localhost:3000");

function ClientDashboard() {
  const [gigs, setGigs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
    skills: "",
  });
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const clientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    socket.on("chatHistory", (oldMessages) => setMessages(oldMessages));
    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));
    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, []);

  const fetchGigs = async () => {
    const res = await axios.get("http://localhost:3000/api/gigs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGigs(res.data.filter((g) => g.clientId === clientId));
  };

  const fetchApplicants = async (gigId) => {
    const res = await axios.get(
      `http://localhost:3000/api/gigs/${gigId}/applicants`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setApplicants((prev) => ({ ...prev, [gigId]: res.data }));
  };

  const acceptFreelancer = async (gigId, freelancerId) => {
    const res = await axios.post(
      `http://localhost:3000/api/gigs/${gigId}/accept`,
      { freelancerId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(`✅ Freelancer accepted! Room ID: ${res.data.roomId}`);
    fetchApplicants(gigId);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/api/gigs",
      {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        clientId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("✅ Gig posted successfully!");
    setFormData({
      title: "",
      description: "",
      budget: "",
      location: "",
      skills: "",
    });
    fetchGigs();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 text-gray-900 p-8 grid grid-cols-12 gap-6">
        <aside className="col-span-2 bg-white shadow-md rounded-xl p-4 h-fit sticky top-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📁 Menu</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">🏠 Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">
              📝 Post a Gig
            </li>
            <li className="hover:text-blue-600 cursor-pointer">📋 Your Gigs</li>
            <li className="hover:text-blue-600 cursor-pointer">💬 Messages</li>
            <li className="hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
          </ul>
        </aside>

        <main className="col-span-8 space-y-10">
          <section className="bg-white shadow-md rounded-xl p-6 mb-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Post a New Gig
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Gig Title"
                className="border p-2 rounded-md"
                required
              />
              <input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget (₹)"
                className="border p-2 rounded-md"
                required
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="border p-2 rounded-md"
                required
              />
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (comma-separated)"
                className="border p-2 rounded-md"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Gig Description"
                className="border p-2 rounded-md md:col-span-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 md:col-span-2"
              >
                Post Gig
              </button>
            </form>
          </section>
        </main>

        <aside className="col-span-2 bg-white shadow-md rounded-xl p-4 h-fit sticky top-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li> Total Gigs Posted: {gigs.length}</li>
            <li>
              Applicants Received:
              {Object.values(applicants).reduce(
                (acc, arr) => acc + arr.length,
                0
              )}
            </li>
            <li>
              Active Chats:
              {
                Object.values(applicants)
                  .flat()
                  .filter((a) => a.status === "accepted").length
              }
            </li>
          </ul>
          <hr className="my-3" />
          <p className="text-gray-500 text-sm">
            Tip: Post clear job descriptions and specify required skills to
            attract the right freelancers.
          </p>
        </aside>
      </div>
    </>
  );
}

export default ClientDashboard;
