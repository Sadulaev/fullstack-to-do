import { hashPassword } from '@/utils/tokenUtils';
import pool from './db';

export async function runMigrations(): Promise<void> {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    await pool.query(`
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
    const adminExistsResult = await pool.query(adminExistsQuery);

    const adminCount = parseInt(adminExistsResult.rows[0].count, 10);

    if (adminCount === 0) {
      const passwordHash = await hashPassword('123');
      await pool.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
        `,
        ['admin', 'sadulaev.work@gmail.com', passwordHash]
      );
    }
  } catch (error) {
    console.error('Error during migrations:', error);
    process.exit(1);
  }
}