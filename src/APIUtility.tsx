import axiosConfig from "./axiosConfig";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

type getListI = {
  data: PokemonTCG.Rarity[];
};

export interface CardInfoI {
  id:String;
  name:String;
  evolvesFrom?: String;
  evolvesTo?: String[];
  number: String;
  artist?: String;
  rarity: String;
  flavorText?: String;
  nationalPokedexNumbers?: number[];
  images: PokemonTCG.CardImage;
  tcgplayer?: PokemonTCG.TCGPlayer;
}


type getCardsI = {
  data: CardInfoI[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

type getSetsI = {
  data: PokemonTCG.Set[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export interface setInformatonI {
  id: String;
  name: String;
  series: String;
  releaseDate: String;
  printedTotal: number;
  images: PokemonTCG.SetImage;
}

export const getRarities = async (): Promise<PokemonTCG.Rarity[]> => {
  const rarities: PokemonTCG.Rarity[] = await axiosConfig
    .get<getListI>("/rarities")
    .then((response) => {
      const data = response.data;
      const rarities = response.data.data;
      console.log(rarities);
      return rarities;
    });

  return rarities;
};

export const pullRarity = (card_rarities: String[]): String => {
  return "empty";
};

export const getSets = async (): Promise<setInformatonI[]> => {
  let current_page: number = 1;
  let count: number = 1;
  let totalCount: number = 1;
  let set_info_array: setInformatonI[] = [];

  const banned_keywords: String[] = [
    "*Promo*",
    "*Mcdonald*",
    "*POP*",
    "*FUTSAL*",
    "*Trainer Gallery",
    "Classic Collection",
  ];
  const q_parameter: String = `-name%3A%22${banned_keywords.join(
    "%22%20-name%3A%22"
  )}%22`;

  do {
    try {
      const query_data = await axiosConfig
        .get<getSetsI>(
          `/sets?page=${current_page.toString()}&orderBy=-releaseDate&q=${q_parameter}`
        )
        .then((response) => {
          return response.data;
        });

      const sets_data: PokemonTCG.Set[] = query_data.data;

      sets_data.map((set) => {
        //console.log(`${set.name} and the id is ${set.id}`);
        const { id, name, series, releaseDate, printedTotal, images } = set;
        set_info_array.push({
          id,
          name,
          series,
          releaseDate,
          printedTotal,
          images,
        });
      });

      count = query_data.count;
      totalCount = query_data.totalCount;
      current_page += 1;
    } catch (e) {
      console.error(`Oops, something went wrong ${e}`);
    }
  } while (count < totalCount);

  return set_info_array;
};

export const getCardsbySetID = async (setID: String) => {
  let current_page: number = 1;
  let count: number = 1;
  let totalCount: number = 1;

  const select_parameters: String[] = [
    "id",
    "name",
    "evolvesTo",
    "evolvesFrom",
    "number",
    "artist",
    "rarity",
    "flavorText",
    "nationalPokedexNumbers",
    "images",
    "tcgplayer",
  ];
  const select_query: String = select_parameters.join(",");

  do {
    try {
      const query_data = await axiosConfig
        .get<getCardsI>(
          `/cards?page=${current_page.toString()}&q=set.id:${setID}&select=${select_query}`
        )
        .then((response) => {
          return response.data;
        });

      const cards_data: CardInfoI[] = query_data.data;

      cards_data.map((card) => {
        //console.log(JSON.stringify(card));
      });

      count = query_data.count;
      totalCount = query_data.totalCount;
      current_page += 1;
    } catch (e) {
      console.error(`Oops, something went wrong ${e}`);
    }
  } while (count < totalCount);
};
