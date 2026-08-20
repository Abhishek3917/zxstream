import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { createLibrary,getLibraries,getLibrary,updateLibrary,deleteLibrary } from '../controllers/library.controller.js'
const router = express.Router()

// library

router.post("/",protectRoute,createLibrary)
router.get("/",protectRoute,getLibraries)
router.get("/:id",protectRoute,getLibrary)
router.patch("/:id",protectRoute,updateLibrary)
router.delete("/:id",protectRoute,deleteLibrary)

export default router