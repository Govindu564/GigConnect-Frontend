// src/pages/MyGigs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const navigate = useNavigate();

  const clientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gigs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGigs(res.data.filter((g) => g.clientId === clientId));
    } catch (err) {
      console.error("Error fetching gigs:", err);
    }
  };

  const fetchApplicants = async (gigId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/gigs/${gigId}/applicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants((prev) => ({ ...prev, [gigId]: res.data }));
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const acceptFreelancer = async (gigId, freelancerId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/gigs/${gigId}/accept`,
        { freelancerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Freelancer accepted!");
      fetchApplicants(gigId);
    } catch (err) {
      console.error("Error accepting freelancer:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
        <h2 className="text-3xl font-semibold mb-8 text-blue-700 text-center">
          Your Posted Gigs
        </h2>

        {gigs.length === 0 ? (
          <p className="text-gray-500 text-center">No gigs posted yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {gig.title}
                  </h4>
                  {/* <p className="text-gray-600 line-clamp-3">
                    {gig.description}
                  </p> */}

                  <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <strong>Budget:</strong> <span>₹{gig.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Location:</strong> <span>{gig.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Skills:</strong>{" "}
                      <span className="truncate">{gig.skills.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/client/gigs/${gig._id}/applicants`)}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  View Applicants
                </button>

                {applicants[gig._id] && (
                  <div className="mt-5 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      👷 Applicants
                    </h5>
                    {applicants[gig._id].length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No applicants yet.
                      </p>
                    ) : (
                      applicants[gig._id].map((app) => (
                        <div
                          key={app._id}
                          className="bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition"
                        >
                          <p>
                            <b>Name:</b> {app.freelancerId?.username}
                          </p>
                          <p>
                            <b>Email:</b> {app.freelancerId?.email}
                          </p>

                          {app.coverLetter && (
                            <p className="mt-2 text-sm text-gray-700">
                              <b>💬 Cover Letter:</b> {app.coverLetter}
                            </p>
                          )}
                          {app.experience && (
                            <p className="text-sm text-gray-700">
                              <b>🧾 Experience:</b> {app.experience}
                            </p>
                          )}
                          {app.skillsOffered?.length > 0 && (
                            <p className="text-sm text-gray-700">
                              <b>🛠 Skills:</b> {app.skillsOffered.join(", ")}
                            </p>
                          )}
                          {app.portfolioLink && (
                            <p className="text-sm mt-1">
                              <b>🌐 Portfolio:</b>{" "}
                              <a
                                href={app.portfolioLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                View Portfolio
                              </a>
                            </p>
                          )}

                          <p className="mt-2 text-sm">
                            <b>Status:</b>{" "}
                            <span
                              className={`${
                                app.status === "accepted"
                                  ? "text-green-600"
                                  : app.status === "rejected"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              } font-semibold`}
                            >
                              {app.status}
                            </span>
                          </p>

                          {app.status === "pending" && (
                            <button
                              onClick={() =>
                                acceptFreelancer(gig._id, app.freelancerId._id)
                              }
                              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Accept Freelancer
                            </button>
                          )}

                          {app.status === "accepted" && (
                            <button
                              onClick={() => navigate(`/chat/${app.roomId}`)}
                              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Chat
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyGigs;
