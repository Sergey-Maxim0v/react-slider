import { FC } from "react";
import { IDot } from "./types";
import styles from "./styles.module.scss";

const Dot: FC<IDot> = ({ isActive, onClick }) => {
  return (
    <button
      className={`${styles.dot} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    ></button>
  );
};

export default Dot;
