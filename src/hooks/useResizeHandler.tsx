import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useResizeHandler = () => {
  const isHighResolution = useMediaQuery({
    query: "(min-width: 2000px)",
  });

  const isTabletOrSmallDesktop = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const initialScreenWidth = isTabletOrSmallDesktop
    ? window.innerWidth
    : window.innerWidth * 0.6;

  const [screenWidth, setScreenWidth] = useState(initialScreenWidth);

  const initialScreenHeight = isHighResolution
    ? window.innerHeight * 0.85
    : window.innerHeight * 0.8;
  const [screenHeight] = useState(initialScreenHeight);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = isTabletOrSmallDesktop
        ? window.innerWidth
        : window.innerWidth * 0.8;

      setScreenWidth(() => width);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isTabletOrSmallDesktop, screenWidth]);

  return { screenWidth, screenHeight };
};
