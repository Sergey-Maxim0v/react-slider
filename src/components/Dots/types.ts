export interface IDots {
  length: number;
  indexCurrentSlide: number;
  setIndexCurrentSlide: (val: number) => void;
  className?: HTMLElement["className"];
}
