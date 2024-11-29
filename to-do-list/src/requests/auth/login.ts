import { ApiResponse } from "@/types/api";
import { LoginResponse, UserSignInDto } from "@/types/auth";
import axiosInstance from "@/axios/axios";

export default async (authData: UserSignInDto) => {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    authData,
  );

  return res.data;
};
