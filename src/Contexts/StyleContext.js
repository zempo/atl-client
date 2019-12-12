import React, { createContext, useState, useEffect } from "react";

export const StyleContext = createContext();

export const StyleContextProvider = props => {
  const [winHeight, setWinHeight] = useState(window.innerHeight);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    window.onload = () => {
      if (window.innerWidth < 1250) {
        setMobile(true);
      }
      if (window.innerWidth >= 1250) {
        setMobile(false);
      }
    };
    const listener = () => {
      setWinHeight(window.innerHeight);
      setWinWidth(window.innerWidth);
      if (window.innerWidth < 1250) {
        setMobile(true);
      }
      if (window.innerWidth >= 1250) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [winWidth, winHeight]);

  let tenthHeight = winHeight / 10;
  let tenthWidth = winWidth / 10;

  const value = {
    mobile,
    winHeight,
    tenthHeight,
    winWidth,
    tenthWidth
  };

  return (
    <StyleContext.Provider value={{ value }}>
      {props.children}
    </StyleContext.Provider>
  );
};
