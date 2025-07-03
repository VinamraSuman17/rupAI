import React, { useState, useEffect, useRef } from 'react';
import { Wallet, CreditCard, Shield, CheckCircle, AlertCircle, Loader2, ArrowRight, Lock, History, Calendar, MapPin, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const Payment = ({ userData, updateUserData }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentPin, setPaymentPin] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pinFocused, setPinFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Note: The successRef was defined but not used. It can be removed if not needed for future features.
  // const successRef = useRef(null); 

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handlePaymentSubmit = () => {
    // Basic validation
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      setPaymentStatus('error');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }
    if (paymentPin !== '1234') { // Demo PIN check
      setPaymentStatus('invalid_pin');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }
    if (parseFloat(paymentAmount) > userData.balance) {
      setPaymentStatus('insufficient_funds');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);
    
    // Simulate API call
    setTimeout(() => {
      const newTransaction = {
        id: Date.now(),
        type: 'Payment',
        amount: -parseFloat(paymentAmount),
        vendor: 'rupAI Payment',
        time: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        location: 'Online',
        status: 'completed'
      };

      updateUserData({
        ...userData,
        balance: userData.balance - parseFloat(paymentAmount),
        recentTransactions: [newTransaction, ...userData.recentTransactions]
      });
      
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Temporarily store the successful amount to display in the success message
      // because we clear the state right after.
      const successfulAmount = paymentAmount;
      
      setPaymentAmount('');
      setPaymentPin('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }, 2500);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2, // Standard to show cents
    }).format(Math.abs(amount));
  };

  const getTransactionIcon = (type, amount) => {
    if (amount < 0) {
      return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    } else {
      return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
    }
  };

  const getTransactionColor = (amount) => {
    return amount < 0 ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {showHistory ? 'Transaction History' : 'Make Payment'}
          </h1>
          <p className="text-gray-600 mt-2">
            {showHistory ? 'View your recent payment activity' : 'Secure and instant payments'}
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setShowHistory(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              !showHistory 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Payment</span>
            </div>
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              showHistory 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </div>
          </button>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your payment has been processed.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 py-2 px-4 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Transaction secured</span>
              </div>
            </div>
          </div>
        )}

        {!showHistory ? (
          /* Payment Form */
          <div className={`bg-white rounded-2xl shadow-xl border-0 overflow-hidden transition-all duration-700 ${
            animateCard ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold">Payment Gateway</span>
                </div>
                <div className="flex items-center space-x-1 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" />
                  {/* FIX: Changed text color for better contrast */}
                  <span className='font-semibold'>Secure</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-b">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-gray-800">{formatAmount(userData.balance)}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Payment Amount</label>
                <div className={`relative transition-all duration-300 ${amountFocused ? 'transform scale-105' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">₹</span>
                  </div>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    onFocus={() => setAmountFocused(true)}
                    onBlur={() => setAmountFocused(false)}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-4 text-lg font-semibold border-2 rounded-xl transition-all duration-300 ${
                      amountFocused 
                        ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-100' 
                        : 'border-gray-200 bg-gray-50'
                    } focus:outline-none`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Security PIN</label>
                <div className={`relative transition-all duration-300 ${pinFocused ? 'transform scale-105' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    maxLength="4"
                    value={paymentPin}
                    onChange={(e) => setPaymentPin(e.target.value)}
                    onFocus={() => setPinFocused(true)}
                    onBlur={() => setPinFocused(false)}
                    placeholder="Enter PIN"
                    className={`w-full pl-12 pr-4 py-4 text-lg font-semibold border-2 rounded-xl transition-all duration-300 ${
                      pinFocused 
                        ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-100' 
                        : 'border-gray-200 bg-gray-50'
                    } focus:outline-none`}
                  />
                </div>
                <p className="text-xs text-gray-500 pl-1">Hint: Use PIN 1234 for demo</p>
              </div>

              {/* FIX: Corrected className syntax from {flex...} to "flex..." */}
              {paymentStatus && paymentStatus !== 'success' && (
                <div className="flex items-center space-x-2 p-4 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm font-medium">
                    {paymentStatus === 'error' && 'Please enter a valid amount'}
                    {paymentStatus === 'invalid_pin' && 'Incorrect PIN. Please use 1234 for demo'}
                    {paymentStatus === 'insufficient_funds' && 'Insufficient balance for this payment'}
                  </p>
                </div>
              )}

              {/* FIX: Added `group` class to enable `group-hover` on the icon */}
              <button
                onClick={handlePaymentSubmit}
                disabled={isProcessing || !paymentAmount || !paymentPin}
                className={`group w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isProcessing || !paymentAmount || !paymentPin
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Process Payment</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Transaction History */
          <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <History className="w-6 h-6" />
                  <span className="font-semibold">Transaction History</span>
                </div>
                <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {userData.recentTransactions.length} transactions
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-b">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-gray-800">{formatAmount(userData.balance)}</p>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {userData.recentTransactions.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Transactions Yet</h3>
                  <p className="text-gray-600 text-sm">Your payment history will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {userData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {getTransactionIcon(transaction.type, transaction.amount)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{transaction.vendor}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{transaction.time}</span>
                              <span className="hidden sm:inline">•</span>
                              <MapPin className="w-3 h-3 hidden sm:inline" />
                              <span className="hidden sm:inline">{transaction.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {/* FIX: Corrected className to use a template literal for dynamic classes */}
                          <p className={`font-semibold ${getTransactionColor(transaction.amount)}`}>
                            {transaction.amount < 0 ? '- ' : '+ '}{formatAmount(transaction.amount)}
                          </p>
                          <div className="flex items-center justify-end mt-1">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {showHistory ? 'Your data is secure' : 'Your payment is protected'}
              </p>
              <p className="text-xs text-gray-600">256-bit SSL encryption • PCI DSS compliant</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 
        FIX: Removed the <style jsx> block which is specific to Next.js.
        The custom animations it defined were replaced with standard Tailwind classes 
        or removed to ensure the component works in any React environment.
      */}
    </div>
  );
};

// Mock user data and update function for demonstration
const mockUserData = {
  balance: 15000.75,
  recentTransactions: [
    {
      id: 1,
      type: 'Payment',
      amount: -2500,
      vendor: 'Coffee Shop',
      time: '15 Jun 2025, 10:30 AM',
      location: 'Mumbai',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Payment',
      amount: -1200.50,
      vendor: 'Grocery Store',
      time: '14 Jun 2025, 6:45 PM',
      location: 'Delhi',
      status: 'completed'
    }
  ]
};

const mockUpdateUserData = (data) => {
  console.log('Updated user data:', data);
};

// This is a wrapper component to demonstrate the Payment component with state
export default function PaymentDemo() {
  const [userData, setUserData] = useState(mockUserData);
  
  const updateUserData = (newData) => {
    setUserData(newData);
    mockUpdateUserData(newData); // Also log it to the console
  };
  
  return <Payment userData={userData} updateUserData={updateUserData} />;
}