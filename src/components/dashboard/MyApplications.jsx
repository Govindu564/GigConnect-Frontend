import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const freelancerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/applications/freelancer/${freelancerId}`
        );
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    if (freelancerId) fetchApplications();
  }, [freelancerId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-10">
          My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t applied for any gigs yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {app.gigId?.title || "Untitled Gig"}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Client Email:</strong>{" "}
                  {app.clientId?.email || "Not available"}
                </p>

                <div className="text-sm text-gray-700 space-y-1 mb-1">
                  <p>
                    <strong>Location:</strong> {app.gigId?.location || "N/A"}
                  </p>
                  <p>
                    <strong>Required Skills:</strong>{" "}
                    {Array.isArray(app.gigId?.skills)
                      ? app.gigId.skills.join(", ")
                      : app.gigId?.skills || "N/A"}
                  </p>
                </div>

                <p className="mt-1 text-sm text-gray-700">
                  <strong>Status: </strong>
                  <span
                    className={`${
                      app.status === "in_touch"
                        ? "text-blue-600"
                        : app.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    } font-semibold`}
                  >
                    {app.status}
                  </span>
                </p>

                {app.status === "in_touch" && (
                  <button
                    onClick={() => {
                      if (app.roomId) navigate(`/chat/${app.roomId}`);
                      else alert("Chat not yet created by client.");
                    }}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Chat with Client
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyApplications;
