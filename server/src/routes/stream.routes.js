import express from "express"
import { streamMedia } from "../controllers/stream.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()
router.get("/:id",protectRoute,streamMedia)

export default router