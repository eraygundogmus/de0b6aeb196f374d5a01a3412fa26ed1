import React from "react";

function Payment({ opacity = "0.5" }) {
  return (
    <svg
      width="24"
      height="29"
      viewBox="0 0 24 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 6.88214H3C2.58579 6.88214 2.25 7.2611 2.25 7.72857V21.2714C2.25 21.7389 2.58579 22.1179 3 22.1179H21C21.4142 22.1179 21.75 21.7389 21.75 21.2714V7.72857C21.75 7.2611 21.4142 6.88214 21 6.88214Z"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7495 18.7322H18.7495"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2495 18.7322H12.7495"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.24945 11.2045H21.7494"
        stroke="white"
        strokeOpacity={opacity}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Payment;
