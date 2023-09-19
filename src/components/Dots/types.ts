export interface IDots {
  indexCurrentSlide: number;
  setIndexCurrentSlide: (val: number) => void;
  className?: HTMLElement["className"];
}
