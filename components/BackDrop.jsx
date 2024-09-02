import React from "react";

export const BackDrop = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex absolute left-0 top-0 h-screen w-screen bg-black/70 items-center justify-center z-10"
    >
      {children}
    </div>
  );
};
