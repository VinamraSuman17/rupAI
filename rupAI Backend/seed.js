const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const Transaction = require('./models/transaction.js');

dotenv.config();

const categories = ['Food', 'Shopping', 'Transport', 'Bills', 'Entertainment'];
const merchants = {
    Food: ['Zomato', 'Swiggy', 'Local Cafe', 'Groceries'],
    Shopping: ['Amazon', 'Myntra', 'Zara', 'Croma'],
    Transport: ['Uber', 'Ola', 'Rapido', 'Metro Card'],
    Bills: ['Airtel', 'BSES Electricity', 'Rent'],
    Entertainment: ['Netflix', 'BookMyShow', 'Prime Video']
};

// Helper function to get a random item from an array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate a random number in a range
const randomAmount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Main function to generate transactions for a user
const generateTransactions = (userId, numMonths) => {
    const transactions = [];
    const today = new Date();

    for (let i = 0; i < numMonths; i++) {
        // Go back month by month
        const dateCursor = new Date(today.getFullYear(), today.getMonth() - i, 1);
        
        // Add 20-40 debit transactions for the month
        const numTransactions = randomAmount(20, 40);
        for (let j = 0; j < numTransactions; j++) {
            const category = getRandom(categories);
            transactions.push({
                userId,
                amount: randomAmount(50, 2500),
                type: 'debit',
                category,
                merchant: getRandom(merchants[category]),
                // Random day within that month
                date: new Date(dateCursor.getFullYear(), dateCursor.getMonth(), randomAmount(1, 28))
            });
        }

        // Add 1 salary credit transaction for the month
        transactions.push({
            userId,
            amount: randomAmount(45000, 75000),
            type: 'credit',
            category: 'Salary',
            merchant: 'Company Inc.',
            date: new Date(dateCursor.getFullYear(), dateCursor.getMonth(), 1)
        });
    }
    return transactions;
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clean up previous data
        await User.deleteMany({});
        await Transaction.deleteMany({});
        console.log('Old data cleared.');

        // --- Create User 1: Rohan (1 Year of Data) ---
        const userOne = new User({ name: 'Rohan', email: 'rohan@example.com' });
        await userOne.save();
        const userOneTransactions = generateTransactions(userOne._id, 12);
        await Transaction.insertMany(userOneTransactions);
        console.log(`Created User Rohan with ${userOneTransactions.length} transactions.`);
        
        // --- Create User 2: Priya (1 Month of Data) ---
        const userTwo = new User({ name: 'Priya', email: 'priya@example.com' });
        await userTwo.save();
        const userTwoTransactions = generateTransactions(userTwo._id, 1);
        await Transaction.insertMany(userTwoTransactions);
        console.log(`Created User Priya with ${userTwoTransactions.length} transactions.`);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();