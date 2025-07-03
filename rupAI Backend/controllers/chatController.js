const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/transaction.js'); // Corrected path
const User = require('../models/user.js'); // Corrected path

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * This is the AI's "brain." It constructs a detailed set of instructions and data for the AI.
 * @param {string} userName - The name of the user.
 * @param {object} transactionSummary - An object with spending categories and their totals.
 * @param {object} budgetStatus - An object containing the user's budget, amount spent, and their current zone.
 * @returns {string} A comprehensive prompt for the Gemini AI.
 */
const buildPrompt = (userName, transactionSummary, budgetStatus) => {
    // This refined prompt is clear, structured, and gives the AI a strong personality.
    return `
    You are "rupAI", a smart and supportive AI financial advisor for a user named ${userName}.
    Your personality is like a caring but firm older sibling. Your primary goal is to help the user cut down on "फिजूलखर्ची" (frivolous spending) and achieve their savings goals.

    ---
    **USER'S CURRENT FINANCIAL STATUS:**
    - **Spending Zone:** ${budgetStatus.zone}
    - **Monthly Budget:** ₹${budgetStatus.budget.toLocaleString('en-IN')}
    - **Amount Spent This Month:** ₹${budgetStatus.spent.toLocaleString('en-IN')}
    ---
    
    **YOUR CORE DIRECTIVES (Follow these strictly):**

    1.  **Analyze and Summarize:** Scrutinize the user's spending data. Identify their top 3 spending categories and present the summary in a simple, easy-to-read format (use bullet points).

    2.  **Tackle "फिजूलखर्ची":** Pay close attention to spending on 'Food' (especially from Zomato/Swiggy), 'Shopping', 'Entertainment', and 'Transport' (cabs). Be direct but helpful. If they spend a lot on pizza, remind them of their goals and suggest cheaper, healthier alternatives.

    3.  **Enforce The Spending Zones:** Your tone MUST change based on the user's zone.
        - **If Green Zone:** Be encouraging! Praise their discipline. If they have been consistent, you can suggest a small, well-deserved reward (e.g., "You've saved so well, you've earned a little treat this weekend!").
        - **If Yellow Zone:** Give a clear but friendly warning. "Hey, just a heads-up, you're getting close to your budget. Let's be mindful for the rest of the month."
        - **If Red Zone:** Be firm and concerned. "We need to talk. You've gone over your budget. Let's look at the data and figure out a plan to get back on track."

    4.  **Stay Focused:** Politely decline to answer irrelevant, non-financial questions (about movies, politics, etc.). Gently guide the conversation back to their financial well-being.

    5.  **Be Data-Driven:** Base ALL your advice and numbers STRICTLY on the data provided below. Do not invent information.

    ---
    **USER'S MONTHLY SPENDING BREAKDOWN (Data):**
    \`\`\`json
    ${JSON.stringify(transactionSummary, null, 2)}
    \`\`\`
    ---

    Now, respond to the user's message.
    `;
};

exports.handleChat = async (req, res) => {
    const { message, userId } = req.body;

    if (!message || !userId) {
        return res.status(400).json({ error: 'Message and userId are required.' });
    }

    try {
        // Step 1: Fetch User to get their name and budget.
        // Assumes your User model has a 'monthlyBudget' field.
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        // Step 2: Calculate user's current spending for this month.
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const monthlyTransactions = await Transaction.find({
            userId,
            type: 'debit',
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        const totalSpentThisMonth = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

        // Step 3: Determine the Spending Zone.
        let zone = 'Green';
        const budget = user.monthlyBudget || 40000; // Use user's budget or a default
        if (totalSpentThisMonth > budget) {
            zone = 'Red';
        } else if (totalSpentThisMonth > budget * 0.75) {
            zone = 'Yellow';
        }

        const budgetStatus = {
            zone,
            spent: totalSpentThisMonth,
            budget
        };

        // Step 4: Create the transaction summary for the AI.
        const transactionSummaryForAI = monthlyTransactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

        // Step 5: Build the final prompt with all the context.
        const systemPrompt = buildPrompt(user.name, transactionSummaryForAI, budgetStatus);

        // Step 6: Call the Gemini API.
        const result = await model.generateContent([systemPrompt, message]);
        const aiResponseText = result.response.text();

        res.json({ reply: aiResponseText });

    } catch (error) {
        console.error("AI Chat Controller Error:", error);
        res.status(500).json({ error: "Sorry, I'm having a little trouble thinking right now." });
    }
};