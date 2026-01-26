import express from 'express';
import {protectRoute} from "../middleware/auth.middleware.js";
import {getMessages, getUserSidebar, sendMessages} from "../controllers/message.controller.js";

const router = express.Router();


router.get('/users', protectRoute, getUserSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send', protectRoute, sendMessages)

export default router;