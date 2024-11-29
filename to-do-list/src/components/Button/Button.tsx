import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";
import Loader from "../Loader/Loader";

type VariantType = "primary" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantType;
  isLoading?: boolean;
};

const Button = (props: Props) => {
  const { variant = "primary", isLoading = false, children, ...args } = props;

  const variants = {
    primary: styles.btnPrimary,
    secondary: styles.btnSecondary,
  };

  const loaderColors: Record<VariantType, "white" | "blue"> = {
    primary: "white",
    secondary: "blue",
  };

  return (
    <button
      className={`${styles.btn} ${variants[variant]} ${isLoading ? styles.noEvents : ""}`}
      {...args}
    >
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader color={loaderColors[variant]} scale={1.2} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
