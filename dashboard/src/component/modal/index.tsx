import React from "react";
import styles from "./styles.module.css";
import { AiOutlineClose } from "react-icons/ai";
interface ButtonProps {
  setOpen: any;
  children: any;
}

const Modal: React.FC<ButtonProps> = ({ children, setOpen }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <AiOutlineClose
            size={30}
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
