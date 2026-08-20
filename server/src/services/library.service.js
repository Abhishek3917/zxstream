import Library from "../models/library.model.js";

// import { scanDirectory } from "../media/scanner/scanner.service.js";
export const createLibraryService = async ({name,type,owner,path})=>{
    if(!name || !type || !path){
        throw new Error("all feilds are required")
    }

    const existingLibrary = await Library.findOne({
        name,
        owner
    })

    if(existingLibrary){
        throw new Error("the Library is existing")
    }

    const library = await Library.create({
        name,
        type,
        path,
        owner
    })

    return library
}

export const getLibrariesService = async (userId)=>{
    const libraries= await Library.find({
        // _id:userId,
        owner:userId
    })
    if(!libraries){
        throw new Error("Library not found");
    }
    return libraries;
}

export const getLibraryService = async (libraryId,userId)=>{
    const library = await Library.findOne({
        _id:libraryId,
        owner:userId
    })

    if(!library){
        throw new Error("library not found")
    }

    return library
}

export const updateLibraryService = async(libraryId,userId,updates)=>{
    const library = await Library.findOneAndUpdate(
        {
            _id:libraryId,
            owner:userId
        },
        {
            $set:updates
        },
        {
            returnDocument: 'after'
        }
    )
    if(!library){
        throw new Error("Library not found");
    }
    return library
}

export const deleteLibraryServices = async (libraryId,userId)=>{
    const library= await Library.findByIdAndDelete({
        _id:libraryId,
        owner:userId
    })
    if(!library){
        throw new Error("Library not found");
    }
    return library
}
// export const scanLibraryService = async (library)=>{
    // const files = await scanDirectory(
        // library.path
    // );
    // return files
// }
