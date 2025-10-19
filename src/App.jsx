import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientFreelancerChat from "./components/Chat";
import ReviewRating from "./components/ReviewRating";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientFreelancerChat />} />
        <Route path="/reviews" element={<ReviewRating />} />
      </Routes>
    </Router>
  );
}

export default App;
