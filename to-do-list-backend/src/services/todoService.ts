import pool from '../config/db';

interface Todo {
    id: number;
    name: string;
    email: string;
    description: string;
    completed: boolean;
    'edited_by_admin': boolean;
}

interface PaginatedResult<T> {
    list: T[];
    lastPage: number;
}

export async function getTodosWithPagination(
    page: number,
    limit: number = 3,
    sortField: string = 'name',
    sortOrder?: 'ASC' | 'DESC',
): Promise<PaginatedResult<Todo[]>> {
    const offset = (page - 1) * limit;

    const allowedSortFields = ['name'];
    if (!allowedSortFields.includes(sortField)) {
        throw new Error(`Недопустимое поле сортировки: ${sortField}`);
    }

    const query = `
    SELECT * FROM todos
    ${sortOrder ? `ORDER BY ${sortField} ${sortOrder} ` : ''}
    LIMIT $1 OFFSET $2;
    `
    
    const [dataResult, countResult] = await Promise.all([
        pool.query(query, [limit, offset]),
        pool.query(`SELECT COUNT(*) as total FROM todos`)
    ]);

    const total = parseInt(countResult.rows[0].total, 10);

    // Вычисляем номер последней страницы
    const lastPage = Math.ceil(total / limit);

    return {
        list: dataResult.rows,
        lastPage
    };
}

export async function createTodo(name: string, email: string, description: string, completed: boolean = false): Promise<Todo> {
    const query = `
    INSERT INTO todos (name, email, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const result = await pool.query(query, [name, email, description]);
    return result.rows[0];
}

export async function updateTodo(todoId: number, todo: Partial<Todo>): Promise<Todo> {
    const todoById: Todo = (await pool.query(`SELECT * FROM todos WHERE id = $1 LIMIT 1`, [todoId])).rows[0];

    let isEditedByAdmin = todoById.edited_by_admin;

    if(
        todoById.name !== todo.name ||
        todoById.email !== todo.email ||
        todoById.description !== todo.description
    ) {
        isEditedByAdmin = true;
    }

    const query = `
    UPDATE todos
    SET name = $1, email = $2, description = $3, completed = $4, edited_by_admin = $5
    WHERE id = $6
    RETURNING *;
  `;
    const result = await pool.query(query, [todo.name, todo.email, todo.description, todo.completed, isEditedByAdmin, todoId]);
    return result.rows[0];
}