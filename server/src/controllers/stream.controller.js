import Media from '../models/media.model.js'
import { videoStreamService } from '../services/stream.service.js'
import fs from 'fs'

export const streamMedia = async(req,res)=>{
    try {
        const {id} = req.params
        const media = await Media.findOne({
            _id:id
        })
        if(!media){
            res.status(404).json({message:"invalide media id"})
        }

        const range = req.headers.range

        const streamData = await videoStreamService(
            media.filePath,
            range
        )

        const ext = media.filePath.split(".").pop().toLowerCase()
        const mimeTypes ={
            mp4: "video/mp4",
            webm: "video/webm",
            mov: "video/quicktime",
            mkv: "video/x-matroska",
            avi: "video/x-msvideo",
            m4v: "video/x-m4v"
        }
        const contentType = mimeTypes[ext] || 'application/octet-stream'

        if(streamData.type==="full"){
            res.writeHead(200,{
                "Content-Length":streamData.fileSize,
                "Content-Type":contentType,
                "Accept-Ranges":"bytes"
            })
            fs.createReadStream(media.filePath).pipe(res)
            return 
        }
        res.writeHead(206,{
            "Content-Range":`bytes ${streamData.start}-${streamData.end}/${streamData.fileSize}`,
            "Accept-Range": "bytes",
            "Content-Length":streamData.chunckSize,
            "Content-Type":contentType
        })
        streamData.stream.pipe(res)

    } catch (error) {
        console.error("Error streaming media:",error);
        return res.status(500).json({message: "Unable to stream media"});
    }
}