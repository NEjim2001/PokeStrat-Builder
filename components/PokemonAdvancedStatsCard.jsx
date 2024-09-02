import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { pokemonNatures } from "@constants/items";
import { useDispatch, useSelector } from "react-redux";
import {
  setEVList,
  setEVSpread,
  setIVSpread,
} from "@app/store/pokemon/pokemonTeamSlice";
import { getColorForPercentage } from "@constants/utlis";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const PokemonAdvancedStatsCard = ({ index }) => {
  const pokemon = useSelector((state) => state.pokemonTeam[index]);
  const pokemonIVStats = pokemon?.ivSpread || [];
  const pokemonEVStats = pokemon?.evSpread || [];
  const dispatch = useDispatch();

  const [localEVStats, setLocalEVStats] = useState(pokemonEVStats);
  const [localIVStats, setLocalIVStats] = useState(pokemonIVStats);

  const level = useSelector((state) => state.pokemonTeam[index]?.level);
  const nature = useSelector((state) => state.pokemonTeam[index]?.nature);
  const pokemonBaseStats =
    pokemon?.pokemon?.data?.basicData?.stats?.map((x) => x.base_stat) || [];

  const [pokemonTotalStats, setPokemonTotalStats] = useState(
    calculateTotalStatsWithNature(
      pokemonBaseStats,
      pokemonEVStats,
      pokemonIVStats,
      nature
    )
  );

  const handleSliderChange = (spreadIndex) => (value) => {
    setLocalEVStats((prevEVStats) => {
      const newEVStats = [...prevEVStats];
      const currentTotalEVs =
        newEVStats.reduce((a, b) => a + b, 0) - newEVStats[spreadIndex];
      const newTotalEVs = currentTotalEVs + value;

      if (newTotalEVs <= 508) {
        newEVStats[spreadIndex] = value;
        return newEVStats;
      }
      return prevEVStats;
    });
  };

  const handleSliderComplete = () => {
    setLocalEVStats((updatedEVStats) => {
      dispatch(setEVList({ index, data: updatedEVStats }));
      return updatedEVStats;
    });
  };

  const handleTextChange = (spreadIndex, type) => (event) => {
    let value = parseInt(event.target.value, 10) || 0;
    if (type === "ev") {
      if (value > 252) value = 252;
      setLocalEVStats((prevEVStats) => {
        const newEVStats = [...prevEVStats];
        const currentTotalEVs =
          newEVStats.reduce((a, b) => a + b, 0) - newEVStats[spreadIndex];
        const newTotalEVs = currentTotalEVs + value;

        if (newTotalEVs <= 508) {
          newEVStats[spreadIndex] = value;
          dispatch(setEVSpread({ index, spreadIndex, data: value }));
          return newEVStats;
        }
        return prevEVStats;
      });
    } else if (type === "iv") {
      if (value > 31) value = 31;
      setLocalIVStats((prevIVStats) => {
        const newIVStats = [...prevIVStats];
        newIVStats[spreadIndex] = value;
        dispatch(setIVSpread({ index, spreadIndex, data: newIVStats }));
        return newIVStats;
      });
    }
  };

  useEffect(() => {
    setPokemonTotalStats(
      calculateTotalStatsWithNature(
        pokemonBaseStats,
        pokemonEVStats,
        pokemonIVStats,
        nature,
        level
      )
    );
    setLocalEVStats(pokemonEVStats);
    setLocalIVStats(pokemonIVStats);
  }, [index, pokemonEVStats, pokemonIVStats, nature, level]);

  return (
    <div className="p-3 flex-row flex justify-between   w-full items-center ">
      <div className="  rounded-2xl bg-primary  sm:block hidden  ">
        <SpiderChartComponent
          pokemonBaseStats={pokemonBaseStats}
          pokemonTotalStats={pokemonTotalStats}
        />
      </div>

      <div className="flex  w-full h-full  ">
        <div className=" justify-between flex flex-col h-full w-full ml-2 ">
          {/* Slider Row */}
          {["HP", "ATK", "DEF", "SP.ATK", "Sp.DEF", "Speed"].map(
            (stat, index) => (
              <div key={index} className="flex items-center gap-2 ">
                {/* Bar Graph with value */}
                <div className="flex text-white justify-between  text-xs gap-1">
                  <span className="  ">{stat}</span>
                  <span>{pokemonBaseStats[index]}</span>
                </div>
                <div className="flex-grow h-4 w-1/4    bg-gray-500 rounded-md relative">
                  <div
                    className="absolute top-0 left-0 h-4 rounded-md w-full"
                    style={{
                      backgroundColor: getColorForPercentage(
                        pokemonTotalStats[index] / 2
                      ),
                      width: `${(pokemonTotalStats[index] / 500) * 100}%`,
                    }}
                  ></div>
                </div>
                <input
                  className="text-black w-7 h-5 text-center"
                  type="text"
                  name={`ev-${index}`}
                  placeholder={pokemonEVStats[index]}
                  value={localEVStats[index]}
                  onChange={handleTextChange(index, "ev")}
                />
                <div className="w-1/2  sm:hidden md:block z-0  xl:block">
                  <Slider
                    max={252}
                    min={0}
                    pushable={false}
                    value={localEVStats[index]}
                    onChange={handleSliderChange(index)}
                    onChangeComplete={handleSliderComplete}
                    trackStyle={{ backgroundColor: "gold", height: 10 }}
                    handleStyle={{
                      height: 18,
                      width: 18,
                      backgroundColor: "gray",
                    }}
                    railStyle={{ backgroundColor: "white", height: 10 }}
                  />
                </div>
                <input
                  className="text-black w-5 h-5 text-center"
                  type="text"
                  name={`iv-${index}`}
                  placeholder={pokemonIVStats[index]}
                  value={localIVStats[index]}
                  onChange={handleTextChange(index, "iv")}
                />

                <p className="text-sm text-white font-semibold">
                  {pokemonTotalStats[index]}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const SpiderChartComponent = ({ pokemonBaseStats, pokemonTotalStats }) => {
  const data = {
    labels: ["HP", "ATK", "DEF", "SP.ATK", "Sp.DEF", "Speed"],
    datasets: [
      {
        label: "Base Stats",
        data: pokemonBaseStats,
        fill: true,
        backgroundColor: "rgba(255, 165, 0, 0.8)",
        borderColor: "rgb(255, 165, 0)",
        pointBackgroundColor: "rgb(255, 165, 0)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 165, 0)",
      },
      {
        label: "Total Stats",
        data: pokemonTotalStats,
        fill: true,
        backgroundColor: "rgba(30, 144, 255, 0.8)",
        borderColor: "rgb(30, 144, 255)",
        pointBackgroundColor: "rgb(30, 144, 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(30, 144, 255)",
      },
    ],
  };

  return (
    <div className="w-80 h-full m-1">
      <Radar
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              angleLines: {
                color: "lightgray",
              },
              grid: {
                color: "lightgray",
              },
              pointLabels: {
                color: "white",
              },
              ticks: {
                color: "white",
                font: {
                  weight: "normal",
                  family: "Roboto",
                },
                display: false,
                beginAtZero: true,
                max: 1000,
                min: 0,
                stepSize: 400,
              },
            },
          },
        }}
      />
    </div>
  );
};

const calculateTotalStatsWithNature = (
  baseStats,
  evStats,
  ivStats,
  nature,
  level
) => {
  const statIndexes = [
    "HP",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
  ];
  const totalStats = baseStats.map((baseStat, index) => {
    if (statIndexes[index] === "HP") {
      return Math.floor(
        (2 * baseStat + ivStats[index] + Math.floor(evStats[index] / 4)) *
          (level / 100) +
          level +
          10
      );
    } else {
      const increasedStatIndex = statIndexes.indexOf(
        pokemonNatures[nature]?.IncreasedStat
      );
      const decreasedStatIndex = statIndexes.indexOf(
        pokemonNatures[nature]?.DecreasedStat
      );

      const natureModifier =
        increasedStatIndex === index
          ? 1.1
          : decreasedStatIndex === index
          ? 0.9
          : 1;

      return Math.floor(
        (0.01 *
          (2 * baseStat + ivStats[index] + Math.floor(evStats[index] / 4)) *
          level +
          5) *
          natureModifier
      );
    }
  });

  return totalStats;
};
