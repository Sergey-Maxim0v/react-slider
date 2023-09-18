export interface IArrow {
  direction: ARROW_DIRECTION;
  onClick: () => void;
  className?: HTMLElement["className"];
}

export enum ARROW_DIRECTION {
  left = "_left",
  right = "_right",
}
