const fetchData = require('../utils/HttpUtil');
const URL = 'https://rickandmortyapi.com/api/character/';


const fetchApi = async (url) => {
    try {
        const data = await fetchData(url);
        const character = await fetchData(`${url}${data.results[0].id}`);
        const origin = await fetchData(character.origin.url);

        console.log(data.info.count, character.name, origin.dimension);
    } catch (error) {
        console.log(error);
    }
}

fetchApi(URL);