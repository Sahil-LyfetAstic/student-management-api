import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import { addTask, getMyTasks, getTasks, updateTaskStatus } from '../controllers/TaskController';


const router = Router();

router.get('/', authMiddleware(['admin']), getTasks);
router.post('/', authMiddleware(['admin']), addTask);

/** Get Task to Students */
router.get('/mine', authMiddleware(['student']), getMyTasks);
router.put('/mine', authMiddleware(['student']), updateTaskStatus);
export default router;