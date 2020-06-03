import React from "react";
export const InfoIcon = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0L24 0 24 24 0 24z" />
      <path
        fill="#2875AA"
        d="M12 .5C5.652.5.5 5.652.5 12S5.652 23.5 12 23.5 23.5 18.348 23.5 12 18.348.5 12 .5z"
      />
      <path
        fill="#FFF"
        d="M13 19h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
      />
      <path
        fill="#2875AA"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0-1.5C18.348.5 23.5 5.652 23.5 12S18.348 23.5 12 23.5.5 18.348.5 12 5.652.5 12 .5z"
      />
    </g>
  </svg>
);
