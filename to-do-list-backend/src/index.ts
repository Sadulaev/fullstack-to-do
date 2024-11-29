import express, { Express } from "express"
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import cors from 'cors';
import { runMigrations } from "./config/migrations";

dotenv.config();

const app: Express = express();

app.use(cors())

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const port = process.env.PORT || 3000;

(async () => {
  try {
    // Запускаем миграции
    await runMigrations();

    // Запускаем сервер
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
})();