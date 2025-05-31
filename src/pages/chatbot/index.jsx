import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "../../components/ChatIcon/chatbotIcon";
import ChatForm from "../../components/ChatIcon/ChatForm";
import ChatMessage from "../../components/ChatIcon/ChatMessage";
import { companyInfo } from "./companyInfo";
import './index.css';

const ChatBot = ({ showChatbot, setShowChatbot }) => {
  const chatBodyRef = useRef();
  const apiUrl = process.env.REACT_APP_REACT_API_URL;
//   const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
 
  const generateBotResponse = async (history) => {
    console.log(history);
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError }
      ]);
    };
  
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };
    console.log("apiURL",apiUrl)
    try {
      const response = await fetch(apiUrl, requestOptions);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data?.candidates && data.candidates[0].content) {
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        updateHistory(apiResponseText);
      } else {
        updateHistory("No content returned from the API", true);
      }
    } catch (error) {
      updateHistory(error.message, true);
    }
  };
  
//   const generateBotResponse = async (history) => {
//     console.log(history)
//     // Helper function to update chat history
//     const updateHistory = (text, isError = false) => {
//       setChatHistory((prev) => [...prev.filter((msg) => msg.text != "Thinking..."), { role: "model", text, isError }]);
//     };

//     // Format chat history for API request
//     history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ contents: history }),
//     };

//     try {
//       // Make the API call to get the bot's response
//       const response = await fetch(process.env.REACT_APP_REACT_API_URL, requestOptions);
//       const data = await response.json();
//       if (!response.ok) throw new Error(data?.error.message || "Something went wrong!");

//       // Clean and update chat history with bot's response
//       const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//       updateHistory(apiResponseText);
//     } catch (error) {
//       // Update chat history with the error message
//       updateHistory(error.message, true);
//     }
//   };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there  <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;