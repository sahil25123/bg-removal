import dotenv from "dotenv"
import Razorpay from "razorpay";
import User from "../models/user.js";
import Transaction from "../models/transactionModel.js";

dotenv.config();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,  
});

// Plan configuration
const PLANS = {
    BASIC: {
        id: "Basic",
        amount: 10,
        credits: 100
    },
    ADVANCED: {
        id: "Advanced",
        amount: 50,
        credits: 500
    },
    BUSINESS: {
        id: "Business",
        amount: 250,
        credits: 5000
    }
};

/**
 * API to make payment for credits
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const paymentRazorPay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        
        // Validate input
        if (!clerkId || !planId) {
            return res.status(400).json({ 
                success: false, 
                message: "clerkId and planId are required" 
            });
        }

        // Find user
        const userData = await User.findOne({ clerkId });
        if (!userData) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Get plan details
        const plan = PLANS[planId.toUpperCase()];
        if (!plan) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid plan selected" 
            });
        }

        // Create transaction record
        const transactionData = {
            clerkId,
            plan: plan.id,
            amount: plan.amount,
            credits: plan.credits,
            date: new Date()
        };

        const newTransaction = await Transaction.create(transactionData);

        // Razorpay order options
        const options = {
            amount: plan.amount * 100, // Convert to paise
            currency: process.env.CURRENCY || "INR",
            receipt: newTransaction._id.toString(),
            notes: {
                clerkId,
                planId: plan.id,
                transactionId: newTransaction._id.toString()
            }
        };

        // Create Razorpay order
        const order = await razorpayInstance.orders.create(options);
        
        return res.status(200).json({ 
            success: true, 
            message: "Order created successfully",
            order 
        });

    } catch (error) {
        console.error("Payment error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
    }
};

export default paymentRazorPay;