import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Brain, AlertTriangle, Target, 
  Calendar, Zap, Shield, DollarSign, ArrowUp, ArrowDown,
  Eye, ChevronRight, Star, Award, Bell, Lightbulb,
  PiggyBank, CreditCard, Wallet, Activity, Filter
} from 'lucide-react';

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);
  const insightRef = useRef(null);

  // Mock data for demonstration
  const userData = {
    expenses: [
      { month: 'Jan', amount: 35000, income: 45000 },
      { month: 'Feb', amount: 42000, income: 50000 },
      { month: 'Mar', amount: 38000, income: 48000 },
      { month: 'Apr', amount: 45000, income: 52000 },
      { month: 'May', amount: 39000, income: 49000 },
      { month: 'Jun', amount: 41000, income: 51000 }
    ],
    categorySpending: [
      { name: 'Food & Dining', value: 18000, color: '#FF6B6B', trend: 12, budget: 15000 },
      { name: 'Transportation', value: 8500, color: '#4ECDC4', trend: -5, budget: 10000 },
      { name: 'Shopping', value: 12000, color: '#45B7D1', trend: 25, budget: 8000 },
      { name: 'Entertainment', value: 6500, color: '#96CEB4', trend: -8, budget: 7000 },
      { name: 'Utilities', value: 5500, color: '#FFEAA7', trend: 2, budget: 6000 },
      { name: 'Healthcare', value: 4200, color: '#DDA0DD', trend: 15, budget: 5000 }
    ],
    savingsRate: 22,
    investmentGrowth: 8.5,
    creditScore: 748,
    totalAssets: 485000
  };

  const aiInsights = [
    {
      type: 'critical',
      icon: AlertTriangle,
      title: 'Budget Overrun Alert',
      description: 'Food & Dining is 20% over budget this month',
      suggestion: 'Try meal prepping on weekends. You could save ₹3,000/month',
      impact: 'High',
      savings: 3000,
      color: 'red'
    },
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Investment Opportunity',
      description: 'Your savings rate is excellent at 22%',
      suggestion: 'Consider increasing SIP by ₹2,000 to optimize tax benefits',
      impact: 'Medium',
      savings: 24000,
      color: 'green'
    },
    {
      type: 'achievement',
      icon: Award,
      title: 'Smart Spending Achievement',
      description: 'Transportation costs down 5% this month',
      suggestion: 'Keep using public transport. You\'re saving ₹850/month',
      impact: 'Low',
      savings: 850,
      color: 'blue'
    },
    {
      type: 'prediction',
      icon: Brain,
      title: 'AI Prediction',
      description: 'Based on patterns, you\'ll save ₹18,500 extra this quarter',
      suggestion: 'Perfect time to start an emergency fund or invest in equity',
      impact: 'High',
      savings: 18500,
      color: 'purple'
    },
    {
      type: 'seasonal',
      icon: Calendar,
      title: 'Seasonal Insight',
      description: 'Monsoon season approaching - historically you spend 15% more',
      suggestion: 'Prepare ₹12,000 buffer for seasonal expenses and commute changes',
      impact: 'Medium',
      savings: 0,
      color: 'yellow'
    },
    {
      type: 'credit',
      icon: Shield,
      title: 'Credit Health Check',
      description: 'Your credit score (748) puts you in top 25% bracket',
      suggestion: 'You qualify for premium credit cards with better rewards',
      impact: 'Medium',
      savings: 2400,
      color: 'indigo'
    }
  ];

  useEffect(() => {
    setAnimateCards(true);
    setTimeout(() => setShowInsights(true), 800);
    
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % aiInsights.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getColorClass = (type) => {
    const colors = {
      red: 'from-red-500 to-pink-500',
      green: 'from-green-500 to-emerald-500',
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-indigo-500',
      yellow: 'from-yellow-500 to-orange-500',
      indigo: 'from-indigo-500 to-purple-500'
    };
    return colors[type] || colors.blue;
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <ArrowUp className="w-4 h-4 text-red-500" />
    ) : (
      <ArrowDown className="w-4 h-4 text-green-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Analytics
          </h1>
          <p className="text-gray-600 mt-2">AI-powered insights for smarter financial decisions</p>
        </div>

        {/* Key Metrics Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
          animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Savings Rate</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.savingsRate}%</p>
                </div>
              </div>
              <div className="text-green-500 flex items-center text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                +2.5%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${userData.savingsRate}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Investment Growth</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.investmentGrowth}%</p>
                </div>
              </div>
              <div className="text-blue-500 flex items-center text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                +1.2%
              </div>
            </div>
            <p className="text-xs text-gray-500">Annualized returns</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.creditScore}</p>
                </div>
              </div>
              <div className="text-purple-500 flex items-center text-sm font-medium">
                <Star className="w-4 h-4 mr-1" />
                Excellent
              </div>
            </div>
            <p className="text-xs text-gray-500">Top 25% bracket</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(userData.totalAssets)}</p>
                </div>
              </div>
              <div className="text-yellow-500 flex items-center text-sm font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                +12%
              </div>
            </div>
            <p className="text-xs text-gray-500">Year over year</p>
          </div>
        </div>

        {/* AI Insights Carousel */}
        {showInsights && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-in">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">AI Financial Advisor</h3>
                    <p className="text-indigo-200 text-sm">Personalized insights powered by machine learning</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="transition-all duration-500 ease-in-out">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`${
                      index === currentInsight ? 'block' : 'hidden'
                    } animate-fade-in`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getColorClass(insight.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <insight.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{insight.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                            insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {insight.impact} Impact
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{insight.description}</p>
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold text-gray-700">AI Recommendation</span>
                          </div>
                          <p className="text-sm text-gray-600">{insight.suggestion}</p>
                        </div>
                        {insight.savings > 0 && (
                          <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                            <span className="text-sm text-green-700">Potential Monthly Savings</span>
                            <span className="font-bold text-green-800">{formatCurrency(insight.savings)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spending Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Income vs Expenses</h3>
              <div className="flex space-x-2">
                {['3M', '6M', '1Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedTimeframe === period 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userData.expenses}>
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), name === 'income' ? 'Income' : 'Expenses']}
                  contentStyle={{ backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="url(#income)" strokeWidth={2} />
                <Area type="monotone" dataKey="amount" stackId="2" stroke="#F59E0B" fill="url(#expenses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Spending with Trends */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Category Analysis</h3>
            <div className="space-y-4">
              {userData.categorySpending.map((category, index) => (
                <div key={category.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                      {getTrendIcon(category.trend)}
                      <span className={`text-xs font-medium ${
                        category.trend > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {Math.abs(category.trend)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{formatCurrency(category.value)}</p>
                      <p className="text-xs text-gray-500">Budget: {formatCurrency(category.budget)}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 group-hover:h-3 transition-all duration-200">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:shadow-lg"
                      style={{ 
                        backgroundColor: category.color,
                        width: `${Math.min((category.value / category.budget) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  {category.value > category.budget && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Over budget by {formatCurrency(category.value - category.budget)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced AI Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Goal Tracker</h4>
                <p className="text-sm text-blue-700">Emergency Fund Progress</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">₹85,000 / ₹150,000</span>
                <span className="text-blue-600 font-medium">57% Complete</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full w-[57%] transition-all duration-1000"></div>
              </div>
              <p className="text-xs text-blue-600">At current rate, you'll reach your goal in 8 months</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-purple-900">Smart Alerts</h4>
                <p className="text-sm text-purple-700">Unusual Spending Detected</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-purple-800">Shopping expenses up 45% this week</p>
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-purple-600" />
                <span className="text-xs text-purple-600">Consider reviewing recent purchases</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900">Tax Optimizer</h4>
                <p className="text-sm text-green-700">Potential Savings</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-green-800">₹18,500</p>
              <p className="text-sm text-green-700">Increase 80C investments by ₹35,000</p>
              <button className="text-xs text-green-600 font-medium hover:underline">
                View tax-saving options →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Analytics;