const express = require('express')
const cors = require('cors')

const videoRouter = require("./routes/video")

const app = express()

app.use(cors());

app.use(
    "/api/video",
    videoRouter
)

app.listen(3000,()=>{
 console.log("API running");
});