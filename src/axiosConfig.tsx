import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2'
});

export default instance;