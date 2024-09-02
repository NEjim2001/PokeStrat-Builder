import { saveState } from "@constants/utlis";

const persistStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState().pokemonTeam);
  return result;
};

export default persistStateMiddleware;
