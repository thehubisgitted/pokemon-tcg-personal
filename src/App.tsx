import { useEffect, useMemo, useState } from "react";
import { DropDown } from "./components/DropDown";
import { getRarities } from "./API";
import "./App.css";

function App() {

  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const pokemon_card_image_path =
    "https://assets1.ignimgs.com/2019/01/30/6-pikarom-d-1548807073825.png";

  const [current_set, Set_current_set] = useState<String>("Base Set");
  const [card, Set_Card] = useState<unknown>();

  const [tcg_sets, Set_tcg_sets] = useState<String[]>();
  const [card_rarities, Set_card_rarities] = useState<String[]>(["rare", "uncommon", "common"]);
  const tcg_set_options: Array<String> = [
    "Base",
    "Jungle",
    "Fossil",
    "Base Set 2",
    "Team Rocket",
  ];

  
  const fetchDataAndSetState = async (API_Promise:Promise<unknown>,  setState:React.Dispatch<React.SetStateAction<any>>) =>{
    try{
      const data = await API_Promise;
      setState(data);
    }
    catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{
    fetchDataAndSetState(getRarities(), Set_card_rarities);
  }, [])

  return (
    <div className="flex w-full flex-row font-sans items-start ">
      <div className="p-4 w-1/3 content-center items-center">
        <img
          src={logo_image_path}
          alt="logo"
          className="transform -scale-x-100 object-scale-down h-40 w-40 my-2"
        />
        <h1 className=" text-2xl font-extrabold "> Pokemon Pulls</h1>
      </div>

      <div className="my-12 w-1/3 space-y-4 items-center">
    
          <h2 className="text-center"> {current_set}</h2>
          <img
            src={pokemon_card_image_path}
            alt="Pikachu and Zekrom GX Rainbow SR Pokemon Card"
            className="object-scale-down h-80 block mx-auto"
          ></img>
        
        <div className="justify-center text-center">
          <button onClick = {()=> alert(card_rarities)}className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-4 rounded"> Button 1 </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-4 rounded"> Button 2 </button>
        </div>
        <DropDown
            current_set={current_set}
            Set_current_set={Set_current_set}
            menu_items={card_rarities as String[]}
          />

      </div>

      <div className="w-1/3 py-10 justify-center">
        <h2 className="text-center">Statistics </h2>
      </div>
      
    </div>
  );
}

export default App;
