import store from "@app/store/store";
import React, { useEffect, useState } from "react";
import getMultipliers, {
  calculateCombinedMultipliers,
  calculateMoveMultiplier,
} from "@constants/GetMultipliers";
import { weaknesstypeChart } from "@constants/items";
import { useSelector } from "react-redux";
import { ResistanceColumn } from "./ResistanceColumn";
import MoveCoverageColumn from "./MoveCoverageColumn";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const TeamStatsCard = ({ expand, expandWindow, viewMoveCoverage }) => {
  const state = store.getState();
  const teamData = useSelector((state) => state.pokemonTeam);
  const router = useRouter();
  const [pokemonWithMultipliers, setPokemonWithMultipliers] = useState([]);
  const [movesWithMultipliers, setMovesWithMultipliers] = useState([]);

  const pokemonTeamDetails = teamData.map((currentPokemon) => {
    const name = currentPokemon?.pokemon?.name || "-";
    const image =
      currentPokemon?.pokemon?.data?.basicData?.sprite?.normal ||
      "unknown_pokemon.png"; // replace with a default image URL if necessary
    const types =
      currentPokemon?.pokemon?.data?.basicData?.type.map(
        (type) => type.type.name
      ) || [];

    const ability = currentPokemon?.ability || "";

    return {
      name,
      image,
      types,
      ability,
    };
  });

  useEffect(() => {
    const pokemonTypes = pokemonTeamDetails.map((pokemon) => pokemon.types);
    const pokemonWithMultipliers = pokemonTeamDetails.map((pokemon) => {
      const multipliers = calculateCombinedMultipliers(
        pokemon.types[0],
        pokemon.types[1],
        pokemon.ability
      );

      return { ...pokemon, multipliers };
    });

    setPokemonWithMultipliers(pokemonWithMultipliers);
  }, [state]);

  useEffect(() => {
    const movesWithMultipliers = teamData.map((pokemon, index) => {
      const moveList = pokemon?.moves
        .filter(
          (move) =>
            move?.data &&
            (move.data.damage_class === "physical" ||
              move.data.damage_class === "special")
        )
        .map((move) => move.data);

      if (!moveList) return null; // Check if moveList is undefined or null

      // Combine multipliers from all moves into one object
      const combinedMultipliers = {};
      moveList.forEach((moveData) => {
        const moveType = moveData.type;
        const multipliers = calculateMoveMultiplier(moveType);
        for (const type in multipliers) {
          combinedMultipliers[type] = Math.max(
            combinedMultipliers[type] || 0,
            multipliers[type]
          );
        }
      });

      // Filter the combined multipliers to get only super effective moves
      const multipliers = Object.keys(combinedMultipliers).filter(
        (type) => combinedMultipliers[type] > 1
      );

      // Return the super effective moves along with other details
      return { ...pokemonTeamDetails[index], multipliers, moveList };
    });

    setMovesWithMultipliers(movesWithMultipliers);
  }, [state, state.pokemonTeam]);

  const isMobilePortrait = useMediaQuery({ maxWidth: 375 });
  return (
    <div className="flex flex-row  rounded-lg   h-full md:h-[33rem] md:px-4 md:py-2 px-2 ">
      <div
        style={{ width: isMobilePortrait && "30px" }}
        className="  flex flex-col h-full "
      >
        <section
          // onClick={expand}
          className="items-center justify-center rounded-lg   w-full   "
        >
          <div className="h-[80px] items-center flex flex-col justify-center">
            <img
              onClick={() => router.push("/")}
              src="/assets/images/pokestrat-secondary-logo-transparent.png"
              alt="Pokestrat Secondary Logo"
              className="object-contain w-20 opacity-15 cursor-pointer hover:scale-105 transition-transform "
            />
          </div>
        </section>

        {isMobilePortrait ? (
          <img
            className=" w-7 min-w-7"
            src="/assets/images/type-list-cropped.png"
          />
        ) : (
          <img
            style={{
              height:
                window.innerWidth >= 640
                  ? expandWindow
                    ? "480px"
                    : "480px"
                  : "400px",
            }}
            className="rounded-lg min-w-14"
            src="/assets/images/type-list.png"
          />
        )}
      </div>

      {viewMoveCoverage ? (
        <MoveCoverageColumn
          expandWindow={expandWindow}
          movesWithMultipliers={movesWithMultipliers}
        />
      ) : (
        <ResistanceColumn
          expandWindow={expandWindow}
          pokemonWithMultipliers={pokemonWithMultipliers}
        />
      )}
    </div>
  );
};

export default TeamStatsCard;
