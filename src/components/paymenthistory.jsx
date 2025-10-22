import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone } from "lucide-react";

export default function PaymentHistory() {
  const [transactions] = useState([
    {
      id: 1,
      type: "sent",
      name: "Freelancer Payment",
      method: "UPI",
      amount: 1200,
      date: "2025-10-18",
      status: "Success",
    },
    {
      id: 2,
      type: "received",
      name: "Project Payout",
      method: "Card",
      amount: 3400,
      date: "2025-10-19",
      status: "Success",
    },
    {
      id: 3,
      type: "sent",
      name: "Design Services",
      method: "UPI",
      amount: 900,
      date: "2025-10-20",
      status: "Pending",
    },
  ]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Milestones & History
      </h2>

      <div className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-md px-2 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  tx.type === "sent"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {tx.type === "sent" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownLeft size={18} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{tx.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {tx.method === "Card" ? (
                    <CreditCard size={14} />
                  ) : (
                    <Smartphone size={14} />
                  )}
                  <span>{tx.method}</span>
                  <span>•</span>
                  <span>{tx.date}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold ${
                  tx.type === "sent" ? "text-red-600" : "text-green-600"
                }`}
              >
                {tx.type === "sent" ? `-₹${tx.amount}` : `+₹${tx.amount}`}
              </p>
              <p
                className={`text-xs ${
                  tx.status === "Success"
                    ? "text-green-600"
                    : tx.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
