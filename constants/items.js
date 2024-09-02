export const pokemonNatures = {
  Hardy: { IncreasedStat: null, DecreasedStat: null },
  Lonely: { IncreasedStat: "Attack", DecreasedStat: "Defense" },
  Brave: { IncreasedStat: "Attack", DecreasedStat: "Speed" },
  Adamant: { IncreasedStat: "Attack", DecreasedStat: "Special Attack" },
  Naughty: { IncreasedStat: "Attack", DecreasedStat: "Special Defense" },
  Bold: { IncreasedStat: "Defense", DecreasedStat: "Attack" },
  Docile: { IncreasedStat: null, DecreasedStat: null },
  Relaxed: { IncreasedStat: "Defense", DecreasedStat: "Speed" },
  Impish: { IncreasedStat: "Defense", DecreasedStat: "Special Attack" },
  Lax: { IncreasedStat: "Defense", DecreasedStat: "Special Defense" },
  Timid: { IncreasedStat: "Speed", DecreasedStat: "Attack" },
  Hasty: { IncreasedStat: "Speed", DecreasedStat: "Defense" },
  Serious: { IncreasedStat: null, DecreasedStat: null },
  Jolly: { IncreasedStat: "Speed", DecreasedStat: "Special Attack" },
  Naive: { IncreasedStat: "Speed", DecreasedStat: "Special Defense" },
  Modest: { IncreasedStat: "Special Attack", DecreasedStat: "Attack" },
  Mild: { IncreasedStat: "Special Attack", DecreasedStat: "Defense" },
  Quiet: { IncreasedStat: "Special Attack", DecreasedStat: "Speed" },
  Bashful: { IncreasedStat: null, DecreasedStat: null },
  Rash: { IncreasedStat: "Special Attack", DecreasedStat: "Special Defense" },
  Calm: { IncreasedStat: "Special Defense", DecreasedStat: "Attack" },
  Gentle: { IncreasedStat: "Special Defense", DecreasedStat: "Defense" },
  Sassy: { IncreasedStat: "Special Defense", DecreasedStat: "Speed" },
  Careful: {
    IncreasedStat: "Special Defense",
    DecreasedStat: "Special Attack",
  },
  Quirky: { IncreasedStat: null, DecreasedStat: null },
};

export const teraTypeList = [
  "Nothing",

  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
  "Stellar",
];

export const weaknesstypeChart = {
  bug: { fighting: 0.5, grass: 0.5, ground: 0.5, fire: 2, flying: 2, rock: 2 },
  dark: { dark: 0.5, ghost: 0.5, psychic: 0, bug: 2, fairy: 2, fighting: 2 },
  dragon: {
    electric: 0.5,
    fire: 0.5,
    grass: 0.5,
    water: 0.5,
    dragon: 2,
    fairy: 2,
    ice: 2,
  },
  electric: { electric: 0.5, flying: 0.5, steel: 0.5, ground: 2 },
  fairy: {
    bug: 0.5,
    dark: 0.5,
    dragon: 0,
    fighting: 0.5,
    poison: 2,
    steel: 2,
  },
  fighting: { bug: 0.5, dark: 0.5, rock: 0.5, fairy: 2, flying: 2, psychic: 2 },
  fire: {
    bug: 0.5,
    fire: 0.5,
    fairy: 0.5,
    grass: 0.5,
    ice: 0.5,
    steel: 0.5,
    ground: 2,
    rock: 2,
    water: 2,
  },
  flying: {
    bug: 0.5,
    fighting: 0.5,
    grass: 0.5,
    ground: 0,
    electric: 2,
    ice: 2,
    rock: 2,
  },
  ghost: {
    bug: 0.5,
    fighting: 0,
    normal: 0,
    poison: 0.5,
    dark: 2,
    ghost: 2,
  },
  grass: {
    electric: 0.5,
    grass: 0.5,
    ground: 0.5,
    water: 0.5,
    bug: 2,
    fire: 2,
    flying: 2,
    ice: 2,
    poison: 2,
  },
  ground: { electric: 0, poison: 0.5, rock: 0.5, grass: 2, ice: 2, water: 2 },
  ice: { ice: 0.5, fighting: 2, fire: 2, rock: 2, steel: 2 },
  normal: { ghost: 0, fighting: 2 },
  poison: {
    fairy: 0.5,
    fighting: 0.5,
    grass: 0.5,
    poison: 0.5,
    bug: 0.5,
    ground: 2,
    psychic: 2,
  },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, dark: 2, ghost: 2 },
  rock: {
    fire: 0.5,
    flying: 0.5,
    normal: 0.5,
    poison: 0.5,
    fighting: 2,
    grass: 2,
    ground: 2,
    steel: 2,
    water: 2,
  },
  steel: {
    bug: 0.5,
    dragon: 0.5,
    fairy: 0.5,
    flying: 0.5,
    grass: 0.5,
    ice: 0.5,
    poison: 0,
    psychic: 0.5,
    rock: 0.5,
    steel: 0.5,
    fighting: 2,
    fire: 2,
    ground: 2,
    normal: 0.5,
  },
  water: { fire: 0.5, ice: 0.5, steel: 0.5, water: 0.5, electric: 2, grass: 2 },
};

export const pokemonRoles = {
  General: {
    description: "Roles that provide general utility and support for the team.",
    "Entry Hazard": {
      description:
        "Moves that set up hazards to damage opponents switching in.",
      moves: ["Stealth Rock", "Spikes", "Toxic Spikes", "Sticky Web"],
    },
    Defogger: {
      description: "Moves that remove hazards from the field.",
      moves: ["Rapid Spin", "Defog", "Court Change", "Mortal Spin", "Tidy Up"],
    },
    "Reliable Recovery": {
      description: "Moves that restore a significant amount of HP.",
      moves: [
        "Recover",
        "Roost",
        "Synthesis",
        "Soft Boiled",
        "Soft-Boiled",
        "Slack Off",
        "Slack-Off",
        "Morning Sun",
        "Moonlight",
        "Milk Drink",
        "Heal Order",
        "Shore Up",
        "Lunar Blessing",
      ],
    },
  },
  Defensive: {
    description:
      "Roles that focus on defensive strategies to support the team.",
    Cleric: {
      description:
        "Moves that heal status conditions or provide healing support.",
      moves: ["Heal Bell", "Aromatherapy", "Wish"],
    },
    "Status Move": {
      description: "Moves that inflict status conditions on opponents.",
      moves: [
        "Thunder Wave",
        "Toxic",
        "Will-O-Wisp",
        "Will O Wisp",
        "Inferno",
        "Glare",
        "Nuzzle",
        "Stun Spore",
        "Stun-Spore",
        "Zap Cannon",
        "Zap-Cannon",
        "Dark Void",
        "Grass Whistle",
        "Relic Song",
        "Lovely Kiss",
        "Sing",
        "Sleep Powder",
        "Spore",
        "Hypnosis",
        "Yawn",
        "Swaggger",
        "Chatter",
        "Confuse Ray",
        "Dynamic Punch",
        "Flatter",
        "Sweet Kiss",
        "Teeter Dance",
        "Baneful Bunker",
        "Poison Gas",
        "Poison Powder",
        "Attract",
        "Curse",
      ],
    },
    Phazer: {
      description: "Moves that force the opponent to switch out.",
      moves: [
        "Whirlwind",
        "Roar",
        "Dragon Tail",
        "Circle Throw",
        "Perish Song",
      ],
    },
  },
  Offensive: {
    description:
      "Roles that focus on offensive strategies to deal damage to opponents.",
    "Boosting Move": {
      description:
        "Moves that increase the user's stats to enhance offensive capabilities.",
      moves: [
        "Swords Dance",
        "Dragon Dance",
        "Nasty Plot",
        "Belly Drum",
        "Shell Smash",
        "Calm Mind",
        "Quiver Dance",
        "Bulk Up",
        "Agility",
        "Rock Polish",
        "Shift Gear",
        "Tail Glow",
        "Work Up",
        "Coil",
        "Howl",
        "Charge",
        "Cosmic Power",
      ],
    },
    "Pivot Move": {
      description:
        "Moves that allow the user to switch out after dealing damage.",
      moves: [
        "U Turn",
        "U-turn",
        "Volt Switch",
        "Parting Shot",
        "Flip Turn",
        "Baton Pass",
        "Teleport",
      ],
    },
    "Choice Item": {
      description:
        "Items that lock the user into one move in exchange for a stat boost.",
      moves: ["Choice Band", "Choice Specs", "Choice Scarf"],
    },
  },
};

export const pokemonItemData = {
  count: 2110,
  next: null,
  previous: null,
  results: [
    {
      id: 112,
      type: "Hold items",
      description:
        "Increases the power of Dragon- and Ghost-type moves when held by Giratina, and changes it to Origin Forme.",
      name: {
        english: "Griseous Orb",
        japanese: "はっきんだま",
        chinese: "白金宝珠",
      },
    },

    {
      id: 116,
      type: "Hold items",
      description:
        "Changes Techno Blast to a Water-type move when held by Genesect.",
      name: {
        english: "Douse Drive",
        japanese: "アクアカセット",
        chinese: "水流卡带",
      },
    },
    {
      id: 117,
      type: "Hold items",
      description:
        "Changes Techno Blast to an Electric-type move when held by Genesect.",
      name: {
        chinese: "闪电卡带",
        english: "Shock Drive",
        japanese: "イナズマカセット",
      },
    },
    {
      id: 118,
      type: "Hold items",
      description:
        "Changes Techno Blast to a Fire-type move when held by Genesect.",
      name: {
        chinese: "火焰卡带",
        japanese: "ブレイズカセット",
        english: "Burn Drive",
      },
    },
    {
      id: 119,
      type: "Hold items",
      description:
        "Changes Techno Blast to an Ice-type move when held by Genesect.",
      name: {
        chinese: "冰冻卡带",
        english: "Chill Drive",
        japanese: "フリーズカセット",
      },
    },

    {
      id: 135,
      type: "Hold items",
      description:
        "Increases the power of Dragon- and Steel-type moves when held by Dialga.",
      name: {
        chinese: "金刚宝珠",
        english: "Adamant Orb",
        japanese: "こんごうだま",
      },
    },
    {
      id: 136,
      type: "Hold items",
      description:
        "Increases the power of Dragon- and Water-type moves when held by Palkia.",
      name: {
        chinese: "白玉宝珠",
        japanese: "しらたま",
        english: "Lustrous Orb",
      },
    },
    {
      id: 149,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from paralysis.",
      name: {
        chinese: "樱子果",
        english: "Cheri Berry",
        japanese: "クラボのみ",
      },
    },
    {
      id: 150,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from sleep.",
      name: {
        japanese: "カゴのみ",
        english: "Chesto Berry",
        chinese: "零余果",
      },
    },
    {
      id: 151,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from poison.",
      name: {
        chinese: "桃桃果",
        english: "Pecha Berry",
        japanese: "モモンのみ",
      },
    },
    {
      id: 152,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from a burn.",
      name: {
        chinese: "莓莓果",
        japanese: "チーゴのみ",
        english: "Rawst Berry",
      },
    },
    {
      id: 153,
      type: "Berries",
      description: "If held by a Pokémon, it defrosts it.",
      name: {
        chinese: "利木果",
        english: "Aspear Berry",
        japanese: "ナナシのみ",
      },
    },
    {
      id: 154,
      type: "Berries",
      description: "If held by a Pokémon, it restores a move's PP by 10.",
      name: {
        english: "Leppa Berry",
        japanese: "ヒメリのみ",
        chinese: "苹野果",
      },
    },
    {
      id: 155,
      type: "Berries",
      description: "If held by a Pokémon, it heals the user by just 10 HP.",
      name: {
        chinese: "橙橙果",
        japanese: "オレンのみ",
        english: "Oran Berry",
      },
    },
    {
      id: 156,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from confusion.",
      name: {
        english: "Persim Berry",
        japanese: "キーのみ",
        chinese: "柿仔果",
      },
    },
    {
      id: 157,
      type: "Berries",
      description: "If held by a Pokémon, it recovers from any status problem.",
      name: {
        japanese: "ラムのみ",
        english: "Lum Berry",
        chinese: "木子果",
      },
    },
    {
      id: 158,
      type: "Berries",
      description: "If held by a Pokémon, it heals the user's HP a little.",
      name: {
        chinese: "文柚果",
        english: "Sitrus Berry",
        japanese: "オボンのみ",
      },
    },
    {
      id: 159,
      type: "Berries",
      description: "Restores HP if it's low, but may cause confusion.",
      name: {
        english: "Figy Berry",
        japanese: "フィラのみ",
        chinese: "勿花果",
      },
    },
    {
      id: 160,
      type: "Berries",
      description: "Restores HP if it's low, but may cause confusion.",
      name: {
        chinese: "异奇果",
        japanese: "ウイのみ",
        english: "Wiki Berry",
      },
    },
    {
      id: 161,
      type: "Berries",
      description: "Restores HP if it's low, but may cause confusion.",
      name: {
        japanese: "マゴのみ",
        english: "Mago Berry",
        chinese: "芒芒果",
      },
    },
    {
      id: 162,
      type: "Berries",
      description: "Restores HP if it's low, but may cause confusion.",
      name: {
        chinese: "乐芭果",
        japanese: "バンジのみ",
        english: "Aguav Berry",
      },
    },
    {
      id: 163,
      type: "Berries",
      description: "Restores HP if it's low, but may cause confusion.",
      name: {
        english: "Iapapa Berry",
        japanese: "イアのみ",
        chinese: "芭亚果",
      },
    },
    {
      id: 164,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "蔓莓果",
        japanese: "ズリのみ",
        english: "Razz Berry",
      },
    },
    {
      id: 165,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        japanese: "ブリーのみ",
        english: "Bluk Berry",
        chinese: "墨莓果",
      },
    },
    {
      id: 166,
      type: "Berries",
      description:
        "A Berry to be used in cooking. Calms a Pokémon in battle, in Let's Go Pikachu/Eevee.",
      name: {
        chinese: "蕉香果",
        english: "Nanab Berry",
        japanese: "ナナのみ",
      },
    },
    {
      id: 167,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        english: "Wepear Berry",
        japanese: "セシナのみ",
        chinese: "西梨果",
      },
    },
    {
      id: 168,
      type: "Berries",
      description:
        "A Berry to be used in cooking. Increases chances of getting items when a Pokémon is caught, in Pokémon Let's Go.",
      name: {
        chinese: "凰梨果",
        japanese: "パイルのみ",
        english: "Pinap Berry",
      },
    },
    {
      id: 170,
      type: "Berries",
      description: "Increases Friendship but lowers Attack EVs.",
      name: {
        chinese: "藻根果",
        english: "Kelpsy Berry",
        japanese: "ネコブのみ",
      },
    },
    {
      id: 171,
      type: "Berries",
      description: "Increases Friendship but lowers Defense EVs.",
      name: {
        english: "Qualot Berry",
        japanese: "タポルのみ",
        chinese: "比巴果",
      },
    },
    {
      id: 172,
      type: "Berries",
      description: "Increases Friendship but lowers Special Attack EVs.",
      name: {
        japanese: "ロメのみ",
        english: "Hondew Berry",
        chinese: "哈密果",
      },
    },
    {
      id: 173,
      type: "Berries",
      description: "Increases Friendship but lowers Special Defense EVs.",
      name: {
        chinese: "萄葡果",
        english: "Grepa Berry",
        japanese: "ウブのみ",
      },
    },
    {
      id: 174,
      type: "Berries",
      description: "Increases Friendship but lowers Speed EVs.",
      name: {
        english: "Tamato Berry",
        japanese: "マトマのみ",
        chinese: "茄番果",
      },
    },
    {
      id: 175,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        english: "Cornn Berry",
        japanese: "モコシのみ",
        chinese: "玉黍果",
      },
    },
    {
      id: 176,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "岳竹果",
        japanese: "ゴスのみ",
        english: "Magost Berry",
      },
    },
    {
      id: 177,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "茸丹果",
        japanese: "ラブタのみ",
        english: "Rabuta Berry",
      },
    },
    {
      id: 178,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "檬柠果",
        english: "Nomel Berry",
        japanese: "ノメルのみ",
      },
    },
    {
      id: 179,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        english: "Spelon Berry",
        japanese: "ノワキのみ",
        chinese: "刺角果",
      },
    },
    {
      id: 180,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "椰木果",
        english: "Pamtre Berry",
        japanese: "シーヤのみ",
      },
    },
    {
      id: 181,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "瓜西果",
        english: "Watmel Berry",
        japanese: "カイスのみ",
      },
    },
    {
      id: 182,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "金枕果",
        japanese: "ドリのみ",
        english: "Durin Berry",
      },
    },
    {
      id: 183,
      type: "Berries",
      description:
        "A Berry which is very rare in the Unova region. A maniac will buy it for a high price.",
      name: {
        chinese: "靛莓果",
        english: "Belue Berry",
        japanese: "ベリブのみ",
      },
    },
    {
      id: 184,
      type: "Berries",
      description:
        "Weakens a supereffective Fire-type attack against the holding Pokémon.",
      name: {
        chinese: "巧可果",
        japanese: "オッカのみ",
        english: "Occa Berry",
      },
    },
    {
      id: 185,
      type: "Berries",
      description:
        "Weakens a supereffective Water-type attack against the holding Pokémon.",
      name: {
        japanese: "イトケのみ",
        english: "Passho Berry",
        chinese: "千香果",
      },
    },
    {
      id: 186,
      type: "Berries",
      description:
        "Weakens a supereffective Electric-type attack against the holding Pokémon.",
      name: {
        chinese: "独木果",
        japanese: "ソクノのみ",
        english: "Wacan Berry",
      },
    },
    {
      id: 187,
      type: "Berries",
      description:
        "Weakens a supereffective Grass-type attack against the holding Pokémon.",
      name: {
        japanese: "リンドのみ",
        english: "Rindo Berry",
        chinese: "罗子果",
      },
    },
    {
      id: 188,
      type: "Berries",
      description:
        "Weakens a supereffective Ice-type attack against the holding Pokémon.",
      name: {
        japanese: "ヤチェのみ",
        english: "Yache Berry",
        chinese: "番荔果",
      },
    },
    {
      id: 189,
      type: "Berries",
      description:
        "Weakens a supereffective Fighting-type attack against the holding Pokémon.",
      name: {
        japanese: "ヨプのみ",
        english: "Chople Berry",
        chinese: "莲蒲果",
      },
    },
    {
      id: 190,
      type: "Berries",
      description:
        "Weakens a supereffective Poison-type attack against the holding Pokémon.",
      name: {
        japanese: "ビアーのみ",
        english: "Kebia Berry",
        chinese: "通通果",
      },
    },
    {
      id: 191,
      type: "Berries",
      description:
        "Weakens a supereffective Ground-type attack against the holding Pokémon.",
      name: {
        chinese: "腰木果",
        english: "Shuca Berry",
        japanese: "シュカのみ",
      },
    },
    {
      id: 192,
      type: "Berries",
      description:
        "Weakens a supereffective Flying-type attack against the holding Pokémon.",
      name: {
        chinese: "棱瓜果",
        japanese: "バコウのみ",
        english: "Coba Berry",
      },
    },
    {
      id: 193,
      type: "Berries",
      description:
        "Weakens a supereffective Psychic-type attack against the holding Pokémon.",
      name: {
        chinese: "福禄果",
        japanese: "ウタンのみ",
        english: "Payapa Berry",
      },
    },
    {
      id: 194,
      type: "Berries",
      description:
        "Weakens a supereffective Bug-type attack against the holding Pokémon.",
      name: {
        chinese: "扁樱果",
        english: "Tanga Berry",
        japanese: "タンガのみ",
      },
    },
    {
      id: 195,
      type: "Berries",
      description:
        "Weakens a supereffective Rock-type attack against the holding Pokémon.",
      name: {
        japanese: "ヨロギのみ",
        english: "Charti Berry",
        chinese: "草蚕果",
      },
    },
    {
      id: 196,
      type: "Berries",
      description:
        "Weakens a supereffective Ghost-type attack against the holding Pokémon.",
      name: {
        chinese: "佛柑果",
        japanese: "カシブのみ",
        english: "Kasib Berry",
      },
    },
    {
      id: 197,
      type: "Berries",
      description:
        "Weakens a supereffective Dragon-type attack against the holding Pokémon.",
      name: {
        english: "Haban Berry",
        japanese: "ハバンのみ",
        chinese: "莓榴果",
      },
    },
    {
      id: 198,
      type: "Berries",
      description:
        "Weakens a supereffective Dark-type attack against the holding Pokémon.",
      name: {
        chinese: "刺耳果",
        japanese: "ナモのみ",
        english: "Colbur Berry",
      },
    },
    {
      id: 199,
      type: "Berries",
      description:
        "Weakens a supereffective Steel-type attack against the holding Pokémon.",
      name: {
        japanese: "リリバのみ",
        english: "Babiri Berry",
        chinese: "霹霹果",
      },
    },
    {
      id: 200,
      type: "Berries",
      description:
        "Weakens a Normal-type attack against the Pokémon holding this berry.",
      name: {
        chinese: "燈漿果",
        japanese: "ホズのみ",
        english: "Chilan Berry",
      },
    },
    {
      id: 201,
      type: "Berries",
      description: "Raises Attack when HP is low.",
      name: {
        chinese: "枝荔果",
        english: "Liechi Berry",
        japanese: "チイラのみ",
      },
    },
    {
      id: 202,
      type: "Berries",
      description: "Raises Defense when HP is low.",
      name: {
        english: "Ganlon Berry",
        japanese: "リュガのみ",
        chinese: "龙睛果",
      },
    },
    {
      id: 203,
      type: "Berries",
      description: "Raises Speed when HP is low.",
      name: {
        chinese: "沙鳞果",
        english: "Salac Berry",
        japanese: "カムラのみ",
      },
    },
    {
      id: 204,
      type: "Berries",
      description: "Raises Special Attack when HP is low.",
      name: {
        english: "Petaya Berry",
        japanese: "ヤタピのみ",
        chinese: "龙火果",
      },
    },
    {
      id: 205,
      type: "Berries",
      description: "Raises Special Defense when HP is low.",
      name: {
        chinese: "杏仔果",
        japanese: "ズアのみ",
        english: "Apicot Berry",
      },
    },
    {
      id: 206,
      type: "Berries",
      description: "Increases critical-hit ratio when HP is low.",
      name: {
        chinese: "兰萨果",
        japanese: "サンのみ",
        english: "Lansat Berry",
      },
    },
    {
      id: 207,
      type: "Berries",
      description: "Sharply raises a random stat when HP is low.",
      name: {
        japanese: "スターのみ",
        english: "Starf Berry",
        chinese: "星桃果",
      },
    },
    {
      id: 208,
      type: "Berries",
      description:
        "If held by a Pokémon, it restores its HP if it is hit by any supereffective attack.",
      name: {
        chinese: "谜芝果",
        english: "Enigma Berry",
        japanese: "ナゾのみ",
      },
    },
    {
      id: 209,
      type: "Berries",
      description: "Increases a move's accuracy when HP is low.",
      name: {
        chinese: "奇秘果",
        english: "Micle Berry",
        japanese: "ミクルのみ",
      },
    },
    {
      id: 210,
      type: "Berries",
      description: "Holder can move first when HP is low.",
      name: {
        japanese: "イバンのみ",
        english: "Custap Berry",
        chinese: "释陀果",
      },
    },
    {
      id: 211,
      type: "Berries",
      description:
        "If held by a Pokémon and a physical attack lands, the attacker also takes damage.",
      name: {
        japanese: "ジャポのみ",
        english: "Jaboca Berry",
        chinese: "嘉珍果",
      },
    },
    {
      id: 212,
      type: "Berries",
      description:
        "If held by a Pokémon and a special attack lands, the attacker also takes damage.",
      name: {
        chinese: "雾莲果",
        japanese: "レンブのみ",
        english: "Rowap Berry",
      },
    },
    {
      id: 213,
      type: "Hold items",
      description: "Lowers the opponent's accuracy.",
      name: {
        chinese: "光粉",
        japanese: "ひかりのこな",
        english: "Bright Powder",
      },
    },
    {
      id: 214,
      type: "Hold items",
      description:
        "An item to be held by a POKéMON. It restores any lowered stat in battle. It can be used only once.",
      name: {
        chinese: "白色香草",
        english: "White Herb",
        japanese: "しろいハーブ",
      },
    },
    {
      id: 215,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It is a stiff and heavy brace that promotes strong growth but lowers Speed.",
      name: {
        english: "Macho Brace",
        japanese: "きょうせいギプス",
        chinese: "强制锻炼器",
      },
    },

    {
      id: 217,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. A light, sharp claw that lets the bearer move first occasionally.",
      name: {
        chinese: "先制之爪",
        english: "Quick Claw",
        japanese: "せんせいのツメ",
      },
    },
    {
      id: 218,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It is a bell with a comforting chime that calms the holder and makes it friendly.",
      name: {
        english: "Soothe Bell",
        japanese: "やすらぎのすず",
        chinese: "安抚之铃",
      },
    },
    {
      id: 219,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It snaps the holder out of infatuation. It can be used only once.",
      name: {
        japanese: "メンタルハーブ",
        english: "Mental Herb",
        chinese: "心灵香草",
      },
    },
    {
      id: 220,
      type: "Hold items",
      description: "Raises Attack, but only one move can be used.",
      name: {
        japanese: "こだわりハチマキ",
        english: "Choice Band",
        chinese: "讲究头带",
      },
    },
    {
      id: 221,
      type: "Hold items",
      description:
        "May cause opponent to flinch. Evolves Poliwhirl and Slowpoke when traded holding the item.",
      name: {
        chinese: "王者之证",
        english: "Kings Rock",
        japanese: "おうじゃのしるし",
      },
    },
    {
      id: 222,
      type: "Hold items",
      description: "Increases the power of Bug-type moves.",
      name: {
        chinese: "银粉",
        english: "Silver Powder",
        japanese: "ぎんのこな",
      },
    },
    {
      id: 223,
      type: "Hold items",
      description: "Doubles prize money if held.",
      name: {
        english: "Amulet Coin",
        japanese: "おまもりこばん",
        chinese: "护符金币",
      },
    },
    {
      id: 224,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It helps keep wild Pokémon away if the holder is the first one in the party.",
      name: {
        chinese: "洁净之符",
        japanese: "きよめのおふだ",
        english: "Cleanse Tag",
      },
    },
    {
      id: 225,
      type: "Hold items",
      description:
        "Increases the power of Psychic- and Dragon-type moves when held by Latios or Latias. Increases Sp.Atk/Sp.Def prior to Gen 7.",
      name: {
        japanese: "こころのしずく",
        english: "Soul Dew",
        chinese: "心之水滴",
      },
    },
    {
      id: 226,
      type: "Hold items",
      description:
        "Increases Special Attack when held by Clamperl. Evolves Clamperl when traded holding the item.",
      name: {
        english: "Deep Sea Tooth",
        japanese: "しんかいのキバ",
        chinese: "深海之牙",
      },
    },
    {
      id: 227,
      type: "Hold items",
      description:
        "Increases Special Defense when held by Clamperl. Evolves Clamperl when traded holding the item.",
      name: {
        english: "Deep Sea Scale",
        japanese: "しんかいのウロコ",
        chinese: "深海鳞片",
      },
    },
    {
      id: 228,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It enables the holder to flee from any wild Pokémon without fail.",
      name: {
        chinese: "烟雾球",
        english: "Smoke Ball",
        japanese: "けむりだま",
      },
    },
    {
      id: 229,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. The Pokémon holding this peculiar stone is prevented from evolving.",
      name: {
        chinese: "不变之石",
        english: "Everstone",
        japanese: "かわらずのいし",
      },
    },
    {
      id: 230,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. The holder may endure a potential KO attack, leaving it with just 1 HP.",
      name: {
        japanese: "きあいのハチマキ",
        english: "Focus Band",
        chinese: "气势头带",
      },
    },
    {
      id: 231,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It is an egg filled with happiness that earns extra Exp. Points in battle.",
      name: {
        english: "Lucky Egg",
        japanese: "しあわせタマゴ",
        chinese: "幸运蛋",
      },
    },
    {
      id: 232,
      type: "Hold items",
      description: "Increases critical-hit ratio.",
      name: {
        english: "Scope Lens",
        japanese: "ピントレンズ",
        chinese: "焦点镜",
      },
    },
    {
      id: 233,
      type: "Hold items",
      description:
        "Increases the power of Steel-type moves. Evolves Onix and Scyther when traded holding the item.",
      name: {
        chinese: "金属膜",
        english: "Metal Coat",
        japanese: "メタルコート",
      },
    },
    {
      id: 234,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. The holder's HP is gradually restored during battle.",
      name: {
        japanese: "たべのこし",
        english: "Leftovers",
        chinese: "吃剩的东西",
      },
    },

    {
      id: 236,
      type: "Hold items",
      description:
        "An item to be held by PIKACHU. It is a puzzling orb that raises the Attack and Sp. Atk stat.",
      name: {
        english: "Light Ball",
        japanese: "でんきだま",
        chinese: "电气球",
      },
    },
    {
      id: 237,
      type: "Hold items",
      description: "Increases the power of Ground-type moves.",
      name: {
        chinese: "柔软沙子",
        english: "Soft Sand",
        japanese: "やわらかいすな",
      },
    },
    {
      id: 238,
      type: "Hold items",
      description: "Increases the power of Rock-type moves.",
      name: {
        chinese: "硬石头",
        english: "Hard Stone",
        japanese: "かたいいし",
      },
    },
    {
      id: 239,
      type: "Hold items",
      description: "Increases the power of Grass-type moves.",
      name: {
        japanese: "きせきのタネ",
        english: "Miracle Seed",
        chinese: "奇迹种子",
      },
    },
    {
      id: 240,
      type: "Hold items",
      description: "Increases the power of Dark-type moves.",
      name: {
        english: "Black Glasses",
        japanese: "くろいメガネ",
        chinese: "黑色眼镜",
      },
    },
    {
      id: 241,
      type: "Hold items",
      description: "Increases the power of Fighting-type moves.",
      name: {
        chinese: "黑带",
        japanese: "くろおび",
        english: "Black Belt",
      },
    },
    {
      id: 242,
      type: "Hold items",
      description: "Increases the power of Electric-type moves.",
      name: {
        english: "Magnet",
        japanese: "じしゃく",
        chinese: "磁铁",
      },
    },
    {
      id: 243,
      type: "Hold items",
      description: "Increases the power of Water-type moves.",
      name: {
        english: "Mystic Water",
        japanese: "しんぴのしずく",
        chinese: "神秘水滴",
      },
    },
    {
      id: 244,
      type: "Hold items",
      description: "Increases the power of Flying-type moves.",
      name: {
        chinese: "锐利鸟嘴",
        english: "Sharp Beak",
        japanese: "するどいくちばし",
      },
    },
    {
      id: 245,
      type: "Hold items",
      description: "Increases the power of Poison-type moves.",
      name: {
        japanese: "どくバリ",
        english: "Poison Barb",
        chinese: "毒针",
      },
    },
    {
      id: 246,
      type: "Hold items",
      description: "Increases the power of Ice-type moves.",
      name: {
        japanese: "とけないこおり",
        english: "Never-Melt Ice",
        chinese: "不融冰",
      },
    },
    {
      id: 247,
      type: "Hold items",
      description: "Increases the power of Ghost-type moves.",
      name: {
        chinese: "诅咒之符",
        japanese: "のろいのおふだ",
        english: "Spell Tag",
      },
    },
    {
      id: 248,
      type: "Hold items",
      description: "Increases the power of Psychic-type moves.",
      name: {
        japanese: "まがったスプーン",
        english: "Twisted Spoon",
        chinese: "弯曲的汤匙",
      },
    },
    {
      id: 249,
      type: "Hold items",
      description: "Increases the power of Fire-type moves.",
      name: {
        english: "Charcoal",
        japanese: "もくたん",
        chinese: "木炭",
      },
    },
    {
      id: 250,
      type: "Hold items",
      description: "Increases the power of Dragon-type moves.",
      name: {
        chinese: "龙之牙",
        japanese: "りゅうのキバ",
        english: "Dragon Fang",
      },
    },
    {
      id: 251,
      type: "Hold items",
      description: "Increases the power of Normal-type moves.",
      name: {
        chinese: "丝绸围巾",
        english: "Silk Scarf",
        japanese: "シルクのスカーフ",
      },
    },

    {
      id: 253,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. The holder's HP is restored a little every time it inflicts damage.",
      name: {
        chinese: "贝壳之铃",
        english: "Shell Bell",
        japanese: "かいがらのすず",
      },
    },
    {
      id: 254,
      type: "Hold items",
      description:
        "Increases the power of Water-type moves. Breeding Marill or Azumarill produces Azurill when held.",
      name: {
        chinese: "海潮薰香",
        english: "Sea Incense",
        japanese: "うしおのおこう",
      },
    },
    {
      id: 255,
      type: "Hold items",
      description:
        "Lowers the opponent's accuracy. Breeding Wobbuffet produces Wynaut when held.",
      name: {
        japanese: "のんきのおこう",
        english: "Lax Incense",
        chinese: "悠闲薰香",
      },
    },
    {
      id: 256,
      type: "Hold items",
      description: "Increases critical-hit ratio when held by Chansey.",
      name: {
        english: "Lucky Punch",
        japanese: "ラッキーパンチ",
        chinese: "吉利拳",
      },
    },
    {
      id: 257,
      type: "Hold items",
      description: "Increases Defense when held by Ditto.",
      name: {
        japanese: "メタルパウダー",
        english: "Metal Powder",
        chinese: "金属粉",
      },
    },
    {
      id: 258,
      type: "Hold items",
      description: "Increases Attack when held by Cubone or Marowak.",
      name: {
        chinese: "粗骨头",
        japanese: "ふといホネ",
        english: "Thick Club",
      },
    },
    {
      id: 259,
      type: "Hold items",
      description: "Increases critical-hit ratio when held by Farfetch'd.",
      name: "Leek",
    },

    {
      id: 265,
      type: "Hold items",
      description: "Increases the accuracy of moves.",
      name: {
        chinese: "广角镜",
        japanese: "こうかくレンズ",
        english: "Wide Lens",
      },
    },
    {
      id: 266,
      type: "Hold items",
      description: "Increases the power of Physical-category moves.",
      name: {
        japanese: "ちからのハチマキ",
        english: "Muscle Band",
        chinese: "力量头带",
      },
    },
    {
      id: 267,
      type: "Hold items",
      description: "Increases the power of Special-category moves.",
      name: {
        japanese: "ものしりメガネ",
        english: "Wise Glasses",
        chinese: "博识眼镜",
      },
    },
    {
      id: 268,
      type: "Hold items",
      description: "Increases the power of super-effective moves.",
      name: {
        english: "Expert Belt",
        japanese: "たつじんのおび",
        chinese: "达人带",
      },
    },
    {
      id: 269,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of barrier moves like Light Screen and Reflect used by the holder.",
      name: {
        japanese: "ひかりのねんど",
        english: "Light Clay",
        chinese: "光之黏土",
      },
    },
    {
      id: 270,
      type: "Hold items",
      description: "Increases the power of moves, but loses HP each turn.",
      name: {
        chinese: "生命宝珠",
        english: "Life Orb",
        japanese: "いのちのたま",
      },
    },
    {
      id: 271,
      type: "Hold items",
      description:
        "A single-use item to be held by a Pokémon. It allows the immediate use of a move that charges on the first turn.",
      name: {
        japanese: "パワフルハーブ",
        english: "Power Herb",
        chinese: "强力香草",
      },
    },
    {
      id: 272,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It is a bizarre orb that badly poisons the holder in battle.",
      name: {
        chinese: "剧毒宝珠",
        japanese: "どくどくだま",
        english: "Toxic Orb",
      },
    },
    {
      id: 273,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It is a bizarre orb that inflicts a burn on the holder in battle.",
      name: {
        chinese: "火焰宝珠",
        japanese: "かえんだま",
        english: "Flame Orb",
      },
    },
    {
      id: 274,
      type: "Hold items",
      description: "Increases Speed when held by Ditto.",
      name: {
        english: "Quick Powder",
        japanese: "スピードパウダー",
        chinese: "速度粉",
      },
    },
    {
      id: 275,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. If it has full HP, the holder will endure one potential KO attack, leaving 1 HP.",
      name: {
        chinese: "气势披带",
        english: "Focus Sash",
        japanese: "きあいのタスキ",
      },
    },
    {
      id: 276,
      type: "Hold items",
      description:
        "Raises a move's accuracy if the holder moves after its target.",
      name: {
        chinese: "对焦镜",
        english: "Zoom Lens",
        japanese: "フォーカスレンズ",
      },
    },
    {
      id: 277,
      type: "Hold items",
      description: "Increases the power of moves used consecutively.",
      name: {
        english: "Metronome",
        japanese: "メトロノーム",
        chinese: "节拍器",
      },
    },
    {
      id: 278,
      type: "Hold items",
      description:
        "A Pokémon held item that cuts Speed. It makes Flying-type and levitating holders susceptible to Ground moves.",
      name: {
        chinese: "黑色铁球",
        english: "Iron Ball",
        japanese: "くろいてっきゅう",
      },
    },
    {
      id: 279,
      type: "Hold items",
      description: "Holder always attacks last.",
      name: {
        chinese: "后攻之尾",
        english: "Lagging Tail",
        japanese: "こうこうのしっぽ",
      },
    },
    {
      id: 280,
      type: "Hold items",
      description:
        "A long, thin, bright-red string to be held by a Pokémon. If the holder becomes infatuated, the foe does too.",
      name: {
        chinese: "红线",
        english: "Destiny Knot",
        japanese: "あかいいと",
      },
    },
    {
      id: 281,
      type: "Hold items",
      description:
        "A held item that gradually restores the HP of Poison-type Pokémon. It inflicts damage on all other types.",
      name: {
        english: "Black Sludge",
        japanese: "くろいヘドロ",
        chinese: "黑色污泥",
      },
    },
    {
      id: 282,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of the move Hail used by the holder.",
      name: {
        chinese: "冰冷岩石",
        japanese: "つめたいいわ",
        english: "Icy Rock",
      },
    },
    {
      id: 283,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of the move Sandstorm used by the holder.",
      name: {
        chinese: "沙沙岩石",
        japanese: "さらさらいわ",
        english: "Smooth Rock",
      },
    },
    {
      id: 284,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of the move Sunny Day used by the holder.",
      name: {
        japanese: "あついいわ",
        english: "Heat Rock",
        chinese: "炽热岩石",
      },
    },
    {
      id: 285,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of the move Rain Dance used by the holder.",
      name: {
        chinese: "潮湿岩石",
        japanese: "しめったいわ",
        english: "Damp Rock",
      },
    },
    {
      id: 286,
      type: "Hold items",
      description:
        "A Pokémon held item that extends the duration of multiturn attacks like Bind and Wrap.",
      name: {
        chinese: "紧缠钩爪",
        japanese: "ねばりのかぎづめ",
        english: "Grip Claw",
      },
    },
    {
      id: 287,
      type: "Hold items",
      description: "Raises Speed, but only one move can be used.",
      name: {
        japanese: "こだわりスカーフ",
        english: "Choice Scarf",
        chinese: "讲究围巾",
      },
    },
    {
      id: 288,
      type: "Hold items",
      description:
        "A held item that damages the holder on every turn. It may latch on to foes and allies that touch the holder.",
      name: {
        chinese: "附着针",
        japanese: "くっつきバリ",
        english: "Sticky Barb",
      },
    },
    {
      id: 289,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes Attack gain on leveling, but reduces the Speed stat.",
      name: {
        chinese: "力量护腕",
        japanese: "パワーリスト",
        english: "Power Bracer",
      },
    },
    {
      id: 290,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes Defense gain on leveling, but reduces the Speed stat.",
      name: {
        chinese: "力量腰带",
        japanese: "パワーベルト",
        english: "Power Belt",
      },
    },
    {
      id: 291,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes Sp. Atk gain on leveling, but reduces the Speed stat.",
      name: {
        japanese: "パワーレンズ",
        english: "Power Lens",
        chinese: "力量镜",
      },
    },
    {
      id: 292,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes Sp. Def gain on leveling, but reduces the Speed stat.",
      name: {
        chinese: "力量束带",
        japanese: "パワーバンド",
        english: "Power Band",
      },
    },
    {
      id: 293,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes Speed gain on leveling, but reduces the Speed stat.",
      name: {
        chinese: "力量护踝",
        japanese: "パワーアンクル",
        english: "Power Anklet",
      },
    },
    {
      id: 294,
      type: "Hold items",
      description:
        "A Pokémon held item that promotes HP gain on leveling, but reduces the Speed stat.",
      name: {
        japanese: "パワーウエイト",
        english: "Power Weight",
        chinese: "力量负重",
      },
    },
    {
      id: 295,
      type: "Hold items",
      description:
        "A tough, discarded carapace to be held by a Pokémon. It enables the holder to switch with a waiting Pokémon in battle.",
      name: {
        japanese: "きれいなぬけがら",
        english: "Shed Shell",
        chinese: "美丽空壳",
      },
    },
    {
      id: 296,
      type: "Hold items",
      description: "Recovers more HP from HP-stealing moves.",
      name: {
        japanese: "おおきなねっこ",
        english: "Big Root",
        chinese: "大根茎",
      },
    },
    {
      id: 297,
      type: "Hold items",
      description: "Raises Special Attack, but only one move can be used.",
      name: {
        english: "Choice Specs",
        japanese: "こだわりメガネ",
        chinese: "讲究眼镜",
      },
    },
    {
      id: 298,
      type: "Hold items",
      description:
        "Increases power of Fire-type moves. Changes Arceus' type to Fire.",
      name: {
        japanese: "ひのたまプレート",
        english: "Flame Plate",
        chinese: "火球石板",
      },
    },
    {
      id: 299,
      type: "Hold items",
      description:
        "Increases power of Water-type moves. Changes Arceus' type to Water.",
      name: {
        english: "Splash Plate",
        japanese: "しずくプレート",
        chinese: "水滴石板",
      },
    },
    {
      id: 300,
      type: "Hold items",
      description:
        "Increases power of Electric-type moves. Changes Arceus' type to Electric.",
      name: {
        chinese: "雷电石板",
        english: "Zap Plate",
        japanese: "いかずちプレート",
      },
    },
    {
      id: 301,
      type: "Hold items",
      description:
        "Increases power of Grass-type moves. Changes Arceus' type to Grass.",
      name: {
        english: "Meadow Plate",
        japanese: "みどりのプレート",
        chinese: "碧绿石板",
      },
    },
    {
      id: 302,
      type: "Hold items",
      description:
        "Increases power of Ice-type moves. Changes Arceus' type to Ice.",
      name: {
        chinese: "冰柱石板",
        english: "Icicle Plate",
        japanese: "つららのプレート",
      },
    },
    {
      id: 303,
      type: "Hold items",
      description:
        "Increases power of Fighting-type moves. Changes Arceus' type to Fighting.",
      name: {
        chinese: "拳头石板",
        english: "Fist Plate",
        japanese: "こぶしのプレート",
      },
    },
    {
      id: 304,
      type: "Hold items",
      description:
        "Increases power of Poison-type moves. Changes Arceus' type to Poison.",
      name: {
        english: "Toxic Plate",
        japanese: "もうどくプレート",
        chinese: "剧毒石板",
      },
    },
    {
      id: 305,
      type: "Hold items",
      description:
        "Increases power of Ground-type moves. Changes Arceus' type to Ground.",
      name: {
        japanese: "だいちのプレート",
        english: "Earth Plate",
        chinese: "大地石板",
      },
    },
    {
      id: 306,
      type: "Hold items",
      description:
        "Increases power of Flying-type moves. Changes Arceus' type to Flying.",
      name: {
        japanese: "あおぞらプレート",
        english: "Sky Plate",
        chinese: "蓝天石板",
      },
    },
    {
      id: 307,
      type: "Hold items",
      description:
        "Increases power of Psychic-type moves. Changes Arceus' type to Psychic.",
      name: {
        chinese: "神奇石板",
        english: "Mind Plate",
        japanese: "ふしぎのプレート",
      },
    },
    {
      id: 308,
      type: "Hold items",
      description:
        "Increases power of Bug-type moves. Changes Arceus' type to Bug.",
      name: {
        chinese: "玉虫石板",
        japanese: "たまむしプレート",
        english: "Insect Plate",
      },
    },
    {
      id: 309,
      type: "Hold items",
      description:
        "Increases power of Rock-type moves. Changes Arceus' type to Rock.",
      name: {
        japanese: "がんせきプレート",
        english: "Stone Plate",
        chinese: "岩石石板",
      },
    },
    {
      id: 310,
      type: "Hold items",
      description:
        "Increases power of Ghost-type moves. Changes Arceus' type to Ghost.",
      name: {
        japanese: "もののけプレート",
        english: "Spooky Plate",
        chinese: "妖怪石板",
      },
    },
    {
      id: 311,
      type: "Hold items",
      description:
        "Increases power of Dragon-type moves. Changes Arceus' type to Dragon.",
      name: {
        english: "Draco Plate",
        japanese: "りゅうのプレート",
        chinese: "龙之石板",
      },
    },
    {
      id: 312,
      type: "Hold items",
      description:
        "Increases power of Dark-type moves. Changes Arceus' type to Dark.",
      name: {
        chinese: "恶颜石板",
        japanese: "こわもてプレート",
        english: "Dread Plate",
      },
    },
    {
      id: 313,
      type: "Hold items",
      description:
        "Increases power of Steel-type moves. Changes Arceus' type to Steel.",
      name: {
        chinese: "钢铁石板",
        english: "Iron Plate",
        japanese: "こうてつプレート",
      },
    },
    {
      id: 314,
      type: "Hold items",
      description:
        "Increases the power of Psychic-type moves. Breeding Mr. Mime produces Mime Jr. when held.",
      name: {
        chinese: "奇异薰香",
        japanese: "あやしいおこう",
        english: "Odd Incense",
      },
    },
    {
      id: 315,
      type: "Hold items",
      description:
        "Increases the power of Rock-type moves. Breeding Sudowoodo produces Bonsly when held.",
      name: {
        chinese: "岩石薰香",
        english: "Rock Incense",
        japanese: "がんせきおこう",
      },
    },
    {
      id: 316,
      type: "Hold items",
      description:
        "Holder always attacks last. Breeding Snorlax produces Munchlax when held.",
      name: {
        chinese: "饱腹薰香",
        english: "Full Incense",
        japanese: "まんぷくおこう",
      },
    },
    {
      id: 317,
      type: "Hold items",
      description:
        "Increases the power of Water-type moves. Breeding Mantine produces Mantyke when held.",
      name: {
        chinese: "涟漪薰香",
        english: "Wave Incense",
        japanese: "さざなみのおこう",
      },
    },
    {
      id: 318,
      type: "Hold items",
      description:
        "Increases the power of Grass-type moves. Breeding Roselia or Roserade produces Budew when held.",
      name: {
        english: "Rose Incense",
        japanese: "おはなのおこう",
        chinese: "花朵薰香",
      },
    },
    {
      id: 319,
      type: "Hold items",
      description:
        "Doubles prize money if held. Breeding Chansey or Blissey produces Happiny when held.",
      name: {
        chinese: "幸运薰香",
        japanese: "こううんのおこう",
        english: "Luck Incense",
      },
    },
    {
      id: 320,
      type: "Hold items",
      description:
        "Descreases the likelihood of meeting wild Pokémon. Breeding Chimecho produces Chingling when held.",
      name: {
        chinese: "洁净薰香",
        english: "Pure Incense",
        japanese: "きよめのおこう",
      },
    },
    {
      id: 326,
      type: "Hold items",
      description:
        "Increases critical-hit ratio. Evolves Sneasel when held at night.",
      name: {
        chinese: "锐利之爪",
        japanese: "するどいツメ",
        english: "Razor Claw",
      },
    },
    {
      id: 327,
      type: "Hold items",
      description:
        "May cause opponent to flinch. Evolves Gligar when held at night.",
      name: {
        english: "Razor Fang",
        japanese: "するどいキバ",
        chinese: "锐利之牙",
      },
    },
    {
      id: 538,
      type: "Hold items",
      description:
        "A mysterious evolutionary lump. When held, it raises the Defense and Sp. Def of a Pokémon that can still evolve.",
      name: {
        chinese: "进化奇石",
        english: "Eviolite",
        japanese: "しんかのきせき",
      },
    },
    {
      id: 539,
      type: "Hold items",
      description:
        "A very light stone. It reduces the weight of a Pokémon when held.",
      name: {
        japanese: "かるいし",
        english: "Float Stone",
        chinese: "轻石",
      },
    },
    {
      id: 540,
      type: "Hold items",
      description:
        "If the holder of this item takes damage, the attacker will also be damaged upon contact.",
      name: {
        english: "Rocky Helmet",
        japanese: "ゴツゴツメット",
        chinese: "凸凸头盔",
      },
    },
    {
      id: 541,
      type: "Hold items",
      description:
        "When held by a Pokémon, the Pokémon will float into the air. When the holder is attacked, this item will burst.",
      name: {
        english: "Air Balloon",
        japanese: "ふうせん",
        chinese: "气球",
      },
    },
    {
      id: 542,
      type: "Hold items",
      description:
        "A card with a mysterious power. When the holder is struck by a foe, the attacker is removed from battle.",
      name: {
        japanese: "レッドカード",
        english: "Red Card",
        chinese: "红牌",
      },
    },
    {
      id: 543,
      type: "Hold items",
      description:
        "Moves that would otherwise have no effect will land on the Pokémon that holds it.",
      name: {
        english: "Ring Target",
        japanese: "ねらいのまと",
        chinese: "标靶",
      },
    },
    {
      id: 544,
      type: "Hold items",
      description:
        "A band that increases the power of binding moves when held.",
      name: {
        english: "Binding Band",
        japanese: "しめつけバンド",
        chinese: "紧绑束带",
      },
    },
    {
      id: 545,
      type: "Hold items",
      description:
        "A consumable bulb. If the holder is hit by a Water-type move, its Sp. Atk will rise.",
      name: {
        japanese: "きゅうこん",
        english: "Absorb Bulb",
        chinese: "球根",
      },
    },
    {
      id: 546,
      type: "Hold items",
      description:
        "A consumable battery. If the holder is hit by an Electric-type move, its Attack will rise.",
      name: {
        chinese: "充电电池",
        english: "Cell Battery",
        japanese: "じゅうでんち",
      },
    },
    {
      id: 547,
      type: "Hold items",
      description:
        "If the holder is hit by an attack, it will switch with another Pokémon in your party.",
      name: {
        english: "Eject Button",
        japanese: "だっしゅつボタン",
        chinese: "逃脱按键",
      },
    },
    {
      id: 548,
      type: "Hold items",
      description: "Increases the power of a Fire-type move only once.",
      name: {
        chinese: "火之宝石",
        japanese: "ほのおのジュエル",
        english: "Fire Gem",
      },
    },
    {
      id: 549,
      type: "Hold items",
      description: "Increases the power of a Water-type move only once.",
      name: {
        japanese: "みずのジュエル",
        english: "Water Gem",
        chinese: "水之宝石",
      },
    },
    {
      id: 550,
      type: "Hold items",
      description: "Increases the power of an Electric-type move only once.",
      name: {
        chinese: "电之宝石",
        japanese: "でんきのジュエル",
        english: "Electric Gem",
      },
    },
    {
      id: 551,
      type: "Hold items",
      description: "Increases the power of a Grass-type move only once.",
      name: {
        chinese: "草之宝石",
        japanese: "くさのジュエル",
        english: "Grass Gem",
      },
    },
    {
      id: 552,
      type: "Hold items",
      description: "Increases the power of an Ice-type move only once.",
      name: {
        english: "Ice Gem",
        japanese: "こおりのジュエル",
        chinese: "冰之宝石",
      },
    },
    {
      id: 553,
      type: "Hold items",
      description: "Increases the power of a Fighting-type move only once.",
      name: {
        english: "Fighting Gem",
        japanese: "かくとうジュエル",
        chinese: "格斗宝石",
      },
    },
    {
      id: 554,
      type: "Hold items",
      description: "Increases the power of a Poison-type move only once.",
      name: {
        english: "Poison Gem",
        japanese: "どくのジュエル",
        chinese: "毒之宝石",
      },
    },
    {
      id: 555,
      type: "Hold items",
      description: "Increases the power of a Ground-type move only once.",
      name: {
        english: "Ground Gem",
        japanese: "じめんのジュエル",
        chinese: "地面宝石",
      },
    },
    {
      id: 556,
      type: "Hold items",
      description: "Increases the power of a Flying-type move only once.",
      name: {
        chinese: "飞行宝石",
        english: "Flying Gem",
        japanese: "ひこうのジュエル",
      },
    },
    {
      id: 557,
      type: "Hold items",
      description: "Increases the power of a Psychic-type move only once.",
      name: {
        chinese: "超能力宝石",
        english: "Psychic Gem",
        japanese: "エスパージュエル",
      },
    },
    {
      id: 559,
      type: "Hold items",
      description: "Increases the power of a Rock-type move only once.",
      name: {
        english: "Rock Gem",
        japanese: "いわのジュエル",
        chinese: "岩石宝石",
      },
    },
    {
      id: 560,
      type: "Hold items",
      description: "Increases the power of a Ghost-type move only once.",
      name: {
        chinese: "幽灵宝石",
        english: "Ghost Gem",
        japanese: "ゴーストジュエル",
      },
    },
    {
      id: 561,
      type: "Hold items",
      description: "Increases the power of a Dragon-type move only once.",
      name: {
        chinese: "龙之宝石",
        japanese: "ドラゴンジュエル",
        english: "Dragon Gem",
      },
    },
    {
      id: 562,
      type: "Hold items",
      description: "Increases the power of a Dark-type move only once.",
      name: {
        chinese: "恶之宝石",
        japanese: "あくのジュエル",
        english: "Dark Gem",
      },
    },
    {
      id: 563,
      type: "Hold items",
      description: "Increases the power of a Steel-type move only once.",
      name: {
        english: "Steel Gem",
        japanese: "はがねのジュエル",
        chinese: "钢之宝石",
      },
    },
    {
      id: 564,
      type: "Hold items",
      description: "Increases the power of a Normal-type move only once.",
      name: {
        chinese: "一般宝石",
        japanese: "ノーマルジュエル",
        english: "Normal Gem",
      },
    },

    {
      id: 575,
      type: "Hold items",
      description:
        "A mysterious orb containing the power of the Unova region, to be used when generating Pass Power.",
      name: {
        chinese: "释出之玉",
        japanese: "デルダマ",
        english: "Pass Orb",
      },
    },

    {
      id: 633,
      type: "Hold items",
      description:
        "A card key needed to enter the password inside the Plasma Frigate.",
      name: {
        chinese: "等离子卡",
        english: "Plasma Card",
        japanese: "プラズマカード",
      },
    },
    {
      id: 634,
      type: "Hold items",
      description:
        "A handkerchief dropped by a regular at Café Warehouse. It smells faintly like a Pokémon.",
      name: {
        chinese: "脏手帕",
        japanese: "よごれたハンカチ",
        english: "Grubby Hanky",
      },
    },
    {
      id: 635,
      type: "Hold items",
      description:
        "A special device that wrings out the potential of Pokémon. It is an imperfect prototype.",
      name: {
        japanese: "アクロママシーン",
        english: "Colress Machine",
        chinese: "阿克罗玛机器",
      },
    },
    {
      id: 637,
      type: "Hold items",
      description:
        "The Xtransceiver found at the Nimbasa City amusement park. It seems it belongs to a boy.",
      name: {
        japanese: "わすれもの",
        english: "Dropped Item",
        chinese: "遗忘物",
      },
    },

    {
      id: 639,
      type: "Hold items",
      description:
        "Sharply raises Attack and Special Attack if hit by a super-effective move.",
      name: {
        english: "Weakness Policy",
        japanese: "じゃくてんほけん",
        chinese: "弱点保险",
      },
    },
    {
      id: 640,
      type: "Hold items",
      description:
        "Raises Special Defense but prevents the use of status moves.",
      name: {
        english: "Assault Vest",
        japanese: "とつげきチョッキ",
        chinese: "突击背心",
      },
    },

    {
      id: 644,
      type: "Hold items",
      description:
        "Increases power of Fairy-type moves. Changes Arceus' type to Fairy.",
      name: {
        chinese: "妖精石板",
        english: "Pixie Plate",
        japanese: "せいれいプレート",
      },
    },
    {
      id: 645,
      type: "Hold items",
      description:
        "A capsule that allows a Pokémon with two Abilities to switch between these Abilities when it is used.",
      name: {
        japanese: "とくせいカプセル",
        english: "Ability Capsule",
        chinese: "特性胶囊",
      },
    },

    {
      id: 648,
      type: "Hold items",
      description: "Raises Special Defense if hit by a Water-type move.",
      name: {
        chinese: "光苔",
        english: "Luminous Moss",
        japanese: "ひかりごけ",
      },
    },
    {
      id: 649,
      type: "Hold items",
      description: "Raises Attack if hit by an Ice-type move.",
      name: {
        chinese: "雪球",
        english: "Snowball",
        japanese: "ゆきだま",
      },
    },
    {
      id: 650,
      type: "Hold items",
      description: "Prevents damage from weather and powder.",
      name: {
        chinese: "防尘护目镜",
        english: "Safety Goggles",
        japanese: "ぼうじんゴーグル",
      },
    },

    {
      id: 656,
      type: "Hold items",
      description: "Enables Gengar to Mega Evolve during battle.",
      name: {
        chinese: "耿鬼进化石",
        japanese: "ゲンガナイト",
        english: "Gengarite",
      },
    },
    {
      id: 657,
      type: "Hold items",
      description: "Enables Gardevoir to Mega Evolve during battle.",
      name: {
        chinese: "沙奈朵进化石",
        english: "Gardevoirite",
        japanese: "サーナイトナイト",
      },
    },
    {
      id: 658,
      type: "Hold items",
      description: "Enables Ampharos to Mega Evolve during battle.",
      name: {
        chinese: "电龙进化石",
        english: "Ampharosite",
        japanese: "デンリュウナイト",
      },
    },
    {
      id: 659,
      type: "Hold items",
      description: "Enables Venusaur to Mega Evolve during battle.",
      name: {
        chinese: "妙蛙花进化石",
        japanese: "フシギバナイト",
        english: "Venusaurite",
      },
    },
    {
      id: 660,
      type: "Hold items",
      description: "Enables Charizard to Mega Evolve during battle.",
      name: {
        japanese: "リザードナイトX",
        english: "Charizardite X",
        chinese: "喷火龙进化石X",
      },
    },
    {
      id: 661,
      type: "Hold items",
      description: "Enables Blastoise to Mega Evolve during battle.",
      name: {
        english: "Blastoisinite",
        japanese: "カメックスナイト",
        chinese: "水箭龟进化石",
      },
    },
    {
      id: 662,
      type: "Hold items",
      description: "Enables Mewtwo to Mega Evolve during battle.",
      name: {
        chinese: "超梦进化石X",
        japanese: "ミュウツナイトX",
        english: "Mewtwonite X",
      },
    },
    {
      id: 663,
      type: "Hold items",
      description: "Enables Mewtwo to Mega Evolve during battle.",
      name: {
        chinese: "超梦进化石Y",
        english: "Mewtwonite Y",
        japanese: "ミュウツナイトY",
      },
    },
    {
      id: 664,
      type: "Hold items",
      description: "Enables Blaziken to Mega Evolve during battle.",
      name: {
        japanese: "バシャーモナイト",
        english: "Blazikenite",
        chinese: "火焰鸡进化石",
      },
    },
    {
      id: 665,
      type: "Hold items",
      description: "Enables Medicham to Mega Evolve during battle.",
      name: {
        english: "Medichamite",
        japanese: "チャーレムナイト",
        chinese: "恰雷姆进化石",
      },
    },
    {
      id: 666,
      type: "Hold items",
      description: "Enables Houndoom to Mega Evolve during battle.",
      name: {
        chinese: "黑鲁加进化石",
        english: "Houndoominite",
        japanese: "ヘルガナイト",
      },
    },
    {
      id: 667,
      type: "Hold items",
      description: "Enables Aggron to Mega Evolve during battle.",
      name: {
        chinese: "波士可多拉进化石",
        english: "Aggronite",
        japanese: "ボスゴドラナイト",
      },
    },
    {
      id: 668,
      type: "Hold items",
      description: "Enables Banette to Mega Evolve during battle.",
      name: {
        chinese: "诅咒娃娃进化石",
        japanese: "ジュペッタナイト",
        english: "Banettite",
      },
    },
    {
      id: 669,
      type: "Hold items",
      description: "Enables Tyranitar to Mega Evolve during battle.",
      name: {
        english: "Tyranitarite",
        japanese: "バンギラスナイト",
        chinese: "班基拉斯进化石",
      },
    },
    {
      id: 670,
      type: "Hold items",
      description: "Enables Scizor to Mega Evolve during battle.",
      name: {
        english: "Scizorite",
        japanese: "ハッサムナイト",
        chinese: "巨钳螳螂进化石",
      },
    },
    {
      id: 671,
      type: "Hold items",
      description: "Enables Pinsir to Mega Evolve during battle.",
      name: {
        japanese: "カイロスナイト",
        english: "Pinsirite",
        chinese: "凯罗斯进化石",
      },
    },
    {
      id: 672,
      type: "Hold items",
      description: "Enables Aerodactyl to Mega Evolve during battle.",
      name: {
        chinese: "化石翼龙进化石",
        english: "Aerodactylite",
        japanese: "プテラナイト",
      },
    },
    {
      id: 673,
      type: "Hold items",
      description: "Enables Lucario to Mega Evolve during battle.",
      name: {
        english: "Lucarionite",
        japanese: "ルカリオナイト",
        chinese: "路卡利欧进化石",
      },
    },
    {
      id: 674,
      type: "Hold items",
      description: "Enables Abomasnow to Mega Evolve during battle.",
      name: {
        japanese: "ユキノオナイト",
        english: "Abomasite",
        chinese: "暴雪王进化石",
      },
    },
    {
      id: 675,
      type: "Hold items",
      description: "Enables Kangaskhan to Mega Evolve during battle.",
      name: {
        chinese: "袋兽进化石",
        japanese: "ガルーラナイト",
        english: "Kangaskhanite",
      },
    },
    {
      id: 676,
      type: "Hold items",
      description: "Enables Gyarados to Mega Evolve during battle.",
      name: {
        chinese: "暴鲤龙进化石",
        english: "Gyaradosite",
        japanese: "ギャラドスナイト",
      },
    },
    {
      id: 677,
      type: "Hold items",
      description: "Enables Absol to Mega Evolve during battle.",
      name: {
        chinese: "阿勃梭鲁进化石",
        english: "Absolite",
        japanese: "アブソルナイト",
      },
    },
    {
      id: 678,
      type: "Hold items",
      description: "Enables Charizard to Mega Evolve during battle.",
      name: {
        chinese: "喷火龙进化石Y",
        japanese: "リザードナイトY",
        english: "Charizardite Y",
      },
    },
    {
      id: 679,
      type: "Hold items",
      description: "Enables Alakazam to Mega Evolve during battle.",
      name: {
        english: "Alakazite",
        japanese: "フーディナイト",
        chinese: "胡地进化石",
      },
    },
    {
      id: 680,
      type: "Hold items",
      description: "Enables Heracross to Mega Evolve during battle.",
      name: {
        japanese: "ヘラクロスナイト",
        english: "Heracronite",
        chinese: "赫拉克罗斯进化石",
      },
    },
    {
      id: 681,
      type: "Hold items",
      description: "Enables Mawile to Mega Evolve during battle.",
      name: {
        chinese: "大嘴娃进化石",
        japanese: "クチートナイト",
        english: "Mawilite",
      },
    },
    {
      id: 682,
      type: "Hold items",
      description: "Enables Manectric to Mega Evolve during battle.",
      name: {
        english: "Manectite",
        japanese: "ライボルトナイト",
        chinese: "雷电兽进化石",
      },
    },
    {
      id: 683,
      type: "Hold items",
      description: "Enables Garchomp to Mega Evolve during battle.",
      name: {
        japanese: "ガブリアスナイト",
        english: "Garchompite",
        chinese: "烈咬陆鲨进化石",
      },
    },
    {
      id: 684,
      type: "Hold items",
      description: "Enables Latias to Mega Evolve during battle.",
      name: {
        chinese: "拉帝亚斯进化石",
        japanese: "ラティアスナイト",
        english: "Latiasite",
      },
    },
    {
      id: 685,
      type: "Hold items",
      description: "Enables Latios to Mega Evolve during battle.",
      name: {
        japanese: "ラティオスナイト",
        english: "Latiosite",
        chinese: "拉帝欧斯进化石",
      },
    },
    {
      id: 686,
      type: "Berries",
      description:
        "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Fairy-type attack.",
      name: {
        chinese: "洛玫果",
        english: "Roseli Berry",
        japanese: "ロゼルのみ",
      },
    },
    {
      id: 687,
      type: "Berries",
      description:
        "If held by a Pokémon, this Berry will increase the holder's Defense if it's hit with a physical move.",
      name: {
        chinese: "亚开果",
        japanese: "アッキのみ",
        english: "Kee Berry",
      },
    },
    {
      id: 688,
      type: "Berries",
      description:
        "If held by a Pokémon, this Berry will increase the holder's Sp. Def if it's hit with a special move.",
      name: {
        chinese: "香罗果",
        japanese: "タラプのみ",
        english: "Maranga Berry",
      },
    },

    {
      id: 695,
      type: "Hold items",
      description:
        "This pass serves as an ID card for gaining access to the power plant that lies along Route 13.",
      name: {
        chinese: "发电厂通行证",
        english: "Power Plant Pass",
        japanese: "はつでんしょパス",
      },
    },

    {
      id: 697,
      type: "Hold items",
      description:
        "A rather curious stone that might appear to be valuable to some. It's all in the eye of the beholder.",
      name: {
        chinese: "似珍石",
        english: "Intriguing Stone",
        japanese: "すごそうないし",
      },
    },

    {
      id: 700,
      type: "Hold items",
      description:
        "A card key that activates the elevator in Lysandre Labs. It is emblazoned with Team Flare's logo.",
      name: {
        english: "Elevator Key",
        japanese: "エレベーターキー",
        chinese: null,
      },
    },

    {
      id: 712,
      type: "Hold items",
      description:
        "A ticket that was handmade by Looker. It's decorated with a liberal amount of glittery paint.",
      name: {
        english: "Looker Ticket",
        japanese: "ハンサムチケット",
        chinese: "帅哥券",
      },
    },

    {
      id: 752,
      type: "Hold items",
      description: "Enables Swampert to Mega Evolve during battle.",
      name: {
        chinese: "巨沼怪进化石",
        japanese: "ラグラージナイト",
        english: "Swampertite",
      },
    },
    {
      id: 753,
      type: "Hold items",
      description: "Enables Sceptile to Mega Evolve during battle.",
      name: {
        english: "Sceptilite",
        japanese: "ジュカインナイト",
        chinese: "蜥蜴王进化石",
      },
    },
    {
      id: 754,
      type: "Hold items",
      description: "Enables Sableye to Mega Evolve during battle.",
      name: {
        chinese: "勾魂眼进化石",
        japanese: "ヤミラミナイト",
        english: "Sablenite",
      },
    },
    {
      id: 755,
      type: "Hold items",
      description: "Enables Altaria to Mega Evolve during battle.",
      name: {
        japanese: "チルタリスナイト",
        english: "Altarianite",
        chinese: "七夕青鸟进化石",
      },
    },
    {
      id: 756,
      type: "Hold items",
      description: "Enables Gallade to Mega Evolve during battle.",
      name: {
        english: "Galladite",
        japanese: "エルレイドナイト",
        chinese: "艾路雷朵进化石",
      },
    },
    {
      id: 757,
      type: "Hold items",
      description: "Enables Audino to Mega Evolve during battle.",
      name: {
        english: "Audinite",
        japanese: "タブンネナイト",
        chinese: "差不多娃娃进化石",
      },
    },
    {
      id: 758,
      type: "Hold items",
      description: "Enables Metagross to Mega Evolve during battle.",
      name: {
        chinese: "巨金怪进化石",
        japanese: "メタグロスナイト",
        english: "Metagrossite",
      },
    },
    {
      id: 759,
      type: "Hold items",
      description: "Enables Sharpedo to Mega Evolve during battle.",
      name: {
        japanese: "サメハダナイト",
        english: "Sharpedonite",
        chinese: "巨牙鲨进化石",
      },
    },
    {
      id: 760,
      type: "Hold items",
      description: "Enables Slowbro to Mega Evolve during battle.",
      name: {
        chinese: "呆壳兽进化石",
        japanese: "ヤドランナイト",
        english: "Slowbronite",
      },
    },
    {
      id: 761,
      type: "Hold items",
      description: "Enables Steelix to Mega Evolve during battle.",
      name: {
        japanese: "ハガネールナイト",
        english: "Steelixite",
        chinese: "大钢蛇进化石",
      },
    },
    {
      id: 762,
      type: "Hold items",
      description: "Enables Pidgeot to Mega Evolve during battle.",
      name: {
        japanese: "ピジョットナイト",
        english: "Pidgeotite",
        chinese: "大比鸟进化石",
      },
    },
    {
      id: 763,
      type: "Hold items",
      description: "Enables Glalie to Mega Evolve during battle.",
      name: {
        japanese: "オニゴーリナイト",
        english: "Glalitite",
        chinese: "冰鬼护进化石",
      },
    },
    {
      id: 764,
      type: "Hold items",
      description: "Enables Diancie to Mega Evolve during battle.",
      name: {
        chinese: "蒂安希进化石",
        english: "Diancite",
        japanese: "ディアンシナイト",
      },
    },
    {
      id: 765,
      type: "Hold items",
      description: "Transforms Hoopa Confined to Hoopa Unbound.",
      name: {
        chinese: "惩戒之壶",
        japanese: "いましめのつぼ",
        english: "Prison Bottle",
      },
    },
    {
      id: 767,
      type: "Hold items",
      description: "Enables Camerupt to Mega Evolve during battle.",
      name: {
        english: "Cameruptite",
        japanese: "バクーダナイト",
        chinese: "喷火驼进化石",
      },
    },
    {
      id: 768,
      type: "Hold items",
      description: "Enables Lopunny to Mega Evolve during battle.",
      name: {
        chinese: "长耳兔进化石",
        japanese: "ミミロップナイト",
        english: "Lopunnite",
      },
    },
    {
      id: 769,
      type: "Hold items",
      description: "Enables Salamence to Mega Evolve during battle.",
      name: {
        english: "Salamencite",
        japanese: "ボーマンダナイト",
        chinese: "暴飞龙进化石",
      },
    },
    {
      id: 770,
      type: "Hold items",
      description: "Enables Beedrill to Mega Evolve during battle.",
      name: {
        japanese: "スピアナイト",
        english: "Beedrillite",
        chinese: "大针蜂进化石",
      },
    },

    {
      id: 807,
      type: "Hold items",
      description: "Allows the use of Breakneck Blitz, the Normal type Z-Move.",
      name: {
        english: "Normalium Z",
        japanese: "ノーマルＺ",
        chinese: "一般Ｚ",
      },
    },
    {
      id: 808,
      type: "Hold items",
      description: "Allows the use of Inferno Overdrive, the Fire type Z-Move.",
      name: {
        english: "Firium Z",
        japanese: "ホノオＺ",
        chinese: "火Ｚ",
      },
    },
    {
      id: 809,
      type: "Hold items",
      description: "Allows the use of Hydro Vortex, the Water type Z-Move.",
      name: {
        japanese: "ミズＺ",
        english: "Waterium Z",
        chinese: "水Ｚ",
      },
    },
    {
      id: 810,
      type: "Hold items",
      description:
        "Allows the use of Gigavolt Havoc, the Electric type Z-Move.",
      name: {
        chinese: "电Ｚ",
        english: "Electrium Z",
        japanese: "デンキＺ",
      },
    },
    {
      id: 811,
      type: "Hold items",
      description: "Allows the use of Bloom Doom, the Grass type Z-Move.",
      name: {
        japanese: "クサＺ",
        english: "Grassium Z",
        chinese: "草Ｚ",
      },
    },
    {
      id: 812,
      type: "Hold items",
      description: "Allows the use of Subzero Slammer, the Ice type Z-Move.",
      name: {
        japanese: "コオリＺ",
        english: "Icium Z",
        chinese: "冰Ｚ",
      },
    },
    {
      id: 813,
      type: "Hold items",
      description:
        "Allows the use of All-Out Pummeling, the Fighting type Z-Move.",
      name: {
        chinese: "格斗Ｚ",
        japanese: "カクトウＺ",
        english: "Fightinium Z",
      },
    },
    {
      id: 814,
      type: "Hold items",
      description: "Allows the use of Acid Downpour, the Poison type Z-Move.",
      name: {
        english: "Poisonium Z",
        japanese: "ドクＺ",
        chinese: "毒Ｚ",
      },
    },
    {
      id: 815,
      type: "Hold items",
      description: "Allows the use of Tectonic Rage, the Ground type Z-Move.",
      name: {
        english: "Groundium Z",
        japanese: "ジメンＺ",
        chinese: "地面Ｚ",
      },
    },
    {
      id: 816,
      type: "Hold items",
      description:
        "Allows the use of Supersonic Skystrike, the Flying type Z-Move.",
      name: {
        japanese: "ヒコウＺ",
        english: "Flyinium Z",
        chinese: "飞行Ｚ",
      },
    },
    {
      id: 817,
      type: "Hold items",
      description:
        "Allows the use of Shattered Psyche, the Psychic type Z-Move.",
      name: {
        chinese: "超能力Ｚ",
        japanese: "エスパーＺ",
        english: "Psychium Z",
      },
    },
    {
      id: 818,
      type: "Hold items",
      description: "Allows the use of Savage Spin-Out, the Bug type Z-Move.",
      name: {
        japanese: "ムシＺ",
        english: "Buginium Z",
        chinese: "虫Ｚ",
      },
    },
    {
      id: 819,
      type: "Hold items",
      description: "Allows the use of Continental Crush, the Rock type Z-Move.",
      name: {
        chinese: "岩石Ｚ",
        japanese: "イワＺ",
        english: "Rockium Z",
      },
    },
    {
      id: 820,
      type: "Hold items",
      description:
        "Allows the use of Never-Ending Nightmare, the Ghost type Z-Move.",
      name: {
        chinese: "幽灵Ｚ",
        japanese: "ゴーストＺ",
        english: "Ghostium Z",
      },
    },
    {
      id: 821,
      type: "Hold items",
      description:
        "Allows the use of Devastating Drake, the Dragon type Z-Move.",
      name: {
        english: "Dragonium Z",
        japanese: "ドラゴンＺ",
        chinese: "龙Ｚ",
      },
    },
    {
      id: 822,
      type: "Hold items",
      description:
        "Allows the use of Black Hole Eclipse, the Dark type Z-Move.",
      name: {
        chinese: "恶Ｚ",
        english: "Darkinium Z",
        japanese: "アクＺ",
      },
    },
    {
      id: 823,
      type: "Hold items",
      description: "Allows the use of Corkscrew Crash, the Steel type Z-Move.",
      name: {
        japanese: "ハガネＺ",
        english: "Steelium Z",
        chinese: "钢Ｚ",
      },
    },
    {
      id: 824,
      type: "Hold items",
      description: "Allows the use of Twinkle Tackle, the Fairy type Z-Move.",
      name: {
        chinese: "妖精Ｚ",
        english: "Fairium Z",
        japanese: "フェアリーＺ",
      },
    },
    {
      id: 825,
      type: "Hold items",
      description:
        "Allows Pikachu to upgrade Volt Tackle to a Z-Move, Catastropika.",
      name: {
        english: "Pikanium Z",
        japanese: "ピカチュウＺ",
        chinese: "皮卡丘Ｚ",
      },
    },
    {
      id: 826,
      type: "Hold items",
      description:
        "Allows Decidueye to upgrade Spirit Shackle to a Z-Move, Sinister Arrow Raid.",
      name: {
        chinese: "狙射树枭Ｚ",
        english: "Decidium Z",
        japanese: "ジュナイパーＺ",
      },
    },
    {
      id: 827,
      type: "Hold items",
      description:
        "Allows Incineroar to upgrade Darkest Lariat to a Z-Move, Malicious Moonsault.",
      name: {
        japanese: "ガオガエンＺ",
        english: "Incinium Z",
        chinese: "炽焰咆哮虎Ｚ",
      },
    },
    {
      id: 828,
      type: "Hold items",
      description:
        "Allows Primarina to upgrade Sparkling Aria to a Z-Move, Oceanic Operetta.",
      name: {
        chinese: "西狮海壬Ｚ",
        english: "Primarium Z",
        japanese: "アシレーヌＺ",
      },
    },
    {
      id: 829,
      type: "Hold items",
      description:
        "Allows the Tapus to upgrade Nature's Madness to a Z-Move, Guardian of Alola.",
      name: {
        english: "Tapunium Z",
        japanese: "カプＺ",
        chinese: "卡璞Ｚ",
      },
    },
    {
      id: 830,
      type: "Hold items",
      description:
        "Allows Marshadow to upgrade Spectral Thief to a Z-Move, Soul-Stealing 7-Star Strike.",
      name: {
        japanese: "マーシャドーＺ",
        english: "Marshadium Z",
        chinese: "玛夏多Ｚ",
      },
    },
    {
      id: 831,
      type: "Hold items",
      description:
        "Allows Alolan Raichu to upgrade Thunderbolt to a Z-Move, Stoked Sparksurfer.",
      name: {
        english: "Aloraichium Z",
        japanese: "アロライＺ",
        chinese: "阿罗雷Ｚ",
      },
    },
    {
      id: 832,
      type: "Hold items",
      description:
        "Allows Snorlax to upgrade Giga Impact to a Z-Move, Pulverizing Pancake.",
      name: {
        japanese: "カビゴンＺ",
        english: "Snorlium Z",
        chinese: "卡比兽Ｚ",
      },
    },
    {
      id: 833,
      type: "Hold items",
      description:
        "Allows Eevee to upgrade Last Resort to a Z-Move, Extreme Evoboost.",
      name: {
        english: "Eevium Z",
        japanese: "イーブイＺ",
        chinese: "伊布Ｚ",
      },
    },
    {
      id: 834,
      type: "Hold items",
      description:
        "Allows Mew to upgrade Psychic to a Z-Move, Genesis Supernova.",
      name: {
        chinese: "梦幻Ｚ",
        japanese: "ミュウＺ",
        english: "Mewnium Z",
      },
    },
    {
      id: 836,
      type: "Hold items",
      description:
        "Allows Pikachu in a cap to upgrade Thunderbolt to a Z-Move, 10,000,000 Volt Thunderbolt.",
      name: {
        japanese: "サトピカＺ",
        english: "Pikashunium Z",
        chinese: "智皮卡Ｚ",
      },
    },

    {
      id: 846,
      type: "Hold items",
      description:
        "Using it makes wild Pokémon more likely to call for help. If held by a Pokémon, it boosts Speed when intimidated. It can be used only once.",
      name: {
        japanese: "ビビリだま",
        english: "Adrenaline Orb",
        chinese: "胆怯球",
      },
    },

    {
      id: 853,
      type: "Hold items",
      description:
        "A flower nectar obtained at Ula'ula Meadow. It changes the form of certain species of Pokémon.",
      name: {
        english: "Red Nectar",
        japanese: "くれないのミツ",
        chinese: "朱紅色花蜜",
      },
    },
    {
      id: 854,
      type: "Hold items",
      description:
        "A flower nectar obtained at Melemele Meadow. It changes the form of certain species of Pokémon.",
      name: {
        chinese: "金黄色花蜜",
        japanese: "やまぶきのミツ",
        english: "Yellow Nectar",
      },
    },
    {
      id: 855,
      type: "Hold items",
      description:
        "The flower nectar obtained at the flowering shrubs on Royal Avenue. It changes the form of certain species of Pokémon.",
      name: {
        chinese: "桃粉色花蜜",
        english: "Pink Nectar",
        japanese: "うすもものミツ",
      },
    },
    {
      id: 856,
      type: "Hold items",
      description:
        "A flower nectar obtained at Poni Meadow. It changes the form of certain species of Pokémon.",
      name: {
        chinese: "兰紫色花蜜",
        japanese: "むらさきのミツ",
        english: "Purple Nectar",
      },
    },

    {
      id: 861,
      type: "Berries",
      description: "Makes a Pokémon easier to catch in Pokémon Let's Go.",
      name: "Silver Razz Berry",
    },
    {
      id: 862,
      type: "Berries",
      description: "Makes a Pokémon easier to catch in Pokémon Let's Go.",
      name: "Golden Razz Berry",
    },
    {
      id: 863,
      type: "Berries",
      description:
        "Greatly calms a Pokémon in battle, in Let's Go Pikachu/Eevee.",
      name: "Silver Nanab Berry",
    },
    {
      id: 864,
      type: "Berries",
      description:
        "Drastically calms a Pokémon in battle, in Let's Go Pikachu/Eevee.",
      name: "Golden Nanab Berry",
    },
    {
      id: 865,
      type: "Berries",
      description:
        "Greatly increases chance of getting items when a Pokémon is caught, in Pokémon Let's Go.",
      name: "Silver Pinap Berry",
    },
    {
      id: 866,
      type: "Berries",
      description:
        "Drastically increases chance of getting items when a Pokémon is caught, in Pokémon Let's Go.",
      name: "Golden Pinap Berry",
    },

    {
      id: 879,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It extends the duration of the terrain caused by the holder's move or Ability.",
      name: {
        english: "Terrain Extender",
        japanese: "グランドコート",
        chinese: "大地膜",
      },
    },
    {
      id: 880,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. These pads protect the holder from effects caused by making direct contact with the target.",
      name: {
        chinese: "部位护具",
        japanese: "ぼうごパット",
        english: "Protective Pads",
      },
    },
    {
      id: 881,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It boosts Defense on Electric Terrain. It can only be used once.",
      name: {
        chinese: "电气种子",
        japanese: "エレキシード",
        english: "Electric Seed",
      },
    },
    {
      id: 882,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It boosts Sp. Def on Psychic Terrain. It can only be used once.",
      name: {
        english: "Psychic Seed",
        japanese: "サイコシード",
        chinese: "精神种子",
      },
    },
    {
      id: 883,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It boosts Sp. Def on Misty Terrain. It can only be used once.",
      name: {
        japanese: "ミストシード",
        english: "Misty Seed",
        chinese: "薄雾种子",
      },
    },
    {
      id: 884,
      type: "Hold items",
      description:
        "An item to be held by a Pokémon. It boosts Defense on Grassy Terrain. It can only be used once.",
      name: {
        english: "Grassy Seed",
        japanese: "グラスシード",
        chinese: "青草种子",
      },
    },

    {
      id: 904,
      type: "Hold items",
      description:
        "Changes Silvally and its move Multi-Attack to Fighting type.",
      name: {
        english: "Fighting Memory",
        japanese: "ファイトメモリ",
        chinese: "战斗存储碟",
      },
    },
    {
      id: 905,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Flying type.",
      name: {
        english: "Flying Memory",
        japanese: "フライングメモリ",
        chinese: "飞翔存储碟",
      },
    },
    {
      id: 906,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Poison type.",
      name: {
        chinese: "毒存储碟",
        english: "Poison Memory",
        japanese: "ポイズンメモリ",
      },
    },
    {
      id: 907,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Ground type.",
      name: {
        chinese: "大地存储碟",
        english: "Ground Memory",
        japanese: "グラウンドメモリ",
      },
    },
    {
      id: 908,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Rock type.",
      name: {
        chinese: "岩石存储碟",
        japanese: "ロックメモリ",
        english: "Rock Memory",
      },
    },
    {
      id: 909,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Bug type.",
      name: {
        chinese: "虫子存储碟",
        english: "Bug Memory",
        japanese: "バグメモリ",
      },
    },
    {
      id: 910,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Ghost type.",
      name: {
        japanese: "ゴーストメモリ",
        english: "Ghost Memory",
        chinese: "幽灵存储碟",
      },
    },
    {
      id: 911,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Steel type.",
      name: {
        japanese: "スチールメモリ",
        english: "Steel Memory",
        chinese: "钢铁存储碟",
      },
    },
    {
      id: 912,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Fire type.",
      name: {
        japanese: "ファイヤーメモリ",
        english: "Fire Memory",
        chinese: "火焰存储碟",
      },
    },
    {
      id: 913,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Water type.",
      name: {
        japanese: "ウオーターメモリ",
        english: "Water Memory",
        chinese: "清水存储碟",
      },
    },
    {
      id: 914,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Grass type.",
      name: {
        english: "Grass Memory",
        japanese: "グラスメモリ",
        chinese: "青草存储碟",
      },
    },
    {
      id: 915,
      type: "Hold items",
      description:
        "Changes Silvally and its move Multi-Attack to Electric type.",
      name: {
        chinese: "电子存储碟",
        english: "Electric Memory",
        japanese: "エレクトロメモリ",
      },
    },
    {
      id: 916,
      type: "Hold items",
      description:
        "Changes Silvally and its move Multi-Attack to Psychic type.",
      name: {
        english: "Psychic Memory",
        japanese: "サイキックメモリ",
        chinese: "精神存储碟",
      },
    },
    {
      id: 917,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Ice type.",
      name: {
        chinese: "冰雪存储碟",
        japanese: "アイスメモリ",
        english: "Ice Memory",
      },
    },
    {
      id: 918,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Dragon type.",
      name: {
        chinese: "龙存储碟",
        english: "Dragon Memory",
        japanese: "ドラゴンメモリ",
      },
    },
    {
      id: 919,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Dark type.",
      name: {
        english: "Dark Memory",
        japanese: "ダークメモリ",
        chinese: "黑暗存储碟",
      },
    },
    {
      id: 920,
      type: "Hold items",
      description: "Changes Silvally and its move Multi-Attack to Fairy type.",
      name: {
        chinese: "妖精存储碟",
        japanese: "フェアリーメモリ",
        english: "Fairy Memory",
      },
    },
    {
      id: 927,
      type: "Hold items",
      description:
        "Allows Solgaleo to upgrade Sunsteel Strike to a Z-Move, Searing Sunraze Smash.",
      name: {
        chinese: "索尔迦雷欧Ｚ",
        japanese: "ソルガレオＺ",
        english: "Solganium Z",
      },
    },
    {
      id: 928,
      type: "Hold items",
      description:
        "Allows Lunala to upgrade Moongeist Beam to a Z-Move, Menacing Moonraze Maelstrom.",
      name: {
        english: "Lunalium Z",
        japanese: "ルナアーラＺ",
        chinese: "露奈雅拉Ｚ",
      },
    },
    {
      id: 929,
      type: "Hold items",
      description:
        "Allows Ultra Necrozma to upgrade Photon Geyser to a Z-Move, Light That Burns the Sky.",
      name: {
        chinese: "究极奈克洛Ｚ",
        japanese: "ウルトラネクロＺ",
        english: "Ultranecrozium Z",
      },
    },
    {
      id: 930,
      type: "Hold items",
      description:
        "Allows Mimikyu to upgrade Play Rough to a Z-Move, Let's Snuggle Forever.",
      name: {
        chinese: "谜拟ＱＺ",
        english: "Mimikium Z",
        japanese: "ミミッキュＺ",
      },
    },
    {
      id: 931,
      type: "Hold items",
      description:
        "Allows Lycanroc to upgrade Stone Edge to a Z-Move, Splintered Stormshards.",
      name: {
        chinese: "鬃岩狼人Ｚ",
        japanese: "ルガルガンＺ",
        english: "Lycanium Z",
      },
    },
    {
      id: 932,
      type: "Hold items",
      description:
        "Allows Kommo-o to upgrade Clanging Scales to a Z-Move, Clangorous Soulblaze.",
      name: {
        english: "Kommonium Z",
        japanese: "ジャラランガＺ",
        chinese: "杖尾鳞甲龙Ｚ",
      },
    },

    {
      id: 1118,
      type: "Hold items",
      description: "Raises Sp. Atk when a sound-based move is used.",
      name: {
        japanese: "のどスプレー",
        english: "Throat Spray",
        chinese: "喉咙喷雾",
      },
    },
    {
      id: 1119,
      type: "Hold items",
      description: "The Pokémon switches out if its stats are lowered.",
      name: {
        japanese: "イジェクトパック",
        english: "Eject Pack",
        chinese: "弹出包",
      },
    },
    {
      id: 1120,
      type: "Hold items",
      description: "Protects the holder from traps set on the battlefield.",
      name: {
        japanese: "ヘビーデューティーブーツ",
        english: "Heavy-Duty Boots",
        chinese: "重型靴子",
      },
    },
    {
      id: 1121,
      type: "Hold items",
      description: "Raises Speed sharply if its attack misses.",
      name: {
        japanese: "失態ポリシー",
        english: "Blunder Policy",
        chinese: "错误政策",
      },
    },
    {
      id: 1122,
      type: "Hold items",
      description: "Lowers the Pokémon's speed during Trick Room.",
      name: {
        japanese: "ルームサービス",
        english: "Room Service",
        chinese: "客房服务",
      },
    },
    {
      id: 1123,
      type: "Hold items",
      description:
        "This sturdy umbrella protects the holder from the effects of weather.",
      name: {
        japanese: "ユーティリティ傘",
        english: "Utility Umbrella",
        chinese: "实用伞",
      },
    },
    {
      id: 1124,
      type: "Hold items",
      description:
        "This hooded cloak conceals the holder, tricking the eyes of its enemies and protecting it from the additional effects of moves.",
      name: {
        japanese: "おんみつマント",
        english: "Covert Cloak",
        chinese: "-",
      },
    },
    {
      id: 1125,
      type: "Hold items",
      description:
        "This loaded dice always rolls a good number, and holding one can ensure that the holder's multistrike moves hit more times.",
      name: {
        japanese: "いかさまダイス",
        english: "Loaded Dice",
        chinese: "-",
      },
    },
    {
      id: 1125,
      type: "Hold items",
      description:
        "This carved wooden mask is adorned with crystals and allows Ogerpon to wield the Water type during battle.",
      name: {
        japanese: "いどのめん",
        english: "Wellspring Mask",
        chinese: "-",
      },
    },
    {
      id: 1126,
      type: "Hold items",
      description:
        "The energy that fills this capsule boosts the strength of the Pokémon.",
      name: {
        japanese: "ブーストエナジー",
        english: "Booster Energy",
        chinese: "-",
      },
    },
    {
      id: 1127,
      type: "Hold items",
      description:
        "This herb will allow the holder to mirror an opponent's stat increases to boost its own stats—but only once.",
      name: {
        japanese: "ブーストエナジー",
        english: "Mirror Herb",
        chinese: "-",
      },
    },
    {
      id: 1128,
      type: "Hold items",
      description:
        "This protective glove boosts the power of the holder's punching moves and prevents direct contact with targets.",
      name: {
        japanese: "パンチグローブ",
        english: "Punching Glove",
        chinese: "-",
      },
    },
    {
      id: 1129,
      type: "Hold items",
      description:
        "This clear, sparkling amulet protects the holder from having its stats lowered by moves used against it or by other Pokémon's Abilities.",
      name: {
        japanese: "クリアチャーム",
        english: "Clear Amulet",
        chinese: "-",
      },
    },
  ],
};
