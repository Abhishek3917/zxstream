import { create } from "zustand";
import { api } from "../services/api";
type Library = {
    _id: string
    name: string
    type: string
    owner: string
    path: string
    createdAt: string
    updatedAt: string
};

type LibraryState = {
    libraries: Library[]
    isLoading:boolean
    fetchLibraries:()=>Promise<void>
    scanLibrary:(LibraryId:string)=>Promise<void>
    getLibraries:()=>Promise<void>
}

export const useLibraryStore = create<LibraryState>((set)=>({
    libraries:[],
    isLoading:false,
    fetchLibraries: async ()=>{
        set({isLoading:true})
        try {
            const res = await api.get("/libraries")
            console.log("Libraries response:", res.status);
            console.log("Libraries data:", res.data);
            set({libraries:res.data})
        } catch (error) {
            console.log("Error fetching libraries:", error)
        } finally{
            set({isLoading:false})
        }
    },
    scanLibrary: async(LibraryId:string)=>{
        try {
            const res = await api.post(`/libraries/${LibraryId}/scan`)
            return res.data
        } catch (error) {
            return error
        }
    },
    getLibraries: async()=>{
        try {
            const res = await api.get("/libraries")
            return res.data
        } catch (error) {
            return error
        }
    }
}))