import bcrypt from "bcryptjs";
import User from "../models/auth.model.js";

export const signupService = async ({email,password})=>{
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    if(password.length<6){
        throw new Error("length of password should be greater than 6 character")
    }

    const user = await User.findOne({email})

    if(user){
        throw new Error("the User already exits")
    }

    const hashpassword = await bcrypt.hash(password,10)
    const createUser = await User.create({
        email,
        password:hashpassword
    })
    return createUser
}

export const logInService = async({email,password})=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Invalid credentials")
    }

    const ispassword = await bcrypt.compare(password,user.password)
    if(!ispassword){
        throw new Error("Invalid credentials")
    }
    return user
}

export const terminateService = async({user}) =>{
    const result = await User.deleteOne({
        _id:user._id
    })
    return result
    // throw new Error("the user doesnt exits")
}