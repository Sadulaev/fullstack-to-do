import Button from "@/components/Button/Button";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context/ModalContext";
import { useAppData } from "@/context/AppContext";
import { useCallback } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { auth, authDispatch } = useAppData();
  const modal = useModal();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    authDispatch({ type: "logout" });

    modal({ content: <h3>Вы вышли из аккаунта</h3>, timeout: 3000 });
  }, [authDispatch]);

  return (
    <header className={styles.container}>
      <h1 onClick={() => navigate("/")}>To do list</h1>
      {!auth.data ? (
        <Button
          onClick={() =>
            navigate(window.location.href.includes("/auth") ? "/" : "/auth")
          }
        >
          {window.location.href.includes("/auth")
            ? "Вернуться"
            : "Авторизоваться"}
        </Button>
      ) : (
        <Button onClick={logout}>Выйти из аккаунта</Button>
      )}
    </header>
  );
};

export default Header;
