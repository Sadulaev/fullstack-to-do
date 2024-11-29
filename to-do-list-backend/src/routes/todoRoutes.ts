import { Router } from 'express';
import { fetchTodos, addTodo, modifyTodo } from '../controllers/todoController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const router = Router();

router.get('/', fetchTodos);
router.post('/', addTodo);

router.put('/', authMiddleware, modifyTodo);

export default router;