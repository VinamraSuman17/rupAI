import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Send, TrendingUp, TrendingDown, Target, AlertCircle, Lightbulb, MessageCircle, Home, BarChart3, IndianRupee, Wallet } from 'lucide-react';
import Payment from './Payment';
import Analytics from './Analytics';
import ChatBot from './ChatBot';
import Dashboard from './Dashboard';

const rupAI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [userName] = useState('Rahul Sharma');

  // Mock user data
  const [userData, setUserData] = useState({
    balance: 125000,
    monthlyIncome: 85000,
    savingsGoal: 25000,
    currentSavings: 18500,
    expenses: [
      { month: 'Jan', amount: 62000, category: 'Mixed' },
      { month: 'Feb', amount: 58000, category: 'Mixed' },
      { month: 'Mar', amount: 67000, category: 'Mixed' },
      { month: 'Apr', amount: 61000, category: 'Mixed' },
      { month: 'May', amount: 69000, category: 'Mixed' },
      { month: 'Jun', amount: 64000, category: 'Mixed' }
    ],
    categorySpending: [
      { name: 'Food & Dining', value: 18500, color: '#FF6B6B' },
      { name: 'Transportation', value: 8200, color: '#4ECDC4' },
      { name: 'Entertainment', value: 12800, color: '#45B7D1' },
      { name: 'Shopping', value: 15600, color: '#FFA07A' },
      { name: 'Bills & Utilities', value: 8900, color: '#98D8C8' }
    ],
    recentTransactions: [
      { id: 1, type: 'Food', amount: -450, vendor: 'Zomato', time: '2 hours ago', location: 'Mumbai' },
      { id: 2, type: 'Transport', amount: -180, vendor: 'Uber', time: '5 hours ago', location: 'Mumbai' },
      { id: 3, type: 'Shopping', amount: -2300, vendor: 'Amazon', time: '1 day ago', location: 'Online' },
      { id: 4, type: 'Food', amount: -180, vendor: 'Local Vendor', time: '1 day ago', location: 'Bandra' },
      { id: 5, type: 'Bills', amount: -1200, vendor: 'Electricity Bill', time: '2 days ago', location: 'Mumbai' }
    ]
  });

  const [aiInsights] = useState([
    {
      type: 'warning',
      title: 'High Food Spending Alert',
      message: 'You\'ve spent ₹8,200 on food this month. Consider cooking at home 2 more days/week to save ₹2,400.',
      priority: 'high'
    },
    {
      type: 'tip',
      title: 'Festival Savings Opportunity',
      message: 'Ganesh Chaturthi is in 2 months. Start saving ₹500/week to avoid financial stress during celebrations.',
      priority: 'medium'
    },
    {
      type: 'opportunity',
      title: 'UPI Cashback Optimization',
      message: 'Switch to PhonePe for grocery purchases. You can earn ₹150 extra cashback this month.',
      priority: 'low'
    },
    {
      type: 'goal',
      title: 'Savings Goal Progress',
      message: 'Great job! You\'re 74% towards your monthly savings goal. Just ₹6,500 more to go!',
      priority: 'medium'
    }
  ]);

  const processAIQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    let response = '';

    if (lowerQuery.includes('spending') || lowerQuery.includes('expense')) {
      response = `Based on your spending pattern, you've spent ₹64,000 this month. The top categories are:
      
🍽️ Food & Dining: ₹18,500 (29% of expenses)
🛒 Shopping: ₹15,600 (24% of expenses)
🎬 Entertainment: ₹12,800 (20% of expenses)

💡 AI Suggestion: You're spending 29% on food. The ideal range for Indians is 15-20%. Try cooking at home 3 more times this week to save ₹1,800!`;
    } else if (lowerQuery.includes('save') || lowerQuery.includes('goal')) {
      response = `Your savings goal analysis:
      
🎯 Monthly Goal: ₹25,000
💰 Current Progress: ₹18,500 (74% achieved)
📊 Remaining: ₹6,500

🚀 Quick wins to reach your goal:
• Skip 2 restaurant meals: Save ₹1,200
• Use local transport instead of Uber: Save ₹800
• Cancel unused Netflix subscription: Save ₹649
• Buy groceries from local market: Save ₹1,000

You're doing great! Just 5 more days of smart spending! 🌟`;
    } else if (lowerQuery.includes('transport') || lowerQuery.includes('travel')) {
      response = `Transport spending analysis:
      
🚗 This month: ₹8,200
📈 Last month: ₹7,600 (+₹600)

🔍 Pattern detected: You're taking more Uber rides during weekends.

💡 Smart alternatives:
• Weekend local train: Save ₹180 per trip
• Share auto with colleagues: Save ₹120 per trip
• Buy monthly bus pass: Save ₹1,200 overall

🎯 Potential monthly savings: ₹2,400`;
    } else if (lowerQuery.includes('food') || lowerQuery.includes('dining')) {
      response = `Food spending insights:
      
🍽️ Monthly food expense: ₹18,500
📊 Breakdown:
• Restaurants: ₹12,800 (69%)
• Groceries: ₹4,200 (23%)
• Street food: ₹1,500 (8%)

⚠️ Alert: You're ordering online 4.2 times per week!

🥘 Money-saving tips for Indians:
• Cook dal-chawal combo: Save ₹150 per meal
• Buy vegetables from local market: Save ₹800/month
• Prepare tiffin for office: Save ₹3,600/month
• Weekend meal prep: Save time & ₹1,200

💰 Total potential savings: ₹5,400/month`;
    } else if (lowerQuery.includes('festival') || lowerQuery.includes('celebration')) {
      response = `Festival planning assistant:
      
🎉 Upcoming festivals:
• Ganesh Chaturthi (Aug 31): ₹8,000 estimated
• Navratri (Oct 15-24): ₹12,000 estimated
• Diwali (Nov 12): ₹25,000 estimated

💡 Smart festival budgeting:
• Start saving ₹1,500/month from now
• Buy decorations during off-season sales
• Plan group celebrations to split costs
• Use festival-specific cashback offers

🏆 Pro tip: Create separate festival fund to avoid touching emergency savings!`;
    } else if (lowerQuery.includes('cashback') || lowerQuery.includes('offer')) {
      response = `Cashback optimization for you:
      
💳 Current earning: ₹340 cashback this month
🎯 Potential earning: ₹890 with optimization

🔥 Best offers for your spending:
• Groceries: Use Paytm (5% cashback)
• Petrol: Use SBI credit card (₹100 cashback)
• Online shopping: Use Amazon Pay (10% on fashion)
• Bill payments: Use PhonePe (₹50 cashback)

⚡ Quick action: Switch your grocery payments to Paytm this week for instant ₹200 extra cashback!`;
    } else if (lowerQuery.includes('payment') || lowerQuery.includes('pay')) {
      response = `You can make payments through the Payments tab! Enter the amount you wish to pay, use the PIN 1234, and proceed. Your balance is ₹${userData.balance.toLocaleString()}.`;
    } else {
      response = `Hi ${userName}! 👋 

I'm your AI financial assistant. I can help you with:

💰 Spending analysis & budgeting
🎯 Savings goal tracking  
🎉 Festival budget planning
🚗 Transport cost optimization
🍽️ Food expense management
💳 Cashback maximization
📊 Expense categorization
🏆 Personalized money-saving tips
💸 Making payments

What would you like to know about your finances today?`;
    }

    return response;
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', message: chatInput, timestamp: new Date() };
    const aiResponse = { type: 'ai', message: processAIQuery(chatInput), timestamp: new Date() };

    setChatMessages(prev => [...prev, userMessage, aiResponse]);
    setChatInput('');
  };

  const getInsightIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'tip': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'goal': return <Target className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"><IndianRupee /></span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">rupAI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Balance: ₹{userData.balance.toLocaleString()}</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
              { id: 'payments', label: 'Payments', icon: Wallet }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'chat' && <ChatBot />}
        {activeTab === 'payments' && <Payment userData={userData} updateUserData={setUserData} />}
      </main>
    </div>
  );
};

export default rupAI;