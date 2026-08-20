import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { createMedia, deleteMedia, getMedia, getMediaById, updateMedia } from '../controllers/media.controller.js'

const router = express.Router()

router.post("/",protectRoute,createMedia)
router.get("/library/:libraryId",protectRoute,getMedia)
router.get("/:id",protectRoute,getMediaById)
router.patch("/:id",protectRoute,updateMedia)
router.delete("/:id",protectRoute,deleteMedia)

export default router