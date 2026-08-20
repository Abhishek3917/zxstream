import Media from "../models/media.model.js";

export const createMediaService = async ({
    title,
    type,
    filePath,
    fileSize,
    duration,
    library
}) => {

    if (!title || !type || !filePath || !library) {
        throw new Error(
            "Title, type, file path and library are required"
        );
    }

    const existingMedia = await Media.findOne({
        filePath,
        library
    });

    if (existingMedia) {
        throw new Error("Media already exists");
    }

    return await Media.create({ 
        title, 
        type, 
        filePath, 
        fileSize, 
        duration, 
        library
    });
};

export const getMediaService = async (libraryId) => {
    return await Media.find({
        library: libraryId
    });
};

export const getMediaByIdService = async (mediaId) => {
    const media = await Media.findById(mediaId);
    if (!media) {
        throw new Error("Media not found");
    }
    return media;
};

export const updateMediaService = async (mediaId,updates)=>{
    const media = await Media.findByIdAndUpdate(
        mediaId,
        {
            $set:updates
        },
        {
            returnDocument: 'after'
        }
    )
    if (!media) {
        throw new Error("Media not found");
    }

    return media;
}

export const deleteMediaService = async (mediaId) => {

    const media = await Media.findByIdAndDelete(mediaId);

    if (!media) {
        throw new Error("Media not found");
    }

    return media;
};