"use client";

import MainCard from "@components/MainCard";
import TeamOverviewCard from "@components/TeamOverviewCard";
import { pokemonDummyData } from "@constants/demoData";
import { useEffect, useState } from "react";
import store from "@app/store/store";
import SecondaryCard from "@components/SecondaryCard";
import ThirdCard from "@components/ThirdCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormat,
  setGeneration,
  setPokemon,
} from "@app/store/pokemon/pokemonTeamSlice";
import Loading from "@components/Loading";
import { exportTeamData, importTeamData } from "@constants/ExportPokemon";
import TextInputModal from "@components/TextInputModal";
import { useMediaQuery } from "react-responsive";
import { clearState } from "@constants/utlis";
import TeamOverviewBubbleCard from "@components/TeamOverviewBubbleCard";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useGeneration } from "@app/GenerationProvider";

const Home = () => {
  const [viewTeam, toggleViewTeam] = useState(false);
  const [viewMoves, toggleViewMoves] = useState(false);
  const [viewMoveCoverage, setViewMoveCoverage] = useState(false);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [inputModal, showInputModal] = useState(false);
  const [importData, setImportData] = useState(false);
  const pokemonTeam = useSelector((state) => state.pokemonTeam);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setSelectedGeneration,
    setSelectedFormat,
    selectedGeneration,
    selectedFormat,
    demo,
    ratedMode,
    setPageLoadingMessage,
  } = useGeneration();
  const isMobilePortrait = useMediaQuery({ maxWidth: 767 });
  const startingGeneration = 9;
  const startingFormat = "OU";
  const [showBubble, setShowBubble] = useState(true);

  const handlePokemonClick = (index) => {
    toggleViewTeam(false);
    setSelectedPokemonIndex(index);
  };

  const dispatch = useDispatch();
  const state = store.getState();

  useEffect(() => {
    if (pokemonTeam[0]?.pokemon?.name === null && demo) {
      const starterPokemonData = {
        name:
          pokemonDummyData[selectedPokemonIndex].name
            .substring(0, 1)
            .toUpperCase() +
          pokemonDummyData[selectedPokemonIndex].name
            .substring(1)
            .toLowerCase(),
        data: pokemonDummyData[selectedPokemonIndex],
      };

      dispatch(
        setPokemon({ index: selectedPokemonIndex, data: starterPokemonData })
      );
      setSelectedGeneration(startingGeneration);
      setSelectedFormat(startingFormat);
      dispatch(setGeneration({ index: 0, data: startingGeneration }));
      dispatch(setFormat({ index: 0, data: startingFormat }));
    } else {
      setSelectedGeneration(startingGeneration);
      setSelectedFormat(startingFormat);
      setIsLoading(false);
    }
  }, []);

  const handleTeamImport = async () => {
    showInputModal(true);
  };

  useEffect(() => {
    const importTeam = async () => {
      if (importData) {
        setIsLoading(true);
        const success = await importTeamData(
          importData,
          demo,
          selectedGeneration,
          selectedFormat,
          ratedMode,
          setPageLoadingMessage
        );

        if (success) {
          setIsLoading(false);
          setImportData("");
          setPageLoadingMessage("");
        } else {
          alert("Failed to import team.");
          setIsLoading(false);
          setImportData("");
          setPageLoadingMessage("");
        }
      }
    };

    importTeam();
  }, [importData, selectedGeneration, selectedFormat, ratedMode]);

  const handleTeamExport = () => {
    const data = exportTeamData();
    navigator.clipboard.writeText(data);
    alert("Copied Pokemon to Clipboard!\n" + data);
  };

  useEffect(() => {
    const findMostCommon = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) {
        return null;
      }

      const frequencyMap = new Map();
      let maxFreq = 0;
      let mostCommon = null;

      for (const item of arr) {
        const freq = (frequencyMap.get(item) || 0) + 1;
        frequencyMap.set(item, freq);
        if (freq > maxFreq) {
          maxFreq = freq;
          mostCommon = item;
        }
      }

      return mostCommon;
    };

    const suggestedFormat = findMostCommon(
      state.pokemonTeam
        ?.filter((pokemon) => pokemon?.pokemon?.name !== null)
        .map((pokemon) => pokemon.format)
    );
    const suggestedGeneration = findMostCommon(
      state.pokemonTeam
        ?.filter((pokemon) => pokemon?.pokemon?.name !== null)
        .map((pokemon) => pokemon.generation)
    );

    setSelectedGeneration(suggestedGeneration);
    setSelectedFormat(suggestedFormat);
  }, [state.pokemonTeam]);

  useEffect(() => {
    setSelectedPokemonIndex(selectedPokemonIndex);
  }, [selectedPokemonIndex, state.pokemonTeam]);

  const handleTeamSwitch = (mode) => {
    toggleViewTeam(mode);
  };

  const handleSecondarySwitch = (mode) => {
    if (viewTeam) {
      setViewMoveCoverage(mode);
    } else {
      toggleViewMoves(mode);
    }
  };

  useEffect(() => {
    if (selectedFormat === null || selectedGeneration === null) {
      setSelectedFormat(startingFormat);
      setSelectedGeneration(startingGeneration);
    }
  }, [selectedFormat, selectedGeneration]);

  const hasTeamData = state.pokemonTeam?.some(
    (pokemon) => pokemon.pokemon.name !== null
  );
  const isXL = useMediaQuery({ minWidth: 1280 });
  const isScrollable = useMediaQuery({ maxHeight: 900 });

  return (
    <div className="flex w-screen h-screen  justify-center overflow-x-scroll   md:overflow-x-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <section
          style={{ justifyContent: !isScrollable && isXL && "center" }}
          className="w-full 2xl:w-3/4 mx-auto md:mx-20 lg:mx-24 flex flex-col      "
        >
          <section className="grid lg:grid-cols-1 xl:grid-cols-4 xl:gap-4 xl:mx-20 ">
            {/* <DummyAdSectionBanner /> */}

            {inputModal && (
              <TextInputModal
                showInputModal={showInputModal}
                setImportData={setImportData}
              />
            )}

            <section className="col-span-1 lg:col-span-3 ">
              <div className="bg-primary rounded-t-lg flex flex-col md:flex-row justify-between px-4 py-1">
                {isMobilePortrait ? (
                  // Dropdown for mobile
                  <div className="flex flex-col w-full h-full">
                    <select
                      className="mb-2 bg-primary text-white p-2 rounded-lg"
                      onChange={(e) => {
                        e.target.value === "Pokemon"
                          ? handleTeamSwitch(false)
                          : handleTeamSwitch(true);
                        handleSecondarySwitch(false);
                      }}
                    >
                      <option value="Pokemon">Pokemon</option>
                      <option value="Team">Team</option>
                    </select>

                    <select
                      className="mb-2 bg-primary text-white p-2 rounded-lg"
                      onChange={(e) => {
                        e.target.value === "Resistance" ||
                        e.target.value === "Basic"
                          ? handleSecondarySwitch(false)
                          : handleSecondarySwitch(true);
                      }}
                    >
                      <option value={viewTeam ? "Resistance" : "Basic"}>
                        {viewTeam ? "Resistance" : "Basic"}
                      </option>
                      <option value={viewTeam ? "Move Coverage" : "Moves"}>
                        {viewTeam ? "Move Coverage" : "Moves"}
                      </option>
                    </select>

                    {/* {!viewTeam && (
                        <div className="text-center text-white text-xs font-semibold">
                          <p>Most Common:</p>
                          <p>Generation: {selectedGeneration}</p>
                          <p>Format: {selectedFormat}</p>
                        </div>
                      )} */}
                  </div>
                ) : (
                  <>
                    <div className="flex bg-primary p-1 rounded-lg  w-[35%]">
                      <button
                        style={{
                          backgroundColor: !viewTeam ? "#090B1D" : "",
                        }}
                        onClick={() => handleTeamSwitch(false)}
                        className="w-1/2 bg-primary  rounded-l-lg font-semibold text-white  py-1 hover:bg-white hover:text-black"
                      >
                        Pokemon
                      </button>

                      <button
                        style={{
                          backgroundColor: viewTeam ? "#090B1D" : "",
                        }}
                        onClick={() => handleTeamSwitch(true)}
                        className="w-1/2  bg-primary  font-semibold text-white rounded-r-lg hover:bg-white hover:text-black"
                      >
                        Team
                      </button>
                    </div>

                    {/* {!viewTeam && !isMobilePortrait && (
                        <div className="flex items-center">
                          <div className="text-center text-white text-xs font-semibold pr-2">
                            <p>Most Common:</p>
                          </div>

                          <div className="text-white text-xs font-semibold text-center">
                            <p>Generation: {selectedGeneration}</p>
                            <p>Format: {selectedFormat}</p>
                          </div>
                        </div>
                      )} */}

                    <div className="flex bg-primary p-1 rounded-lg  w-[35%]">
                      <button
                        style={{
                          backgroundColor:
                            (!viewTeam && !viewMoves) ||
                            (viewTeam && !viewMoveCoverage)
                              ? "darkgoldenrod"
                              : "",
                        }}
                        onClick={() => handleSecondarySwitch(false)}
                        className="w-1/2 bg-primary  rounded-l-lg font-semibold text-white  py-1 hover:bg-white hover:text-black"
                      >
                        {viewTeam ? "Resistance" : "Basic"}
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            (viewTeam && viewMoveCoverage) ||
                            (!viewTeam && viewMoves)
                              ? "darkgoldenrod"
                              : "",
                        }}
                        onClick={() => handleSecondarySwitch(true)}
                        className="w-1/2  bg-primary  font-semibold text-white rounded-r-lg hover:bg-white hover:text-black"
                      >
                        {viewTeam ? "Move Coverage" : "Moves"}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <MainCard
                index={selectedPokemonIndex}
                viewTeam={viewTeam}
                viewMoves={viewMoves}
                viewMoveCoverage={viewMoveCoverage}
              />
            </section>
            <button
              onClick={() => setShowBubble(!showBubble)}
              className="rounded-lg font-semibold text-white bg-yellow-500 p-3 fixed bottom-4 right-4 z-20 xl:hidden w-1/2"
            >
              {showBubble ? "Hide Team Overview" : "Show Team Overview"}
            </button>
            {showBubble && (
              <section
                className={`col-span-1   rounded-lg bg-primary  fixed right-0 block w-20 p-1  z-10 xl:hidden`}
              >
                <div className="flex flex-col  w-full gap-1 mb-1">
                  <button
                    onClick={handleTeamImport}
                    className="bg-primary    w-full rounded-sm  hover:bg-white text-base text-white hover:text-black text-center"
                  >
                    Import
                  </button>
                  <button
                    onClick={handleTeamExport}
                    className="bg-primary  text-base w-full rounded-sm  hover:bg-white font-semibold text-white hover:text-black text-center"
                  >
                    Export
                  </button>
                  {hasTeamData && (
                    <button
                      onClick={() => {
                        clearState();
                        window.location.reload();
                      }}
                      className="rounded-sm py-1 bg-red-600 w-full flex items-center justify-center "
                    >
                      <TrashIcon className="w-5 text-white" />
                    </button>
                  )}
                </div>
                <TeamOverviewBubbleCard
                  selectedPokemonIndex={selectedPokemonIndex}
                  setSelectedPokemonIndex={setSelectedPokemonIndex}
                  onPokemonClick={handlePokemonClick}
                />
              </section>
            )}

            <section
              className={`col-span-1  lg:col-span-1 bg-primary  rounded-lg  py-3 shadow-inner  h-[394px] px-4 pt-2  hidden justify-between xl:flex xl:flex-col xl:justify-between xl:gap-5`}
            >
              <div className="flex flex-col md:flex-row justify-between  w-full  items-center  h-8 ">
                <div className="text-white font-semibold text-xl md:text-2xl mr-2">
                  Team
                </div>
                <div className="flex flex-col md:flex-row justify-around w-full  h-full">
                  <button
                    onClick={handleTeamImport}
                    className="bg-primary  text-xs  w-1/2 rounded-l-lg hover:bg-white font-semibold text-white hover:text-black"
                  >
                    Import
                  </button>
                  <button
                    onClick={handleTeamExport}
                    className="bg-primary  text-xs  w-1/2  hover:bg-white font-semibold text-white hover:text-black"
                  >
                    Export
                  </button>
                </div>
                {hasTeamData && (
                  <button
                    onClick={() => {
                      clearState();
                      window.location.reload();
                    }}
                    className=" bg-red-600 w-1/2 flex items-center justify-center h-full rounded-r-lg hover:bg-white"
                  >
                    <TrashIcon className="w-5 text-white" />
                  </button>
                )}
              </div>

              <TeamOverviewCard
                selectedPokemonIndex={selectedPokemonIndex}
                setSelectedPokemonIndex={setSelectedPokemonIndex}
                onPokemonClick={handlePokemonClick}
              />
            </section>

            <section
              className={`col-span-1 lg:col-span-3 bg-primary rounded-lg transition-all `}
              style={{
                height: viewTeam ? "19rem" : "30rem",
              }}
            >
              <SecondaryCard viewTeam={viewTeam} index={selectedPokemonIndex} />
            </section>

            <section
              className={`col-span-1 lg:col-span-1 bg-primary rounded-lg transition-all `}
              style={{ marginTop: isXL && viewTeam ? "-185px" : "0px" }}
            >
              <ThirdCard
                setIsLoading={setIsLoading}
                viewTeam={viewTeam}
                handlePokemonClick={handlePokemonClick}
                index={selectedPokemonIndex}
              />
            </section>
          </section>
        </section>
      )}
    </div>
  );
};

export default Home;

export const DummyAdSectionBanner = () => {
  return (
    <section className="hidden  2xl:block  h-full fixed">
      <section className="fixed top-0 left-0 w-80 h-screen bg-primaryDark flex justify-center items-center flex-col">
        <p className="text-center font-bold text-white">Advertisement</p>

        <img
          className=" object-contain"
          src="https://placehold.co/450x1250"
          alt="Advertisement"
        />
        {/* You can add any content for your ad here */}
      </section>
      <section className="fixed top-0 right-0 w-80 h-screen bg-primaryDark flex justify-center items-center flex-col">
        {/* Dummy Ad Content */}
        <p className="text-center font-bold text-white">Advertisement</p>

        <img
          className=" object-contain"
          src="https://placehold.co/450x1250"
          alt="Advertisement"
        />

        {/* You can add any content for your ad here */}
      </section>
    </section>
  );
};
