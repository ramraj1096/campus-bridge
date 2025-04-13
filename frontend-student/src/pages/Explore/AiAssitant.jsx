import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, SendHorizontal, Loader } from "lucide-react";

export const AiAssitant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your Campus Bridge Assistant. Ask me anything about courses, resumes, assignments, or tech!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/ask-ai", {
        message: input,
      });

      const botText =
        response.data?.reply || "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Oops! Something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 rounded-xl shadow-2xl border border-gray-200 bg-white flex flex-col h-[650px] overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-5 font-semibold text-lg flex items-center gap-2 shadow-md">
        <Bot className="w-6 h-6" />
        Campus Bridge AI Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[70%] px-4 py-2 text-sm rounded-xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500 italic flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            Thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex gap-3 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm focus:ring-2 ring-blue-400 outline-none transition"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
        >
          {loading ? (
            <Loader className="animate-spin w-5 h-5" />
          ) : (
            <SendHorizontal />
          )}
        </button>
      </div>
    </div>
  );
};
