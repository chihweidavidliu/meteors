import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useResizeHandler = () => {
  const isTabletOrSmallDesktop = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const isMobileOrTablet = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const initialScreenWidth = isTabletOrSmallDesktop
    ? window.innerWidth
    : window.innerWidth * 0.6;

  const [screenWidth, setScreenWidth] = useState(initialScreenWidth);
  const [screenHeight] = useState(
    isMobileOrTablet ? window.innerHeight * 0.8 : 700
  );

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
