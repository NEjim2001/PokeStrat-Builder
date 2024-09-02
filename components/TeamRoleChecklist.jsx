import store from "@app/store/store";
import { pokemonRoles } from "@constants/items";
import { splitAndCapitalize } from "@constants/utlis";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const getRoleMatchingPokemon = (moveData, role) => {
  const matchingPokemon = [];
  for (const pokemon of moveData) {
    if (pokemon.name) {
      let moveList = [];
      for (const move of pokemon.moves) {
        if (pokemonRoles[role.category][role.name].moves.includes(move)) {
          moveList.push(move);
        }
      }
      if (moveList.length > 0) {
        matchingPokemon.push({
          name: pokemon.name,
          move: moveList,
          sprite: pokemon.sprite,
        });
      }

      // Check if the Choice item matches the role
      if (pokemonRoles[role.category][role.name].moves.includes(pokemon.item)) {
        matchingPokemon.push({
          name: pokemon.name,
          move: pokemon.item,
          sprite: pokemon.sprite,
        });
      }
    }
  }
  return matchingPokemon;
};

const TeamRoleChecklist = () => {
  const state = store.getState();
  const moveData = state.pokemonTeam?.map((pokemon) => ({
    name: pokemon?.pokemon?.name,
    sprite: pokemon?.pokemon?.shiny
      ? pokemon?.pokemon?.data?.basicData?.sprite?.shiny
      : pokemon?.pokemon?.data?.basicData?.sprite?.normal,
    moves: pokemon?.moves?.map((move) => move.name),
    item: pokemon?.item,
  }));

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 md:gap-2 w-full mx-4 md:mx-10">
        <Section
          title="General"
          moveData={moveData}
          items={[
            { category: "General", name: "Entry Hazard" },
            { category: "General", name: "Defogger" },
            { category: "General", name: "Reliable Recovery" },
          ]}
        />
        <Section
          title="Offensive"
          moveData={moveData}
          items={[
            { category: "Offensive", name: "Boosting Move" },
            { category: "Offensive", name: "Choice Item" },
            { category: "Offensive", name: "Pivot Move" },
          ]}
        />
        <Section
          title="Defensive"
          moveData={moveData}
          items={[
            { category: "Defensive", name: "Cleric" },
            { category: "Defensive", name: "Phazer" },
            { category: "Defensive", name: "Status Move" },
          ]}
        />
      </div>
    </main>
  );
};

const Section = ({ moveData, title, items }) => (
  <section className="flex flex-col h-full  w-full ">
    <div className="flex flex-col grow  font-semibold text-white leading-[140%] max-md:mt-8 justify-between  text-start ">
      <h2 className="text-sm lg:text-xl  underline group-hover:block 2xl:mt-2">
        {title}
      </h2>

      {items.map((item, index) => {
        const matchingPokemon = getRoleMatchingPokemon(moveData, item);
        const matchingPokemonNames = matchingPokemon.map(
          (pokemon) => pokemon?.name
        );
        const matchingMoves = matchingPokemon.map((pokemon) => pokemon?.move);
        const matchingDescription = matchingPokemon.map(
          (pokemon) => pokemon?.description
        );

        return (
          <div
            className="w-1/2 flex    mt-3.5  h-full  rounded-lg justify-between items-center  gap-1 "
            key={index}
          >
            <div className="text-xs md:text-base group  relative ">
              <p>•{item.name}</p>
              <span className="absolute  hidden group-hover:block h-auto md:w-52 p-6 space-y-2 rounded-lg bottom-10 text-sm text-gray-200 z-10 bg-primaryDark transition-all ">
                {pokemonRoles[title][item.name].description}
              </span>
            </div>

            <div className="relative group ">
              <div
                className="flex justify-center items-center  text-center p-1 text-white rounded-lg "
                style={{
                  backgroundColor:
                    matchingPokemonNames.length > 0 ? "#4CAF50" : "#F44336",
                }}
              >
                {matchingPokemonNames.length > 0 ? (
                  <CheckIcon className="w-4 sm:w-6 " />
                ) : (
                  <XMarkIcon className="w-4 sm:w-6 " />
                )}
              </div>
              {matchingPokemon.length > 0 && (
                <span className="absolute hidden group-hover:block h-auto w-52 p-6 space-y-2 rounded-lg left-10 bottom-10 text-sm text-gray-200 z-10 bg-primaryDark transition-all">
                  {matchingPokemon.map((pokemon, index) => (
                    <div key={index} className="flex flex-row space-x-2">
                      <img
                        className="h-5"
                        src={pokemon?.sprite}
                        alt={pokemon?.name}
                      />
                      <p>{`${splitAndCapitalize(pokemon?.name)}'s - ${
                        pokemon?.move
                      } `}</p>
                    </div>
                  ))}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default TeamRoleChecklist;
