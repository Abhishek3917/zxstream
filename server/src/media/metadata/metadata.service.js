import {execFile} from "child_process"

const runFFprobe = (filePath) =>{
    return new Promise((resolve,reject)=>{
        const args = ["-v","quiet","-print_format","json","-show_format","-show_streams",filePath]
        execFile("ffprobe",args,(error,stdout)=>{
            if(error){
                return reject(error)
            }
            try {
                const parsedData = JSON.parse(stdout)
                resolve(parsedData)
            } catch (error) {
                reject(error)
            }
        })
    })
}

export const extractMetadata = async(filePath)=>{
    try {
    const data = await runFFprobe(filePath);
    const videoStream = data.streams.find(stream=>stream.codec_type==="video")
    const audioStream = data.streams.filter(stream=>stream.codec_type==="audio")
    const subtitleStream = data.streams.filter(stream=>stream.codec_type==="subtitle")

    return{
            duration : Number(data.format?.duration || 0),
            fileSize: Number(data.format?.size || 0),
            video: videoStream ?{
                codec:videoStream.codec_name || null,
                width:videoStream.width || null,
                height:videoStream.height || null,
                bitrate:Number(videoStream.bit_rate || 0),
                framerate: videoStream.r_frame_rate || null,
            }:null,
            audio:audioStream.map(stream=>({
                codec:stream.codec_name|| null,
                language:stream.tags?.language|| null,
                channels:stream.channels || null,
            })),
            subtitle:subtitleStream.map(stream=>({
                language:stream.tags?.language || null
            }))
        }
    } catch (error) {
            console.error(`Metadata extraction failed for ${filePath}:`, error.message);
            throw error;           
        }
}