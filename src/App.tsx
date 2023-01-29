import { useEffect, useMemo, useState } from "react";
import { DropDown } from "./components/DropDown";
import {
  CardInfoI,
  getCardsbySetID,
  getSetRarities,
  getSets as getAllSets,
  setInformationI,
  TEMPORARY_getSetRarities,
} from "./APIUtility";
import "./App.css";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Card, Rarity } from "pokemon-tcg-sdk-typescript/dist/sdk";
import sortCardsByRarity from "./pullrates";

function App() {
  //CONSTANT VARIABLES
  const logo_image_path =
    "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";
  const tcgplayer_logo_image_path =
    "https://app.tcgplayer.com/_nuxt/img/TCG-Logo-Main.a3b08eb.png";

  const placeholder_set: setInformationI = {
    id: "base1",
    name: "Base",
    series: "Base",
    releaseDate: "1999/01/09",
    printedTotal: 102,
    images: {
      symbol: "https://images.pokemontcg.io/base1/symbol.png",
      logo: "https://images.pokemontcg.io/base1/logo.png",
    },
  };

  const placeholder_card: CardInfoI = {
    id: "swsh4-25",
    name: "Charizard",
    evolvesFrom: "Charmeleon",
    number: "25",
    artist: "Ryuta Fuse",
    rarity: PokemonTCG.Rarity.Rare,
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
  };
  // STATES
  const [all_sets, Set_all_sets] = useState<setInformationI[]>([
    placeholder_set,
  ]);

  const [current_set, Set_current_set] =
    useState<setInformationI>(placeholder_set);
  const [current_card, Set_current_card] =
    useState<CardInfoI>(placeholder_card);
  const [current_pack, Set_current_pack] = useState<CardInfoI[]>([
    placeholder_card,
  ]);

  const [current_rarity_dictionary, Set_current_rarity_dictionary] = useState<
    Map<PokemonTCG.Rarity, CardInfoI[]>
  >(new Map().set(PokemonTCG.Rarity.Rare, []));
  const [current_rarities, Set_current_rarities] = useState<
    PokemonTCG.Rarity[]
  >([Rarity.Common]);

  const [card_index, Set_card_index] = useState<number>(0);
  const [money_earned, Set_money_earned] = useState<number>(0);
  const [money_lost, Set_money_lost] = useState<number>(0);

  //async functions
  const fetchRarityDictionaryAndSetState = async (
    API_Promise: Promise<CardInfoI[]>,
    setState: React.Dispatch<
      React.SetStateAction<Map<PokemonTCG.Rarity, CardInfoI[]>>
    >
  ) => {
    try {
      const card_list = await API_Promise;
      const dictionary = sortCardsByRarity(card_list);
      setState(dictionary);
      //appending this section until rarity can be queried per set from the APi
      //will use dictionary to populate rarities instead
      // const set_rarities = getRaritiesFromMap(dictionary);
      // Set_current_rarities(set_rarities);
    } catch (e) {
      console.error(`Failed to set Rarity Dictionary: ${e}`);
    }
  };

  const fetchSetInformationAndSetState = async (
    API_Promise: Promise<setInformationI[]>,
    setState: React.Dispatch<React.SetStateAction<setInformationI[]>>
  ) => {
    try {
      const sets_info = await API_Promise;
      Set_all_sets(sets_info);
    } catch (e) {
      console.error(`Failed to set Set Information, ${e}`);
    }
  };

  const TEMP_fetchRaritiesAndSetState = async (
    API_Promise: Promise<Rarity[]>
  ) => {
    try {
      const rarities = await API_Promise;
      const rarity_order = Object.values(PokemonTCG.Rarity);
      const sorted_rarities = rarities.sort(
        (a, b) => rarity_order.indexOf(a) - rarity_order.indexOf(b)
      );
      sorted_rarities.pop();
      Set_current_rarities(sorted_rarities);
      console.log("unsorted rarities:" + rarities);
      console.log("sorted rarities: " + sorted_rarities);
    } catch (e) {
      console.error(`Failed to set the rarities (TEMPORARY METHOD) ${e}`);
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

  //utility functions
  const getRaritiesFromMap = (
    Map: Map<PokemonTCG.Rarity, CardInfoI[]>
  ): PokemonTCG.Rarity[] => {
    let rarity_array = [];
    for (const key of Map.keys()) {
      rarity_array.push(key);
    }
    return rarity_array;
  };
  /**
   * Creates a 'pack' of 10 card objects and sets them to state 'current_pack'
   * Uses putCardsIntoPackByRarity() to push certain cards into a pack
   */
  const createAPack = () => {
    let pack: CardInfoI[] = [];

    console.log("---CREATE A PACK START ---");
    console.log(`rarities: ${current_rarities}`);
    console.log("----DICTIONARY AT START OF CREATE A PACK() CALL");
    for (const [key, value] of current_rarity_dictionary) {
      console.log(`key is ${key} and list is..`);
      for (const card of value) {
        console.log(`c_NAME: ${card.name} and c_Rarity: ${card.rarity}`);
      }
    }
    const common_slot = PokemonTCG.Rarity.Common;
    const uncommon_slot = PokemonTCG.Rarity.Uncommon;
    putCardsIntoPackByRarity(pack, common_slot, 6);
    putCardsIntoPackByRarity(pack, uncommon_slot, 3);

    const rarities_left = current_rarities.length - 2;
    let i = 1;
    for (i; i < rarities_left; i++) {
      const result = Math.random();

      if (i === 2) {
        if (result < 0.4) {
          break;
        }
      }

      if (i === 3 || i < 5) {
        if (result < 0.5) {
          break;
        }
      }
      if (i >= 5) {
        if (result < 0.2) {
          break;
        }
      }
      i++;
    }
    console.log("index is " + i);
    const rare_slot = current_rarities[i];
    console.log(
      `Common is ${common_slot}, Uncommon is ${uncommon_slot}, and Rare is ${rare_slot}`
    );
    putCardsIntoPackByRarity(pack, rare_slot, 1);
    if (current_set.series === "Base") {
      pack.pop();
      const rarity = Math.random();
      if (rarity > 0.1) {
        putCardsIntoPackByRarity(pack, PokemonTCG.Rarity.Rare, 1);
      } else {
        putCardsIntoPackByRarity(pack, PokemonTCG.Rarity.RareHolo, 1);
      }
    }
    Set_current_pack(() => {
      Set_card_index(0);
      Set_current_card(pack[0]);
      return pack;
    });
  };
  /**
   *
   * @param pack CardInfoI array that is to be the current pack
   * @param rarity the rarity for the types of cards you wanna pack
   * @param amount the amount of cards to pack inclusive ie. 3 adds 3 packs
   */
  const putCardsIntoPackByRarity = (
    pack: CardInfoI[],
    rarity: PokemonTCG.Rarity,
    amount: number
  ) => {
    for (let i = 0; i < amount; i++) {
      const card_list = current_rarity_dictionary.get(rarity);
      const list_size = card_list?.length;

      if (list_size !== undefined && card_list !== undefined) {
        const index = Math.floor(Math.random() * list_size);
        console.log(`card being pushed: ${card_list[index].name}`);
        pack.push(card_list[index]);
      }
    }
  };
  /**
   * Method that takes care of everything that involves 'pulling a pack'
   * First calls createAPack() to create and set a new pack
   * changes the index of the current_card to start (0)
   * sets the current card thats displayed to current_pack[0]
   */
  const PullAPack = () => {
    console.log("AT START OF PULLAPACK");
    console.log(`rarities: ${current_rarities} and current_pack is...`);
    for (const card of current_pack) {
      console.log(`b_name: ${card.name} and b_rarity: ${card.rarity}`);
    }
    createAPack();
    console.log(`------> AFTER CREATEAPACK() IS CALLED, current_pack is ...`);
    for (const card of current_pack) {
      console.log(`a_name: ${card.name} and a_rarity: ${card.rarity}`);
    }

    //debug
    for (const card of current_pack) {
      console.log(`Name: ${card.name} Rarity: ${card.rarity}`);
    }
    console.log(`NUMBER OF CARDS IN PACK: ${current_pack.length}`);
  };

  const nextCardOnClick = () => {
    const new_index = card_index + 1;
    if (new_index < current_pack.length) {
      Set_card_index(new_index);
    }
    Set_current_card(current_pack[card_index]);
  };

  const prevCardOnClick = () => {
    const new_index = card_index - 1;
    if (new_index > 0) {
      Set_card_index(new_index);
    }
    Set_current_card(current_pack[card_index]);
  };

  //initialization effects
  useEffect(() => {
    //fetchRaritiesAndSetState(getSetRarities(), Set_current_rarities);
    fetchSetInformationAndSetState(getAllSets(), Set_all_sets);
    TEMP_fetchRaritiesAndSetState(TEMPORARY_getSetRarities(current_set.id));
    fetchRarityDictionaryAndSetState(
      getCardsbySetID(current_set.id),
      Set_current_rarity_dictionary
    );
  }, []);

  //on Set change effects
  useEffect(() => {
    //fetchRaritiesAndSetState(getSetRarities(), Set_current_rarities);
    TEMP_fetchRaritiesAndSetState(TEMPORARY_getSetRarities(current_set.id));
    fetchRarityDictionaryAndSetState(
      getCardsbySetID(current_set.id),
      Set_current_rarity_dictionary
    );
  }, [current_set]);

  return (
    <div className="grid w-screen h-screen grid-cols-1 font-sans-roboto items-start bg-retro-light-blue text-pokemon-black md:grid-cols-3">
      {/* first section */}
      <div className="flex flex-col content-center p-4 order-2 md:order-1 bg-inherit">
        {/* logo and title div */}
        <div className="mb-4 order-1 hidden md:grid">
        <img
          src={logo_image_path}
          alt="logo"
          className="transform -scale-x-100 object-scale-down h-32 w-32 my-2"
        />
        <h1 className="text-center text-3xl font-extrabold mb-4 md:text-left"> Pokemon Pulls</h1>
        </div>
        {/* card info div */}
        <div className="grid grid-flow-row text-center order-3">
          <h2 className="font-black text-xl">
            {current_card.name} Num. {current_card.number}{" "}
          </h2>
          {current_card.flavorText ? (
            <div className="border-retro-orange-tan border-solid border-8 bg-retro-tan rounded-md m-2 p-4">
              <p className="font-medium text-retro-dark-blue text-lg">
                {current_card.flavorText}
              </p>
            </div>
          ) : (
            ""
          )}
          {/* evolves from / to div block */}
          {/* <div className="flex-row px-4">
            {current_card.evolvesFrom ? (
              <h3>Evolves From {current_card.evolvesFrom}</h3>
            ) : (
              ""
            )}
            {current_card.evolvesTo ? (
              <h3>Evolves To {current_card.evolvesTo}</h3>
            ) : (
              ""
            )}
          </div> */}
          {current_card.artist ? (
            <div>
              <h3>
                Art by{" "}
                <span className="text-retro-orange-red font-semibold">
                  {current_card.artist}
                </span>
              </h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* card / pull buttons and dropdown menu */}
      <div className="space-y-4 items-center order-1 bg-inherit">
        <h1 className="text-center text-3xl font-extrabold mb-4 md:hidden">Pokemon Pulls</h1>
        <img
          src={current_card.images.large}
          alt="Current Pokemon Card"
          className="object-scale-down w-7/12 blo ck mx-auto"
        ></img>

        <div className="justify-center text-center">
          <button
            className="bg-retro-dark-blue hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-1 rounded"
            onClick={() => prevCardOnClick()}
          >
            {" "}
            {"<"}{" "}
          </button>
          <button
            className="bg-retro-dark-blue hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-4 w-1/2 rounded"
            onClick={() => PullAPack()}
          >
            {" "}
            Pull{" "}
          </button>
          <button
            className="bg-retro-dark-blue hover:bg-blue-700 text-white font-semibold py-2 mx-1 px-1 rounded"
            onClick={() => nextCardOnClick()}
          >
            {" "}
            {`>`} {""}
          </button>
        </div>
        <DropDown
          current_set={current_set}
          Set_current_set={Set_current_set}
          menu_items={all_sets}
        />
      </div>

      <div className="grid justify-center order-last bg-inherit">
        <div className="order-2 hidden md:block md:order-none">
        <img
          src={current_set.images.logo}
          alt="logo"
          className="object-scale-down w-1/2 md:w-2/3 block mx-auto order-2"
        ></img>

        <div className="mt-5 text-center font-semibold text-lg order-3">
          <h2>
            Series: <span>{current_set.series}</span>
          </h2>
          <h2>
            Release Date: <span>{current_set.releaseDate}</span>
          </h2>
        </div>
        </div>
        {current_card.tcgplayer ? (
          <div className="">
            <img
              alt="tcgplayer logo"
              src={tcgplayer_logo_image_path}
              className="object-scale-down hidden w-1/2 md:block mx-auto order-2"
            ></img>
            <div className="mt-2 flex justify-center">
              {current_card.tcgplayer.prices.holofoil ? (
                <h2 className="font-extrabold text-2xl">
                  Market Price:{" "}
                  <span
                    className={
                      current_card.tcgplayer.prices.holofoil.market !== null
                        ? current_card.tcgplayer.prices.holofoil.market > 10
                          ? "text-jade text-2xl"
                          : current_card.tcgplayer.prices.holofoil.market < 1
                          ? "text-red-600"
                          : ""
                        : ""
                    }
                  >
                    ${current_card.tcgplayer.prices.holofoil.market}
                  </span>
                </h2>
              ) : current_card.tcgplayer.prices.reverseHolofoil ? (
                <h2 className="font-extrabold text-2xl">
                  Market Price:{" "}
                  <span
                    className={
                      current_card.tcgplayer.prices.reverseHolofoil.market !==
                      null
                        ? current_card.tcgplayer.prices.reverseHolofoil.market >
                          10
                          ? "text-jade text-2xl"
                          : current_card.tcgplayer.prices.reverseHolofoil
                              .market < 1
                          ? "text-red-600"
                          : ""
                        : ""
                    }
                  >
                    ${current_card.tcgplayer.prices.reverseHolofoil.market}
                  </span>
                </h2>
              ) : current_card.tcgplayer.prices.normal ? (
                <h2 className="font-extrabold text-2xl">
                  Market Price:{" "}
                  <span
                    className={
                      current_card.tcgplayer.prices.normal.market !== null
                        ? current_card.tcgplayer.prices.normal.market > 10
                          ? "text-jade text-2xl"
                          : current_card.tcgplayer.prices.normal.market < 1
                          ? "text-red-600"
                          : ""
                        : ""
                    }
                  >
                    ${current_card.tcgplayer.prices.normal.market}
                  </span>
                </h2>
              ) : (
                "NOT FOUND"
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <h2
          className={`text-center ${
            current_card.rarity === Rarity.Common
              ? "text-black font-semibold text-2xl "
              : current_card.rarity === Rarity.Uncommon
              ? "text-black font-semibold text-2xl "
              : "text-retro-orange-tan font-black text-3xl"
          }`}
        >
          {current_card.rarity.toLocaleUpperCase()}
        </h2>
      </div>
    </div>
  );
}

export default App;
