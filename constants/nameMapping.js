const nameMapping = {
  // Mapping for PokeAPI
  enamorus: "enamorus-incarnate",
  landorus: "landorus-incarnate",
  tornadus: "tornadus-incarnate",
  thundurus: "thundurus-incarnate",
  "ogerpon-wellspring": "ogerpon-wellspring-mask",
  "ogerpon-hearthflame": "ogerpon-hearthflame-mask",
  "ogerpon-cornerstone": "ogerpon-cornerstone-mask",
  urshifu: "urshifu-single-strike",

  indeedee: "indeedee-male",
  "indeedee-f": "indeedee-female",
  "meowstic-f": "meowstic-female",
  "meowstic-m": "meowstic-male",
  "sirfetch-d": "sirfetchd",
  "necrozma-dawn-wings": "necrozma-dawn",
  "necrozma-dusk-mane": "necrozma-dusk",
  "mimikyu-disguised": "mimikyu-disguised",
  aegislash: "aegislash-shield",
  zygarde: "zygarde-50",
  mimikyu: "mimikyu-disguised",

  "mr--mime": "mr-mime",
  "mr--rime": "mr-rime",
  meowstic: "meowstic-male",
  basculegion: "basculegion-male",
  darmanitan: "darmanitan-standard",
  eiscue: "eiscue-ice",
  toxtricity: "toxtricity-amped",
  "basculegion-f": "basculegion-female",
  giratina: "giratina-altered",
  meloetta: "meloetta-aria",
  deoxys: "deoxys-normal",
  keldeo: "keldeo-ordinary",
  "darmanitan-galar": "darmanitan-galar-standard",
};

const smogonNameMapping = {};

const suggestionCardNameMapping = {
  "darmanitan-galar": "darmanitan-galar-standard",
  "ogerpon-wellspring": "ogerpon-wellspring-mask",
  "ogerpon-hearthflame": "ogerpon-hearthflame-mask",
  "ogerpon-cornerstone": "ogerpon-cornerstone-mask",
  "sirfetch’d": "sirfetchd",
  mimikyu: "mimikyu-disguised",
  lycanroc: "lycanroc-midday",
  urshifu: "urshifu-single-strike",
  keldeo: "keldeo-ordinary",
  shaymin: "shaymin-land",
  aegislash: "aegislash-shield",
  landorus: "landorus-incarnate",
  tornadus: "tornadus-incarnate",
  thundurus: "thundurus-incarnate",

  "arceus-ground": "arceus",
  "arceus-fighting": "arceus",
  "arceus-fire": "arceus",
  "arceus-flying": "arceus",
  "arceus-dragon": "arceus",
  "arceus-dark": "arceus",
  "arceus-bug": "arceus",
  "arceus-electric": "arceus",
  "arceus-fairy": "arceus",
  "arceus-ghost": "arceus",
  "arceus-grass": "arceus",
  "arceus-ice": "arceus",
  "arceus-poison": "arceus",
  "arceus-psychic": "arceus",
  "arceus-rock": "arceus",
  "arceus-steel": "arceus",
  "arceus-water": "arceus",
  "arceus-fairy": "arceus",

  "silvally-ground": "silvally",
  "silvally-fighting": "silvally",
  "silvally-fire": "silvally",
  "silvally-flying": "silvally",
  "silvally-dragon": "silvally",
  "silvally-dark": "silvally",
  "silvally-bug": "silvally",
  "silvally-electric": "silvally",
  "silvally-fairy": "silvally",
  "silvally-ghost": "silvally",
  "silvally-grass": "silvally",
  "silvally-ice": "silvally",
  "silvally-poison": "silvally",
  "silvally-psychic": "silvally",
  "silvally-rock": "silvally",
  "silvally-steel": "silvally",
  "silvally-water": "silvally",
  "silvally-fairy": "silvally",
  "mr. mime": "mr mime",
  "mr. rime": "mr rime",

  meowstic: "meowstic-male",
  basculegion: "basculegion-male",
  "basculegion-f": "basculegion-female",
  giratina: "giratina-altered",
  darmanitan: "darmanitan-standard",
  deoxys: "deoxys-normal",
  "tauros-paldea-aqua": "tauros-paldea-aqua-breed",
  "tauros-paldea-blaze": "tauros-paldea-blaze-breed",
  "tauros-paldea-combat": "tauros-paldea-combat-breed",
  " eiscue-ice": "eiscue",

  toxtricity: "toxtricity-amped",
  zygarde: "zygarde-50",
  "zygarde-10%": "zygarde-10",

  meloetta: "meloetta-aria",
};
const additionalMoveMapping = {
  ferrothorn: ["Leech Seed"],
  donphon: ["Ice Shard"],
};
export function normalizePokemonName(
  name,
  forPokeAPI = true,
  forSuggestionCard = false
) {
  if (!name) {
    return name; // Return early if name is null or undefined
  }
  name = name.toLowerCase();

  if (forSuggestionCard) {
    return suggestionCardNameMapping[name] || name;
  }

  return forPokeAPI
    ? nameMapping[name] || name
    : smogonNameMapping[name] || name;
}
export function additionalPokmeonMoves(name) {
  name = name.toLowerCase();
  return additionalMoveMapping[name] || [];
}
