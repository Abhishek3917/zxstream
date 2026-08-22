import fs from 'fs/promises'
import path from 'path'
import Media from "../../models/media.model.js";
import { extractMetadata } from '../metadata/metadata.service.js';
const VIDEO_EXTENSIONS = [
    ".mp4",
    ".mkv",
    ".avi",
    ".mov",
    ".webm",
    ".m4v"
]

export const scanDirectory = async (directory)=>{
    try {
        const files = [];
        const entries = await fs.readdir(directory,{
            withFileTypes:true
        })
        for(const entry of entries){
            const fullpath = path.join(
                directory,
                entry.name
            )
        
        if(entry.isDirectory()){
            const nestedfiles= await scanDirectory(
                fullpath
            )
        files.push(...nestedfiles)
        }else if(entry.isFile()){
            const extension= path.extname(entry.name).toLowerCase()
        if(VIDEO_EXTENSIONS.includes(extension)){
            files.push(fullpath)
        }
        }
    }
        return files
    }catch (error) {
    console.error("Error scanning directory:", error);
    throw error;
}
}

export const scanLibraryService = async (library) => {

    const files = await scanDirectory(
        library.path
    );

    let added = 0;
    let existing = 0;

    for (const filePath of files) {

        const mediaExists = await Media.findOne({
            library: library._id,
            filePath: filePath
        });

        if (mediaExists) {
            existing++;
            continue;
        }
        const metadata = await extractMetadata(filePath)
        const title = path.basename(
                filePath,
                path.extname(filePath)
            )

        await Media.create({
            title,
            type: library.type,
            filePath: filePath,
            library: library._id,
            ...metadata
        });
       added++;
    }

    return {
        totalFiles: files.length,
        added,
        existing
    };
};
