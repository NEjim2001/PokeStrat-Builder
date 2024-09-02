import { useGeneration } from "@app/GenerationProvider";
import {
  resetPokemon,
  setFormat,
  setFormats,
  setGeneration,
  setPokemon,
} from "@app/store/pokemon/pokemonTeamSlice";
import Loading from "@components/Loading";
import { fetchFormats, fetchPokemonData } from "@constants/FetchPokemonData";
import { pokeDex } from "@constants/pokedex";
import { searchData } from "@constants/demoData";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { normalizePokemonName } from "@constants/nameMapping";
import { splitAndCapitalize } from "@constants/utlis";
import { track } from "@vercel/analytics/react";

const PokemonSelectionModal = ({
  isModalOpen,
  closeModal,
  setSelectedPokemonIndex,
}) => {
  const { selectedGeneration, selectedFormat, demo, ratedMode } =
    useGeneration();
  const dispatch = useDispatch();
  const currentTeamData = useSelector((state) => state.pokemonTeam);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePokemon, setVisiblePokemon] = useState([]);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleAddPokemon = async (pokemon) => {
    setIsLoading(true);
    const index = currentTeamData.findIndex(
      (pokemon) => !pokemon?.pokemon?.name
    );

    if (!demo) {
      const pokemonData = await fetchPokemonData(
        window,
        pokemon,
        selectedGeneration,
        selectedFormat,
        ratedMode,
        "Team Overview JS"
      );

      dispatch(
        setPokemon({
          index,
          data: {
            name:
              pokemonData.name.substring(0, 1).toUpperCase() +
              pokemonData.name.substring(1).toLowerCase(),
            data: pokemonData,
          },
        })
      );
      dispatch(setGeneration({ index, data: selectedGeneration }));
      dispatch(setFormat({ index, data: selectedFormat }));

      setSelectedPokemonIndex(index);
      setIsLoading(false);
      closeModal();

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
    } else {
      const pokemonData = searchData;

      dispatch(
        setPokemon({
          index,
          data: {
            name:
              pokemonData.name.substring(0, 1).toUpperCase() +
              pokemonData.name.substring(1).toLowerCase(),
            data: pokemonData,
          },
        })
      );
      dispatch(setGeneration({ index, data: selectedGeneration }));
      dispatch(setFormat({ index, data: selectedFormat }));

      setSelectedPokemonIndex(index);
      setIsLoading(false);
      closeModal();
    }
  };

  const filteredPokemon = useMemo(() => {
    return Object.values(pokeDex).flatMap((pokemonList) =>
      pokemonList?.filter((pokemon) =>
        pokemon?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [pokeDex, searchQuery]);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    if (filteredPokemon.length > 0) {
      const shuffledPokemon = shuffleArray(filteredPokemon);
      setVisiblePokemon(shuffledPokemon.slice(0, 20));
    }
  }, [isModalOpen, searchQuery]);

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

    const pokemonName = normalizePokemonName(
      pokeDex[randomGenerationKey][randomPokemonIndex].name
    );
    setIsLoading(true);
    await handleAddPokemon(pokemonName);

    setIsLoading(false);
  };

  return (
    <>
      <div
        style={{ transform: isModalOpen ? "scale(1)" : "scale(0)" }}
        className="fixed inset-0 flex items-center justify-center z-50 transition-all"
      >
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black opacity-35"
        ></div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-primaryDark max-h-full w-full max-w-lg md:max-w-3xl rounded-lg z-10 overflow-hidden p-4"
        >
          <div className="text-2xl md:text-6xl text-white font-semibold my-6 w-full flex-row flex px-4 items-center">
            <p className="w-3/4">Choose a Pokémon</p>
            <button
              onClick={handleRandomizeButton}
              className="button  bg-gradient-to-r w-1/4 h-full py-6 text-sm from-yellow-600 to-yellow-500 hidden md:flex"
            >
              RANDOMIZE
            </button>

            <button
              onClick={closeModal}
              className="button flex w-1/4 h-full py-6 text-sm bg-red-600  md:hidden"
            >
              X
            </button>
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search For A Pokémon..."
              value={searchQuery}
              spellCheck="false"
              onChange={handleSearch}
              className="p-2 m-4 bg-[#212121] rounded-lg text-white text-lg md:text-2xl font-semibold px-6 w-full"
            />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[550px] gap-10">
              <div className="flex hover:cursor-wait items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
              </div>

              <p className="text-lg text-white text-center mx-10">
                Fetching Pokémon Data... Please Wait (You may need to refresh
                the page if this takes too long)
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto overflow-x-hidden h-[550px] mx-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visiblePokemon.map((pokemon, index) => (
                  <div
                    key={index}
                    onClick={() => handleAddPokemon(pokemon.name)}
                    className="flex flex-col items-center justify-center h-full rounded-lg bg-[#212121] hover:bg-black transition-all cursor-pointer"
                  >
                    <img
                      className="h-32 w-32 object-contain"
                      src={`/assets/sprites/pokemon/other/home/${
                        pokemon.url.match(/\/(\d+)\//)[1]
                      }.png`}
                      alt={pokemon.name}
                    />
                    <div className="text-white text-center font-semibold text-sm md:text-base m-2">
                      {splitAndCapitalize(pokemon.name)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonSelectionModal;
