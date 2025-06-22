import React, { useState, useEffect, useRef } from 'react';
import { Wallet, CreditCard, Shield, CheckCircle, AlertCircle, Loader2, ArrowRight, Lock } from 'lucide-react';

const Payment = ({ userData, updateUserData }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentPin, setPaymentPin] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pinFocused, setPinFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const successRef = useRef(null);

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handlePaymentSubmit = () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      setPaymentStatus('error');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }
    if (paymentPin !== '1234') {
      setPaymentStatus('invalid_pin');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }
    if (paymentAmount > userData.balance) {
      setPaymentStatus('insufficient_funds');
      setTimeout(() => setPaymentStatus(null), 3000);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);
    
    setTimeout(() => {
      updateUserData({
        ...userData,
        balance: userData.balance - parseFloat(paymentAmount),
        recentTransactions: [
          {
            id: userData.recentTransactions.length + 1,
            type: 'Payment',
            amount: -parseFloat(paymentAmount),
            vendor: 'rupAI Payment',
            time: 'Just now',
            location: 'Online'
          },
          ...userData.recentTransactions
        ]
      });
      setIsProcessing(false);
      setShowSuccess(true);
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
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Make Payment
          </h1>
          <p className="text-gray-600 mt-2">Secure and instant payments</p>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center animate-scale-in shadow-2xl">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-green-500 rounded-full animate-bounce-slow flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white animate-checkmark" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                {formatAmount(paymentAmount)} has been deducted from your account
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 py-2 px-4 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Transaction secured</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Card */}
        <div className={`bg-white rounded-2xl shadow-xl border-0 overflow-hidden transition-all duration-700 ${
          animateCard ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6" />
                <span className="font-semibold">Payment Gateway</span>
              </div>
              <div className="flex items-center space-x-1 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-gray-800">{formatAmount(userData.balance)}</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Payment Amount</label>
              <div className={`relative transition-all duration-300 ${
                amountFocused ? 'transform scale-105' : ''
              }`}>
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

            {/* PIN Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Security PIN</label>
              <div className={`relative transition-all duration-300 ${
                pinFocused ? 'transform scale-105' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
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
              <p className="text-xs text-gray-500">Hint: Use PIN 1234 for demo</p>
            </div>

            {/* Error Messages */}
            {paymentStatus && paymentStatus !== 'success' && (
              <div className={`flex items-center space-x-2 p-4 rounded-xl bg-red-50 border border-red-200 animate-shake`}>
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">
                  {paymentStatus === 'error' && 'Please enter a valid amount'}
                  {paymentStatus === 'invalid_pin' && 'Incorrect PIN. Please use 1234 for demo'}
                  {paymentStatus === 'insufficient_funds' && 'Insufficient balance for this payment'}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing || !paymentAmount || !paymentPin}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isProcessing || !paymentAmount || !paymentPin
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
              } flex items-center justify-center space-x-2`}
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

            {/* Processing Animation */}
            {isProcessing && (
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2 text-blue-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm font-medium">Securing your transaction...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Your payment is protected</p>
              <p className="text-xs text-gray-600">256-bit SSL encryption • PCI DSS compliant</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-checkmark {
          animation: checkmark 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Mock userData for demonstration
const mockUserData = {
  balance: 15000,
  recentTransactions: []
};

const mockUpdateUserData = (data) => {
  console.log('Updated user data:', data);
};

export default function PaymentDemo() {
  const [userData, setUserData] = useState(mockUserData);
  
  const updateUserData = (newData) => {
    setUserData(newData);
    mockUpdateUserData(newData);
  };
  
  return <Payment userData={userData} updateUserData={updateUserData} />;
}