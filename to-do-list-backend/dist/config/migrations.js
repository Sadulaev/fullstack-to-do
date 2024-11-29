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
exports.runMigrations = runMigrations;
const tokenUtils_1 = require("@/utils/tokenUtils");
const db_1 = __importDefault(require("./db"));
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
            yield db_1.default.query(`
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
            yield db_1.default.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        edited_by_admin BOOLEAN DEFAULT FALSE
      );
    `);
            const adminExistsQuery = `
      SELECT COUNT(*) AS count 
      FROM users 
      WHERE name = 'admin';
    `;
            const adminExistsResult = yield db_1.default.query(adminExistsQuery);
            const adminCount = parseInt(adminExistsResult.rows[0].count, 10);
            if (adminCount === 0) {
                const passwordHash = yield (0, tokenUtils_1.hashPassword)('123');
                yield db_1.default.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
        `, ['admin', 'sadulaev.work@gmail.com', passwordHash]);
            }
        }
        catch (error) {
            console.error('Error during migrations:', error);
            process.exit(1);
        }
    });
}
