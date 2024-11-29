import { TodoPaginationResponse } from "@/types/todo";
import axiosInstance from "@/axios/axios";
import { ApiResponse } from "@/types/api";

export default async (page: number, sort?: string) => {
  const res = await axiosInstance.get<ApiResponse<TodoPaginationResponse>>(
    `/todos`,
    {
      params: { page, sort: !!sort?.length ? sort : undefined },
    },
  );

  return res.data;
};
