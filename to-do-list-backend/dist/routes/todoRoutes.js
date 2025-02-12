"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("@/middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', todoController_1.fetchTodos);
router.post('/', todoController_1.addTodo);
router.put('/', authMiddleware_1.authMiddleware, todoController_1.modifyTodo);
exports.default = router;
