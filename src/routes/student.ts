import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import { addStudent, getStudentById, getStudents } from '../controllers/studentController';

const router = Router();


router.get('/students',authMiddleware(['admin']), getStudents);
router.get('/students/:id', authMiddleware(['admin']),getStudentById);
router.post('/students', authMiddleware(['admin']),addStudent);
router.put('/students/:id', /* Update student logic */);


export default router;