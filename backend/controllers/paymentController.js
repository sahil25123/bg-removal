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

export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required'
            });
        }

        // Fetch order details from Razorpay
        const order = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Verify payment status
        if (order.status !== 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Payment not completed'
            });
        }

        // Find the transaction
        const transaction = await Transaction.findById(order.receipt);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Check if already processed
        if (transaction.status === 'completed') {
            return res.json({
                success: true,
                message: 'Credits already added',
                transactionId: transaction._id
            });
        }

        // Find and update user
        const user = await User.findOne({ clerkId: transaction.clerkId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update user credits and transaction status
        user.creditBalance += transaction.credits;
        await user.save();

        transaction.status = 'completed';
        transaction.razorpayPaymentId = razorpay_payment_id;
        transaction.razorpayOrderId = razorpay_order_id;
        transaction.razorpaySignature = razorpay_signature;
        transaction.completedAt = new Date();
        await transaction.save();

        res.json({
            success: true,
            message: 'Credits added successfully',
            credits: user.creditBalance,
            transactionId: transaction._id
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing payment verification',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export default paymentRazorPay;