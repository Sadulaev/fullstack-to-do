import { CreateTodoDto, Todo } from "@/types/todo";
import axiosInstance from "@/axios/axios";
import { ApiResponse } from "@/types/api";

export default async (todo: CreateTodoDto) => {
  const res = await axiosInstance.post<ApiResponse<{ todo: Todo }>>(
    `/todos`,
    todo,
  );

  return res.data;
};
