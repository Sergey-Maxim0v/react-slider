import { FC } from "react";
import { IDot } from "./types";
import styles from "./styles.module.scss";

const Dot: FC<IDot> = ({ isActive, onClick }) => {
  return (
    <div
      className={`${styles.dot} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    ></div>
  );
};

export default Dot;
