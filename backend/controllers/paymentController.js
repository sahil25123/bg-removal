import razorpay from "razorpay"
import User from "../models/user.js"
import Transaction from "../models/transactionModel.js"

const razorpayInstance  = new razorpay({
    key_id : process.env.RAZORPAY_KEY_Id,
    key_secret : process.env.RAZORPAY_KEY_SECRET,  
})

// API to make payemet for credits 
const paymentRazorPay = async (req, res) =>{
    try{
        const {clerkId , planId} = req.body;
        
        const userData = await User.findOne({clerkId});

        if(!userData || !planId) {
            return res.json({success :false , message : "Invalid Credentials"});
        }

        let credits , plan , amount , date ;
        switch (planId) {
            case "Basic":
                amount = 10;
                credits = 100; 
                plan ="Basic"
                break;
            case "Advanced":
                amount = 50;
                credits = 500 
                plan ="Advanced"
                break;

            case "Business":
                amount = 250;
                credits = 5000; 
                plan ="Business"
                break;
        
            default:
                break;
        }
        date = Date.now();

        // Creating Transaction 
        const transactionData = {
            clerkId,
            plan , 
            amount, 
            credits,
            date
        }

        const newTransaction = await Transaction.create(transactionData);

        
        

    }

    catch(e){
        console.log(e.message);
        return res.json({success :false , message :e.message});


    }
}