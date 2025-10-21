import React, { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const amount = "{amount}";
  const gateway = "Zaalima";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment Successful!\n₹${amount} has been processed via ${gateway}.`);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Securely pay ₹{amount.toLocaleString()} via {gateway}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="relative mt-1">
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
              maxLength={19}
              required
              className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, name: e.target.value })
            }
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
              maxLength={5}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
              maxLength={3}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Security Info */}
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md border border-blue-100 mt-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <p className="text-xs text-gray-600">
            Your payment information is encrypted and secure.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-2 mt-3 rounded-md text-white font-semibold transition ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
}
