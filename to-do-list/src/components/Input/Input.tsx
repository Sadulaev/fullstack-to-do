import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  const { className, ...args } = props;
  return (
    <>
      <input className={styles.customInput} {...args} />
    </>
  );
};

export default Input;
