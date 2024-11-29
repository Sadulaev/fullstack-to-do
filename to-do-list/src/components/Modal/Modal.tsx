import { memo, ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.css";

type Props = {
  onClose?: () => void;
  children: ReactNode;
};

const Modal = (props: Props) => {
  const { children, onClose } = props;
  const modalWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalWindowRef.current &&
        !modalWindowRef.current.contains(event.target as Node)
      ) {
        onClose && onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles.backgroundContainer} ${children ? styles.showBackground : styles.hideBackground}`}
    >
      <div
        ref={modalWindowRef}
        className={`${styles.modalContainer} ${children ? styles.showModal : styles.hideModal}`}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
