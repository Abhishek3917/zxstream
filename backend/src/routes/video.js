const { randomUUID } = require('crypto')
const express = require('express')
const fs = require('fs')
const path = require('path')
const parseRange = require('range-parser')
const { pipeline } = require('stream/promises')
const router = express.Router()


const video_dir = path.join(__dirname,"../videos")

router.get("/list", async(req,res)=>{

try{

const files =
await fs.promises.readdir(video_dir);


const videos =
files
.filter(file=>file.endsWith(".mp4"))
.map(file=>{

const id =
file.replace(".mp4","");


return {

id,

title:id,

url:`/api/video/${id}`

}

});


res.json(videos);


}
catch(err){

res.status(500).json({
error:"Cannot read videos"
})

}

})

router.get("/:id",async (req,res)=>{

    const VideoPath = path.join(
        video_dir , req.params.id + ".mp4"
    )

try{

    let stat
    try {
         stat = await fs.promises.stat(VideoPath)
        }
    catch {
        return res.status(404).send("Video not found")
          }
    const filesize = stat.size
    
    const rangeheader = req.headers.range

    if (!rangeheader) {
        res.status(416).send("Range required");
        return;
    }
    
    
    const range = parseRange(filesize , rangeheader);

    if(range === -1 || range === -2){
        res.status(416).set({'content-range': `bytes */${filesize}`}).send("range is not valid")
        return
    }

    const {start,end} = range[0]
    const chuncksize = end - start + 1

    const stream = fs.createReadStream(VideoPath , {
        start,
        end
    })

    res.writeHead(206 , {
        "content-range":
        `bytes ${start}-${end}/${filesize}`,
        "Accept-Ranges":"bytes",
        "content-length": chuncksize,
        "content-type": "video/mp4",
        "cache-control":"public, max-age=3600"

    })

    await pipeline(stream,res)
} 

catch(error){

    console.error("Streaming error:", error)
    if(!res.headersSent){
        res.status(500).send("Internal error")
    }

}

})

module.exports = router
