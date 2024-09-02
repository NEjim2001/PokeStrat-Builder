"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushFormat,
  removePokemon,
  resetPokemon,
  setFormat,
  setFormats,
  setGeneration,
  setLevel,
  setMoveData,
  setPokemon,
  setShiny,
} from "@app/store/pokemon/pokemonTeamSlice";
import { exportPokemonData, importPokemonData } from "@constants/ExportPokemon";
import { SelectionModal } from "./SelectionModals/SelectionModal";
import { pokemonNatures } from "@constants/items";
import store from "@app/store/store";
import {
  fetchFormats,
  fetchPokemonData,
  randomizePokemonFetch,
} from "@constants/FetchPokemonData";
import DropdownMenu from "./DropdownMenu";
import { useGeneration } from "@app/GenerationProvider";
import { searchData } from "@constants/demoData";
import { pokemonDummyData } from "@constants/demoData";
import TextInputModal from "./TextInputModal";
import Loading from "./Loading";
import { pokeDex } from "@constants/pokedex";
import { normalizePokemonName } from "@constants/nameMapping";
import { splitAndCapitalize } from "@constants/utlis";
import { track } from "@vercel/analytics";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/16/solid";

const PokemonStatsCard = ({ index, viewMoves }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [moveIndex, setMoveIndex] = useState(0);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [audio, setAudio] = useState(null);
  const [importData, setImportData] = useState(false);
  const [inputModal, showInputModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonTeam[index]);
  const [showPokemon, setShowPokemon] = useState(false); // State to control when to show the Pokémon information
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const teratypeIcon = "/assets/pokemon_teratype_icons/";

  const handleButtonClick = (itemData, type, moveIndex) => {
    setMoveIndex(moveIndex);
    setSelectedType(type);
    setSelectedItemData(itemData);
    setIsModalOpen(true);
  };

  const { selectedFormat, selectedGeneration, demo, ratedMode, setRatedMode } =
    useGeneration();

  const [generationLocal, setGenerationLocal] = useState(pokemon?.generation);
  const [formatLocal, setFormatLocal] = useState(pokemon?.format);

  useEffect(() => {
    if (pokemon?.generation) {
      setGenerationLocal(pokemon.generation);
    }
    if (pokemon?.format) {
      setFormatLocal(pokemon.format);
    }
  }, [pokemon, index]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRandomizeButton = async () => {
    track("Randomized Pokemon");
    const generationKeys = Object.keys(pokeDex);
    const randomGenerationIndex = Math.floor(
      Math.random() * generationKeys.length
    );
    const randomGenerationKey = generationKeys[randomGenerationIndex];
    const randomPokemonIndex = Math.floor(
      Math.random() * pokeDex[randomGenerationKey].length
    );

    const dispatch = store.dispatch;
    const pokemonName = normalizePokemonName(
      pokeDex[randomGenerationKey][randomPokemonIndex].name
    );
    setisLoading(true);

    try {
      const fetchedData = await fetchPokemonData(
        window,
        pokemonName,
        selectedGeneration,
        selectedFormat,
        ratedMode
      );
      dispatch(resetPokemon(index));

      dispatch(
        setPokemon({
          index,
          data: {
            name:
              pokemonName.charAt(0).toUpperCase() +
              pokemonName.slice(1).toLowerCase(),
            data: fetchedData,
          },
        })
      );
      setisLoading(false);

      try {
        const formatData = await fetchFormats(
          window,
          pokemonName.substring(0, 1).toUpperCase() +
            pokemonName.substring(1).toLowerCase(),
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
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const handleExport = async () => {
    const data = exportPokemonData(index);
    navigator.clipboard.writeText(data);
    alert("Copied Pokemon to Clipboard!\n" + data);
  };

  const handleTeamImport = async () => {
    showInputModal(true);
  };

  useEffect(() => {
    const handleImport = async () => {
      if (importData) {
        const data = importPokemonData(
          index,
          importData,
          demo,
          selectedGeneration,
          selectedFormat,
          ratedMode
        );
        setImportData("");
      }
    };
    handleImport();
  }, [importData, selectedGeneration, selectedFormat, ratedMode]);

  const name = pokemon?.pokemon?.name;
  const crySound = pokemon?.pokemon?.data?.basicData?.cry;
  const moves = pokemon?.moves;
  const nature = pokemon?.nature;
  const ability = pokemon?.ability;
  const teratype = pokemon?.teratype;
  const item = pokemon?.item;
  const level = pokemon?.level;
  const shiny = pokemon?.shiny;
  const generationPokemon = pokemon?.generation;
  const pokemonSmogonData = useSelector(
    (state) => state.pokemonTeam[index]?.pokemon?.data?.smogonData
  );

  const pokemonFormats = useSelector(
    (state) => state.pokemonTeam[index]?.formatsData
  );
  const audioRef = useRef(audio);

  const handleShinySwitch = () => {
    dispatch(setShiny({ index, data: !shiny }));
  };

  const handleFormatChange = async (value, type, refresh) => {
    if (pokemon?.pokemon?.name === null) {
      alert("Please select a Pokémon first.");
      return;
    }

    if (type === "format") {
      const newFormat = value;

      setFormatLocal(newFormat);
      dispatch(setFormat({ index, data: newFormat }));
      if (refresh) {
        dispatch(setMoveData({ index, data: {} }));
      }
    } else {
      value = parseInt(value);
      setGenerationLocal(value);
      dispatch(setGeneration({ index, data: value }));

      dispatch(setMoveData({ index, data: {} }));
    }

    if (!demo) {
      setisLoading(true);
      const newGeneration = type === "generation" ? value : generationLocal;
      const newFormat = type === "format" ? value : formatLocal;

      try {
        const pokemonData = await fetchPokemonData(
          window,
          name,
          newGeneration,
          newFormat,
          ratedMode,
          "Pokemon Stats Cards  JS"
        );

        // Simulate a small delay before setting isLoading to false
        setTimeout(() => {
          dispatch(
            setPokemon({
              index: index,
              data: {
                name:
                  pokemonData.name.charAt(0).toUpperCase() +
                  pokemonData.name.slice(1).toLowerCase(),
                data: pokemonData,
              },
            })
          );
          setisLoading(false);
        }, 300); // Adjust the delay time (in milliseconds) as needed
      } catch (error) {
        // Handle errors
        console.error("Error fetching Pokemon data:", error);
        setisLoading(false); // Ensure isLoading is set to false in case of error
      }
    } else {
      let pokemonData;
      if (index === 0) {
        pokemonData = pokemonDummyData[0];
      } else {
        pokemonData = searchData;
      }
      if (pokemonData.name === null) {
        return;
      }

      dispatch(
        setPokemon({
          index: index,
          data: {
            name:
              pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1).toLowerCase(),
            data: pokemonData,
          },
        })
      );
    }

    if (
      pokemonSmogonData &&
      Object.keys(pokemonSmogonData).length > 0 &&
      !Object.keys(pokemonFormats[generationLocal - 1]).includes(formatLocal) &&
      formatLocal !== "No Format Selected"
    ) {
      dispatch(
        pushFormat({
          index: index,
          generation: generationLocal,
          format: formatLocal,
        })
      );
    }
  };

  useEffect(() => {
    setAudio(new Audio(crySound));
  }, [pokemon, index]);

  const handleLevelChange = (e) => {
    const inputLevel = parseInt(e.target.value, 10);
    const newLevel = isNaN(inputLevel)
      ? 100
      : Math.min(Math.max(inputLevel, 1), 100);

    if (newLevel !== null && newLevel !== undefined) {
      dispatch(setLevel({ index, level: newLevel }));
    }
  };

  const playAudio = () => {
    track("Audio Played");
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (pokemon && pokemon.name) {
      dispatch(
        setPokemon({ index, data: { name: pokemon.name, data: pokemon } })
      );
    }
  }, [pokemon, index]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPokemon(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);
  const buttonText = ratedMode
    ? isHovered
      ? "Unrated Mode?"
      : "Rated Mode"
    : isHovered
    ? "Rated Mode?"
    : "Unrated Mode";
  const handleClick = () => setRatedMode(!ratedMode);

  return (
    <section className="flex flex-col md:flex-row w-full h-full md:h-[21.6rem] px-4 py-2 ">
      {inputModal && (
        <TextInputModal
          showInputModal={showInputModal}
          setImportData={setImportData}
        />
      )}

      {pokemon && (
        <section className="flex flex-col md:flex-row w-full md:w-3/4 mr-4">
          {/* Optional Input Modal Component */}
          {inputModal && (
            <TextInputModal
              showInputModal={showInputModal}
              setImportData={setImportData}
            />
          )}
          <div className="relative">
            <div
              className="buttonCustom bg-primary w-32 md:w-40 px-2 md:px-4 flex absolute m-2 md:m-4 cursor-pointer hover:animate-pulse"
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {buttonText}
            </div>
          </div>
          {/* Main Content Section */}
          <section className="bg-primary flex flex-col md:flex-row rounded-lg w-full items-center">
            {/* Pokémon Image or Loading Spinner */}
            {isLoading ? (
              <section className="flex flex-col items-center w-48 md:w-96 h-48 md:h-64  gap-4 md:gap-10 justify-center">
                <div className="animate-spin rounded-full h-24 md:h-32 w-24 md:w-32 border-b-2 border-purple-500" />
                <p className="text-center text-white text-xl md:text-2xl font-semibold truncate animate-pulse">
                  Loading...
                </p>
              </section>
            ) : (
              <section className="flex flex-col items-center w-48 md:w-96 h-48 md:h-64 justify-center">
                <img
                  src={
                    pokemon?.pokemon?.name === null
                      ? "./assets/images/unknown_pokemon.png"
                      : pokemon?.shiny
                      ? `/assets/sprites/pokemon/other/home/shiny/${pokemon?.pokemon?.data?.id}.png`
                      : `/assets/sprites/pokemon/other/home/${pokemon?.pokemon?.data?.id}.png`
                  }
                  alt={`${pokemon?.pokemon?.name} Pokemon Home image`}
                  className="w-24 md:w-64 object-contain"
                />
                <p className="text-center text-white text-lg md:text-2xl font-semibold px-2 md:px-4">
                  {pokemon?.pokemon?.name
                    ? splitAndCapitalize(pokemon?.pokemon?.name)
                    : "PokéStrat"}
                </p>
              </section>
            )}

            {/* Button Grid and Individual Buttons */}
            <section className="space-y-1 md:space-y-2 h-full content-center w-full md:w-1/2 mx-4 md:mx-8">
              <div className="grid grid-cols-3  w-full items-center justify-center space-x-2">
                {/* First Column: Buttons */}
                <div className="col-span-3 md:col-span-2 grid grid-cols-3 md:grid-cols-2 gap-1 md:gap-0 h-24 md:h-36 w-full  lg:pr-2">
                  <button
                    onClick={handleShinySwitch}
                    className="flex justify-center items-center rounded-tl-lg  bg-primary hover:bg-yellow-500"
                  >
                    <SparklesIcon className="w-7 text-yellow-400" />
                  </button>

                  <button
                    onClick={handleTeamImport}
                    className="flex justify-center items-center  rounded-tr-lg bg-primary hover:bg-yellow-500 "
                  >
                    <ArrowDownTrayIcon className="w-7 text-white" />
                  </button>

                  <button
                    onClick={handleExport}
                    className="flex justify-center items-center rounded-bl-lg bg-primary hover:bg-yellow-500"
                  >
                    <ArrowUpTrayIcon className="w-7 text-white" />
                  </button>

                  <button
                    onClick={playAudio}
                    className="flex justify-center items-center rounded-br-lg bg-primary hover:bg-yellow-500"
                  >
                    <SpeakerWaveIcon className="w-7 text-white" />
                  </button>
                  <button
                    onClick={handleRandomizeButton}
                    className=" justify-center items-center hover:bg-yellow-500 font-semibold text-white rounded-lg flex md:hidden  bg-gradient-to-r text-sm from-yellow-600 to-yellow-500"
                  >
                    <p className="rotate-45">R</p>
                  </button>
                  <select
                    value={level || ""}
                    onChange={handleLevelChange}
                    className="rounded-lg bg-primary  text-center    md:hidden text-white   text-sm "
                  >
                    {/* Generate options from 1 to 100 */}
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Second Column: RANDOMIZE Button */}
                <div className=" justify-center items-center col-span-1 row-span-2 hidden md:flex  h-full">
                  <button
                    onClick={handleRandomizeButton}
                    className=" bg-gradient-to-r rotate-180    from-yellow-600 to-yellow-500 w-full h-full flex items-center justify-center rounded-xl hover:from-white  hover:to-white hover:text-black text-white transition-colors duration-700"
                  >
                    <p
                      className="font-semibold  text-lg "
                      style={{ writingMode: "vertical-rl" }}
                    >
                      RANDOMIZE
                    </p>
                  </button>
                </div>
              </div>

              {/* Additional Sections (Dropdowns, Inputs, etc.) */}
              <div className="flex flex-col space-y-1 md:space-y-2 w-full">
                {ratedMode ? (
                  <div className="flex flex-col space-y-1 md:space-y-2 text-white transition-all font-medium w-full  ">
                    <div
                      className={`flex p-2 bg-primary rounded-lg items-center  ${
                        pokemonSmogonData &&
                        Object.keys(pokemonSmogonData)?.length === 0 &&
                        "animate-pulse"
                      }`}
                    >
                      <p className="mx-2 text-sm md:text-md">Format:</p>
                      <DropdownMenu
                        index={index}
                        selectedValue={formatLocal}
                        onSelect={(value, refresh) => {
                          if (isLoading) return;
                          handleFormatChange(value, "format", refresh);
                        }}
                        type={"format"}
                      />
                    </div>
                    <div
                      className={`flex p-2 bg-primary rounded-lg items-center ${
                        pokemonSmogonData &&
                        Object.keys(pokemonSmogonData)?.length === 0 &&
                        "animate-pulse"
                      }`}
                    >
                      <p className="mx-2 text-sm md:text-md">Generation:</p>
                      <DropdownMenu
                        index={index}
                        selectedValue={generationLocal}
                        onSelect={(value, refresh) => {
                          if (isLoading) return;
                          handleFormatChange(value, "generation", refresh);
                        }}
                        type={"generation"}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1 md:space-y-2 text-white transition-all font-medium">
                    <div className="bg-primary rounded-lg items-center justify-center shadow-lg w-full flex text-center">
                      <span className="text-xs p-2 md:p-4">
                        THIS FEATURE IS <p>ONLY AVAILABLE IN</p>
                        <p
                          className="text-blue-500 cursor-pointer hover:animate-pulse"
                          onClick={() => {
                            setRatedMode(true);
                          }}
                        >
                          RATED MODE
                        </p>
                      </span>
                    </div>
                  </div>
                )}

                <div className=" flex-col hidden md:flex">
                  <div className="flex text-white font-medium">
                    <div className="flex p-2 justify-around w-full bg-primary rounded-lg items-center">
                      <p className="text-sm md:text-md mx-2">Level:</p>
                      <input
                        style={{ color: "white" }}
                        className="flex w-full bg-primary text-center text-sm md:text-md rounded-lg "
                        type="number"
                        value={level || ""}
                        onChange={handleLevelChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      )}

      <section className="bg-primary rounded-lg w-full md:w-1/4  ">
        {viewMoves ? (
          <section className="flex text-md flex-col  justify-around truncate h-full m-2 ">
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.moves,
                  "moves",
                  0
                );
              }}
              style={{
                backgroundColor: moves[0]?.data?.type
                  ? `rgba(var(--${moves[0].data.type}), 0.75)`
                  : "rgba(255, 255, 255, 0.05)",
              }}
              className="button p-4 "
            >
              {moves[0]?.name}
            </button>
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.moves,
                  "moves",
                  1
                );
              }}
              style={{
                backgroundColor: moves[1]?.data?.type
                  ? `rgba(var(--${moves[1].data.type}), 0.75)`
                  : "rgba(255, 255, 255, 0.05)",
              }}
              className="button p-4 "
            >
              {moves[1]?.name}
            </button>
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.moves,
                  "moves",
                  2
                );
              }}
              style={{
                backgroundColor: moves[2]?.data?.type
                  ? `rgba(var(--${moves[2].data.type}), 0.75)`
                  : "rgba(255, 255, 255, 0.05)",
              }}
              className="button p-4 "
            >
              {moves[2]?.name}
            </button>
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.moves,
                  "moves",
                  3
                );
              }}
              style={{
                backgroundColor: moves[3]?.data?.type
                  ? `rgba(var(--${moves[3].data.type}), 0.75)`
                  : "rgba(255, 255, 255, 0.05)",
              }}
              className="button p-4 "
            >
              {moves[3]?.name}
            </button>
          </section>
        ) : (
          <section className="flex text-md flex-col  justify-around truncate h-full m-2 ">
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.items,
                  "teratype"
                );
              }}
              className="py-4 flex gap-2 button"
            >
              {teratype ? teratype : "Teratype"}

              {teratype && teratype !== "Nothing" && (
                <img
                  className="w-7  object-cover"
                  src={`${teratypeIcon}${teratype.toLowerCase()}.png`}
                  alt={item}
                  loading="lazy"
                />
              )}
            </button>

            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.items,
                  "item"
                );
              }}
              className="button p-4 flex-row flex justify-evenly items-center"
            >
              {item ? item : "Item"}

              {item && item !== "" && item !== "Item" && (
                <img
                  src={`/assets/sprites/items/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")}${
                    item.replace(/\s+/g, "-").toLowerCase().endsWith("ium-z")
                      ? "--held"
                      : ""
                  }.png`}
                />
              )}
            </button>
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.abilities,
                  "ability"
                );
              }}
              className="button p-4"
            >
              {ability ? ability : "Ability"}
            </button>
            <button
              onClick={() => {
                handleButtonClick(
                  pokemon?.pokemon?.data?.smogonData?.spreads,
                  "nature"
                );
              }}
              className="button p-4 flex-row flex gap-2"
            >
              {nature ? nature : "Nature"}
              {pokemonNatures[
                nature.charAt(0).toUpperCase() +
                  nature.substring(1).toLowerCase()
              ] && (
                <span className="text-xs truncate">
                  <p className="truncate flex-row flex gap-2 text-green-500">
                    {pokemonNatures[
                      nature.charAt(0).toUpperCase() +
                        nature.substring(1).toLowerCase()
                    ]?.IncreasedStat
                      ? `${pokemonNatures[
                          nature.charAt(0).toUpperCase() +
                            nature.substring(1).toLowerCase()
                        ].IncreasedStat.split(" ")
                          .map((word) => word[0])
                          .join("")} ↑`
                      : ""}
                  </p>
                  <p className="truncate flex-row flex gap-2 text-red-500">
                    {pokemonNatures[
                      nature.charAt(0).toUpperCase() +
                        nature.substring(1).toLowerCase()
                    ]?.DecreasedStat
                      ? `${pokemonNatures[
                          nature.charAt(0).toUpperCase() +
                            nature.substring(1).toLowerCase()
                        ].DecreasedStat.split(" ")
                          .map((word) => word[0])
                          .join("")} ↓`
                      : ""}
                  </p>
                </span>
              )}
            </button>
          </section>
        )}

        {isModalOpen && (
          <SelectionModal
            data={selectedItemData}
            closeModal={handleCloseModal}
            isModalOpen={isModalOpen}
            index={index}
            type={selectedType}
            moveIndex={moveIndex}
            spreads={
              selectedType === "nature"
                ? pokemon?.pokemon?.data?.smogonData?.spreads
                : {}
            }
          />
        )}
      </section>
    </section>
  );
};

export default PokemonStatsCard;
