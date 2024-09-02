import React, { useState } from "react";
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
import { XMarkIcon } from "@heroicons/react/16/solid";

const TeamOverviewBubbleCard = ({
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
    dispatch(removePokemon(index));
  };

  const handlePokemonClick = (index) => {
    onPokemonClick(index);
  };
  return (
    <section className=" w-full  flex flex-col justify-evenly  rounded-lg   gap-1 ">
      {currentTeamData &&
        currentTeamData.map((currentPokemon, index) => (
          <section
            key={index}
            onClick={() =>
              !currentPokemon?.pokemon?.name && handleButtonClick()
            }
            className={`p-2 flex  flex-row items-center  bg-primary hover:bg-white transition-all  rounded-lg w-full cursor-pointer`}
          >
            {currentPokemon?.pokemon?.name ? (
              <div
                onClick={() => handlePokemonClick(index)}
                className="flex  flex-row justify-evenly items-center w-full "
              >
                <img
                  className="h-6   "
                  src={
                    currentPokemon?.shiny
                      ? currentPokemon?.pokemon?.data?.basicData?.sprite.shiny
                      : currentPokemon?.pokemon?.data?.basicData?.sprite.normal
                  }
                  alt={currentPokemon?.pokemon?.name}
                />
                <XMarkIcon
                  onClick={(e) => {
                    handleRemovePokemon(index);
                  }}
                  className="w-7 hover:cursor-pointer transition-colors hover:text-white text-red-600"
                />
              </div>
            ) : (
              <div className="flex w-full flex-row justify-center items-center text-center">
                <PlusIcon className="h-6 " color="white" />
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

export default TeamOverviewBubbleCard;
