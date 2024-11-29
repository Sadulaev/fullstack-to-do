import { Request, Response } from 'express';
import { findAdminById, findUserByName } from '../services/authService';
import { comparePasswords, generateToken, verifyToken } from '@/utils/tokenUtils';

export async function login(req: Request, res: Response): Promise<void> {
    const { name, password } = req.body;

    const user = await findUserByName(name);
    if (!user) {
        res.status(404).json({ success: false, error: 'Пользователь не найден' });
        return;
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ success: false, error: 'Неверный пароль' });
        return;
    }

    const token = generateToken(user.id);
    res.json({
        success: true, token, user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}

export async function getAdminData(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1]!;


    try {
        const payload = verifyToken(token) as { id: number };
        const adminData = await findAdminById(payload.id)

        if (adminData) {
            res.status(200).json({
                success: true, user: {
                    id: adminData.id,
                    name: adminData.name,
                    email: adminData.email
                }
            })
        } else {
            res.status(401).json({ success: false, error: "Сессия просрочена. Авторизуйтесь снова" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Ошибка при проверке сессии. Авторизуйтесь снова' });
    }
}