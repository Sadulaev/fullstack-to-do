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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosWithPagination = getTodosWithPagination;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
const db_1 = __importDefault(require("../config/db"));
function getTodosWithPagination(page_1) {
    return __awaiter(this, arguments, void 0, function* (page, limit = 3, sortField = 'name', sortOrder) {
        const offset = (page - 1) * limit;
        const allowedSortFields = ['name'];
        if (!allowedSortFields.includes(sortField)) {
            throw new Error(`Недопустимое поле сортировки: ${sortField}`);
        }
        const query = `
    SELECT * FROM todos
    ${sortOrder ? `ORDER BY ${sortField} ${sortOrder} ` : ''}
    LIMIT $1 OFFSET $2;
    `;
        const [dataResult, countResult] = yield Promise.all([
            db_1.default.query(query, [limit, offset]),
            db_1.default.query(`SELECT COUNT(*) as total FROM todos`)
        ]);
        const total = parseInt(countResult.rows[0].total, 10);
        // Вычисляем номер последней страницы
        const lastPage = Math.ceil(total / limit);
        return {
            list: dataResult.rows,
            lastPage
        };
    });
}
function createTodo(name_1, email_1, description_1) {
    return __awaiter(this, arguments, void 0, function* (name, email, description, completed = false) {
        const query = `
    INSERT INTO todos (name, email, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
        const result = yield db_1.default.query(query, [name, email, description]);
        return result.rows[0];
    });
}
function updateTodo(todoId, todo) {
    return __awaiter(this, void 0, void 0, function* () {
        const todoById = (yield db_1.default.query(`SELECT * FROM todos WHERE id = $1 LIMIT 1`, [todoId])).rows[0];
        let isEditedByAdmin = todoById.edited_by_admin;
        if (todoById.name !== todo.name ||
            todoById.email !== todo.email ||
            todoById.description !== todo.description) {
            isEditedByAdmin = true;
        }
        const query = `
    UPDATE todos
    SET name = $1, email = $2, description = $3, completed = $4, edited_by_admin = $5
    WHERE id = $6
    RETURNING *;
  `;
        const result = yield db_1.default.query(query, [todo.name, todo.email, todo.description, todo.completed, isEditedByAdmin, todoId]);
        return result.rows[0];
    });
}
