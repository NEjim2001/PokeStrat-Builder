import { configureStore } from "@reduxjs/toolkit";
import pokemonTeamReducer, {
  pokemonInitialState,
} from "./pokemon/pokemonTeamSlice";
import persistStateMiddleware from "./persistMiddleware";
import { loadState } from "@constants/utlis";

const preloadedState = {
  pokemonTeam: loadState() || Array(6).fill(pokemonInitialState),
};

const store = configureStore({
  reducer: {
    pokemonTeam: pokemonTeamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware),
  preloadedState,
});

export default store;
