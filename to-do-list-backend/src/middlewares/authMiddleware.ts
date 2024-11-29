import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtils';

export interface ExtendedRequest extends Request {
    user?: {id: number}
  }

export function authMiddleware(req: ExtendedRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Для выполнения данного действия необходимо авторизоваться' });
    return;
  }

  try {
    const payload = verifyToken(token) as {id: number};
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Сессия просрочена. Авторизуйтесь снова' });
  }
}