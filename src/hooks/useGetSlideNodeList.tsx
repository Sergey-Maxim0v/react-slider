import { ReactElement, useMemo } from "react";
import Slide from "../components/Slide";

export const useGetSlideNodeList = ({
  slidesCount,
  className,
}: {
  slidesCount: number;
  className: string;
}): ReactElement[] =>
  useMemo(() => {
    const result = [];
    for (let i = 0; i <= slidesCount; i++) {
      result.push(<Slide key={i} number={i} className={className} />);
    }
    return result;
  }, []);
