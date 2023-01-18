import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { CardInfoI } from "./APIUtility";

const sortCardsByRarity = (card_list: CardInfoI[]):Map<PokemonTCG.Rarity,CardInfoI[]> => {
    const rarityDictionary = new Map<PokemonTCG.Rarity,CardInfoI[]>();
   
    card_list.map((card)=> {
        
        const current_list:CardInfoI[]|undefined = rarityDictionary.get(card.rarity);         
        if(current_list === undefined){
            rarityDictionary.set(card.rarity,[card]);
        }
        else{
            current_list.push(card);
            rarityDictionary.set(card.rarity, current_list);
        }

    });
    return rarityDictionary;
}

export default sortCardsByRarity;