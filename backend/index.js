import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import router from "./routes/userRoute.js";
import UserRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRoute.js";

dotenv.config();
const app = express();
const port=process.env.PORT||9000;


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your frontend is running on
  credentials: true
}));

await connectDB();

app.get("/" , (req,res)=>{
    res.send("Hello")
});


app.use("/api/user", UserRouter);
app.use("/api/image" , imageRouter);


app.listen(port , ()=>{
    console.log("Server is running on the port" , port)
})
