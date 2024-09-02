import { useGeneration } from "@app/GenerationProvider";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

const Loading = () => {
  const { pageLoadingMessage } = useGeneration();

  let parsedMessage = { message: "", current: 0, total: 0 };
  try {
    parsedMessage = JSON.parse(pageLoadingMessage);
  } catch (error) {
    console.error("Error parsing pageLoadingMessage JSON:", error);
  }

  const { message, current, total } = parsedMessage;

  return (
    <div className="flex  items-center justify-center h-screen w-screen flex-col gap-4 p-5">
      {total > 0 ? (
        <div className="text-white text-lg md:text-2xl space-y-4 w-full px-10 text-center">
          <p className="font-semibold ">{message}</p>

          <div className="w-full max-w-md mx-auto">
            <ProgressBar
              className="rounded-full"
              completed={current}
              maxCompleted={parseInt(total, 10)}
              customLabel={`${current}/${total}`}
              bgColor="orange"
              borderRadius="9999px"
              transitionDuration="0.3s"
            />
          </div>
        </div>
      ) : (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      )}
    </div>
  );
};

export default Loading;
