import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const socket = io("http://localhost:3000");

function ChatPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", roomId);

    socket.on("chatHistory", (oldMessages) => {
      setMessages(oldMessages);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        roomId,
        sender: userId,
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "40px auto",
          border: "1px solid #ccc",
          color: "black",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#ddd",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          ⬅ Back
        </button>

        <h2>💬 Chat Room</h2>
        <p style={{ color: "gray" }}>Room ID: {roomId}</p>

        <div
          style={{
            height: "350px",
            overflowY: "auto",
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {messages.length === 0 ? (
            <p>No messages yet...</p>
          ) : (
            messages.map((msg, i) => (
              <p key={i}>
                <b>{msg.sender === userId ? "You" : "Partner"}:</b> {msg.text}
              </p>
            ))
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
