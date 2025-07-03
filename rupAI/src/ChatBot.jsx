import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  MessageCircle,
  Send,
  Sparkles,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Bot,
  User,
  Users,
} from "lucide-react";

// --- API Configuration ---
// It's good practice to have a base URL for your API.
const API = axios.create({ baseURL: "http://localhost:5000/api" });

const ChatBot = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // --- Effect to scroll to the bottom of the chat on new messages ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // --- Effect to fetch users on initial component load ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/users");
        setUsers(data);
        if (data.length > 0) {
          setCurrentUserId(data[0]._id); // Set the first user as default
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // You could add an error message to the chat here
      }
    };
    fetchUsers();
  }, []);

  // --- Refactored function to handle sending messages to the backend ---
  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !currentUserId) return;

    const userMessage = {
      type: "user",
      message: messageText,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // ** BACKEND INTEGRATION **
      const { data } = await API.post("/chat", {
        message: messageText,
        userId: currentUserId,
      });

      const aiMessage = {
        type: "ai",
        message: data.reply,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: "ai",
        message: "Oops! Something went wrong on my end. Please try again.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      console.error("API Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  // --- Handler for the main input form submission ---
  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendMessage(chatInput);
    setChatInput("");
  };

  // --- Handler for clicking a suggested question ---
  const handleSuggestedQuestionClick = (questionText) => {
    // We don't need to set the input, just send the message directly
    sendMessage(questionText);
  };

  // --- Handler to switch user and clear the chat for a fresh start ---
  const handleUserChange = (e) => {
    setCurrentUserId(e.target.value);
    setChatMessages([]); // Clear chat history when switching users
  };

  const suggestedQuestions = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "How much did I spend on food this month?",
    },
    {
      icon: <PiggyBank className="w-4 h-4" />,
      text: "Meri फिजूलखर्ची kaise kam karun?",
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "Show me my spending patterns",
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      text: "Help me save for a new phone",
    },
  ];

  const currentUser = users.find((u) => u._id === currentUserId);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl border border-white/20 h-[700px] flex flex-col overflow-hidden backdrop-blur-sm">
      {/* Header with User Selector */}
      <div className="relative p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center mb-2">
              <div className="relative">
                <Bot className="w-7 h-7 mr-3" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                rupAI Assistant
              </h3>
            </div>
            <p className="text-blue-100/90 text-sm font-medium">
              Your AI partner for smarter financial decisions
            </p>
          </div>
          {/* ** DYNAMIC USER SWITCHER ** */}
          {users.length > 0 && (
            <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-200" />
              <select
                value={currentUserId}
                onChange={handleUserChange}
                className="bg-transparent text-white font-semibold outline-none border-none cursor-pointer"
              >
                {users.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                    className="text-black"
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-2 left-8 w-12 h-12 bg-purple-300/10 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {chatMessages.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Welcome, {currentUser?.name || "User"}!
            </h4>
            <p className="text-gray-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
              I'm ready to help you master your finances. Try one of the
              suggestions below to get started.
            </p>
            <div className="space-y-3 max-w-sm mx-auto">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestionClick(question.text)}
                  className="group w-full text-left p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md border border-white/40 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white group-hover:scale-110 transition-transform duration-200">
                      {question.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {question.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages rendering (code is the same, just included for completeness) */}
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            } animate-slide-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-purple-500 to-indigo-600"
                }`}
              >
                {msg.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-200 ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                    : "bg-white/80 text-gray-800 rounded-bl-md border border-white/40"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    msg.type === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/40 rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleChatSubmit}
        className="p-6 bg-white/50 backdrop-blur-sm border-t border-white/20"
      >
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything about your finances..."
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/90 transition-all duration-200 shadow-sm placeholder-gray-500"
            />
            {/* ... sparkes icon ... */}
          </div>
          <button
            type="submit"
            disabled={!chatInput.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Your style jsx tag (unchanged) */}
      <style jsx>{`...`}</style>
    </div>
  );
};

export default ChatBot;
