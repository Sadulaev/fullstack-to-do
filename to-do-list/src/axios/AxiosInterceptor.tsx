import React, { useEffect, useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { useModal } from "@/context/ModalContext";
import { ErrorResponse } from "@/types/api";
import axiosInstance from "./axios";

interface AxiosInterceptorProps {
  children: React.ReactNode;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const modal = useModal();
  const [isInterceptorsReady, setIsInterceptorsReady] = useState(false);

  useEffect(() => {
    setIsInterceptorsReady(false);
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<ErrorResponse>) => {
        if (error?.response?.data) {
          modal({
            content: <h3>{error?.response?.data.error}</h3>,
            timeout: 3000,
          });
        }

        if (error.response?.status === 401) {
          window.location.href = "/auth";
        }
        return Promise.reject(error);
      },
    );

    setIsInterceptorsReady(true);

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [modal]);

  if (isInterceptorsReady) {
    return children;
  }
};

export default AxiosInterceptor;
