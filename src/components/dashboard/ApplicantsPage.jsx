// src/pages/ApplicantsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function ApplicantsPage() {
  const { gigId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [gigTitle, setGigTitle] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/gigs/${gigId}/applicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants(res.data);

      const gigRes = await axios.get(
        `http://localhost:3000/api/gigs/${gigId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGigTitle(gigRes.data.title);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const makeInTouch = async (freelancerId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/gigs/${gigId}/in_touch`,
        { freelancerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("🤝 Moved to In Touch!");
      fetchApplicants();
    } catch (err) {
      console.error("Error marking in_touch:", err);
    }
  };

  const rejectFreelancer = async (freelancerId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/applications/status`,
        { gigId, freelancerId, status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("❌ Freelancer rejected!");
      fetchApplicants();
    } catch (err) {
      console.error("Error rejecting freelancer:", err);
    }
  };

  const goToChat = async (app) => {
    try {
      if (!app.roomId) {
        const res = await axios.put(
          `http://localhost:3000/api/gigs/${app.gigId}/in_touch`,
          { freelancerId: app.freelancerId._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedApp = res.data.application;
        navigate(`/chat/${updatedApp.roomId}`);
      } else {
        navigate(`/chat/${app.roomId}`);
      }
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
          Applicants <span className="text-gray-800">{gigTitle}</span>
        </h2>

        {applicants.length === 0 ? (
          <p className="text-gray-500 text-center">No applicants yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {app.freelancerId?.username}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {app.freelancerId?.email}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <b>Experience:</b> {app.experience || "N/A"}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <b>Skills:</b>{" "}
                  {app.skillsOffered?.length > 0
                    ? app.skillsOffered.join(", ")
                    : "Not mentioned"}
                </p>
                {app.portfolioLink && (
                  <a
                    href={app.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Portfolio
                  </a>
                )}

                <p className="mt-1 text-sm">
                  <b>Status:</b>{" "}
                  <span
                    className={`${
                      app.status === "in_touch"
                        ? "text-blue-600"
                        : app.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    } font-semibold`}
                  >
                    {app.status === "in_touch"
                      ? "In Touch"
                      : app.status === "rejected"
                      ? "Rejected"
                      : "Applied"}
                  </span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {app.status === "applied" && (
                    <>
                      <button
                        onClick={() => makeInTouch(app.freelancerId._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm"
                      >
                        In Touch
                      </button>
                      <button
                        onClick={() => rejectFreelancer(app.freelancerId._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {app.status === "in_touch" && (
                    <button
                      onClick={() => goToChat(app)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Chat with Freelancer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ApplicantsPage;
