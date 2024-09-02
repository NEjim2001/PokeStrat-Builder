import React, { useEffect, useState, useMemo } from "react";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import { FixedSizeList as List } from "react-window";
import "rc-dropdown/assets/index.css";
import { useGeneration } from "@app/GenerationProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  pushFormat,
  setFormats,
  setGeneration,
} from "@app/store/pokemon/pokemonTeamSlice";
import { allFormats } from "@constants/formats";

const DropdownMenu = ({ onSelect, type, selectedValue, index }) => {
  const [localFormats, setLocalFormats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { ratedMode, isLoading } = useGeneration();
  const pokemonFormats = useSelector(
    (state) => state.pokemonTeam[index]?.formatsData
  );
  const pokemonGeneration = useSelector(
    (state) => state.pokemonTeam[index]?.generation
  );

  const currentPokemonFormatData =
    pokemonFormats[pokemonGeneration - 1] &&
    Object.keys(pokemonFormats[pokemonGeneration - 1]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonFormats && pokemonFormats.length > 0) {
      const mergedFormats = Array.from(
        new Set([
          ...Object.keys(allFormats[pokemonGeneration - 1]).map((format) =>
            format.toUpperCase()
          ),
          ...currentPokemonFormatData,
        ])
      );

      setLocalFormats(mergedFormats);
    }
  }, [pokemonFormats, onSelect]);

  const filteredFormats = useMemo(() => {
    const formatSet = new Set(
      currentPokemonFormatData?.map((format) => format?.toLowerCase())
    );

    const filtered = localFormats.filter((format) =>
      format?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aIsPokemonFormat = formatSet.has(a.toLowerCase());
      const bIsPokemonFormat = formatSet.has(b.toLowerCase());
      if (aIsPokemonFormat && !bIsPokemonFormat) return -1;
      if (!aIsPokemonFormat && bIsPokemonFormat) return 1;
      return 0;
    });

    return filtered;
  }, [localFormats, searchQuery, pokemonFormats, pokemonGeneration]);

  const generationOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onItemClick = async (value) => {
    if (type === "generation") {
      try {
        dispatch(
          setGeneration({
            index,
            data: value,
          })
        );
      } catch (error) {
        console.error(error, "Fetching Generation/Format Data");
      }
    }
    onSelect(value, type, false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const Row = ({ index, style }) => {
    const format = filteredFormats[index];
    if (!format) return null;

    const isPokemonFormat = currentPokemonFormatData?.includes(format);

    return (
      <MenuItem
        onClick={() => onItemClick(format)}
        className={`flex w-full justify-center border border-white items-center cursor-pointer hover:bg-gray-500 ${
          isPokemonFormat
            ? "bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-gray-400"
            : "opacity-40"
        }`}
        style={style}
      >
        <p className="text-xs md:text-sm">{format}</p>
      </MenuItem>
    );
  };

  return (
    <div className="bg-primary rounded-lg shadow-sm w-full text-center ">
      <Dropdown
        trigger={["click"]}
        overlay={
          <Menu className="w-full  rounded-lg">
            {type == "format" && (
              <div className="p-2">
                <input
                  onClick={(e) => e.stopPropagation()}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-1 md:p-2 bg-gray-200 rounded-lg text-primaryDark text-xs md:text-md"
                />
              </div>
            )}
            {type === "format" && filteredFormats.length > 0 && (
              <div className="max-h-60 md:max-h-80 w-full md:w-72">
                <List
                  height={300} // Adjust height as needed
                  itemCount={filteredFormats.length}
                  itemSize={25} // Adjust itemSize as needed
                  width={"100%"}
                >
                  {Row}
                </List>
                <Divider />
              </div>
            )}

            {type === "generation" &&
              generationOptions.map((option) => {
                const formatsForOption = pokemonFormats?.[option - 1];
                const hasFormats =
                  formatsForOption && Object.keys(formatsForOption).length > 0;

                return (
                  <MenuItem
                    key={option} // Ensure unique and defined key
                    onClick={() => onItemClick(option)}
                    className={`menu-item w-full justify-center cursor-pointer text-center text-xs md:text-sm hover:bg-gray-200 ${
                      hasFormats &&
                      `bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-gray-400`
                    }`}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <p>{option}</p>
                  </MenuItem>
                );
              })}
            <Divider />
          </Menu>
        }
        animation="slide-up"
      >
        <button
          className={`text-xs md:text-sm w-full h-full cursor-pointer ${
            type === "format" ? "truncate text-white" : ""
          }`}
        >
          {selectedValue}
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
