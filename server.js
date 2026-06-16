const express = require('express')
const fs = require('fs')
const parseRange = require('range-parser')
const { pipeline } = require('stream/promises')

const app = express()
const port =3000
const VideoPath = "./video/video.mp4"

app.get("/api/video",async (req,res)=>{

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

app.listen(3000, () => {
    console.log("API running");
});


