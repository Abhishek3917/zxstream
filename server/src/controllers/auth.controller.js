import {generateToken} from '../utils/token.js'
import { signupService,logInService,terminateService } from "../services/auth.services.js";

export const signup = async (req,res)=>{

    try {
        const {email,password}=req.body

        const user = await signupService({
            email,
            password
        })

        generateToken(user._id,res);

        return res.status(201).json({
            _id:user._id,
            email:user.email
        })

    } catch (error) {
        console.log("error in signupcontroller",error);
        res.status(500).json({message:"server error"})
    }

}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await logInService({
            email,
            password
        })
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
        })
    } catch (error) {
        console.log("error in logincontroller",error);
        res.status(400).json({message:'invalid credentials'})
    }    
}

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
    console.log("error in logout controller");        
    res.status(500).json({message:"server error"})

    }
}

export const sessionAuth = async(req,res,next) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in sessionauth",error);
        res.status(500).json({message:"server error"})    
    }
}

// delete
export const terminate = async(req,res,next) =>{
    try {
        const result = await terminateService({user:req.user})
        res.cookie("jwt","",{maxAge:0})
        if(result.deletedCount === 0 ){
            throw AppError.badRequest("user not found")
        }
        else{
            return res.status(200).json({message: "Account deleted successfully"});
        }
    } catch (error) {
        console.log("error in delete",error);
        res.status(500).json({message:"server error"})
    }
}
