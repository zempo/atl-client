import React, { createContext, useState, useEffect } from "react";

export const StyleContext = createContext();

export const StyleContextProvider = (props) => {
  const [winHeight, setWinHeight] = useState(window.innerHeight);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setWinHeight(window.innerHeight);
      setWinWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [winWidth, winHeight]);

  let tenthHeight = winHeight / 10;
  let tenthWidth = winWidth / 10;

  const value = {
    winHeight,
    tenthHeight,
    winWidth,
    tenthWidth
  };

  return <StyleContext.Provider value={{ value }}>{props.children}</StyleContext.Provider>;
};
