import { getLibraryService,createLibraryService,getLibrariesService,updateLibraryService,deleteLibraryServices} from "../services/library.service.js";
import {scanLibraryService} from '../media/scanner/scanner.service.js'
export const createLibrary = async(req,res,next) =>{
    try {
        const {name,type,path} = req.body
        const createlibrary = await createLibraryService({
            name,type,path,owner:req.user._id
        }) 
        return res.status(201).json({message:createlibrary})
    } catch (error) {
        console.error("Error creating library:", error);
        return res.status(400).json({
            message: error.message
        })
    }
}

export const getLibraries = async (req,res,next)=>{
    try {
        const libraries = await getLibrariesService(req.user._id)
        return res.status(200).json(libraries)
    } catch (error) {
        console.error("Error getting libraries:", error);
        return res.status(500).json({
            message: "Unable to get libraries"
        });
    }
}

export const getLibrary = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getLibrary= await getLibraryService(
            id,
            req.user._id
        )

        res.status(200).json({message:getLibrary})

    } catch (error) {
        console.error("Error getting library:", error);
        return res.status(404).json({
            message: error.message
        });
    }
}

export const updateLibrary = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {name,type,path} = req.body
        const updates = {
            name,
            type,
            path
        }

// Remove undefined fields
        Object.keys(updates).forEach((key) => {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        });

        const library = await updateLibraryService(
            id,
            req.user._id,
            updates
        );

        return res.status(200).json(library);
    } catch (error) {
        console.error("Error updating library:", error);
        return res.status(404).json({
            message: error.message
        });
    }
}

export const deleteLibrary = async(req,res,next)=>{
    try {
        const {id} = req.params
        await deleteLibraryServices(
            id,
            req.user._id
        )
        res.status(200).json({message:"library deleted successfully"})
    } catch (error) {
        console.error("Error deleting library:", error);
        return res.status(404).json({
            message: error.message
        });
    }
}

export const scanLibrary = async(req,res)=>{
    try {
        const {id}=req.params
        const library = await getLibraryService(
            id,
            req.user._id
        )

        const result= await scanLibraryService(library)
        return res.status(200).json({
            message:"Library scanned successfully",
            result
        })
    } catch (error) {
        console.error("Error scanning library:",error);
        return res.status(500).json({
            message: error.message
        });
    }
}