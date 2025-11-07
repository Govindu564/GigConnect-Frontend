import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const socket = io("http://localhost:3000");

function FreelancerDashboard() {
  const [gigs, setGigs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    coverLetter: "",
    experience: "",
    skillsOffered: "",
    portfolioLink: "",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGigs();
    fetchApplications();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gigs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGigs(res.data);
    } catch (err) {
      console.error("Error fetching gigs:", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/gigs/freelancer/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const applyToGig = async (gigId) => {
    if (
      !form.coverLetter.trim() ||
      !form.experience.trim() ||
      !form.skillsOffered.trim()
    ) {
      alert("⚠️ Please fill in all required fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:3000/api/gigs/${gigId}/apply`,
        {
          freelancerId: userId,
          coverLetter: form.coverLetter,
          experience: form.experience,
          skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
          portfolioLink: form.portfolioLink,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(" Application submitted successfully!");
      setShowForm(null);
      setForm({
        coverLetter: "",
        experience: "",
        skillsOffered: "",
        portfolioLink: "",
      });
      fetchApplications();
    } catch (err) {
      console.error("Error submitting application:", err);
      alert(" Failed to submit application. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 text-gray-900 p-8 grid grid-cols-12 gap-6">
        <aside className="col-span-2 bg-white shadow-md rounded-xl p-4 h-fit sticky top-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Filters</h3>
          <div className="space-y-3 text-sm">
            <input
              type="text"
              placeholder="Location (e.g. Remote)"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Budget Range (e.g. 1000-5000)"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Skill (React, Node...)"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium">
              Apply Filters
            </button>
          </div>
        </aside>

        <main className="col-span-8 space-y-10">
          <section>
            <h3 className="text-2xl text-center font-semibold mb-4">
              Available Gigs
            </h3>

            {gigs.length === 0 ? (
              <p className="text-gray-500 text-center">
                No gigs available yet.
              </p>
            ) : (
              <div className="grid gap-6">
                {gigs.map((gig) => (
                  <div
                    key={gig._id}
                    className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {gig.title}
                    </h3>
                    <p className="text-gray-600">{gig.description}</p>
                    <div className="flex gap-3 text-sm mt-2 text-gray-500">
                      <span> ₹{gig.budget}</span>
                      <span> {gig.location}</span>
                      <span> {gig.skills.join(", ")}</span>
                    </div>

                    {applications.some((app) => app.gigId?._id === gig._id) ? (
                      <p className="text-yellow-600 mt-2 font-medium">
                        Already Applied
                      </p>
                    ) : (
                      <button
                        onClick={() => setShowForm(gig._id)}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Apply
                      </button>
                    )}

                    {showForm === gig._id && (
                      <div className="mt-4 space-y-2">
                        <textarea
                          name="coverLetter"
                          placeholder="Why are you a good fit?"
                          onChange={handleChange}
                          value={form.coverLetter}
                          className="w-full border p-2 rounded-md"
                        />
                        <input
                          name="experience"
                          placeholder="Experience (e.g., 2 years in React)"
                          onChange={handleChange}
                          value={form.experience}
                          className="w-full border p-2 rounded-md"
                        />
                        <input
                          name="skillsOffered"
                          placeholder="Skills (comma-separated)"
                          onChange={handleChange}
                          value={form.skillsOffered}
                          className="w-full border p-2 rounded-md"
                        />
                        <input
                          name="portfolioLink"
                          placeholder="Portfolio or GitHub link (optional)"
                          onChange={handleChange}
                          value={form.portfolioLink}
                          className="w-full border p-2 rounded-md"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => applyToGig(gig._id)}
                            disabled={loading}
                            className={`${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white px-4 py-2 rounded-md`}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                          <button
                            onClick={() => setShowForm(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside className="col-span-2 bg-white shadow-md rounded-xl p-4 h-fit sticky top-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Updates</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li> New gigs are posted daily</li>
            <li> Tip: Add skills to your portfolio</li>
            <li> Check messages often</li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default FreelancerDashboard;
