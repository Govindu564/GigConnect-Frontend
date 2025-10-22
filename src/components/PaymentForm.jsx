import React, { useState } from "react";
import { CreditCard, Lock, Smartphone } from "lucide-react";

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "upi"
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState(""); // ✅ user-typed amount
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  const gateway = "{acc.holder name}";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount before proceeding.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(
        ` Payment Successful!\n₹${amount} has been send to ${gateway} using ${
          paymentMethod === "card" ? "Card" : "UPI"
        }.`
      );
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Payment Options</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Securely send your payment to {gateway}
      </p>

      {/* Amount Input */}
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Amount (₹)
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Payment Method Selector */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`px-4 py-2 rounded-l-md border text-sm font-medium ${
            paymentMethod === "card"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Card Payment
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("upi")}
          className={`px-4 py-2 rounded-r-md border text-sm font-medium ${
            paymentMethod === "upi"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          UPI Payment
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === "card" ? (
          <>
            {/* Card Number */}
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700"
              >
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
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
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
          </>
        ) : (
          <>
{/* UPI Payment */}
        <div>
          <label
            htmlFor="upiId"
            className="block text-sm font-medium text-gray-700"
          >
            UPI ID
          </label>
          <div className="relative mt-1">
            <input
              id="upiId"
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setIsUpiVerified(false); // Reset verification when typing
              }}
              required
              className={`w-full border rounded-md p-2 pl-10 pr-20 focus:ring-2 focus:outline-none ${
                isUpiVerified
                  ? "border-green-500 focus:ring-green-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            {/* Verify Button inside input box */}
            <button
              type="button"
              onClick={() => {
                if (upiId.trim() !== "") {
                  // Simulate verification
                  setTimeout(() => setIsUpiVerified(true), 800);
                } else {
                  alert("Enter a valid UPI ID before verifying.");
                }
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium px-3 py-1 rounded ${
                isUpiVerified
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isUpiVerified ? "Verified" : "Verify"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Supported: Google Pay, PhonePe, Paytm, BHIM UPI
          </p>
        </div>


            {/* QR Code Simulation */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="w-32 h-32 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-md">
                <p className="text-xs text-gray-500 text-center px-2">
                  (QR Code Preview)
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Scan this QR or pay using your UPI app
              </p>
            </div>
          </>
        )}

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
          disabled={isProcessing || !amount}
          className={`w-full py-2 mt-3 rounded-md text-white font-semibold transition ${
            isProcessing || !amount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing
            ? "Processing..."
            : amount
            ? `Pay ₹${parseFloat(amount).toLocaleString()}`
            : "Enter Amount"}
        </button>
      </form>
    </div>
  );
}
