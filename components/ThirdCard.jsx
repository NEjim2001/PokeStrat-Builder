import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportPokemonData, importPokemonData } from "@constants/ExportPokemon";
import { SelectionModal } from "./SelectionModals/SelectionModal";
import store from "@app/store/store";
import { BackDrop } from "./BackDrop";
import { PlusIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  setAbility,
  setEVList,
  setFormat,
  setFormats,
  setGeneration,
  setItem,
  setIVSpread,
  setLevel,
  setMove,
  setMoveData,
  setNature,
  setPokemon,
  setShiny,
  setSpread,
  setTeratype,
} from "@app/store/pokemon/pokemonTeamSlice";
import { searchData } from "@constants/demoData";

import { findPokemonByName, findPokemonNumberByName } from "@constants/pokedex";
import {
  fetchFormats,
  fetchMoveData,
  fetchPokemonData,
} from "@constants/FetchPokemonData";
import { useGeneration } from "@app/GenerationProvider";
import { normalizePokemonName } from "@constants/nameMapping";
import Loading from "./Loading";
import { get, set, spread } from "lodash";
import { pokemonNatures } from "@constants/items";
import { getColorForPercentage, splitAndCapitalize } from "@constants/utlis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function ThirdCard({
  index,
  handlePokemonClick,
  viewTeam,
  setIsLoading,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const [viewMode, setViewMode] = useState("teammates");
  const { selectedGeneration, selectedFormat, ratedMode, setRatedMode } =
    useGeneration();

  const state = store.getState();
  const teamData = useSelector((state) => state.pokemonTeam);

  const pokemon = useSelector((state) => state.pokemonTeam[index]);
  const pokemonName = useSelector(
    (state) => state.pokemonTeam[index]?.pokemon?.name
  );
  const dispatch = useDispatch();
  const spreads = pokemon?.pokemon?.data?.smogonData?.spreads;

  const pokemonSmogonData = pokemon?.pokemon?.data?.smogonData;
  const pokemonFormat = pokemon?.format;
  const pokemonGeneration = pokemon?.generation;
  const pokemonFormats = useSelector(
    (state) => state.pokemonTeam[index]?.formatsData
  );

  const sets =
    pokemonFormats &&
    pokemonFormats[pokemonGeneration - 1] &&
    pokemonFormats[pokemonGeneration - 1][pokemonFormat];

  const teammates = pokemon?.pokemon?.data?.smogonData?.teammates;

  const handleSetClick = async (setName) => {
    const defaultEvs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    const defaultIvs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

    const mapValuesToDefault = (values, defaults) => {
      return Object.keys(defaults).map(
        (stat) => values?.[stat] ?? defaults[stat]
      );
    };

    const setData = sets[setName];
    const item = Array.isArray(setData.item)
      ? setData.item[Math.floor(Math.random() * setData.item.length)]
      : setData.item;
    const ability = Array.isArray(setData.ability)
      ? setData.ability[Math.floor(Math.random() * setData.ability.length)]
      : setData.ability;
    const nature = Array.isArray(setData.nature)
      ? setData.nature[Math.floor(Math.random() * setData.nature.length)]
      : setData.nature;
    const teratype = Array.isArray(setData.teratypes)
      ? setData.teratypes[Math.floor(Math.random() * setData.teratypes.length)]
      : setData.teratypes;
    const level = setData.level;
    const evs = mapValuesToDefault(
      Array.isArray(setData.evs)
        ? setData.evs[Math.floor(Math.random() * setData.evs.length)]
        : setData.evs,
      defaultEvs
    );
    const ivs = mapValuesToDefault(
      Array.isArray(setData.ivs)
        ? setData.ivs[Math.floor(Math.random() * setData.ivs.length)]
        : setData.ivs,
      defaultIvs
    );

    const moves = setData.moves.map((move) =>
      Array.isArray(move) ? move[0] : move
    );

    const getMoves = async () => {
      await fetchMoveData(moves, false).then((moveData) => {
        const moveDataArray = Object.values(moveData);

        for (let moveIndex = 0; moveIndex < 4; moveIndex++) {
          if (moveIndex < moveDataArray.length) {
            dispatch(
              setMove({
                index,
                moveIndex,
                move: {
                  name: moveDataArray[moveIndex].name,
                  data: moveDataArray[moveIndex],
                },
              })
            );
          }
        }
      });
    };
    await getMoves();
    dispatch(setItem({ index, data: item || "" }));
    dispatch(setAbility({ index, data: ability || "" }));
    dispatch(setNature({ index, data: nature || "" }));
    dispatch(setTeratype({ index, data: teratype || "" }));
    dispatch(setLevel({ index, data: level }));
    dispatch(setEVList({ index, data: evs }));
    dispatch(setIVSpread({ index, data: ivs }));
  };

  const handleAddPokemon = async (pokemon) => {
    // Find the index of the first slot with a null value in currentTeamData
    const index = teamData.findIndex((pokemon) => !pokemon?.pokemon?.name);
    if (index === -1) {
      alert("Your Team is full!");
      return; // You can handle this case as needed
    }
    setIsLoading(true);
    handlePokemonClick(index);
    const pokemonData = await fetchPokemonData(
      window,
      normalizePokemonName(kebabCase(pokemon.replace("%", "")), true),
      pokemonGeneration,
      pokemonFormat,
      ratedMode,
      "handleAddPokemon ThirdCard.jsx"
    );

    // Dispatch an action to update the state with the new Pokémon data
    dispatch(
      setPokemon({
        index: index,
        data: {
          name:
            pokemonData.name.substring(0, 1).toUpperCase() +
            pokemonData.name.substring(1).toLowerCase(),
          data: pokemonData,
        },
      })
    );

    dispatch(setGeneration({ index, data: pokemonGeneration }));
    dispatch(setFormat({ index, data: pokemonFormat }));

    setIsLoading(false);

    try {
      const formatData = await fetchFormats(
        window,
        pokemonData.name.substring(0, 1).toUpperCase() +
          pokemonData.name.substring(1).toLowerCase(),
        ratedMode
      );

      dispatch(
        setFormats({
          index,
          generation: selectedGeneration,
          data: formatData,
        })
      );
    } catch (error) {
      console.error(error, "Fetching Generation/Format Data");
    }
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
  };

  const addSuggestedItem = (selectionData, type) => {
    if (type === "viewSpreads") {
      dispatch(setSpread({ index, data: selectionData }));
    } else if (type === "viewSets") {
      handleSetClick(selectionData);
    } else {
      handleAddPokemon(selectionData);
    }
  };

  function kebabCase(name) {
    // Normalize name by replacing non-alphanumeric characters and converting to lowercase
    return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  }

  return (
    <section className="h-full  w-full">
      {viewTeam ? (
        <section className="flex flex-col p-4 shadow-inner h-full">
          <section className="flex flex-row justify-between w-full mb-3">
            <div className="text-white font-semibold text-2xl"></div>
          </section>

          <section className="bg-primary h-full flex flex-col items-center justify-around rounded-lg p-4 space-y-4">
            <div className="text-white font-semibold  text-center">
              <p className="text-xl"> Developer:</p>
              <p className="text-base">
                <a
                  className=" text-blue-500 cursor-pointer text-xl"
                  href="https://github.com/NEjim2001"
                >
                  NEjim2001
                </a>
              </p>
            </div>

            <div className="text-white  font-semibold text-lg text-center w-full">
              <div className="text-xl w-full">
                Need Help?
                <br />
                <div className="text-base text-yellow-500">
                  Join the community{" "}
                  <div className="w-full flex justify-evenly mt-2 ">
                    <a
                      href="https://discord.gg/hB4ZeaRgPX"
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label="Join our Discord"
                    >
                      <FontAwesomeIcon icon={faDiscord} size="3x" />
                    </a>
                    <a
                      href="https://twitter.com/PokestratTB"
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label="Follow us on Twitter"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="3x" />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCDGEIrizeB8jjRhHCiw_W0Q"
                      className="text-white hover:text-red-600 transition-colors"
                      aria-label="Watch our YouTube channel"
                    >
                      <FontAwesomeIcon icon={faYoutube} size="3x" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white font-semibold text-xl text-center space-y-2 w-full">
              <div className="text-xs">Find this tool helpful? Consider a</div>
              <button className="w-full  bg-yellow-600 hover:animate-pulse text-white  font-semibold rounded-lg h-10">
                <a href="https://www.paypal.com/donate/?business=JQB5WYHU9T7XU&no_recurring=1&item_name=Pok%C3%A9Strat+Team+Builder&currency_code=USD">
                  Donation
                </a>
              </button>
              <div className="text-base">To help the solo developer</div>
            </div>

            <div className="text-white font-semibold text-xs text-center">
              All Rights
              <br />
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setRatedMode(true);
                }}
              >
                Pokémon is © of Nintendo®, 1995-2024
              </p>
            </div>
          </section>
        </section>
      ) : (
        <section className="flex flex-col justify-between p-4 shadow-inner h-full ">
          <section className="flex flex-row items-center justify-between w-full ">
            <div className=" flex flex-col justify-between w-full mb-3">
              <div className="text-white font-semibold mb-4   text-2xl">
                <span className="flex-row flex items-center gap-2">
                  <StarIcon className="w-6  text-yellow-500" />

                  <p>Suggestions</p>
                </span>
              </div>

              <div className="flex w-auto bg-primary p-1 rounded-lg">
                <button
                  style={{
                    backgroundColor: viewMode === "teammates" ? "#090B1D" : "",
                  }}
                  onClick={() => handleViewMode("teammates")}
                  className=" flex-1 rounded-l-lg bg-primary  font-semibold text-white hover:text-yellow-500 hover:bg-white p-1"
                >
                  Mates
                </button>
                <button
                  style={{
                    backgroundColor: viewMode === "spreads" ? "#090B1D" : "",
                  }}
                  onClick={() => handleViewMode("spreads")}
                  className=" flex-1  bg-primary  font-semibold text-white hover:text-yellow-500 hover:bg-white"
                >
                  Spread
                </button>
                <button
                  style={{
                    backgroundColor: viewMode === "sets" ? "#090B1D" : "",
                  }}
                  onClick={() => handleViewMode("sets")}
                  className=" flex-1 rounded-r-lg bg-primary  font-semibold text-white hover:text-yellow-500 hover:bg-white"
                >
                  Sets
                </button>
              </div>
            </div>
          </section>

          {ratedMode ? (
            <section className="rounded-lg h-[345px]   hover:shadow-lg ">
              {viewMode == "teammates" && teammates && (
                <section className="bg-primary flex flex-col rounded-lg  p-3 gap-1 h-full  overflow-y-auto">
                  {Object.keys(teammates).map((teammate) => {
                    const usagePercentage = teammates[teammate] * 100;
                    const normalizedPokemonName = normalizePokemonName(
                      teammate,
                      false,
                      true
                    );
                    const imagePath = `/assets/sprites/pokemon/other/home/${findPokemonNumberByName(
                      kebabCase(normalizedPokemonName)
                    )}.png`;

                    if (usagePercentage > 5) {
                      return (
                        <div
                          style={{
                            backgroundColor: getColorForPercentage(
                              usagePercentage * 5,
                              0.05
                            ),
                          }}
                          className="flex-row gap-1 flex py-5 text-white font-semibold items-center rounded-lg transition-all truncate justify-between px-2 hover:border hover:border-white cursor-pointer"
                          key={teammate}
                          onClick={() =>
                            addSuggestedItem(teammate, "viewTeammates")
                          }
                        >
                          <img
                            src={imagePath}
                            alt={normalizedPokemonName}
                            className="w-8 object-contain "
                          />
                          <div className="text-sm truncate ">
                            {splitAndCapitalize(teammate)}
                          </div>
                          <div className="text-green-500 text-xs">
                            {typeof teammates[teammate] === "number"
                              ? `${(teammates[teammate] * 100).toFixed(0)}%`
                              : teammates[teammate]}
                          </div>
                        </div>
                      );
                    }
                  })}
                </section>
              )}

              {viewMode == "spreads" && spreads && (
                <section className="bg-primary flex flex-col rounded-lg p-3 gap-1 h-full  overflow-y-auto">
                  {Object.keys(spreads).map((spread) => {
                    const usagePercentage = spreads[spread] * 100;

                    if (usagePercentage > 1) {
                      return (
                        <div
                          style={{
                            backgroundColor: getColorForPercentage(
                              usagePercentage * 10,
                              0.05
                            ),
                          }}
                          className="flex-row   gap-2 flex text-white py-5 font-semibold  items-center  rounded-lg transition-all truncate justify-center hover:border hover:border-white cursor-pointer"
                          key={spread}
                          onClick={() =>
                            addSuggestedItem(spread, "viewSpreads")
                          }
                        >
                          <div className="flex flex-col text-center text-xs">
                            <p className="text-blue-500">
                              {spread.split(":")[0]}
                            </p>
                            <p>{spread.split(":")[1]}</p>
                          </div>
                          <div className="text-green-500 text-xs">
                            {typeof spreads[spread] === "number"
                              ? `${(spreads[spread] * 100).toFixed(2)}%`
                              : spreads[spread]}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </section>
              )}

              {viewMode == "sets" && sets && (
                <section className="bg-primary flex flex-col rounded-lg p-5 gap-2 h-full  overflow-y-auto">
                  {Object.keys(sets).map((setName) => {
                    return (
                      <div
                        className="flex-row flex h-auto group p-4 space-x-2 text-white font-semibold items-center bg-primary rounded-lg justify-center transition-all hover:border hover:border-white hover:cursor-pointer"
                        key={setName}
                        onClick={() => addSuggestedItem(setName, "viewSets")}
                      >
                        <div className="absolute hidden xl:group-hover:flex flex-col md:right-[300px]  p-4 rounded-lg text-xs text-gray-200 bg-primaryDark transition-all z-10 w-60 shadow-lg mb-96">
                          {/* Item */}
                          {sets[setName]?.item && (
                            <div className="flex flex-row items-center mb-2 w-full">
                              <p className="w-1/4 font-semibold text-sm">
                                Item:
                              </p>
                              <div className="w-3/4 text-sm">
                                {Array.isArray(sets[setName]?.item) ? (
                                  sets[setName]?.item.map((item, index) => (
                                    <span key={index}>
                                      {item}{" "}
                                      <span
                                        style={{
                                          color: getColorForPercentage(
                                            (pokemonSmogonData?.items?.[item] ??
                                              0) * 100
                                          ),
                                        }}
                                      >
                                        (
                                        {pokemonSmogonData?.items?.[item] !=
                                        null
                                          ? (
                                              pokemonSmogonData?.items?.[item] *
                                              100
                                            ).toFixed(2)
                                          : "N/A"}
                                        %)
                                      </span>
                                      {index < sets[setName]?.item.length - 1 &&
                                        ", "}
                                    </span>
                                  ))
                                ) : (
                                  <span>
                                    {sets[setName]?.item}{" "}
                                    <span
                                      style={{
                                        color: getColorForPercentage(
                                          (pokemonSmogonData?.items?.[
                                            sets[setName]?.item
                                          ] ?? 0) * 100
                                        ),
                                      }}
                                    >
                                      (
                                      {pokemonSmogonData?.items?.[
                                        sets[setName]?.item
                                      ] != null
                                        ? (
                                            pokemonSmogonData?.items?.[
                                              sets[setName]?.item
                                            ] * 100
                                          ).toFixed(2)
                                        : "N/A"}
                                      %)
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Ability */}
                          {sets[setName]?.ability && (
                            <div className="flex flex-row items-center mb-2 w-full">
                              <p className="w-1/4 font-semibold text-sm">
                                Ability:
                              </p>
                              <p className="w-3/4 text-sm">
                                {Array.isArray(sets[setName]?.ability)
                                  ? sets[setName]?.ability.join(", ")
                                  : sets[setName]?.ability}{" "}
                                <span
                                  style={{
                                    color: getColorForPercentage(
                                      pokemonSmogonData?.abilities?.[
                                        Array.isArray(sets[setName]?.ability)
                                          ? sets[setName]?.ability[0]
                                          : sets[setName]?.ability
                                      ] * 100 || 0
                                    ),
                                  }}
                                >
                                  (
                                  {pokemonSmogonData?.abilities?.[
                                    Array.isArray(sets[setName]?.ability)
                                      ? sets[setName]?.ability[0]
                                      : sets[setName]?.ability
                                  ] != null
                                    ? (
                                        pokemonSmogonData?.abilities[
                                          Array.isArray(sets[setName]?.ability)
                                            ? sets[setName]?.ability[0]
                                            : sets[setName]?.ability
                                        ] * 100
                                      ).toFixed(2)
                                    : "N/A"}
                                  %)
                                </span>
                              </p>
                            </div>
                          )}

                          {/* Nature */}
                          {sets[setName]?.nature &&
                            typeof sets[setName]?.nature === "string" && (
                              <div className="flex flex-row items-center mb-2 w-full">
                                <p className="w-1/4 font-semibold text-sm">
                                  Nature:
                                </p>
                                <p className="w-3/4 text-sm flex flex-row gap-2">
                                  {sets[setName]?.nature}
                                  {pokemonNatures[
                                    sets[setName]?.nature
                                      .charAt(0)
                                      .toUpperCase() +
                                      sets[setName]?.nature
                                        .slice(1)
                                        .toLowerCase()
                                  ] && (
                                    <span className="text-xs flex flex-row gap-1">
                                      {pokemonNatures[
                                        sets[setName]?.nature
                                          .charAt(0)
                                          .toUpperCase() +
                                          sets[setName]?.nature
                                            .slice(1)
                                            .toLowerCase()
                                      ].IncreasedStat && (
                                        <p className="text-green-500">
                                          {pokemonNatures[
                                            sets[setName]?.nature
                                              .charAt(0)
                                              .toUpperCase() +
                                              sets[setName]?.nature
                                                .slice(1)
                                                .toLowerCase()
                                          ].IncreasedStat.split(" ")
                                            .map((word) => word[0])
                                            .join("")}{" "}
                                          ↑
                                        </p>
                                      )}
                                      {pokemonNatures[
                                        sets[setName]?.nature
                                          .charAt(0)
                                          .toUpperCase() +
                                          sets[setName]?.nature
                                            .slice(1)
                                            .toLowerCase()
                                      ].DecreasedStat && (
                                        <p className="text-red-500">
                                          {pokemonNatures[
                                            sets[setName]?.nature
                                              .charAt(0)
                                              .toUpperCase() +
                                              sets[setName]?.nature
                                                .slice(1)
                                                .toLowerCase()
                                          ].DecreasedStat.split(" ")
                                            .map((word) => word[0])
                                            .join("")}{" "}
                                          ↓
                                        </p>
                                      )}
                                    </span>
                                  )}
                                </p>
                              </div>
                            )}

                          {/* Tera Type */}
                          {sets[setName]?.teratypes && (
                            <div className="flex flex-row items-center mb-2 w-full">
                              <p className="w-1/4 font-semibold text-sm">
                                Tera Type:
                              </p>
                              <p className="w-3/4 text-sm">
                                {Array.isArray(sets[setName]?.teratypes)
                                  ? sets[setName]?.teratypes.join(", ")
                                  : sets[setName]?.teratypes}{" "}
                              </p>
                            </div>
                          )}

                          {/* Level */}
                          {sets[setName]?.level && (
                            <div className="flex flex-row items-center mb-2 w-full">
                              <p className="w-1/4 font-semibold text-sm">
                                Level:
                              </p>
                              <p className="w-3/4 text-sm">
                                {sets[setName]?.level}
                              </p>
                            </div>
                          )}

                          {/* IVs */}
                          {sets[setName]?.ivs &&
                            Object.keys(sets[setName]?.ivs).length > 0 && (
                              <div className="flex flex-row items-center mb-2 w-full">
                                <p className="w-1/4 font-semibold text-sm">
                                  IVs:
                                </p>
                                <p className="w-3/4 text-sm">
                                  {Object.entries(sets[setName]?.ivs).map(
                                    ([stat, value], index) => (
                                      <span key={index}>
                                        {stat.charAt(0).toUpperCase() +
                                          stat.slice(1) +
                                          " "}
                                        {typeof value === "object"
                                          ? JSON.stringify(value)
                                          : value}
                                        {index <
                                        Object.entries(sets[setName]?.ivs)
                                          .length -
                                          1
                                          ? ", "
                                          : ""}
                                      </span>
                                    )
                                  )}
                                </p>
                              </div>
                            )}
                          {/* EVs */}
                          {sets[setName]?.evs && (
                            <div className="flex flex-col mb-2 w-full">
                              <p className="font-semibold text-sm">EVs:</p>
                              {Array.isArray(sets[setName]?.evs) ? (
                                sets[setName]?.evs.map(
                                  (evSpread, spreadIndex) => (
                                    <p key={spreadIndex} className="text-sm">
                                      {Object.entries(evSpread).map(
                                        ([stat, value], index) => (
                                          <span key={index}>
                                            {stat.charAt(0).toUpperCase() +
                                              stat.slice(1)}
                                            : {value}
                                            {index <
                                              Object.entries(evSpread).length -
                                                1 && ", "}
                                          </span>
                                        )
                                      )}
                                    </p>
                                  )
                                )
                              ) : (
                                <p className="text-sm">
                                  {Object.entries(sets[setName]?.evs).map(
                                    ([stat, value], index) => (
                                      <span key={index}>
                                        {stat.charAt(0).toUpperCase() +
                                          stat.slice(1)}
                                        : {value}
                                        {index <
                                          Object.entries(sets[setName]?.evs)
                                            .length -
                                            1 && ", "}
                                      </span>
                                    )
                                  )}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Moves */}
                          {sets[setName]?.moves?.length > 0 && (
                            <div className="flex flex-col mb-1 w-full">
                              <p className="font-semibold text-sm text-center">
                                Moves:
                              </p>
                              {sets[setName]?.moves.map((move, index) => {
                                const moveList = Array.isArray(move)
                                  ? move
                                  : [move];
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-row flex-wrap"
                                  >
                                    {/* Moves */}
                                    <p className="w-full text-xs">
                                      {moveList.map((moveItem, idx) => (
                                        <span key={idx}>
                                          {moveItem}
                                          {idx < moveList.length - 1 && " / "}
                                        </span>
                                      ))}
                                    </p>
                                    {/* Percentages */}
                                    <p className="w-full text-gray-400 text-xs">
                                      {moveList.map((moveItem, idx) => {
                                        const moveData =
                                          pokemonSmogonData?.moves?.[moveItem];
                                        return (
                                          <span key={idx}>
                                            {moveData != null ? (
                                              <span
                                                style={{
                                                  color: getColorForPercentage(
                                                    moveData * 100
                                                  ),
                                                }}
                                              >
                                                {(moveData * 100).toFixed(2)}%
                                              </span>
                                            ) : (
                                              "N/A"
                                            )}
                                            {idx < moveList.length - 1 && " / "}
                                          </span>
                                        );
                                      })}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <p className="text-xs">{setName}</p>
                      </div>
                    );
                  })}
                </section>
              )}

              {(viewMode === "teammates" && pokemonSmogonData && !teammates) ||
              (viewMode === "spreads" && pokemonSmogonData && !spreads) ||
              (viewMode === "sets" && pokemonSmogonData && !sets) ? (
                <div className="bg-primary h-full flex flex-col items-center justify-center rounded-lg">
                  <span className="text-white font-semibold text-lg text-center p-4  w-full rounded-lg ">
                    NO{" "}
                    <span>
                      {viewMode.toUpperCase()}
                      <p>
                        FOR THIS <span className="text-blue-500">FORMAT</span>
                      </p>
                      <span>
                        AND <span className="text-yellow-500">GENERATION</span>
                      </span>
                      <p>COMBINATION</p>
                    </span>
                    <p className="text-xs text-yellow-500">
                      CONSIDER CHANGING THE <br></br> FORMAT OR GENERATION
                    </p>
                  </span>

                  <div className="text-white font-semibold text-sm text-center mt-4">
                    TOO COMPLEX?
                    <p
                      className="text-blue-500 cursor-pointer hover:animate-pulse text-lg mt-2"
                      onClick={() => {
                        setRatedMode(false);
                      }}
                    >
                      TRY UNRATED MODE
                    </p>
                  </div>
                </div>
              ) : null}

              {!pokemonName && (
                <div className="bg-primary h-[355px] flex flex-col items-center justify-center">
                  <div className="text-white font-semibold text-lg text-center p-4 rounded-lg ">
                    NO POKEMON
                    <div className="text-yellow-500 font-semibold text-xs text-center rounded-lg ">
                      PICK A POKEMON TO GET SUGGESTIONS
                    </div>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <section className="bg-primary h-[355px] flex items-center justify-center">
              <div className="text-white font-semibold text-md text-center  ">
                <p>THIS FEATURE IS</p> ONLY AVAILABLE IN
                <br />
                <p
                  className="text-blue-500 cursor-pointer hover:animate-pulse text-2xl"
                  onClick={() => {
                    setRatedMode(true);
                  }}
                >
                  RATED MODE
                </p>
              </div>
            </section>
          )}
        </section>
      )}
    </section>
  );
}
