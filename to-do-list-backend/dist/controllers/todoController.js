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
exports.fetchTodos = fetchTodos;
exports.addTodo = addTodo;
exports.modifyTodo = modifyTodo;
const todoService_1 = require("../services/todoService");
function fetchTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = req.query.page;
            const sort = req.query.sort;
            const todos = yield (0, todoService_1.getTodosWithPagination)(+page, 3, 'name', sort);
            res.json(Object.assign({ success: true }, todos));
        }
        catch (err) {
            res.status(500).json({ success: false, error: 'Ошибка при получении записей. Попробуйте снова' });
        }
    });
}
function addTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, description, completed } = req.body;
            const todo = yield (0, todoService_1.createTodo)(name, email, description, completed);
            res.status(201).json({ success: true, todo });
        }
        catch (err) {
            res.status(500).json({ success: false, error: 'Ошибка при создании записи. Попробуйте снова' });
        }
    });
}
function modifyTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, email, description, completed } = req.body;
            const todo = yield (0, todoService_1.updateTodo)(id, { name, email, description, completed });
            res.json({ success: true, todo });
        }
        catch (err) {
            res.status(500).json({ success: false, error: 'Ошибка при обновлении записи. Попробуйте снова' });
        }
    });
}
module.exports = { fetchTodos, addTodo, modifyTodo };
