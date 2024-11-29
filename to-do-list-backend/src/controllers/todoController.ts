import { Request, Response } from "express";

import { getTodosWithPagination, createTodo, updateTodo } from '../services/todoService';

export async function fetchTodos(req: Request, res: Response) {
    try {
        const page = req.query.page as string;
        const sort = req.query.sort as 'ASC' | 'DESC';
        const todos = await getTodosWithPagination(+page, 3, 'name', sort)
        res.json({ success: true, ...todos });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Ошибка при получении записей. Попробуйте снова' })
    }
}

export async function addTodo(req: Request, res: Response) {
    try {
        const { name, email, description, completed } = req.body;
        const todo = await createTodo(name, email, description, completed);
        res.status(201).json({ success: true, todo });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Ошибка при создании записи. Попробуйте снова' })
    }
}

export async function modifyTodo(req: Request, res: Response) {
    try {
        const { id, name, email, description, completed } = req.body;
        const todo = await updateTodo(id,  {name, email, description, completed});
        res.json({ success: true, todo });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Ошибка при обновлении записи. Попробуйте снова' })
    }
}

module.exports = { fetchTodos, addTodo, modifyTodo };