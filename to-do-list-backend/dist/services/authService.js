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
exports.findUserByName = findUserByName;
exports.findAdminById = findAdminById;
const db_1 = __importDefault(require("../config/db"));
function findUserByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    SELECT * FROM users WHERE name = $1;
  `;
        const result = yield db_1.default.query(query, [name]);
        return result.rows[0] || null;
    });
}
function findAdminById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
      SELECT * FROM users WHERE id = $1 AND name = 'admin';
    `;
        const result = yield db_1.default.query(query, [id]);
        return result.rows[0] || null;
    });
}
