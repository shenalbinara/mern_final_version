import express from 'express';
import { test,  signout, getUsers, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
// router.put('/update/:userId', verifyToken, updateUser);
router.post('/signout', signout);
router.get('/getusers', getUsers);
router.delete('/delete', deleteUser);
router.get('/:userId', getUsers)





export default router;


