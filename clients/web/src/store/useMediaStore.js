import { create } from "zustand";
import { axiosInstances } from "../axios/axiosInstance";

export const useMediStore = create((set)=>({
    media:[],
    isLoadingMedia:false,

    getMedia: async (libraryId) =>{
        set({isLoadingMedia:true})
        try {
            const res = axiosInstances.get(`/media/library/${libraryId}`)

            set({
                media:res.data
            })
        } catch (error) {
            console.log("Error getting media:", error);
            toast.error("Failed to load media");
        } finally{
            set({isLoadingMedia:false})
        }
    }
}))