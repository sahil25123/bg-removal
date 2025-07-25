import express from "express";
import { clerkWebHooks, userCredits } from "../controllers/UserController.js";
import User from "../models/user.js";
import { authUser } from "../middlewares/auth.js";
import paymentRazorPay, { verifyRazorpay } from "../controllers/paymentController.js";


const UserRouter = express.Router();


UserRouter.post("/webhooks" , clerkWebHooks);

UserRouter.get("/credits" , authUser , userCredits);

UserRouter.post("/pay-razor" , authUser , paymentRazorPay)

UserRouter.post("/verify-razor" , verifyRazorpay);

export default UserRouter;
