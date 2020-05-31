import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useResizeHandler = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const initialScreenWidth = isTabletOrMobile
    ? window.innerWidth
    : window.innerWidth * 0.8;

  const [screenWidth, setScreenWidth] = useState(initialScreenWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = isTabletOrMobile
        ? window.innerWidth
        : window.innerWidth * 0.8;

      setScreenWidth(() => width);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isTabletOrMobile, screenWidth]);

  return { screenWidth };
};