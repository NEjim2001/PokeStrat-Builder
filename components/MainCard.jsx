"use client";

import React, { useEffect, useState } from "react";

import PokemonStatsCard from "./PokemonStatsCard";
import TeamStatsCard from "./TeamStatsCard";
import { BackDrop } from "./BackDrop";
import Fullscreen from "./FullScreen";
import { useGeneration } from "@app/GenerationProvider";
import { useMediaQuery } from "react-responsive";

const MainCard = ({ index, viewTeam, viewMoves, viewMoveCoverage }) => {
  const { demo } = useGeneration();
  const [expandWindow, setExpandWindow] = useState(false);

  const expand = () => {
    setExpandWindow(!expandWindow);
  };
  return (
    <div className="h-full">
      <section className={`transition-all rounded-b-lg bg-primary`}>
        {viewTeam ? (
          <TeamStatsCard expand={expand} viewMoveCoverage={viewMoveCoverage} />
        ) : (
          <PokemonStatsCard index={index} viewMoves={viewMoves} />
        )}
      </section>

      {expandWindow && (
        <Fullscreen>
          <BackDrop onClick={expand}>
            <div className="bg-primary flex absolute bottom-50 w-2/3 mx-4 rounded-xl items-center ">
              <TeamStatsCard
                expandWindow={expandWindow}
                expand={expand}
                viewMoveCoverage={viewMoveCoverage}
              />
            </div>
          </BackDrop>
        </Fullscreen>
      )}
    </div>
  );
};

export default MainCard;
