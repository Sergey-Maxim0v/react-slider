import { FC } from "react";
import { IArrow } from "./types";
import styles from "./styles.module.scss";

const Arrow: FC<IArrow> = ({ direction, className, onClick }) => {
  return (
    <button
      className={`${className} ${styles.arrow} ${styles[direction]}`}
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
        />
      </svg>
    </button>
  );
};

export default Arrow;
