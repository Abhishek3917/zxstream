import { create } from "zustand";
import { axiosInstances } from "../axios/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({

    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isCheckingAuth:true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstances.get("/auth/session/")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth",error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstances.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("account created successfully")
        } catch (error) {
            toast.error("there is a error in account creation")
            console.log(error)
        } finally{
            set({isSigningUp:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstances.post("/auth/logout")
            set({authUser:null})
            toast.success("logged out successfully")
        } catch (error) {
            toast.error("lodout error")
            console.log(error);
        }
    },
    login: async (data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstances.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("login successfull")
        } catch (error) {
            toast.error("invalid credentials")
            console.log(error)
        }finally{
            set({isLoggingIn:false})
        }
    }
}))