import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/user.js";

const removeBgImage = async (req, res) => {
    console.log("Request received for removeBgImage");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    
    try {
        if (!req.file) {
            console.error("No file uploaded");
            return res.status(400).json({ 
                success: false, 
                message: "No image file provided" 
            });
        }

        const { clerkId } = req.body;
        if (!clerkId) {
            console.error("No clerkId provided in request");
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        const user = await User.findOne({ clerkId });
        if (!user) {
            console.error("User not found for clerkId:", clerkId);
            return res.status(404).json({ 
                success: false, 
                message: "User Not Found" 
            });
        }

        if (user.creditBalance <= 0) {
            console.log("Insufficient credits for user:", clerkId);
            return res.status(400).json({ 
                success: false,
                message: "No credit balance",
                creditBalance: user.creditBalance 
            });
        }

        const imagePath = req.file.path;
        console.log("Processing image at path:", imagePath);
        
        // Read the image file
        const imageFile = fs.createReadStream(imagePath);
        const formData = new FormData();
        formData.append("image_file", imageFile);

        console.log("Sending request to ClipDrop API...");
        const clipdropResponse = await axios.post(
            "https://clipdrop-api.co/remove-background/v1", 
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API
                },
                responseType: "arraybuffer",
                timeout: 45000 // 45 seconds timeout
            }
        );

        if (!clipdropResponse.data || clipdropResponse.data.length === 0) {
            throw new Error("Empty response from ClipDrop API");
        }

        console.log("Received response from ClipDrop API");
        
        // Convert the response to base64
        const base64Image = Buffer.from(clipdropResponse.data, "binary").toString("base64");
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
        
        // Update user's credit balance
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        // Clean up the uploaded file
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting temporary file:", err);
        });

        res.json({
            success: true,
            resultImage,
            creditBalance: updatedUser.creditBalance,
            message: "Background removed successfully"
        });
    } catch (e) {
        console.error("Error in Remove Background Controller:", e.message);
        if (req.file?.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting temporary file:", err);
            });
        }
        res.status(500).json({ 
            success: false,
            message: e.response?.data?.message || e.message || "Internal server error"
        });
    }
};

export default removeBgImage;