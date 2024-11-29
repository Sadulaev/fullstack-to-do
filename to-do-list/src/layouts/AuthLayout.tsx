import { useAppData } from "@/context/AppContext";
import checkAdminToken from "@/requests/auth/checkAdminToken";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  const { authDispatch } = useAppData();

  const checkToken = async () => {
    authDispatch({ type: "update", payload: { checkStatus: "pending" } });

    try {
      const res = await checkAdminToken();

      if (res.success) {
        authDispatch({
          type: "update",
          payload: {
            data: res.user,
            checkStatus: "resolved",
          },
        });
      }
    } catch (err) {
      authDispatch({ type: "update", payload: { checkStatus: "rejected" } });
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken();
    }
  }, []);

  return children;
};

export default AuthLayout;
