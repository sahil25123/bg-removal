import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";

dotenv.config();
const app = express();
const port=process.env.PORT||9000;


app.use(express.json());

app.use(cors());

await connectDB();

app.get("/" , (req,res)=>{
    res.send("Hellp")
});

app.listen(port , ()=>{
    console.log("Server is running on the port" , port)
})
