import { useAppData } from "@/context/AppContext";
import AuthForm from "./_components/AuthForm/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { auth } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!auth.data) {
      navigate("/");
    }
  }, [!!auth.data, navigate]);

  return <AuthForm />;
};

export default Auth;
