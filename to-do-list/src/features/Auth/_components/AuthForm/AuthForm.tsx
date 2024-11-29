import Input from "@/components/Input/Input";
import styles from "./styles.module.css";
import Button from "@/components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppData } from "@/context/AppContext";
import login from "@/requests/auth/login";
import { useNavigate } from "react-router-dom";

type LoginValues = {
  name: string;
  password: string;
};

// Схема валидации с Yup
const loginValidationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  password: yup.string().required("Поле обязательно для заполнения"),
});

const AuthForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const { auth, authDispatch } = useAppData();

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    authDispatch({ type: "update", payload: { loginStatus: "pending" } });

    try {
      const res = await login(data);

      if (res.success) {
        localStorage.setItem("token", res.token);
        authDispatch({
          type: "update",
          payload: {
            data: res.user,
            loginStatus: "resolved",
          },
        });

        navigate("/");
      }
    } catch (err) {
      authDispatch({ type: "update", payload: { loginStatus: "rejected" } });
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as keyof LoginValues;

    setError(field, { message: "" });
    setValue(field, e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Админ</h1>
        <Input id="name" placeholder="Логин" onChange={onChangeField} />
        {errors.name && !!errors.name.message?.length && (
          <p>{errors.name.message}</p>
        )}
        <Input
          id="password"
          placeholder="Пароль"
          type="password"
          onChange={onChangeField}
        />
        {errors.password && !!errors.password.message?.length && (
          <p>{errors.password.message}</p>
        )}
        <Button
          type="submit"
          disabled={auth.loginStatus === "pending"}
          isLoading={auth.loginStatus === "pending"}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
