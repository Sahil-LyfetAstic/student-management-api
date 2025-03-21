import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import { addTask, getMyTasks, getTasks, updateTaskStatus } from '../controllers/TaskController';


const router = Router();

router.get('/task', authMiddleware(['admin']), getTasks);
router.post('/task', authMiddleware(['admin']), addTask);

/** Get Task to Students */
router.get('/task/mine', authMiddleware(['student']), getMyTasks);
router.put('/task/mine', authMiddleware(['student']), updateTaskStatus);
export default router;