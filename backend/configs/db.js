import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();



const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");

    }
    catch(e){
        console.error("Database Connection Error" , e.message)

    }
    
}

export default connectDB;