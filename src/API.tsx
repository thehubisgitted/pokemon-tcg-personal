import { useState } from 'react';
import axios from 'axios'; 


type getRarities = {
    data : String[];
};


export const getRarities = async ():Promise<String[]> => {
    

    const rarities:String[] = await axios.get<getRarities>('https://api.pokemontcg.io/v2/rarities')
    .then(response => {
        const data = response.data;
        const rarities = response.data.data;    
        return rarities;
    })

    return rarities;

}


export const getCard = (Set:String, Rarity:String) => {
   
}

export const pullRarity= ():String =>{
    return "empty";
}