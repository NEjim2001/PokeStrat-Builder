import React, { useState } from "react";
import { weaknesstypeChart } from "@constants/items";
import { splitAndCapitalize, titleCase } from "@constants/utlis";

export const ResistanceColumn = ({ pokemonWithMultipliers, expandWindow }) => {
  const typeValues = Object.keys(weaknesstypeChart);
  const [hoveredPokemon, setHoveredPokemon] = useState([]);

  const checkColor = (number, i) => {
    if (number === 0) {
      return "gray";
    } else if (number === 4) {
      return "darkred";
    } else if (number === 0.5) {
      return "green";
    } else if (number === 0.25) {
      return "darkgreen";
    } else if (number === 2) {
      return "red";
    } else {
      return i % 2 === 0 ? "rgba(98, 98, 98, 0.05)" : "rgba(98, 98, 98, 0.15)";
    }
  };

  const checkNumber = (number) => {
    if (number === 0) {
      return "IMMUNE";
    } else if (number === 0.5) {
      return "1/2 x";
    } else if (number === 0.25) {
      return "1/4 x";
    } else if (number === 1) {
      return "1";
    } else if (number === 2) {
      return "2 x";
    } else if (number === 4) {
      return "4 x";
    } else {
      return number;
    }
  };

  const countValuesUnder1 = (type) => {
    return pokemonWithMultipliers
      .filter((pokemon) => pokemon.multipliers[type] < 1)
      .map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.image,
        value: pokemon.multipliers[type],
      }));
  };

  const countValuesOver2 = (type) => {
    return pokemonWithMultipliers
      .filter((pokemon) => pokemon.multipliers[type] >= 2)
      .map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.image,
        value: pokemon.multipliers[type],
      }));
  };

  const calculateDifference = (type) => {
    const under1Count = countValuesUnder1(type).length;
    const over2Count = countValuesOver2(type).length;
    return under1Count - over2Count;
  };

  const typeIcon = "/assets/pokemon_type_icons/pokemon_type_icon_";

  return (
    <div
      className="flex flex-col w-full rounded-lg hover:cursor-default "
      style={{
        width: expandWindow ? "1150px" : "100%",
        height: expandWindow ? "100%" : "auto",
      }}
    >
      <div className="flex flex-row w-full h-full  ">
        {pokemonWithMultipliers.map((pokemon, index) => (
          <section
            key={index}
            className="flex flex-col items-center justify-center  w-full "
          >
            <div
              style={{
                backgroundColor:
                  hoveredPokemon?.includes(pokemon.name) &&
                  "rgba(80,20,242, 0.1)",
              }}
              className=" w-full items-center justify-center flex rounded-lg"
            >
              {pokemon?.name !== "-" ? (
                <div className="items-center justify-center my-4 md:my-2  w-10 md:w-1/2 ">
                  <img
                    className="h-12 object-contain "
                    src={pokemon?.image}
                    alt={pokemon?.name}
                  />
                  <div className="text-white  text-xs hidden md:block font-semibold truncate text-center ">
                    {splitAndCapitalize(pokemon?.name)}
                  </div>
                </div>
              ) : (
                <section
                  key={index}
                  className="items-center justify-center   w-10 md:w-1/2 md:my-1 my-3 "
                >
                  <div className="h-18  items-center  flex flex-col  justify-center ">
                    <img
                      className=" h-14 object-contain"
                      src="./assets/images/unknown_pokemon.png"
                      alt={pokemon?.name}
                    />
                    <p className="text-white text-xs hidden md:block font-semibold truncate text-center">
                      N/A
                    </p>
                  </div>
                </section>
              )}
            </div>

            <div
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(98, 98, 98, 0.05)"
                    : "rgba(98, 98, 98, 0.01)",
              }}
              className="w-full h-full grid grid-cols-16"
            >
              {typeValues.map((type, i) => {
                return (
                  <div
                    key={type}
                    style={{
                      marginTop: expandWindow ? "2px" : "1px",
                      marginBottom: expandWindow ? "2px" : "1px",
                      color:
                        (pokemon.multipliers && pokemon.multipliers[type]) === 4
                          ? "yellow"
                          : "white",
                      backgroundColor: checkColor(
                        pokemon.multipliers && pokemon.multipliers[type],
                        i
                      ),
                      paddingTop: expandWindow ? "2px" : "0px",
                      paddingBottom: expandWindow ? "2px" : "0px",
                    }}
                    className="flex items-center group justify-center  rounded-sm  "
                  >
                    {pokemon.multipliers[type] !== 1 && (
                      <div className="relative ">
                        <div className="absolute hidden group-hover:flex flex-col right-0 md:left-14 w-48 p-2 rounded-lg text-sm text-gray-200 z-10 bg-primaryDark transition-all">
                          <div className="flex flex-row justify-around m-2">
                            <img
                              className="w-5"
                              src={typeIcon + type + ".svg"}
                              alt={type}
                            />
                            {titleCase(type) +
                              `${
                                pokemon.multipliers[type] > 1
                                  ? " Weakness"
                                  : " Resistance"
                              }`}
                          </div>
                          <div
                            key={pokemon.name}
                            className="flex items-center space-x-2 mb-1"
                          >
                            <img
                              className="w-8 h-8 "
                              src={pokemon.image}
                              alt={pokemon.name}
                            />
                            <span className="w-1/2 truncate">
                              {pokemon.name}
                            </span>
                            <span
                              className="w-1/2 text-center rounded-sm"
                              style={{
                                backgroundColor: checkColor(
                                  pokemon.multipliers[type]
                                ),
                                color:
                                  pokemon.multipliers &&
                                  pokemon.multipliers[type] === 4
                                    ? "yellow"
                                    : "white",
                              }}
                            >
                              {checkNumber(pokemon.multipliers[type])}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="text-sm">
                      {checkNumber(
                        pokemon.multipliers && pokemon.multipliers[type]
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className=" flex-col items-center justify-center rounded-b-lg w-full hidden md:flex ">
          <div className="text-white text-sm font-semibold items-center text-center h-24 truncate w-10 flex">
            Weak.
          </div>
          <div className="h-full grid grid-cols-16 w-full">
            {typeValues.map((type, index) => {
              const over2Pokemons = countValuesOver2(type);
              return (
                <div
                  onMouseEnter={() => {
                    setHoveredPokemon(
                      over2Pokemons.map((pokemon) => pokemon.name)
                    );
                  }}
                  onMouseLeave={() => setHoveredPokemon([])}
                  key={type}
                  style={{
                    marginTop: expandWindow ? "2px" : "1px",
                    marginBottom: expandWindow ? "2px" : "1px",
                    paddingTop: expandWindow ? "2px" : "0px",
                    paddingBottom: expandWindow ? "2px" : "0px",
                    backgroundColor:
                      over2Pokemons.length > 0
                        ? `rgba(255,0,0, 0.${over2Pokemons.length})`
                        : index % 2 === 0
                        ? "rgba(98, 98, 98, 0.05)"
                        : "rgba(98, 98, 98, 0.15)",
                  }}
                  className="flex items-center group justify-center text-center bg-primary rounded-sm"
                >
                  <span className="text-sm font-medium text-white">
                    {over2Pokemons.length}
                  </span>
                  {over2Pokemons.length > 0 && (
                    <div className="relative ">
                      <div className="absolute hidden group-hover:flex flex-col right-0 md:left-10 w-48 p-2 rounded-lg text-sm text-gray-200 z-10 bg-primaryDark transition-all">
                        <div className="flex flex-row justify-around m-2">
                          <img
                            className="w-5"
                            src={typeIcon + type + ".svg"}
                            alt={type}
                          />
                          {titleCase(type)} Weakness
                        </div>
                        {over2Pokemons.map((pokemon) => (
                          <div
                            key={pokemon.name}
                            className="flex items-center space-x-2 mb-1"
                          >
                            <img
                              className="w-8 h-8 "
                              src={pokemon.image}
                              alt={pokemon.name}
                            />
                            <span className="w-3/4 truncate">
                              {pokemon.name}
                            </span>
                            <span
                              className="w-1/2 text-center rounded-sm"
                              style={{
                                backgroundColor: checkColor(pokemon.value),
                                color: pokemon.value === 4 ? "yellow" : "white",
                              }}
                            >
                              {checkNumber(pokemon.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className=" flex-col items-center justify-center  w-full hidden md:flex">
          <div className="text-white text-sm font-semibold items-center text-center h-24 truncate w-10 flex">
            Resist.
          </div>
          <div className="h-full grid grid-cols-16 w-full">
            {typeValues.map((type, index) => {
              const under1Pokemons = countValuesUnder1(type);
              return (
                <div
                  key={type}
                  style={{
                    marginTop: expandWindow ? "2px" : "1px",
                    marginBottom: expandWindow ? "2px" : "1px",
                    paddingTop: expandWindow ? "2px" : "0px",
                    paddingBottom: expandWindow ? "2px" : "0px",
                    backgroundColor:
                      under1Pokemons.length > 0
                        ? `rgba(0,255,0, 0.${under1Pokemons.length})`
                        : index % 2 === 0
                        ? "rgba(98, 98, 98, 0.05)"
                        : "rgba(98, 98, 98, 0.15)",
                  }}
                  onMouseEnter={() => {
                    setHoveredPokemon(
                      under1Pokemons.map((pokemon) => pokemon.name)
                    );
                  }}
                  onMouseLeave={() => setHoveredPokemon([])}
                  className="flex items-center group justify-center text-center bg-primary  w-full rounded-sm"
                >
                  <span className="text-sm font-medium text-white">
                    {under1Pokemons.length}
                  </span>
                  {under1Pokemons.length > 0 && (
                    <div className="relative ">
                      <div className="absolute hidden group-hover:flex flex-col right-0 md:left-10 w-48 p-2 rounded-lg text-sm text-gray-200 z-10 bg-primaryDark transition-all">
                        <div className="flex flex-row justify-around m-2">
                          <img
                            className="w-5"
                            src={typeIcon + type + ".svg"}
                            alt={type}
                          />
                          {titleCase(type)} Resist.
                        </div>
                        {under1Pokemons.map((pokemon) => (
                          <div
                            key={pokemon.name}
                            className="flex items-center space-x-2 mb-1"
                            onMouseEnter={() => setHoveredPokemon(pokemon.name)}
                            onMouseLeave={() => setHoveredPokemon(null)}
                          >
                            <img
                              className="w-8  "
                              src={pokemon.image}
                              alt={pokemon.name}
                            />
                            <span className="w-2/3 truncate">
                              {pokemon.name}
                            </span>
                            <span
                              className="w-full text-center rounded-sm"
                              style={{
                                backgroundColor: checkColor(pokemon.value),
                                color: pokemon.value === 4 ? "yellow" : "white",
                              }}
                            >
                              {checkNumber(pokemon.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className=" flex-col items-center justify-center  w-full hidden md:flex ">
          <div className="text-white text-sm font-semibold items-center text-center h-24 truncate flex">
            <span>
              Total <p>Coverage</p>
            </span>
          </div>
          <div className="h-full grid grid-cols-16 w-full  ">
            {typeValues.map((type, index) => (
              <div
                key={index}
                style={{
                  marginTop: expandWindow ? "2px" : "1px",
                  marginBottom: expandWindow ? "2px" : "1px",
                  paddingTop: expandWindow ? "2px" : "0px",
                  paddingBottom: expandWindow ? "2px" : "0px",
                  backgroundColor:
                    calculateDifference(type) > 0
                      ? `rgba(0,255,0,0.${calculateDifference(type)})`
                      : calculateDifference(type) < 0
                      ? `rgba(255,0,0,0.${Math.abs(calculateDifference(type))})`
                      : index % 2 === 0
                      ? "rgba(98, 98, 98, 0.05)"
                      : "rgba(98, 98, 98, 0.15)",
                }}
                className="flex items-center justify-center text-center bg-primary rounded-r-sm  w-full"
              >
                <span
                  style={{
                    color: calculateDifference(type) === 0 ? "gray" : "white",
                  }}
                  className="text-sm font-medium text-white"
                >
                  {Math.abs(calculateDifference(type))}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
