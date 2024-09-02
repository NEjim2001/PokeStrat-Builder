import { createSlice } from "@reduxjs/toolkit";

const moves = [
  { name: "Select a Move", data: {} },
  { name: "Select a Move", data: {} },
  { name: "Select a Move", data: {} },
  { name: "Select a Move", data: {} },
];

export const pokemonInitialState = {
  pokemon: { name: null, data: {} },
  item: "",
  ability: "",
  shiny: false,
  level: 100,
  evSpread: [0, 0, 0, 0, 0, 0],
  ivSpread: [31, 31, 31, 31, 31, 31],
  spread: "Spread",
  nature: "Nature",
  teratype: "",
  moves: [...moves],
  data: {},
  moveData: {},
  abilityData: {},
  generation: 9,
  format: "OU",
  formatsData: [],
};

const pokemonTeamSlice = createSlice({
  name: "pokemonTeam",
  initialState: Array(6).fill(pokemonInitialState),
  reducers: {
    setPokemon(state, action) {
      const { index, data } = action.payload;
      if (data) {
        state[index].pokemon = data;
      }
    },
    setItem(state, action) {
      const { index, data } = action.payload;
      state[index].item = data;
    },
    setShiny(state, action) {
      const { index, data } = action.payload;
      state[index].shiny = data;
    },
    setAbility(state, action) {
      const { index, data } = action.payload;
      state[index].ability = data;
    },
    setEVSpread(state, action) {
      const { index, spreadIndex, data } = action.payload;
      state[index].evSpread[spreadIndex] = data;
    },
    setEVList(state, action) {
      const { index, data } = action.payload;
      state[index].evSpread = data;
    },
    setIVSpread(state, action) {
      const { index, data } = action.payload;
      state[index].ivSpread = data; // Updates IV spread at the specified index
    },
    setSpread(state, action) {
      const { index, data } = action.payload;
      const natureData = data.split(":")[0];
      const evData = data
        .split(":")[1]
        .split("/")
        .map((item) => parseInt(item, 10));

      state[index].nature = natureData;
      state[index].evSpread = evData;
    },
    setNature(state, action) {
      const { index, data } = action.payload;
      state[index].nature = data;
    },
    setTeratype(state, action) {
      const { index, data } = action.payload;
      state[index].teratype = data;
    },
    setLevel(state, action) {
      const { index, level } = action.payload;
      if (level !== null && level !== undefined) {
        state[index].level = level;
      }
    },

    setMove(state, action) {
      const { index, moveIndex, move } = action.payload;
      if (
        state[index] &&
        state[index].moves &&
        state[index].moves.length > moveIndex
      )
        state[index].moves[moveIndex] = move;
    },
    setData(state, action) {
      const { index, data } = action.payload;
      state[index].data = data;
    },
    setMoveData(state, action) {
      const { index, data } = action.payload;
      state[index].moveData = data;
    },
    setAbilityData(state, action) {
      const { index, data } = action.payload;
      state[index].abilityData = data;
    },
    removePokemon(state, action) {
      const index = action.payload;
      const newState = [...state.slice(0, index), ...state.slice(index + 1)];
      for (let i = index; i < newState.length; i++) {
        newState[i] = { ...newState[i], pokemon: state[i + 1].pokemon };
      }
      newState.push({ ...pokemonInitialState });
      return newState;
    },
    setFormat(state, action) {
      const { index, data } = action.payload;
      state[index].format = data.toUpperCase();
    },
    setGeneration(state, action) {
      const { index, data } = action.payload;
      state[index].generation = data;
    },
    setFormats(state, action) {
      const { index, data } = action.payload;
      state[index].formatsData = data;
    },

    pushFormat(state, action) {
      const { index, format, generation } = action.payload;
      state[index].formatsData[generation - 1][format] = {};
    },
    resetPokemon(state, action) {
      const index = action.payload;
      state[index] = { ...pokemonInitialState };
    },
  },
});

export const {
  setPokemon,
  setFormats,
  setItem,
  setAbility,
  setIVSpread,
  setEVSpread,
  setSpread,
  setNature,
  setEVList,
  setLevel,
  setTeratype,
  setMove,
  setShiny,
  setData,
  setMoveData,
  removePokemon,
  setFormat,
  setGeneration,
  pushFormat,
  setAbilityData,
  resetPokemon,
} = pokemonTeamSlice.actions;

export default pokemonTeamSlice.reducer;
