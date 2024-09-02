import React from "react";

const Fullscreen = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 overflow-auto bg-black bg-opacity-95 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Fullscreen;
