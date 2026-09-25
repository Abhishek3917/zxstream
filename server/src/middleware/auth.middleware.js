import jwt from "jsonwebtoken"
import User from "../models/auth.model.js"

//1. check for token if there is any
// 2. then verify that token by comparing that token with our secrets for validation
// 3. then extract the userid from that and find it in db and store it in ser variable
// 4. store it in req.user to get access to all where its called
export const protectRoute = async (req,res,next) =>{
    try {
        if(req.cookies.jwt){
            token = req.cookies.jwt
        }
        
        if(!token){
            return res.status(401).json({message: "Unautorized acess not token found"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRETS)
        if(!decoded){
            return res.status(401).json({message:"Unautorized acess jwt missmatch"})
        }     
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found "})
        }
        req.user = user
        next()

    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }
        return res.status(500).json({message:"server internal error"})
    }
}