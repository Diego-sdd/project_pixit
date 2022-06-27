import React from "react";
import ReactLoading from "react-loading";
import styles from "./styles.module.css";
type LoadingType =
  | "blank"
  | "balls"
  | "bars"
  | "bubbles"
  | "cubes"
  | "cylon"
  | "spin"
  | "spinningBubbles"
  | "spokes";

interface ButtonProps {
  type?: LoadingType;
  color?: string;
  loading: Boolean;
}

const Loading: React.FC<ButtonProps> = ({ type, color, loading }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <ReactLoading
          type={type || "spokes"}
          color={color || "#3b3b3b"}
          height={50}
          width={50}
        />
      </div>
    );
  } else {
    return null;
  }
};
export default Loading;
