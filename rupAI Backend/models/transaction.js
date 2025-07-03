const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    category: { type: String, enum: ['Food', 'Shopping', 'Transport', 'Bills', 'Entertainment', 'Salary', 'Other'], required: true },
    merchant: { type: String, default: 'N/A' },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);