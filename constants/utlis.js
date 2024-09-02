export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export function splitAndCapitalize(input) {
  const formChangeList = ["alola", "alolan", "primal", "ash", "hisui"];
  let parts = input.includes("-") ? input.split("-") : input.split(" ");

  // Check if any element from formChangeList is in the parts array
  const shouldReverse = parts.some((part) =>
    formChangeList.includes(part.toLowerCase())
  );

  // Reverse the array if necessary
  parts = shouldReverse ? parts.reverse() : parts;

  // Capitalize the first letter of each part and return them
  const capitalizedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join(" ");
}

export const capitalizeMoveText = (move) => {
  if (!move) return "";

  const exceptions = ["Heavy-Duty Boots"];
  if (exceptions.includes(move)) {
    return move
      .split(/(-+)/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }
  return move
    .split(/[\s-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const kebabCase = (str) => {
  return str.toLowerCase().replace(/\s/g, "-");
};
export const getColorForPercentage = (percentage, opacity = 1) => {
  percentage = parseFloat(percentage);
  if (isNaN(percentage)) {
    return "white";
  }

  const value = parseFloat(percentage);
  const red = Math.min(255, Math.floor((100 - value) * 2.55));
  const green = Math.min(255, Math.floor(value * 3.4));

  return `rgba(${red}, ${green}, 0, ${opacity})`;
};

export const saveState = (state) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("pokemonTeam", serializedState);
    } catch (e) {
      console.warn("Could not save state", e);
    }
  }
};

export const loadState = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("pokemonTeam");
      if (serializedState === null) {
        return undefined;
      }
      const state = JSON.parse(serializedState);
      return state;
    } catch (e) {
      console.warn("Could not load state", e);
      return undefined;
    }
  }
  return undefined; // Return undefined during SSR
};

export const clearState = () => {
  if (typeof window !== "undefined") {
    try {
      console.log("Team Cleared");
      localStorage.removeItem("pokemonTeam");
    } catch (e) {
      console.warn("Could not clear state", e);
    }
  }
};
