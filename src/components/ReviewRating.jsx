// src/pages/ReviewPage.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");

  const reviews = [
    {
      id: 1,
      name: "Simran",
      photo: "/images/simran.jpg",
      rating: 4,
      review: "Excellent work! Very professional and on time.",
      date: "Oct 18, 2025 - 4:30 PM",
    },
    {
      id: 2,
      name: "Aakash",
      photo: "/images/aakash.jpg",
      rating: 5,
      review: "Amazing experience, would definitely recommend!",
      date: "Oct 17, 2025 - 6:00 PM",
    },
  ];

  const handleSubmit = () => {
    if (!rating || !review) {
      alert("Please provide both rating and review");
      return;
    }
    console.log("Submitted review:", { rating, review });
    setRating(0);
    setReview("");
  };

  const handleCancel = () => {
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl mb-8">

        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="/images/user-profile.jpg"
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">Mohamed Hafeez</h2>
            <p className="text-gray-500">
              ⭐ 4.5 (24 reviews)
            </p>
          </div>
        </div>

        {/* Review & rating */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Leave a Rating & Review</h3>
          <div className="flex space-x-1 mb-3">
            {[...Array(5)].map((_, i) => {
              const currentRating = i + 1;
              return (
                <FaStar
                  key={i}
                  className={`cursor-pointer text-2xl ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <div className="flex justify-end mt-3 space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* show all review */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">All Reviews</h3>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-200 pb-3 last:border-none"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={r.photo}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{r.name}</h4>
                    <span className="text-sm text-gray-400">{r.date}</span>
                  </div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < r.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
}
