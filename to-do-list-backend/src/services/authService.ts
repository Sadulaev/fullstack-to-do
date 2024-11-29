import pool from '../config/db';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function findUserByName(name: string): Promise<User | null> {
  const query = `
    SELECT * FROM users WHERE name = $1;
  `;

  const result = await pool.query(query, [name]);

  return result.rows[0] || null;
}

export async function findAdminById(id: number): Promise<User | null> {
    const query = `
      SELECT * FROM users WHERE id = $1 AND name = 'admin';
    `;
  
    const result = await pool.query(query, [id]);
  
    return result.rows[0] || null;
  }