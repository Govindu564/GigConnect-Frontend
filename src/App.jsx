import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientFreelancerChat from "./components/Chat";
import ReviewRating from "./components/ReviewRating";
import PaymentForm  from "./components/PaymentForm";
import PaymentHistory from "./components/paymenthistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientFreelancerChat />} />
        <Route path="/reviews" element={<ReviewRating />} />
        <Route path="/pform" element={<PaymentForm />} />
        <Route path="/phistory" element={<PaymentHistory />} />

      </Routes>
    </Router>
  );
}

export default App;
