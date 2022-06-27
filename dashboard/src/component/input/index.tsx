import React from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  onChange: (element: any) => void;
  type: string;
  placeholder: string;
  title?: string;
  erro?: boolean;
  erroMessage?: String;
  max?: number;
  value?: string;
}

const Button: React.FC<ButtonProps> = ({
  onChange,
  type,
  placeholder,
  title,
  erroMessage,
  erro,
  max,
  value,
}) => {
  return (
    <div className={styles.container}>
      <h6>{title}</h6>
      <div className={styles.contentInput}>
        <input
          type={type}
          style={{
            borderColor: erro && erroMessage !== "" ? "red" : "#7662F8",
          }}
          value={value}
          maxLength={max}
          placeholder={placeholder}
          onChange={onChange}
        />
        <p>{erroMessage}</p>
      </div>

      
    </div>
  );
};

export default Button;
