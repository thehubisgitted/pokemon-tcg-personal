import { useState } from "react";
import { DropDown } from "./DropDown";
import "./App.css";

function App() {
  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const pokemon_card_image_path =
    "https://assets1.ignimgs.com/2019/01/30/6-pikarom-d-1548807073825.png";

  return (
    <div className="flex flex-row space-x-40 font-sans items-start ">
      <div className="p-4 space-y-8 content-center items-center">
        <img
          src={logo_image_path}
          alt="logo"
          className="transform -scale-x-100 object-scale-down h-40 w-40"
        />
        <h1 className="text-center text-2xl font-extrabold"> Pokemon Pulls</h1>
      </div>

      <div>
        <DropDown />
        <h2 className="text-center"> SET NAME</h2>
        <img
          src={pokemon_card_image_path}
          alt="Pikachu and Zekrom GX Rainbow SR Pokemon Card"
          className="object-scale-down h-80 relative"
        ></img>
      </div>

      <div>
        KILLER STATS!
      </div>
    </div>
  );
}

export default App;
