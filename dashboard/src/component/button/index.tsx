import React from 'react';
import styles from "./styles.module.css"


interface ButtonProps{
  onClick: () => void;
  title: String;
  style?: any;
};

const Button: React.FC<ButtonProps> = ({ onClick, title, style }) => {


  return(
    <div className={styles.container}>
      <button onClick={onClick} style={style}>{title}</button>
    </div>
  )
}

export default Button