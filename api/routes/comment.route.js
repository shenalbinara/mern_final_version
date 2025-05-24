import express from 'express';
import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', createComment);
router.get('/getPostComments/:postId', getPostComments);
//router.put('/likeComment/:commentId', likeComment); 
router.put('/likeComment/:commentId', likeComment);
//router.put('/editComment/:commentId', verifyToken, editComment);
//router.delete('/deleteComment/:commentId', deleteComment);




 


export default router;
