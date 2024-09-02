import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/solid";
import { fetchPokemonData } from "@constants/FetchPokemonData";
import { pokeDex } from "@constants/pokedex";
import {
  removePokemon,
  setFormat,
  setFormats,
  setGeneration,
  setPokemon,
} from "@app/store/pokemon/pokemonTeamSlice";
import { useGeneration } from "@app/GenerationProvider";
import PokemonSelectionModal from "./SelectionModals/PokemonSelectionModal";
import { splitAndCapitalize } from "@constants/utlis";
import { set } from "lodash";
import { XMarkIcon } from "@heroicons/react/16/solid";

const TeamOverviewCard = ({
  setSelectedPokemonIndex,
  selectedPokemonIndex,
  onPokemonClick,
}) => {
  const typeIcon = "/assets/pokemon_type_icons/pokemon_type_icon_";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedGeneration, selectedFormat, demo, ratedMode } =
    useGeneration();
  const dispatch = useDispatch();
  const currentTeamData = useSelector((state) => state.pokemonTeam);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleRemovePokemon = (index) => {
    if (index < selectedPokemonIndex) {
      setSelectedPokemonIndex(selectedPokemonIndex - 1);
    } else if (index === selectedPokemonIndex) {
      setSelectedPokemonIndex(
        selectedPokemonIndex === 0 ? 0 : selectedPokemonIndex - 1
      );
    }

    dispatch(removePokemon(index));
  };

  const handlePokemonClick = (index) => {
    onPokemonClick(index);
  };
  return (
    <section className="bg-primary  w-full h-full  flex flex-col justify-evenly  rounded-lg">
      {currentTeamData &&
        currentTeamData.map((currentPokemon, index) => (
          <section
            key={index}
            onClick={() =>
              !currentPokemon?.pokemon?.name && handleButtonClick()
            }
            className={`p-2 flex mx-2 h-10 flex-row items-center bg-primary hover:bg-gray-900  transition-all  rounded-lg  cursor-pointer`}
          >
            {currentPokemon?.pokemon?.name ? (
              <div
                onClick={() => handlePokemonClick(index)}
                className="flex  flex-row justify-evenly items-center w-full "
              >
                <img
                  className="h-8 w-8"
                  src={
                    currentPokemon?.shiny
                      ? currentPokemon?.pokemon?.data?.basicData?.sprite.shiny
                      : currentPokemon?.pokemon?.data?.basicData?.sprite.normal
                  }
                  alt={currentPokemon?.pokemon?.name}
                />
                <p className="text-white font-semibold text-g overflow-hidden truncate w-1/3">
                  {splitAndCapitalize(currentPokemon?.pokemon?.name)}
                </p>

                {currentPokemon?.pokemon?.data?.basicData?.type.length > 1 ? (
                  <div className="flex flex-row  w-1/4  justify-around">
                    <div className="relative group">
                      <div
                        style={{
                          borderColor: currentPokemon?.pokemon?.data?.basicData
                            ?.type[1].type.name
                            ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[0].type.name}), 1)`
                            : "gray",
                          color: currentPokemon?.pokemon?.data?.basicData
                            ?.type[1].type.name
                            ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[0].type.name}), 1)`
                            : "gray",
                        }}
                        className="hidden border-2 group-hover:block absolute top-[-24px] right-6 bg-primaryDark   p-1 rounded-lg"
                      >
                        {currentPokemon?.pokemon?.data?.basicData?.type[0].type.name.toUpperCase()}
                      </div>
                      <img
                        className="h-6 w-6"
                        src={
                          currentPokemon.pokemon?.data?.basicData?.type[0].type
                            .name &&
                          typeIcon +
                            currentPokemon?.pokemon?.data?.basicData?.type[0].type.name.toLowerCase() +
                            ".svg"
                        }
                        alt={
                          currentPokemon?.pokemon?.data?.basicData?.type[0].type
                            .name
                        }
                      />
                    </div>
                    <div className="relative group">
                      <div
                        style={{
                          borderColor: currentPokemon?.pokemon?.data?.basicData
                            ?.type[1].type.name
                            ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[1].type.name}), 1)`
                            : "gray",
                          color: currentPokemon?.pokemon?.data?.basicData
                            ?.type[1].type.name
                            ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[1].type.name}), 1)`
                            : "gray",
                        }}
                        className="hidden border-2 group-hover:block absolute top-[-1.5rem] left-6 bg-primaryDark  p-1 rounded-lg"
                      >
                        {currentPokemon?.pokemon?.data?.basicData?.type[1].type.name.toUpperCase()}
                      </div>
                      <img
                        className="h-6 w-6"
                        src={
                          currentPokemon.pokemon?.data?.basicData?.type[0].type
                            .name &&
                          typeIcon +
                            currentPokemon?.pokemon?.data?.basicData?.type[1].type.name.toLowerCase() +
                            ".svg"
                        }
                        alt={
                          currentPokemon?.pokemon?.data?.basicData?.type[1].type
                            .name
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative group  w-1/5  flex  justify-around">
                    <div
                      style={{
                        borderColor: currentPokemon?.pokemon?.data?.basicData
                          ?.type[0].type.name
                          ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[0].type.name}), 1)`
                          : "gray",
                        color: currentPokemon?.pokemon?.data?.basicData?.type[0]
                          .type.name
                          ? `rgba(var(--${currentPokemon?.pokemon?.data?.basicData?.type[0].type.name}), 1)`
                          : "gray",
                      }}
                      className="hidden border-2 group-hover:block absolute top-[-1.5rem] left-10 bg-primaryDark  p-1 rounded-lg"
                    >
                      {currentPokemon?.pokemon?.data?.basicData?.type[0].type.name.toUpperCase()}
                    </div>
                    <img
                      className="h-6 w-6"
                      src={
                        currentPokemon.pokemon?.data?.basicData?.type[0].type
                          .name &&
                        typeIcon +
                          currentPokemon?.pokemon?.data?.basicData?.type[0].type.name.toLowerCase() +
                          ".svg"
                      }
                      alt={
                        currentPokemon?.pokemon?.data?.basicData?.type[0].type
                          .name
                      }
                    />
                  </div>
                )}

                <XMarkIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePokemon(index);
                  }}
                  className="w-7 hover:cursor-pointer transition-colors hover:text-white text-red-600"
                />
              </div>
            ) : (
              <div className="flex w-full flex-row justify-center items-center text-center">
                <PlusIcon className="h-6 w-6" color="white" />
                <p className="text-white w-full  font-semibold text-lg">
                  Add Pokemon
                </p>
              </div>
            )}
          </section>
        ))}

      <PokemonSelectionModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        setSelectedPokemonIndex={setSelectedPokemonIndex}
        selectedPokemonIndex={selectedPokemonIndex}
        setIsModalOpen={setIsModalOpen}
      />
    </section>
  );
};

export default TeamOverviewCard;
