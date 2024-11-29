import { ApiResponse } from "@/types/api";
import axiosInstance from "@/axios/axios";
import { User } from "@/types/auth";

export default async () => {
  const res =
    await axiosInstance.post<ApiResponse<{ user: User }>>("/auth/check");

  return res.data;
};
