import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  TrendingDown, 
  TrendingUp, 
  IndianRupee, 
  Sparkles, 
  Target, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Zap,
  Gift,
  ShoppingBag,
  Coffee,
  Car,
  Home
} from 'lucide-react';

const Dashboard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);

  // Mock data
  const userName = "Vinamra";
  const userData = {
    balance: 125000,
    currentSavings: 15000,
    savingsGoal: 25000,
    recentTransactions: [
      { id: 1, vendor: "Swiggy", type: "Food", location: "Online", amount: -450, time: "2 hours ago", icon: <Coffee className="w-5 h-5" /> },
      { id: 2, vendor: "Uber", type: "Transport", location: "Agra", amount: -280, time: "5 hours ago", icon: <Car className="w-5 h-5" /> },
      { id: 3, vendor: "Amazon", type: "Shopping", location: "Online", amount: -1200, time: "1 day ago", icon: <ShoppingBag className="w-5 h-5" /> },
      { id: 4, vendor: "Rent Payment", type: "Housing", location: "Bank Transfer", amount: -12000, time: "2 days ago", icon: <Home className="w-5 h-5" /> }
    ]
  };

  const aiInsights = [
    {
      type: "savings",
      title: "Great Progress on Savings!",
      message: "You're 60% towards your monthly goal. Keep it up!",
      icon: <Target className="w-5 h-5 text-green-500" />
    },
    {
      type: "spending",
      title: "Food Expenses Alert",
      message: "Your food spending increased by 15% this week. Consider home cooking.",
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />
    },
    {
      type: "cashback",
      title: "Maximize Your Rewards",
      message: "Use your credit card for groceries to earn 5% cashback this month.",
      icon: <Gift className="w-5 h-5 text-purple-500" />
    }
  ];

  // Animate numbers on mount
  useEffect(() => {
    const animateValue = (start, end, setter, duration = 2000) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        setter(current);
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    };

    animateValue(0, userData.balance, setAnimatedBalance);
    animateValue(0, userData.currentSavings, setAnimatedSavings, 1500);
  }, [userData.balance, userData.currentSavings]);

  const getTransactionColor = (amount) => {
    return amount > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getTransactionIcon = (amount) => {
    return amount > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Welcome Header with Balance */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-300/10 rounded-full translate-y-20 -translate-x-20 animate-bounce"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
              <p className="text-blue-100 text-lg">Here's your financial overview for today</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Balance Section */}
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-100 text-lg">Current Balance</p>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isBalanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-4xl font-bold mb-2">
                {isBalanceVisible ? `₹${animatedBalance.toLocaleString()}` : '₹••••••'}
              </p>
              <div className="flex items-center space-x-2 text-green-200">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">+2.3% from last month</span>
              </div>
            </div>

            {/* Savings Goal Section */}
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <p className="text-blue-100 text-lg mb-2">Monthly Savings Goal</p>
              <p className="text-2xl font-bold mb-4">
                ₹{animatedSavings.toLocaleString()} / ₹{userData.savingsGoal.toLocaleString()}
              </p>
              <div className="relative">
                <div className="w-full bg-blue-400/30 rounded-full h-3 backdrop-blur-sm">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${(userData.currentSavings / userData.savingsGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-blue-100 mt-2">
                  <span>60% Complete</span>
                  <span>₹{(userData.savingsGoal - userData.currentSavings).toLocaleString()} to go</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in" style={{animationDelay: '0.6s'}}>
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mr-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">AI Insights & Recommendations</h3>
            <p className="text-gray-600">Personalized tips to optimize your finances</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiInsights.map((insight, index) => (
            <div 
              key={index} 
              className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{animationDelay: `${0.8 + index * 0.1}s`}}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-100 group-hover:bg-gray-200 rounded-lg transition-colors">
                  {insight.icon}
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {insight.title}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "This Month's Spending", 
            value: "₹64,000", 
            icon: <TrendingDown className="w-8 h-8" />, 
            color: "red",
            change: "-12% from last month",
            gradient: "from-red-500 to-pink-600"
          },
          { 
            title: "Cashback Earned", 
            value: "₹340", 
            icon: <Gift className="w-8 h-8" />, 
            color: "green",
            change: "+23% from last month",
            gradient: "from-green-500 to-emerald-600"
          },
          { 
            title: "Days to Goal", 
            value: "5 days", 
            icon: <Calendar className="w-8 h-8" />, 
            color: "blue",
            change: "On track",
            gradient: "from-blue-500 to-indigo-600"
          }
        ].map((stat, index) => (
          <div 
            key={index}
            className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
            style={{animationDelay: `${1.0 + index * 0.1}s`}}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            </div>
            <p className="text-gray-600 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in" style={{animationDelay: '1.3s'}}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {userData.recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="group flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 animate-slide-up"
              style={{animationDelay: `${1.5 + index * 0.1}s`}}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-200`}>
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {transaction.vendor}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.type} • {transaction.location}
                  </p>
                </div>
              </div>
              <div className="text-right flex items-center space-x-2">
                <div>
                  <p className={`font-bold ${getTransactionColor(transaction.amount)} flex items-center`}>
                    {getTransactionIcon(transaction.amount)}
                    <span className="ml-1">₹{Math.abs(transaction.amount).toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;