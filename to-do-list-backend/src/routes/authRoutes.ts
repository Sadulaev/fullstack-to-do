import { Router } from 'express';
import { getAdminData, login } from '../controllers/authController';


const router = Router();

router.post('/login', login);
router.post('/check', getAdminData);

export default router;