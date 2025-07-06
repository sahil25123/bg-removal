import jwt from "jsonwebtoken";

// middleware function to decode jwt token to get clerkid 
const authUser =  async (req, res , next) =>{

    try{
        const {token} = req.headers;

        if(!token){
            return res.json({success: false , message :"Not Authorized! Login Again"})
        }

        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId;
        next();
        

    }
    catch(e) {
        console.log(e.message)
        return res.status(500).json({err:"Internal Server Error in auth Middleware"})
    }

    
}

export {authUser};