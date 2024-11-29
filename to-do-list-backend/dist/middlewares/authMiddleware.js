"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const tokenUtils_1 = require("../utils/tokenUtils");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Для выполнения данного действия необходимо авторизоваться' });
        return;
    }
    try {
        const payload = (0, tokenUtils_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, error: 'Сессия просрочена. Авторизуйтесь снова' });
    }
}
