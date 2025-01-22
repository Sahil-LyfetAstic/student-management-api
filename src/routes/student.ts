import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import { addStudent, getStudentById, getStudents } from '../controllers/studentController';

const router = Router();


router.get('/student',authMiddleware(['admin']), getStudents);
router.get('/student/:id', authMiddleware(['admin']),getStudentById);
router.put('/student/:id', /* Update student logic */);
router.post('/student', authMiddleware(['admin']),addStudent);


export default router;