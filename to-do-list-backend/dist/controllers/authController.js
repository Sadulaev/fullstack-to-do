"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.getAdminData = getAdminData;
const authService_1 = require("../services/authService");
const tokenUtils_1 = require("@/utils/tokenUtils");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        const user = yield (0, authService_1.findUserByName)(name);
        if (!user) {
            res.status(404).json({ success: false, error: 'Пользователь не найден' });
            return;
        }
        const isPasswordValid = yield (0, tokenUtils_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, error: 'Неверный пароль' });
            return;
        }
        const token = (0, tokenUtils_1.generateToken)(user.id);
        res.json({
            success: true, token, user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
}
function getAdminData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        try {
            const payload = (0, tokenUtils_1.verifyToken)(token);
            const adminData = yield (0, authService_1.findAdminById)(payload.id);
            if (adminData) {
                res.status(200).json({
                    success: true, user: {
                        id: adminData.id,
                        name: adminData.name,
                        email: adminData.email
                    }
                });
            }
            else {
                res.status(401).json({ success: false, error: "Сессия просрочена. Авторизуйтесь снова" });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Ошибка при проверке сессии. Авторизуйтесь снова' });
        }
    });
}
