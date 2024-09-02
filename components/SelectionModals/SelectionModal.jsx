import React, { useEffect, useRef, useState } from "react";
import { BackDrop } from "../BackDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  setAbility,
  setAbilityData,
  setData,
  setEVSpread,
  setIVSpread,
  setItem,
  setMove,
  setMoveData,
  setNature,
  setSpread,
  setTeratype,
} from "@app/store/pokemon/pokemonTeamSlice";
import {
  pokemonRoles,
  pokemonNatures,
  pokemonItemData,
} from "@constants/items";
import { fetchAbilityData, fetchMoveData } from "@constants/FetchPokemonData";
import Loading from "../Loading";
import { useGeneration } from "@app/GenerationProvider";
import { teraTypeList } from "@constants/items";
import { dataList } from "@constants/cache";
import { getColorForPercentage, titleCase } from "@constants/utlis";
import { additionalPokmeonMoves } from "@constants/nameMapping";

export const SelectionModal = ({
  data,
  closeModal,
  index,
  type,
  moveIndex,
  spreadIndex,
  spreads,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [naturePercentages, setNaturePercentages] = useState({});
  const [showPercentages, setShowPercentages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [multiSelectData, setMultiSelectData] = useState([]);
  const { demo, ratedMode } = useGeneration();
  const hasRun = useRef(false);

  const dispatch = useDispatch();
  const pokemonTeam = useSelector((state) => state.pokemonTeam);
  const moveData = useSelector((state) => state.pokemonTeam[index]?.moveData);
  const abilityData = useSelector(
    (state) => state.pokemonTeam[index]?.abilityData
  );

  const pokemonSetData = useSelector(
    (state) => state.pokemonTeam[index]?.pokemon?.data?.smogonData
  );
  const pokemonName = useSelector(
    (state) => state.pokemonTeam[index]?.pokemon?.name
  );

  const pokemonMoves = useSelector((state) => state.pokemonTeam[index]?.moves);

  useEffect(() => {
    setShowPercentages(ratedMode);
  }, []);

  useEffect(() => {
    if (pokemonSetData && Object.keys(pokemonSetData).length > 0) {
      setShowPercentages(true);
    } else {
      setShowPercentages(false);
    }
  }, [pokemonSetData]);

  const typeIcon = "/assets/pokemon_type_icons/pokemon_type_icon_";

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const capitalizeMoveText = (move) => {
    if (!move) return "";

    // Define exceptions where hyphens should be retained
    const exceptions = ["Heavy-Duty Boots"];

    if (exceptions.includes(move)) {
      // Keep back-to-back hyphens for exceptions
      return move
        .split(/(-+)/) // Split on hyphens and retain back-to-back hyphens
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
    }
    // Handle hyphenated items that are not exceptions
    return move
      .split(/[\s-]/) // Split on both spaces and hyphens
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const addItem = (selectionData) => {
    if (!pokemonName) {
      alert(`Please add a Pokémon before selecting a(n) ${type}`);
      return;
    }

    const actions = {
      item: () => dispatch(setItem({ index, data: selectionData.name })),
      ability: () => dispatch(setAbility({ index, data: selectionData.name })),
      teratype: () => dispatch(setTeratype({ index, data: selectionData })),
      ivSpread: () =>
        dispatch(setIVSpread({ index, spreadIndex, data: selectionData })),
      spread: () => dispatch(setSpread({ index, data: selectionData })),
      evSpread: () =>
        dispatch(setEVSpread({ index, spreadIndex, data: selectionData })),
      nature: () => dispatch(setNature({ index, data: selectionData })),
      moves: () => {
        const moveList = pokemonMoves.map((move) => move?.name);

        const isSameMove = moveList[moveIndex] === selectionData?.name;
        dispatch(
          setMove({
            index,
            moveIndex,
            move: {
              name: isSameMove
                ? "Select a Move"
                : capitalizeMoveText(selectionData?.name) || "Select a Move",
              data: isSameMove ? {} : selectionData,
            },
          })
        );
      },
      data: () => dispatch(setData({ index, data: selectionData })),
    };

    actions[type] && actions[type]();
    closeModal();
  };

  const getMoveData = async (moveList) => {
    try {
      setIsLoading(true);

      const moveDataFromCache = moveList.reduce((acc, move) => {
        if (moveData[move]) {
          acc[move] = moveData[move];
        }
        return acc;
      }, {});

      if (Object.keys(moveDataFromCache).length === moveList.length) {
        setIsLoading(false);
        return moveDataFromCache;
      }

      const missingMoves = moveList.filter((move) => !moveData[move]);
      const fetchedMoveData = await fetchMoveData(missingMoves, demo);

      const combinedMoveData = { ...moveDataFromCache, ...fetchedMoveData };

      dispatch(setMoveData({ index, data: combinedMoveData }));

      setIsLoading(false);

      return combinedMoveData;
    } catch (error) {
      console.log("Error fetching move data:", error);
      return {};
    }
  };

  const getAbilityData = async (abilityList) => {
    try {
      setIsLoading(true);

      const abilityDataFromCache = abilityList.reduce((acc, ability) => {
        if (abilityData[ability]) {
          acc[ability] = abilityData[ability];
        }
        return acc;
      }, {});

      if (Object.keys(abilityDataFromCache).length === abilityList.length) {
        // If all abilities are available in the cache, set loading to false and return the cached data
        setIsLoading(false);
        return abilityDataFromCache;
      }

      // If some abilities are missing in the cache, fetch them
      const missingAbilities = abilityList.filter(
        (ability) => !abilityData[ability]
      );
      const fetchedAbilityData = await fetchAbilityData(missingAbilities, demo);

      const combinedAbilityData = {
        ...abilityDataFromCache,
        ...fetchedAbilityData,
      };

      // Update the Redux store with the combined ability data
      dispatch(setAbilityData({ index, data: combinedAbilityData }));

      setIsLoading(false);

      return combinedAbilityData;
    } catch (error) {
      console.log("Error fetching ability data:", error);
      return {}; // Return an empty object if there's an error
    }
  };
  useEffect(() => {
    if (type === "nature") {
      if (pokemonSetData && Object.keys(pokemonSetData).length > 0) {
        const newNaturePercentages = {};
        const processedNatures = new Set();
        Object.keys(spreads).forEach((spread) => {
          const [nature] = spread.split(":");
          if (!processedNatures.has(nature)) {
            processedNatures.add(nature);
            newNaturePercentages[nature] = 0;
          }
          newNaturePercentages[nature] += spreads[spread];
        });

        const allNatures = Object.keys(newNaturePercentages);
        const allNaturesWithNames = allNatures.reduce((acc, cur) => {
          acc[cur] = cur;
          return acc;
        }, {});

        const allNaturesSet = new Set(allNatures);
        Object.keys(pokemonNatures).forEach((nature) => {
          if (!allNaturesSet.has(nature)) {
            allNaturesWithNames[nature] = nature;
          }
        });

        setNaturePercentages(newNaturePercentages);
        setFilteredItems(
          Object.keys(allNaturesWithNames).filter((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredItems(
          Object.keys(pokemonNatures).filter((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    } else if (type === "item") {
      if (pokemonSetData && Object.keys(pokemonSetData).length > 0) {
        const allItems = new Set([
          ...Object.keys(data),
          ...pokemonItemData.results
            .filter((item) => item.type === "Hold items")
            .map((item) => item.name.english),
        ]);

        const formattedItems = Array.from(allItems)
          .filter((item) =>
            item?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => ({
            name: capitalizeMoveText(item),
            description: getDescriptionForItem(item),
          }));

        if (pokemonName?.includes("-mega")) {
          const megaItems = formattedItems.filter(
            (item) =>
              item.name.toLowerCase().includes("ite") &&
              item.name.toLowerCase().substring(0, 4) ===
                pokemonName.toLowerCase().substring(0, 4)
          );
          setFilteredItems(megaItems);
        } else {
          setFilteredItems(formattedItems);
        }
      } else {
        const allItems = new Set([
          ...pokemonItemData.results
            .filter((item) => item.type === "Hold items")
            .map((item) => item.name.english),
        ]);

        const formattedItems = Array.from(allItems)
          .filter((item) =>
            item?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => ({
            name: capitalizeMoveText(item),
            description: getDescriptionForItem(item),
          }));

        if (pokemonName?.includes("-mega")) {
          const megaItems = formattedItems.filter(
            (item) =>
              item.name.toLowerCase().includes("ite") &&
              item.name.toLowerCase().substring(0, 4) ===
                pokemonName.toLowerCase().substring(0, 4)
          );
          setFilteredItems(megaItems);
        } else {
          setFilteredItems(formattedItems);
        }
      }
    } else if (type === "teratype") {
      const formattedItems = teraTypeList.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(formattedItems);
    }
  }, [searchQuery, type, data, spreads]);

  useEffect(() => {
    if (type !== "ability") return;

    if (
      pokemonTeam[index]?.pokemon?.data?.basicData?.abilities &&
      Object.keys(abilityData).length === 0
    ) {
      const abilityNames =
        pokemonTeam[index]?.pokemon?.data?.basicData?.abilities.map((ability) =>
          capitalizeMoveText(ability)
        ) || [];
      let allAbilities = abilityNames.filter((ability) =>
        ability.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (showPercentages) {
        allAbilities.sort((a, b) => {
          const percentageA = data[a] !== undefined ? data[a] : -1;
          const percentageB = data[b] !== undefined ? data[b] : -1;
          return percentageB - percentageA;
        });
      }

      const fetchAbilityData = async () => {
        try {
          const abilityData = await getAbilityData(allAbilities);
          if (Object.keys(abilityData).length === 1) {
            const ability = Object.values(abilityData)[0];
            addItem(ability);
            return;
          }

          const sortedAbilityData = Object.keys(abilityData ?? {})
            .sort((a, b) => {
              const percentageA = data?.[a] !== undefined ? data[a] : -1;
              const percentageB = data?.[b] !== undefined ? data[b] : -1;
              return percentageB - percentageA;
            })
            .reduce((obj, key) => {
              obj[key] = abilityData[key];
              return obj;
            }, {});

          setFilteredItems(sortedAbilityData);
        } catch (error) {
          console.log("Error fetching ability data:", error);
        }
      };

      fetchAbilityData();
    } else {
      // Sort abilityData by percentage
      const sortedAbilityData = Object.keys(abilityData ?? {})
        .filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const percentageA = data?.[a] !== undefined ? data[a] : -1;
          const percentageB = data?.[b] !== undefined ? data[b] : -1;
          return percentageB - percentageA;
        })
        .reduce((obj, key) => {
          obj[key] = abilityData[key];
          return obj;
        }, {});
      setFilteredItems(sortedAbilityData);
    }
  }, [searchQuery, type, abilityData, data]);

  useEffect(() => {
    if (type !== "moves" || hasRun.current) return;

    if (
      pokemonTeam[index]?.pokemon?.data?.basicData?.moves &&
      Object.keys(moveData).length === 0
    ) {
      let smogonMoves = [];
      if (pokemonTeam[index]?.pokemon?.data?.smogonData) {
        if (pokemonTeam[index]?.pokemon?.data?.smogonData?.moves) {
          smogonMoves = Object.keys(
            pokemonTeam[index]?.pokemon?.data?.smogonData?.moves
          );
        }
      }
      const moveNames =
        pokemonTeam[index]?.pokemon?.data?.basicData?.moves?.map((move) =>
          capitalizeMoveText(move.move.name)
        ) || [];
      const uniqueMoves = Array.from(new Set([...moveNames, ...smogonMoves]));
      let filteredMoves = uniqueMoves.filter((move) =>
        move.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (showPercentages) {
        filteredMoves.sort((a, b) => {
          const percentageA = data[a] !== undefined ? data[a] : -1;
          const percentageB = data[b] !== undefined ? data[b] : -1;
          return percentageB - percentageA;
        });
      }
      const additionalMoves = additionalPokmeonMoves(pokemonName);

      const fetchData = async () => {
        try {
          const moveData = await getMoveData([
            ...filteredMoves,
            ...additionalMoves,
          ]);
          const sortedMoveData = Object.keys(moveData ?? {})
            .sort((a, b) => {
              const percentageA = data?.[a] !== undefined ? data[a] : -1;
              const percentageB = data?.[b] !== undefined ? data[b] : -1;
              return percentageB - percentageA;
            })
            .reduce((obj, key) => {
              obj[key] = moveData[key];
              return obj;
            }, {});

          setFilteredItems(sortedMoveData);
        } catch (error) {
          console.log("Error fetching move data:", error);
        }
      };

      fetchData();
      hasRun.current = true;
    } else {
      // Sort moveData by percentage
      const sortedMoveData = Object.keys(moveData ?? {})
        .filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const percentageA = data?.[a] !== undefined ? data[a] : -1;
          const percentageB = data?.[b] !== undefined ? data[b] : -1;
          return percentageB - percentageA;
        })
        .reduce((obj, key) => {
          obj[key] = moveData[key];
          return obj;
        }, {});

      setFilteredItems(sortedMoveData);
    }
  }, [searchQuery, type, moveData, data]);

  const getDescriptionForItem = (itemName) => {
    if (!itemName) return ""; // Return an empty string if itemName is null or undefined

    const item = pokemonItemData.results.find(
      (item) =>
        item?.name?.english &&
        item.name.english.toLowerCase() === itemName.toLowerCase()
    );

    return item?.description || "";
  };

  useEffect(() => {
    const moveList = pokemonMoves.filter(
      (move) => move?.name !== "Select a Move"
    );
    setMultiSelectData(moveList);
  }, []);

  return (
    <>
      <div
        style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)" }}
        className={`fixed inset-0 flex items-center justify-center z-50  `}
      >
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black opacity-35"
        ></div>{" "}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-3/4 md:w-1/2 h-5/6 bg-primaryDark rounded-lg py-4 transition-all"
        >
          <div className="text-5xl text-white  font-semibold text-center">
            Selection
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder={`Search For A ${
                type[0].toUpperCase() + type.substring(1, type.length)
              }...`}
              value={searchQuery}
              spellCheck="false"
              onChange={handleSearch}
              className="p-2 m-4 bg-[#212121] rounded-lg text-white text-2xl font-semibold px-6"
            />
          </div>
          <section className="h-3/4 mx-4">
            <div
              style={{
                backgroundColor: "rgba(98, 98, 98, 0.45)",
              }}
              className="grid grid-cols-3  lg:text-2xl font-semibold text-lg text-white  p-4 rounded-t-lg  "
            >
              <p
                className={`text-center ${
                  type === "teratype" ? "col-span-3" : "w-full"
                } `}
              >
                Name
              </p>

              {type !== "teratype" && (
                <p className="text-center hidden md:block">Description</p>
              )}

              {ratedMode && type !== "teratype" && (
                <p className="text-center">
                  {Object.keys(pokemonSetData).length > 0 && "Usage %"}
                </p>
              )}
            </div>
            {isLoading ? (
              <div className="flex h-[85%] md:h-[95%] items-center bg-primary justify-center flex-col space-y-10 text-center">
                <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-purple-500 " />
                <p className="text-md md:text-xl mx-10 text-white">
                  Fetching {type == "moves" ? "Move" : "Ability"} Data... Please
                  Wait (You may close this window)
                </p>
              </div>
            ) : (
              <>
                {!showPercentages && (
                  <div className="flex flex-col rounded-lg  bg-primary overflow-x-hidden overflow-y-auto h-[85%] md:h-[95%]">
                    {type === "moves" &&
                      Object.keys(filteredItems).map((item, index) => {
                        const isSelected = multiSelectData.some(
                          (selectedItem) =>
                            selectedItem?.name === filteredItems[item]?.name
                        );

                        return (
                          <div
                            onClick={() => addItem(filteredItems[item])}
                            key={index}
                            className={`relative mb-2 justify-around  items-center flex rounded-xl transition-transform hover:cursor-pointer ${
                              isSelected
                                ? "border-2 border-white scale-95"
                                : "scale-100"
                            } hover:border-white hover:scale-x-95`}
                            style={{
                              backgroundColor: filteredItems[item]?.type
                                ? `rgba(var(--${filteredItems[item]?.type}), 1)`
                                : "black",
                              opacity: !filteredItems[item]?.type ? 0.6 : 1,
                              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                            }}
                          >
                            <div className="grid grid-cols-3 font-semibold justify-around  w-full h-28 px-4 ">
                              <div className="text-white col-span-1 w-full text-xl flex flex-row text-center items-center">
                                {filteredItems[item]?.type ? (
                                  <img
                                    className="w-10 h-10 border border-white rounded-full"
                                    src={`${typeIcon}${filteredItems[item]?.type}.svg`}
                                    alt={`${filteredItems[item]?.type} icon`}
                                  />
                                ) : (
                                  <p className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                    ?
                                  </p>
                                )}
                                <p className="text-center col-span-1 w-2/3">
                                  {item}
                                </p>
                              </div>

                              <div className="w-full hidden md:flex text-sm text-center font-semibold h-full bg-black bg-opacity-20 text-white col-span-1 flex-col  p-3 justify-around items-center">
                                <p className="w-full  text-xs">
                                  {filteredItems[item]?.description}
                                </p>
                                {filteredItems[item]?.damage_class ===
                                "physical" ? (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-red-700 text-white text-xs p-1 rounded-md">
                                      Physical
                                    </span>
                                  </div>
                                ) : filteredItems[item]?.damage_class ===
                                  "special" ? (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-blue-700 text-white text-xs p-1 rounded-md">
                                      Special
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-gray-700 text-white text-xs p-1 rounded-md">
                                      Status
                                    </span>
                                  </div>
                                )}
                                <div className="text-xs w-full  text-white ">
                                  <p className="w-full flex flex-row justify-between">
                                    <span className="text-yellow-500">
                                      Power:{" "}
                                    </span>
                                    {filteredItems[item]?.power || "-"}
                                    <span className="text-yellow-500">
                                      PP:{" "}
                                    </span>
                                    {filteredItems[item]?.pp || "?"}
                                    <span className="text-yellow-500">
                                      ACC:{" "}
                                    </span>
                                    {filteredItems[item]?.accuracy || "-"}
                                    {filteredItems[item]?.priority === 1 && (
                                      <span className="text-red-600 flex-row flex">
                                        Prio:
                                        <span className="">
                                          +{filteredItems[item]?.priority}
                                        </span>
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {type === "ability" &&
                      Object.keys(filteredItems).map((item) => {
                        const pokemonName =
                          pokemonTeam[index]?.pokemon?.name?.toLowerCase();

                        const isHiddenPokemon =
                          filteredItems[item]?.hidden_pokemon.includes(
                            pokemonName
                          );
                        return (
                          <div
                            onClick={() => addItem(filteredItems[item])} // Assuming item is directly passed here
                            style={{
                              backgroundColor: isHiddenPokemon
                                ? "goldenrod"
                                : index % 2 == 0
                                ? "rgba(98, 98, 98, 0.05)"
                                : "rgba(98, 98, 98, 0.01)",
                            }}
                            className="justify-around mb-2 h-24 items-center flex p-4 rounded-xl hover:border-white hover:scale-x-95 transition-transform hover:cursor-pointer"
                          >
                            <div className="grid grid-cols-3 font-semibold justify-around h-24 w-full">
                              <div className="text-white col-span-1 w-full text-xl flex flex-row text-center justify-center items-center">
                                <p>{item}</p>
                              </div>

                              <div className="w-full text-sm text-center  font-semibold h-full bg-black bg-opacity-20 text-white col-span-1 flex-col  p-3   justify-center items-center hidden md:flex">
                                <p className="w-full  text-sm">
                                  {filteredItems[item]?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {type !== "moves" &&
                      type !== "ability" &&
                      filteredItems.map((item, index) => {
                        const natureEffects =
                          pokemonNatures[item] &&
                          `${
                            pokemonNatures[item].IncreasedStat || "Nothing"
                          } ↑, ${
                            pokemonNatures[item].DecreasedStat || "Nothing"
                          } ↓`;

                        return (
                          <div
                            onClick={() => addItem(item)}
                            key={index}
                            style={{
                              backgroundColor:
                                type === "teratype" && item === "Nothing"
                                  ? "firebrick"
                                  : type === "teratype"
                                  ? item
                                    ? `rgba(var(--${item.toLowerCase()}), 1)`
                                    : "firebrick"
                                  : index % 2 === 0
                                  ? "rgba(98, 98, 98, 0.15)"
                                  : "rgba(98, 98, 98, 0.25)",
                            }}
                            className="hover:scale-x-95 mb-2 shadow-inner hover:cursor-pointer transition-all justify-around p-5 w-auto rounded-xl hover:border-2 hover:border-white"
                          >
                            {type === "nature" && (
                              <div className="grid  grid-cols-3 justify-around  text-center items-center w-full">
                                <div className="col-span-1 text-xl font-semibold text-white">
                                  {item}
                                </div>

                                <div className="text-2xl font-medium col-span-1 ">
                                  <p className=" text-green-500">
                                    {natureEffects.split(",")[0]}
                                  </p>
                                  <p
                                    className={`text-red-600 ${
                                      natureEffects
                                        .split(",")[1]
                                        .includes("Nothing")
                                        ? ""
                                        : "animate-pulse"
                                    }`}
                                  >
                                    {natureEffects.split(",")[1]}
                                  </p>
                                </div>
                              </div>
                            )}
                            {type !== "nature" && (
                              <div className="grid grid-cols-3 font-semibold  justify-around text-center  w-full">
                                <div
                                  className={`text-white  justify-center w-full ${
                                    type === "teratype" ? "col-span-3" : ""
                                  } text-xl flex flex-row items-center space-x-6`}
                                >
                                  {type == "item" && (
                                    <img
                                      src={`/assets/sprites/items/${item.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                        .replace(
                                          /ium[\s-]z$/i,
                                          (match) => `${match}--held`
                                        )}.png`}
                                    />
                                  )}

                                  {type == "item" ? item.name : item}
                                </div>
                                {type === "item" && (
                                  <div>
                                    <div className="col-span-1 text-xs text-white hidden md:flex">
                                      {item.description}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
                {showPercentages && (
                  <div className="flex flex-col rounded-lg  bg-primary overflow-x-hidden overflow-y-auto h-[85%] md:h-[95%]">
                    {type === "moves" &&
                      Object.keys(filteredItems).map((item, index) => {
                        const isSelected = multiSelectData.some(
                          (selectedItem) =>
                            selectedItem?.name === filteredItems[item]?.name
                        );
                        return (
                          <div
                            onClick={() => addItem(filteredItems[item])}
                            key={index}
                            className={`relative mb-2 justify-around  items-center flex rounded-xl transition-transform hover:cursor-pointer ${
                              isSelected
                                ? "border-2 border-white scale-95"
                                : "scale-100"
                            } hover:border-white hover:scale-x-95 bg-types-${
                              filteredItems[item]?.type
                            }`}
                            style={{
                              backgroundColor: filteredItems[item]?.type
                                ? `rgba(var(--${filteredItems[item]?.type}), 1)`
                                : "black",
                              opacity: !filteredItems[item]?.type ? 0.6 : 1,
                              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                            }}
                          >
                            <div className="grid grid-cols-3 font-semibold justify-around  w-full h-28 px-4 ">
                              <div className="text-white col-span-1 w-full text-xl flex flex-row text-center items-center">
                                {filteredItems[item]?.type ? (
                                  <img
                                    className="w-10 h-10 border border-white rounded-full"
                                    src={`${typeIcon}${filteredItems[item]?.type}.svg`}
                                    alt={`${filteredItems[item]?.type} icon`}
                                  />
                                ) : (
                                  <p className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                    ?
                                  </p>
                                )}
                                <p className="text-center col-span-1 w-2/3">
                                  {item}
                                </p>
                              </div>

                              <div className="w-full hidden md:flex text-sm text-center font-semibold h-full bg-black bg-opacity-20 text-white col-span-1 flex-col  px-2 justify-around items-center">
                                <p className="w-full  text-xs">
                                  {filteredItems[item]?.description}
                                </p>
                                {filteredItems[item]?.damage_class ===
                                "physical" ? (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-red-700 text-white text-xs p-1 rounded-md">
                                      Physical
                                    </span>
                                  </div>
                                ) : filteredItems[item]?.damage_class ===
                                  "special" ? (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-blue-700 text-white text-xs p-1 rounded-md">
                                      Special
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex absolute left-1 top-1">
                                    <span className="bg-gray-700 text-white text-xs p-1 rounded-md">
                                      Status
                                    </span>
                                  </div>
                                )}
                                <div className="text-xs w-full  text-white ">
                                  <p className="w-full flex flex-row justify-between">
                                    <span className="text-yellow-500">
                                      Power:{" "}
                                    </span>
                                    {filteredItems[item]?.power || "-"}
                                    <span className="text-yellow-500">
                                      PP:{" "}
                                    </span>
                                    {filteredItems[item]?.pp || "?"}
                                    <span className="text-yellow-500">
                                      ACC:{" "}
                                    </span>
                                    {filteredItems[item]?.accuracy || "-"}
                                    {filteredItems[item]?.priority === 1 && (
                                      <span className="text-red-600 flex-row flex">
                                        Prio:
                                        <span className="">
                                          +{filteredItems[item]?.priority}
                                        </span>
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div
                                className="text-lg md:text-4xl md:mx-5  font-semibold col-span-2 justify-end md:col-span-1  items-center flex-row flex"
                                style={{
                                  color:
                                    data &&
                                    data[item] !== undefined &&
                                    typeof data[item] === "number"
                                      ? getColorForPercentage(
                                          (data[item] * 100).toFixed(2)
                                        )
                                      : "white",
                                }}
                              >
                                {data &&
                                  data[item] !== undefined &&
                                  data[item] > 0.01 &&
                                  typeof data[item] === "number" &&
                                  `${(data[item] * 100).toFixed(2)}%`}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {type === "ability" &&
                      Object.keys(filteredItems).map((item) => {
                        const pokemonName =
                          pokemonTeam[index]?.pokemon?.name?.toLowerCase();

                        const isHiddenPokemon =
                          filteredItems[item]?.hidden_pokemon.includes(
                            pokemonName
                          );

                        return (
                          <div
                            onClick={() => addItem(filteredItems[item])} // Assuming item is directly passed here
                            style={{
                              backgroundColor: isHiddenPokemon
                                ? "goldenrod"
                                : index % 2 == 0
                                ? "rgba(98, 98, 98, 0.05)"
                                : "rgba(98, 98, 98, 0.01)",
                            }}
                            className="justify-around mb-2 h-24 items-center flex p-4 rounded-xl hover:border-white hover:scale-x-95 transition-transform hover:cursor-pointer"
                          >
                            <div className="grid grid-cols-3 font-semibold justify-around h-24 w-full">
                              <div className="text-white col-span-1 w-full text-xl flex flex-row text-center justify-center items-center">
                                <p>{item}</p>
                              </div>

                              <div className="w-full hidden md:flex  text-sm text-center  font-semibold h-full bg-black bg-opacity-20 text-white col-span-1 flex-col  p-3 justify-center items-center ">
                                <p className="w-full  text-sm">
                                  {filteredItems[item]?.description}
                                </p>
                              </div>

                              <div
                                className="text-2xl font-semibold col-span-2 md:col-span-1 justify-center items-center flex-row flex"
                                style={{
                                  color:
                                    data &&
                                    data[item] !== undefined &&
                                    typeof data[item] === "number"
                                      ? getColorForPercentage(
                                          (data[item] * 100).toFixed(2)
                                        )
                                      : "white",
                                }}
                              >
                                {data &&
                                  data[item] !== undefined &&
                                  data[item] > 0.01 &&
                                  typeof data[item] === "number" &&
                                  `${(data[item] * 100).toFixed(2)}%`}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {type !== "moves" &&
                      type !== "ability" &&
                      filteredItems.map((item, index) => {
                        const getColorForPercentage = (percentage) => {
                          const value = parseFloat(percentage);

                          if (isNaN(value)) {
                            return "white"; // Return a default color or handle the undefined case as needed
                          }
                          const red = Math.min(
                            255,
                            Math.floor((100 - value) * 2.55)
                          );
                          const green = Math.min(255, Math.floor(value * 2.55));
                          return `rgb(${red}, ${green}, 6)`;
                        };

                        let percentage;
                        if (
                          type === "nature" &&
                          naturePercentages[item] !== undefined
                        ) {
                          percentage =
                            (naturePercentages[item] * 100).toFixed(2) + "%";
                        } else if (
                          type !== "nature" &&
                          data[item] !== undefined
                        ) {
                          percentage = (data[item] * 100).toFixed(2) + "%";
                        } else {
                          percentage = "Not recommended";
                        }

                        const natureEffects =
                          pokemonNatures[item] &&
                          `${
                            pokemonNatures[item].IncreasedStat || "Nothing"
                          } ↑, ${
                            pokemonNatures[item].DecreasedStat || "Nothing"
                          } ↓`;

                        return (
                          <div
                            onClick={() => addItem(item)}
                            key={index}
                            style={{
                              backgroundColor:
                                type === "teratype" && item === "Nothing"
                                  ? "firebrick"
                                  : type === "teratype"
                                  ? item
                                    ? `rgba(var(--${item.toLowerCase()}), 1)`
                                    : "firebrick"
                                  : index % 2 === 0
                                  ? "rgba(98, 98, 98, 0.15)"
                                  : "rgba(98, 98, 98, 0.25)",
                            }}
                            className="hover:scale-x-95 mb-2 shadow-inner hover:cursor-pointer transition-all justify-around p-5 w-auto rounded-xl hover:border-2 hover:border-white"
                          >
                            {type === "nature" && (
                              <div className="grid  grid-cols-3 justify-around  text-center items-center w-full">
                                <div className="col-span-1 text-xl font-semibold text-white">
                                  {item}
                                </div>

                                <div className="text-sm md:text-2xl font-medium col-span-1 ">
                                  <p className=" text-green-500">
                                    {natureEffects.split(",")[0]}
                                  </p>
                                  <p
                                    className={`text-red-600 ${
                                      natureEffects
                                        .split(",")[1]
                                        .includes("Nothing")
                                        ? ""
                                        : "animate-pulse"
                                    }`}
                                  >
                                    {natureEffects.split(",")[1]}
                                  </p>
                                </div>

                                <div
                                  className="col-span-1 text-md md:text-2xl font-semibold "
                                  style={{
                                    color: getColorForPercentage(percentage),
                                  }}
                                >
                                  {percentage}
                                </div>
                              </div>
                            )}
                            {type !== "nature" && (
                              <div className="grid grid-cols-3 font-semibold  justify-around text-center  w-full">
                                <div
                                  className={`text-white  justify-center w-full ${
                                    type === "teratype" ? "col-span-3" : ""
                                  } text-xs md:text-xl flex flex-row items-center space-x-6`}
                                >
                                  {type == "item" && (
                                    <img
                                      src={`/assets/sprites/items/${item.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                        .replace(
                                          /ium[\s-]z$/i,
                                          (match) => `${match}--held`
                                        )}.png`}
                                    />
                                  )}

                                  {type == "item" ? item.name : item}
                                </div>
                                {type === "item" && (
                                  <>
                                    <div className="col-span-1 text-xs text-white ">
                                      {item.description}
                                    </div>

                                    <div
                                      className="col-span-1 md:col-span-1  text-lg text-center font-semibold"
                                      style={{
                                        color:
                                          typeof data[
                                            type == "item" ? item.name : item
                                          ] === "number"
                                            ? getColorForPercentage(
                                                (
                                                  data[
                                                    type == "item"
                                                      ? item.name
                                                      : item
                                                  ] * 100
                                                ).toFixed(2)
                                              )
                                            : "white",
                                      }}
                                    >
                                      {typeof data[
                                        type == "item" ? item.name : item
                                      ] === "number" &&
                                        `${(
                                          data[
                                            type == "item" ? item.name : item
                                          ] * 100
                                        ).toFixed(2)}%`}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
};
