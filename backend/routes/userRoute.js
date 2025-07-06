import express from "express";
import { clerkWebHooks } from "../controllers/UserController.js";


const UserRouter = express.Router();


UserRouter.post("/webhooks" , clerkWebHooks);

export default UserRouter;
