import axiosInstance from "@/axios/axios";

export default async (id: number) => {
  const res = await axiosInstance.delete<{ success: boolean }>(`/todos`, {
    data: { id },
  });

  return res.data;
};
