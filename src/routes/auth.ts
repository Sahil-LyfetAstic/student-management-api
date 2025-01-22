import { Router } from 'express';
import { login } from '../controllers/authController';
import authMiddleware from "../middleware/authMiddleware";


const router = Router();

router.post('/login',login);

export default router;
