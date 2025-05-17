/*
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';  // ✅ ADD THIS LINE

const router = express.Router();

router.post('/create', verifyToken, create);

export default router;

*/

// post.route.js
import express from 'express';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', create); // Removed verifyToken middleware
router.get('/getposts', getposts)

export default router;