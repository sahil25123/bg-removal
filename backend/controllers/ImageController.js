import axios from "axiox";
import fs from "fs";
import FormData from "from-data";

import User from "../models/user.js";


const removeBgImage = async(req,res)=>{
    try{
        const {clerkid}  = req.body;
        const user = await User.findOne({clerkId});

        if(!user) {
            return res.json({success : false  , messaage : "User Not Found"});

        }
        if(user.creditBalancw=== 0){
            return res.json({messaage: "No credit balance" , creditBalancw:user})

        }

        const imagePath = req.file.path;
        // Reading the image file 

        const imageFile = fs.createReadStream(imagePath);
        const formData = new formData();

        



    }
    catch(e){
        return res.json(500).send({success : false  ,message : e.message})
        console.log("Error in the Remove Bg Controller" ,e.message);
    }

}

export  default removeBgImage;