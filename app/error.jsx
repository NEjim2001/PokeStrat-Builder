"use client";

import { clearState } from "@constants/utlis";
import React from "react";
import "tailwindcss/tailwind.css";

export default function NotFound() {
  const handleResetTeam = () => {
    clearState();
    window.location.href = "/";
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-primary rounded-lg">
        <div className="text-center m-10 p-10 rounded-lg bg-primary bg-opacity-90 shadow-xl">
          <p className="text-4xl font-bold text-yellow-500 mb-4">
            An Error Occurred, Sorry about that!
          </p>

          <p className="text-md text-white  mb-8">
            <span>
              If this error keeps occurring, we recommend resetting your team.
            </span>
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-110 animate-pulse ">
              <a href="/">Return Home</a>
            </button>
            <button
              onClick={handleResetTeam}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-110"
            >
              Reset Team
            </button>
          </div>
          <button
            onClick={() =>
              (window.location.href =
                "mailto:pokestrat.teambuilder@gmail.com?subject=Bug Report&body=Describe the issue here...")
            }
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-110"
          >
            Report a Bug
          </button>
        </div>
      </div>
    </div>
  );
}
