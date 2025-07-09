import axios from "axiox";
import fs from "fs";
import FormData from "from-data";
import User from "../models/user.js";

const removeBgImage = async(req,res)=>{
    try{
        const {clerkId}  = req.body;
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

        formData.append("image_file" , imageFile);
        const {data} = await axios.post("https://clipdrop-api.co/remove-background/v1", formData , {
            headers :{
                "x-api-key" :process.env.CLIPDROP_API
            } ,
            responseType:"arraybuffer"
        });

        const base64Image = Buffer.from(data , "binary").toString("base64");
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`
        await User.findByIdAndUpdate(user._id,{creditBalancw :user.creditBalancw-1})
        res.json({success:True , resultImage , creditBalancw:user.creditBalancw-1, messaage :"Backgroung Image Removed"})
    }
    catch(e){
        return res.json(500).send({success : false  ,message : e.message})
        console.log("Error in the Remove Bg Controller" ,e.message);
    }

}

export  default removeBgImage;