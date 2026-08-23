import fs from 'fs'

export const videoStreamService = async(filePath,range) =>{
    const stat = await fs.promises.stat(filePath)
    const fileSize = stat.size
    if(!range){
        return{
            type:"full",
            fileSize
        }
    }
    const streamParts = range.replace("bytes=","").split("-")
    const start = parseInt(streamParts[0],10)
    const end = streamParts[1] ? parseInt(streamParts[1],10) : fileSize -1
    if(isNaN(start) || start >=fileSize || end>= fileSize){
        throw new Error("invalid range 416")
    }

    const chunckSize = 3 * 1024 *1024 
    const stream = fs.createReadStream(filePath,{
        start,
        end
    })
    return{
        type:"range",
        stream,
        start,
        end,
        chunckSize,
        fileSize
    }

}   