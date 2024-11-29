import { Todo, UpdateTodoDto } from "@/types/todo";
import axiosInstance from "@/axios/axios";
import { ApiResponse } from "@/types/api";

export default async (todo: UpdateTodoDto) => {
  const res = await axiosInstance.put<ApiResponse<{ todo: Todo }>>(
    `/todos`,
    todo,
  );

  return res.data;
};
