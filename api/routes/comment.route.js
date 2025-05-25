import express from 'express';
import { createComment, deleteComment, getcomments, getPostComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', createComment);
router.get('/getPostComments/:postId', getPostComments);
//router.put('/likeComment/:commentId', likeComment); 
router.put('/likeComment/:commentId', likeComment);
//router.put('/editComment/:commentId', verifyToken, editComment);
//router.delete('/deleteComment/:commentId', deleteComment);
router.get('/getcomments', getcomments);
router.delete('/deleteComment/:commentId', deleteComment);





 


export default router;
