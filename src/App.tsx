import { useEffect, useMemo, useState } from "react";
import { DropDown } from "./components/DropDown";
import { getCards, getRarities, getSets, setInformatonI } from "./APIUtility";
import "./App.css";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

function App() {
  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const pokemon_card_image_path =
    "https://assets1.ignimgs.com/2019/01/30/6-pikarom-d-1548807073825.png";

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
  const [card, Set_Card] = useState<unknown>();

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

  const [card_rarities, Set_card_rarities] = useState<String[]>([
    "rare",
    "uncommon",
    "common",
  ]);

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
    API_Promise: Promise<String[]>,
    setState: React.Dispatch<React.SetStateAction<String[]>>
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
      </div>

      <div className="my-12 w-1/3 space-y-4 items-center">

        <img
          src={pokemon_card_image_path}
          alt="Pikachu and Zekrom GX Rainbow SR Pokemon Card"
          className="object-scale-down w-7/12 block mx-auto"
        ></img>
 
        <div className="justify-center text-center">
          <button
            onClick={() => getCards("Rare Holo EX", "g1")}
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
        <img src= {current_set.images.logo} alt = "logo" className = "object-scale-down w-2/3 block mx-auto"></img>
      </div>
    </div>
  );
}

export default App;
