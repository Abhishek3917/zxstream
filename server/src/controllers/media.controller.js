import { createMediaService, getMediaService, getMediaByIdService,updateMediaService,deleteMediaService} from "../services/media.service.js";

export const createMedia = async (req,res)=>{
    try {
        const { title,type,filePath,fileSize,duration,library}=req.body
        const media = await createMediaService({
            title,type,filePath,fileSize,duration,library
        })

        return res.status(201).json(media)
    } catch (error) {
        console.error("Error creating media:", error);
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getMedia = async(req,res)=>{
    try {

        const { libraryId } = req.params
        const media = await getMediaService(libraryId)
        return res.status(200).json(media)

    } catch (error) {

        console.error("Error getting media:", error);
        return res.status(500).json({
            message: "Unable to get media"
        });
    }
}

export const getMediaById = async (req, res) => {
    try {

        const {id} = req.params
        const media = await getMediaByIdService(id)
        return res.status(200).json(media)

    } catch (error) {

        console.error("Error getting media:", error);
        return res.status(404).json({
            message: error.message
        });
    }
};

export const updateMedia = async (req, res) => {
    try {

        const { id } = req.params;

        const updates = {
            title: req.body.title,
            type: req.body.type,
            duration: req.body.duration
        };

        Object.keys(updates).forEach((key) => {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        });

        const media = await updateMediaService(
            id,
            updates
        );

        return res.status(200).json(media);

    } catch (error) {

        console.error("Error updating media:", error);

        return res.status(404).json({
            message: error.message
        });
    }
};

export const deleteMedia = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteMediaService(id);

        return res.status(200).json({
            message: "Media deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting media:", error);

        return res.status(404).json({
            message: error.message
        });
    }
};