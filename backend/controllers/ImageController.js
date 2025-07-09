import axios from "axiox";
import fs from "fs";
import FormData from "from-data";

import User from "../models/user.js";


const removeBgImage = async(req,res)=>{
    try{



    }
    catch(e){
        return res.json(500).send({success : false  ,message : e.message})
        console.log("Error in the Remove Bg Controller" ,e.message);
    }

}

export  default removeBgImage;