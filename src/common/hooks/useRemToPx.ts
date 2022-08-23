import { useMemo } from "react";

export const useRemToPx = (multiplier: number) => {
  const result = useMemo(() => {
    return parseInt(getComputedStyle(document.documentElement).fontSize) * multiplier;
  }, [multiplier]);

  return { result };
};
