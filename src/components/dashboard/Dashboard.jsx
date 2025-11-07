import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");

    if (!token) {
      alert("You must be logged in to access the dashboard.");
      navigate("/auth");
    } else {
      setUsername(savedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    navigate("/auth");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1
              style={{
                fontSize: "70px",
                margin: "-80px",
                marginBottom: "50px",
                color: "red",
              }}
            >
              Link2List
            </h1>
            <h1 style={{ fontSize: "35px" }}>Welcome, {username || "Guest"}</h1>
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => navigate("/upload-video")}>
                Upload Your Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
