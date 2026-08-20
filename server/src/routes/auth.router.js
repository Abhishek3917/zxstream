import express from 'express'
import { login, signup,logout,sessionAuth,terminate} from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()
// authentication
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/session',protectRoute,sessionAuth)
router.delete('/account',protectRoute,terminate)



export default router