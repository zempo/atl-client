import React, { useEffect, useState } from "react";

export const LightLogo = ({ width, height }) => {
  // created with https://svg2jsx.com/
  return (
    <svg
      className="menu-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 238.125 169.07"
    >
      <g
        fill="none"
        stroke="#f3f3f3"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="22.796"
      >
        <path
          strokeLinejoin="round"
          d="M219.724 154.195s-21.632 22.408-36.016 25.28c-27.245 5.442-62.185-38.092-81.382-18.008-8.59 8.988-2.608 34.232 9.696 36.017 14.617 2.12 23.203-16.97 23.203-37.748 0-20.779-7.965-95.235-10.043-101.468-.961-2.884-20.503 16.39-38.623 39.056-21.05 26.33-37.911 52.716-37.911 52.716"
          transform="translate(0 -42.598)"
        ></path>
        <path
          strokeLinejoin="miter"
          d="M24.753 130.3s44.327-27.012 77.226-15.238c32.9 11.775 54.37 7.62 70.647-3.116"
          transform="translate(0 -42.598)"
        ></path>
      </g>
    </svg>
  );
};

export const DarkLogo = ({ width, height }) => {
  // created with https://svg2jsx.com/
  return (
    <svg
      className="menu-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 238.125 169.07"
    >
      <g
        fill="none"
        stroke="#313131"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="22.796"
      >
        <path
          strokeLinejoin="round"
          d="M219.724 154.195s-21.632 22.408-36.016 25.28c-27.245 5.442-62.185-38.092-81.382-18.008-8.59 8.988-2.608 34.232 9.696 36.017 14.617 2.12 23.203-16.97 23.203-37.748 0-20.779-7.965-95.235-10.043-101.468-.961-2.884-20.503 16.39-38.623 39.056-21.05 26.33-37.911 52.716-37.911 52.716"
          transform="translate(0 -42.598)"
        ></path>
        <path
          strokeLinejoin="miter"
          d="M24.753 130.3s44.327-27.012 77.226-15.238c32.9 11.775 54.37 7.62 70.647-3.116"
          transform="translate(0 -42.598)"
        ></path>
      </g>
    </svg>
  );
};

export const EditorLogo = () => {
  const [currentTheme, setCurrentTheme] = useState("#455A64");
  useEffect(() => {
    const colorThemes = [
      "#AD1457",
      "#d45d5d",
      "#E76F51",
      "#6B8F71",
      "#388E3C",
      "#2E7D32",
      "#00695C",
      "#455A64",
      "#2E6171",
      "#1565C0",
      "#4464AD",
      "#67597A",
      "#5E4955",
      "#5D4037",
      "#8E3B46",
      "#424242",
      "#264653",
      "#073B3A",
      "#034078",
      "#283593",
      "#001F54",
      "#391463",
      "#41292C",
      "#1B2021"
    ];
    const randomColors = arr => {
      let selectedColor = arr[Math.floor(Math.random() * arr.length)];
      setCurrentTheme(selectedColor);
    };
    let changeColors = window.setInterval(randomColors(colorThemes), 1000);

    return () => {
      clearInterval(changeColors);
    };
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="600mm"
      height="300mm"
      viewBox="0 0 600 300"
    >
      <g transform="translate(0 3)">
        <rect
          width="115.27"
          height="297.01"
          x="1.7"
          y="-1.177"
          fill="#596e76"
          fillOpacity="0.878"
          paintOrder="fill markers stroke"
          rx="0"
          ry="0"
        ></rect>
        <rect
          width="481.72"
          height="169.01"
          x="116.97"
          y="-1.177"
          fill="#596e76"
          fillOpacity="0.878"
          paintOrder="fill markers stroke"
          rx="0"
          ry="0"
        ></rect>
        <rect
          width="481.72"
          height="128"
          x="116.97"
          y="167.84"
          fill="#596e76"
          fillOpacity="0.878"
          paintOrder="fill markers stroke"
          rx="0"
          ry="0"
        ></rect>
        <path
          fill="none"
          stroke="#313131"
          strokeWidth="2.165"
          d="M1.7-1.177v297.01h596.99V-1.177zM116.97-1.177v297.01"
        ></path>
        <path
          fill="none"
          stroke="#313131"
          strokeWidth="1.065"
          d="M116.97 167.45h481.72"
        ></path>
        <ellipse
          cx="58.106"
          cy="18.29"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinejoin="round"
          strokeWidth="2.437"
          paintOrder="fill markers stroke"
          rx="13.481"
          ry="13.578"
        ></ellipse>
        <path
          fill="none"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeWidth="3.201"
          d="M53.105 17.94h12.324"
        ></path>
        <path
          fill="none"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.201"
          d="M58.375 25.564l-7.756-7.49 7.771-8.032"
        ></path>
        <rect
          width="24.589"
          height="10.148"
          x="273.14"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="33.189"
          height="10.148"
          x="306.55"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="24.589"
          height="10.148"
          x="209.77"
          y="40.475"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="33.189"
          height="10.148"
          x="243.18"
          y="40.475"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="24.589"
          height="10.148"
          x="130"
          y="40.475"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="33.189"
          height="10.148"
          x="164.8"
          y="40.475"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="36.357"
          height="21.213"
          x="129.17"
          y="5.966"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.643"
          paintOrder="fill markers stroke"
          ry="4.2"
        ></rect>
        <rect
          width="36.357"
          height="21.213"
          x="219.18"
          y="5.966"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.643"
          paintOrder="fill markers stroke"
          ry="4.2"
        ></rect>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeOpacity="0.868"
          strokeWidth="3.244"
          d="M227.23 16.584h19.961"
        ></path>
        <rect
          width="36.357"
          height="21.213"
          x="173.98"
          y="5.966"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.643"
          paintOrder="fill markers stroke"
          ry="4.2"
        ></rect>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeOpacity="0.868"
          strokeWidth="3.244"
          d="M182.7 16.879h19.961M136.62 16.233h19.961"
        ></path>
        <rect
          width="35.989"
          height="10.148"
          x="191.47"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="33.189"
          height="10.148"
          x="234.49"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="24.589"
          height="10.148"
          x="130"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="22.189"
          height="10.148"
          x="162.2"
          y="64.852"
          fill={currentTheme}
          paintOrder="fill markers stroke"
          ry="4.44"
        ></rect>
        <rect
          width="66.704"
          height="20.66"
          x="303.38"
          y="175.05"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.196"
          paintOrder="fill markers stroke"
          ry="4.09"
        ></rect>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeOpacity="0.868"
          strokeWidth="4.336"
          d="M318.07 185.37h36.622"
        ></path>
        <rect
          width="449.49"
          height="74.028"
          x="132.3"
          y="87.8"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="3.377"
          paintOrder="fill markers stroke"
          rx="3.341"
          ry="2.22"
        ></rect>
        <rect
          width="86.608"
          height="10.256"
          x="10.158"
          y="44.839"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="2.315"
          paintOrder="fill markers stroke"
          rx="0.945"
          ry="1.726"
        ></rect>
        <rect
          width="86.608"
          height="10.256"
          x="10.158"
          y="64.692"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="2.315"
          paintOrder="fill markers stroke"
          rx="0.945"
          ry="1.726"
        ></rect>
        <path
          fill="none"
          stroke="#000"
          strokeWidth="0.262"
          d="M2.703 89.33l113.26.27M2.735 203.86l113.36.27"
        ></path>
        <rect
          width="35.3"
          height="3.177"
          x="12.224"
          y="228.64"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="0.823"
          paintOrder="fill markers stroke"
          rx="2.388"
          ry="1.589"
        ></rect>
        <rect
          width="96.569"
          height="10.141"
          x="10.215"
          y="99.794"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="2.431"
          paintOrder="fill markers stroke"
          rx="1.054"
          ry="1.707"
        ></rect>
        <rect
          width="96.569"
          height="10.141"
          x="10.215"
          y="125.59"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="2.431"
          paintOrder="fill markers stroke"
          rx="1.054"
          ry="1.707"
        ></rect>
        <rect
          width="96.569"
          height="10.141"
          x="10.215"
          y="149.81"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="2.431"
          paintOrder="fill markers stroke"
          rx="1.054"
          ry="1.707"
        ></rect>
        <rect
          width="86.726"
          height="20.37"
          x="14.953"
          y="171.31"
          fillOpacity="0.172"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.486"
          paintOrder="fill markers stroke"
          ry="4.033"
        ></rect>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeOpacity="0.868"
          strokeWidth="5.731"
          d="M34.707 181.45h45.696"
        ></path>
        <rect
          width="0.236"
          height="0.047"
          x="-49.94"
          y="231.66"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="0.6"
          paintOrder="fill markers stroke"
          rx="5.859"
          ry="0.047"
        ></rect>
        <rect
          width="80.948"
          height="2.825"
          x="12.056"
          y="244.11"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="1.175"
          paintOrder="fill markers stroke"
          rx="5.476"
          ry="1.413"
        ></rect>
        <rect
          width="35.3"
          height="3.177"
          x="12.551"
          y="260.67"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="0.823"
          paintOrder="fill markers stroke"
          rx="2.388"
          ry="1.589"
        ></rect>
        <rect
          width="80.948"
          height="2.825"
          x="12.712"
          y="276.88"
          fill="#f3f3f3"
          stroke="#f3f3f3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.996"
          strokeWidth="1.175"
          paintOrder="fill markers stroke"
          rx="5.476"
          ry="1.413"
        ></rect>
        <rect
          width="479.62"
          height="91.555"
          x="118"
          y="203.22"
          fill="#525659"
          paintOrder="fill markers stroke"
          rx="0"
          ry="0"
        ></rect>
        <path
          fill="#fff"
          d="M149.17 219.6H565.53V294.403H149.17z"
          paintOrder="fill markers stroke"
        ></path>
      </g>
    </svg>
  );
};
