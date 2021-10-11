import React from "react";

function Hotel({ opacity = "0.5" }) {
  return (
    <svg
      width="24"
      height="29"
      viewBox="0 0 24 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 18.7322V9.42145H19.5C20.2956 9.42145 21.0587 9.77816 21.6213 10.4131C22.1839 11.048 22.5 11.9092 22.5 12.8072V18.7322"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 22.9643V6.03571"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 18.7322H22.5V22.9643"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 9.42145H1.5"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hotel;
