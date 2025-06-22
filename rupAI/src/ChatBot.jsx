import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp, PiggyBank, CreditCard, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Based on your spending patterns, here are some insights...",
        "I'd be happy to help you with that! Let me analyze your financial data...",
        "That's a smart financial move! Here's what I recommend...",
        "I can see some interesting trends in your spending. Let me break it down for you..."
      ];
      
      const aiMessage = {
        type: 'ai',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const suggestedQuestions = [
    { icon: <TrendingUp className="w-4 h-4" />, text: "How much did I spend on food this month?" },
    { icon: <PiggyBank className="w-4 h-4" />, text: "Help me save money for festivals" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Show me my spending patterns" },
    { icon: <CreditCard className="w-4 h-4" />, text: "How do I make a payment?" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl border border-white/20 h-[700px] flex flex-col overflow-hidden backdrop-blur-sm">
      {/* Header with glassmorphism effect */}
      <div className="relative p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <div className="relative">
              <MessageCircle className="w-7 h-7 mr-3" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AI Financial Assistant
            </h3>
          </div>
          <p className="text-blue-100/90 text-sm font-medium">
            Your intelligent companion for financial insights and guidance
          </p>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-8 w-12 h-12 bg-purple-300/10 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
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
            
            <h4 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your Financial Assistant
            </h4>
            <p className="text-gray-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
              I'm here to help you master your finances with AI-powered insights and personalized recommendations.
            </p>
            
            <div className="space-y-3 max-w-sm mx-auto">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setChatInput(question.text)}
                  className="group w-full text-left p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md border border-white/40 transform hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
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

        {/* Chat Messages */}
        {chatMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                  : 'bg-gradient-to-br from-purple-500 to-indigo-600'
              }`}>
                {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              
              {/* Message Bubble */}
              <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-200 ${
                msg.type === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md'
                  : 'bg-white/80 text-gray-800 rounded-bl-md border border-white/40'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.message}</p>
                <p className={`text-xs mt-2 ${
                  msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/40 rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              placeholder="Ask me anything about your finances..."
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/90 transition-all duration-200 shadow-sm placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleChatSubmit}
            disabled={!chatInput.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thumb-blue-200::-webkit-scrollbar-thumb {
          background-color: rgb(191 219 254);
          border-radius: 2px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;