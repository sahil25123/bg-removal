import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port=process.env.PORT||9000;

app.get("/" , (req,res)=>{
    res.send("Hellp")
});

app.listen(port , ()=>{
    console.log("Server is running on the port" , port)
})
