import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId :{
        type:String,
        require:true,
        unique:true
    },
     email :{
        type:String,
        require:true,
        unique:true
    },
     photo :{
        type:String,
        
    },
     firstName :{
        type:String,
    },
    lastName :{
        type :String
    }, 
    creditBalancw :{
        type: Number,
        default :10
    }

})

const User = mongoose.model("User" , userSchema);

export default User;
