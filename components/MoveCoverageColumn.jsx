import { splitAndCapitalize, titleCase } from "@constants/utlis";
import React, { useEffect, useState } from "react";
const moveAttackTypeChart = {
  bug: { grass: 2, psychic: 2, dark: 2 },
  dark: { psychic: 2, ghost: 2, fairy: 2 },
  dragon: { dragon: 0.5, fairy: 0.5 },
  electric: { water: 2, flying: 2, steel: 2 },
  fairy: { fighting: 2, dragon: 0.5, dark: 0.5 },
  fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, fairy: 2 },
  fire: { grass: 2, ice: 2, bug: 2, steel: 2 },
  flying: { fighting: 2, bug: 2, grass: 2 },
  ghost: { psychic: 2, ghost: 2 },
  grass: { water: 2, ground: 2, rock: 2 },
  ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2 },
  ice: { flying: 2, ground: 2, grass: 2, dragon: 2 },
  normal: {},
  poison: { grass: 2, fairy: 2 },
  psychic: { fighting: 2, poison: 2 },
  rock: { flying: 2, bug: 2, fire: 2, ice: 2 },
  steel: { ice: 2, rock: 2, fairy: 2 },
  water: { ground: 2, rock: 2, fire: 2 },
};
const MoveCoverageColumn = ({ movesWithMultipliers, expandWindow }) => {
  const typeValues = Object.keys(moveAttackTypeChart);
  const [coverCount, setCoverCount] = useState(
    new Array(typeValues.length).fill(0)
  );

  const checkColor = (type, multipliers, i) => {
    if (!multipliers || !multipliers.includes(type)) {
      return i % 2 == 0 ? "rgba(98, 98, 98, 0.05)" : "rgba(98, 98, 98, 0.15)";
    } else if (multipliers.includes(type)) {
      return "rgba(0,255,0, .4)";
    }
  };

  useEffect(() => {
    const counts = new Array(typeValues.length).fill(0);
    movesWithMultipliers.forEach((pokemon) => {
      typeValues.forEach((type, i) => {
        if (pokemon?.multipliers && pokemon?.multipliers.includes(type)) {
          counts[i]++;
        }
      });
    });
    setCoverCount(counts);
  }, [movesWithMultipliers]);

  return (
    <div
      className="flex flex-col w-full  rounded-lg "
      style={{
        width: expandWindow ? "1150px" : "100%",
        height: expandWindow ? "100%" : "auto",
      }}
    >
      <div className="flex flex-row w-full h-full ">
        {/* Render Pokémon */}
        {movesWithMultipliers.map((pokemon, index) => (
          <section
            key={index}
            className="flex flex-col items-center justify-center  w-full  "
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

            <div
              style={{
                backgroundColor:
                  index % 2 == 0
                    ? "rgba(98, 98, 98, 0.05)"
                    : "rgba(98, 98, 98, 0.01)",
              }}
              className=" w-full h-full grid grid-cols-16 "
            >
              {typeValues.map((type, i) => (
                <div
                  key={type}
                  style={{
                    marginTop: expandWindow ? "2px" : "1px",
                    marginBottom: expandWindow ? "2px" : "1px",

                    // Apply the custom background color using checkColor function
                    backgroundColor: checkColor(type, pokemon?.multipliers, i),
                    paddingTop: expandWindow ? "2px" : "0px",
                    paddingBottom: expandWindow ? "2px" : "0px",
                  }}
                  className="flex items-center justify-center  text-center bg-primary rounded-sm w-full px-4"
                ></div>
              ))}
            </div>
          </section>
        ))}

        <section
          className=" flex-col items-center justify-center rounded-b-lg w-full hidden md:flex
        "
        >
          <div className="h-20 items-center flex justify-center  ">
            <p className="text-white text-md font-semibold items-center text-center h-20  flex ">
              Move Type Coverage
            </p>
          </div>

          <div className="h-full grid grid-cols-16 w-full">
            {typeValues.map((type, index) => (
              <div
                key={type}
                style={{
                  marginTop: expandWindow ? "2px" : "1px",
                  marginBottom: expandWindow ? "2px" : "1px",
                  paddingTop: expandWindow ? "2px" : "0px",
                  paddingBottom: expandWindow ? "2px" : "0px",
                  backgroundColor:
                    coverCount[index] > 0
                      ? `rgba(0,180,0, 0.${coverCount[index]})`
                      : index % 2 == 0
                      ? "rgba(98, 98, 98, 0.05)"
                      : "rgba(98, 98, 98, 0.15)",
                }}
                className="flex items-center justify-center text-center bg-primary rounded-sm w-full px-4"
              >
                <span className="text-sm text-white font-medium ">
                  {coverCount[index]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoveCoverageColumn;
