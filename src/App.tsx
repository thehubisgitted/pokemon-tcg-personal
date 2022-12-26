import { useState } from "react";
import { DropDown } from "./components/DropDown";
import "./App.css";

function App() {
  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const pokemon_card_image_path =
    "https://assets1.ignimgs.com/2019/01/30/6-pikarom-d-1548807073825.png";

  const [current_set, Set_current_set] = useState("Base Set");

  const tcg_set_options: Array<String> = ["Base", "Jungle", "Fossil", "Base Set 2", "Team Rocket"]

  
  return (
    <div className="flex flex-row space-x-40 font-sans items-start ">
      <div className="p-4 space-y-8 my-0 content-center items-center ">
        <img
          src={logo_image_path}
          alt="logo"
          className="transform -scale-x-100 object-scale-down h-40 w-40"
        />
        <h1 className="text-center text-2xl font-extrabold"> Pokemon Pulls</h1>
      </div>

      <div className="my-12 space-y-4">
        <h2 className="text-center"> {current_set}</h2>
        <img
          src={pokemon_card_image_path}
          alt="Pikachu and Zekrom GX Rainbow SR Pokemon Card"
          className="object-scale-down h-80 "
        ></img>
        <DropDown current_set={current_set} Set_current_set = {Set_current_set} menu_items = {tcg_set_options} />
      </div>

      <div>
        KILLER STATS!
      </div>
    </div>
  );
}

export default App;
