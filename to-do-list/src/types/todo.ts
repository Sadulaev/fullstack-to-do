export interface Todo {
  id: number;
  name: string;
  email: string;
  description: string;
  completed: boolean;
  edited_by_admin: boolean;
}

export interface TodoPaginationResponse {
  list: Todo[];
  lastPage: number;
}

export interface CreateTodoDto {
  name: string;
  email: string;
  description: string;
}

export type UpdateTodoDto = Omit<Todo, "edited_by_admin">;
