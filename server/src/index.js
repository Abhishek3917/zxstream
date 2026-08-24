import express from 'express'
import './config/env.js'
import cookieparser from 'cookie-parser'
import authRoutes from './routes/auth.router.js'
import libraryRouter from './routes/library.router.js'
import mediaRouter from './routes/media.router.js'
import { connectDB } from './config/db.js'
import streamRoute from './routes/stream.routes.js'
import cors from "cors";
const app = express()

app.use(express.json());
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use('/api/auth',authRoutes)
app.use("/api/libraries", libraryRouter); 
app.use("/api/media",mediaRouter)
app.use("/api/stream",streamRoute)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("server is running")
    connectDB()
})