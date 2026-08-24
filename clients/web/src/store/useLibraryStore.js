import { create } from "zustand";
import { axiosInstances } from "../axios/axiosInstance.js";
import toast from "react-hot-toast";

export const useLibraryStore = create((set) => ({
    libraries: [],
    isLoadingLibraries: false,

    getLibraries: async () => {
        set({ isLoadingLibraries: true });

        try {
            const res = await axiosInstances.get("/libraries");

            set({
                libraries: res.data
            });
        } catch (error) {
            console.log("Error getting libraries:", error);
            toast.error("Failed to load libraries");
        } finally {
            set({ isLoadingLibraries: false });
        }
    },
    createLibrary: async(data)=>{
        try {
            const res = await axiosInstances.post(
                "/libraries",data
            )
            set((state)=>({
                libraries:[
                    ...state.libraries,
                    res.data
                ]
            }))
        toast.success("Library created successfully");
        } catch (error) {
            toast.error("library doesnt created")
            console.log(error)
        }
    },

    scanLibrary: async (id) => {
        try {
            const res = await axiosInstances.post(
                `/libraries/${id}/scan`
            );

            toast.success("Library scanned successfully");

            return res.data;
        } catch (error) {
            console.log("Error scanning library:", error);
            toast.error("Failed to scan library");
        }
    },
}));