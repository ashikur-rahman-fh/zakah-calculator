import React from "react";

export const Edit = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="#F7C600" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path fill="#F7C600" d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
};

export const Delete = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="3" rx="1" fill="#E02424" />
      <path fill="#E02424" d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" />
      <rect x="9" y="10" width="2" height="8" fill="#FFFFFF" opacity="0.6" />
      <rect x="13" y="10" width="2" height="8" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
};
