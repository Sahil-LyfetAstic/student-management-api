import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import { addStudent, getStudentById, getStudents } from '../controllers/studentController';

const router = Router();


router.get('/',authMiddleware(['admin']), getStudents);
router.get('/:id', authMiddleware(['admin']),getStudentById);
router.put('/:id', /* Update student logic */);
router.post('/', authMiddleware(['admin']),addStudent);


export default router;