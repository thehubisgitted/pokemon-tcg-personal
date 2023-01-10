import { useEffect, useMemo, useState } from "react";
import { DropDown } from "./components/DropDown";
import {
  CardInfoI,
  getCardsbySetID,
  getRarities,
  getSets,
  setInformatonI,
} from "./APIUtility";
import "./App.css";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Rarity } from "pokemon-tcg-sdk-typescript/dist/sdk";

function App() {
  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const pikachu_zekrom_card_image_path =
    "https://assets1.ignimgs.com/2019/01/30/6-pikarom-d-1548807073825.png";

  const placeholder_card:CardInfoI = {
    id: "swsh4-25",
    name: "Charizard",
    evolvesFrom: "Charmeleon",
    number: "25",
    artist: "Ryuta Fuse",
    rarity: "Rare",
    flavorText:
      "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    nationalPokedexNumbers: [6],
    images: {
      small: "https://images.pokemontcg.io/swsh4/25.png",
      large: "https://images.pokemontcg.io/swsh4/25_hires.png",
    },
    tcgplayer: {
      url: "https://prices.pokemontcg.io/tcgplayer/swsh4-25",
      updatedAt: "2021/08/04",
      prices: {
        normal: {
          low: 1.73,
          mid: 3.54,
          high: 12.99,
          market: 2.82,
          directLow: 3.93,
        },
        reverseHolofoil: {
          low: 3,
          mid: 8.99,
          high: 100,
          market: 3.89,
          directLow: 4.46,
        },
      },
    },
  }

  const [current_set, Set_current_set] = useState<setInformatonI>({
    id: "base1",
    name: "Base",
    series: "Base",
    releaseDate: "1999/01/09",
    printedTotal: 102,
    images: {
      symbol: "https://images.pokemontcg.io/base1/symbol.png",
      logo: "https://images.pokemontcg.io/base1/logo.png",
    },
  });

  const [current_card, Set_current_card] = useState<CardInfoI>({
    id: "swsh4-25",
    name: "Charizard",
    evolvesFrom: "Charmeleon",
    number: "25",
    artist: "Ryuta Fuse",
    rarity: "Rare",
    flavorText:
      "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    nationalPokedexNumbers: [6],
    images: {
      small: "https://images.pokemontcg.io/swsh4/25.png",
      large: "https://images.pokemontcg.io/swsh4/25_hires.png",
    },
    tcgplayer: {
      url: "https://prices.pokemontcg.io/tcgplayer/swsh4-25",
      updatedAt: "2021/08/04",
      prices: {
        normal: {
          low: 1.73,
          mid: 3.54,
          high: 12.99,
          market: 2.82,
          directLow: 3.93,
        },
        reverseHolofoil: {
          low: 3,
          mid: 8.99,
          high: 100,
          market: 3.89,
          directLow: 4.46,
        },
      },
    },
  });

  const [tcg_sets, Set_tcg_sets] = useState<setInformatonI[]>([
    {
      id: "base1",
      name: "Base",
      series: "Base",
      releaseDate: "1999/01/09",
      printedTotal: 102,
      images: {
        symbol: "https://images.pokemontcg.io/base1/symbol.png",
        logo: "https://images.pokemontcg.io/base1/logo.png",
      },
    },
  ]);

  const [card_rarities, Set_card_rarities] = useState<PokemonTCG.Rarity[]>([
    Rarity.Common,
    Rarity.Uncommon,
    Rarity.Rare,
    Rarity.Promo,
  ]);

  

  const rarity_to_card_dictionary = useState<Map<PokemonTCG.Rarity,CardInfoI>>();

  const fetchSetInformationAndSetState = async (
    API_Promise: Promise<setInformatonI[]>,
    setState: React.Dispatch<React.SetStateAction<setInformatonI[]>>
  ) => {
    try {
      const sets_info = await API_Promise;
      Set_tcg_sets(sets_info);
    } catch (e) {
      console.error(`Failed to set Set Information, ${e}`);
    }
  };

  const fetchRaritiesAndSetState = async (
    API_Promise: Promise<Rarity[]>,
    setState: React.Dispatch<React.SetStateAction<Rarity[]>>
  ) => {
    try {
      const data = await API_Promise;
      setState(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRaritiesAndSetState(getRarities(), Set_card_rarities);
    fetchSetInformationAndSetState(getSets(), Set_tcg_sets);
  }, []);

  return (
    <div className="flex w-full flex-row font-sans items-start">
      <div className="p-4 w-1/3 content-center items-center">
        <img
          src={logo_image_path}
          alt="logo"
          className="transform -scale-x-100 object-scale-down h-40 w-40 my-2"
        />
        <h1 className=" text-2xl font-extrabold "> Pokemon Pulls</h1>
        <div className="mt-20 text-center">
          <h2> Card Information </h2>
          <h3>{current_card.name} Num. {current_card.number}{" "}</h3>
          {current_card.flavorText? <h3>{current_card.flavorText}</h3> :""}
          <div className="flex-row px-4">
            {current_card.evolvesFrom? <h3>Evolves From {current_card.evolvesFrom}</h3>:""}
            {current_card.evolvesTo? <h3>Evolves To {current_card.evolvesTo}</h3>:""}
          </div>
            
        </div>
      </div>

      <div className="my-12 w-1/3 space-y-4 items-center">
        <img
          src={current_card.images.large}
          alt="Current Pokemon Card"
          className="object-scale-down w-7/12 block mx-auto"
        ></img>

        <div className="justify-center text-center">
          <button
            onClick={() => getCardsbySetID("g1")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-4 rounded"
          >
            {" "}
            Button 1{" "}
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-4 rounded">
            {" "}
            Button 2{" "}
          </button>
        </div>
        <DropDown
          current_set={current_set}
          Set_current_set={Set_current_set}
          menu_items={tcg_sets}
        />
      </div>

      <div className="w-1/3 py-10 justify-center">
        <img
          src={current_set.images.logo}
          alt="logo"
          className="object-scale-down w-2/3 block mx-auto"
        ></img>

        <div className="mt-10 text-center">
          <h2>Series: {current_set.series}</h2>
          <h2>Release Date: {current_set.releaseDate}</h2>
          <h2>Total Sets Printed: {current_set.printedTotal}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
