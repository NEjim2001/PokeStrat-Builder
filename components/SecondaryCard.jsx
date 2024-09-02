import React, { useEffect } from "react";
import { PokemonAdvancedStatsCard } from "./PokemonAdvancedStatsCard";
import TeamRoleChecklist from "./TeamRoleChecklist";

import { useGeneration } from "@app/GenerationProvider";
import { useSelector } from "react-redux";
import { normalizePokemonName } from "@constants/nameMapping";

const SecondaryCard = ({ index, viewTeam }) => {
  const { ratedMode } = useGeneration();

  const teamData = useSelector((state) => state.pokemonTeam);
  const pokemonData = teamData[index]?.pokemon;

  return (
    <section className="  w-full rounded-lg h-full">
      <section className="w-full p-4 h-full">
        {ratedMode && !viewTeam ? (
          <a
            target="_blank"
            className="flex h-0 justify-self-end justify-end"
            href={`https://www.smogon.com/dex/sv/pokemon/${normalizePokemonName(
              pokemonData?.name,
              false
            )}/`}
          >
            <p className="text-blue-500 text-sm font-semibold">
              SMOGON ANALYSIS
            </p>
          </a>
        ) : null}
        <div className="text-white font-semibold text-3xl">
          {viewTeam ? "Team Checklist" : "Stats"}
        </div>

        <div className="w-full flex justify-end">
          <div className="grid w-[65%]  grid-cols-4 text-white text-sm font-semibold">
            {!viewTeam && (
              <div className="md:col-start-2 col-start-0 col-span-4 flex justify-between">
                <div className="col-span-1">Base</div>
                <div className="col-span-2">EVs</div>
                <div className="col-span-1 flex space-x-3">
                  <p>IVs</p>
                  <p>Total</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <section
          style={{ height: viewTeam ? "14rem" : "24rem" }}
          className="bg-primary flex flex-row my-2   rounded-lg"
        >
          {viewTeam ? (
            <TeamRoleChecklist />
          ) : (
            pokemonData && (
              <PokemonAdvancedStatsCard pokemon={pokemonData} index={index} />
            )
          )}
        </section>
      </section>
    </section>
  );
};

export default SecondaryCard;
