import React, { useState, useEffect } from "react";

const sampleMessages = [
  {
    id: 1,
    sender: "Dr. Smith",
    text: "Hello! Your test results are ready.",
    time: "2025-06-01T09:30:00Z",
  },
  {
    id: 2,
    sender: "Patient John",
    text: "Thanks! When can I discuss them?",
    time: "2025-06-01T09:45:00Z",
  },
  {
    id: 3,
    sender: "Dr. Smith",
    text: "How about tomorrow at 3 PM?",
    time: "2025-06-01T09:50:00Z",
  },
];

function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Simulate fetch from API
    setMessages(sampleMessages);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const nextMessage = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, nextMessage]);
    setNewMessage("");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>

      <div className="mb-4 max-h-96 overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}
        {messages.map(({ id, sender, text, time }) => (
          <div key={id} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{sender}</span>
              <span className="text-xs text-gray-400">
                {new Date(time).toLocaleString()}
              </span>
            </div>
            <p className="bg-blue-100 rounded px-3 py-2 inline-block max-w-full break-words">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessagesTab;
