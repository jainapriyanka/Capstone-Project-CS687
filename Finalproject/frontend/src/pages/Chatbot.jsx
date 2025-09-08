import React, { useState, useEffect } from "react";
import "./Chatbot.css"; 
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // initialize chat with welcome message from the bot
  useEffect(() => {
    setMessages([{ sender: "BotCompleted", text: "Hi! How can I assist you today?" }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "User", text: input };
    const botMessage = { sender: "Bot", text: "Thinking..." };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: input }),
        }
      );

      const data = await response.json().catch(() => ({})); // safely parse JSON

      if (!response.ok) {
        throw new Error(data.msg || `HTTP error! status: ${response.status}`);
      }

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.sender !== "Bot");
        return [...filtered, { sender: "BotCompleted", text: data.response || "No reply" }];
      });
    } catch (error) {
      console.error("Error fetching chatbot response:", error.message);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.sender !== "Bot"),
        { sender: "BotCompleted", text: `Error: ${error.message}` },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="activity-container">
      <Sidebar />
      <div className="activity-main">
        <Navbar />
        <div className="chatbot-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "User" ? "user-message" : "bot-message"}>
                <strong>{msg.sender === "User" ? "User" : "Bot"}: </strong>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              {isLoading ? "Waiting..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
