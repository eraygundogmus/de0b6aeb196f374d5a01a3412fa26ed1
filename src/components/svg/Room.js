import React from "react";

function Room({ opacity = "0.5" }) {
  return (
    <svg
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 21.2464V6.01067C3 5.78619 3.07902 5.5709 3.21967 5.41216C3.36032 5.25342 3.55109 5.16425 3.75 5.16425H20.25C20.4489 5.16425 20.6397 5.25342 20.7803 5.41216C20.921 5.5709 21 5.78619 21 6.01067V21.2464"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 21.2464H22.5"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 21.2464V17.8607H18V21.2464"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 21.2464V8.54999H18V14.475"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Room;
