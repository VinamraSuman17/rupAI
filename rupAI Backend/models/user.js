const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 50000 },
    monthlyBudget: { type: Number, default: 40000 }
});
module.exports = mongoose.model('User', UserSchema);