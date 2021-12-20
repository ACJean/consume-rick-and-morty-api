const fetchData = require('../utils/HttpUtil');
const URL = 'https://rickandmortyapi.com/api/character/';

fetchData(URL)
    .then(data => {
        console.log(data.info.count);
        return fetchData(`${URL}${data.results[0].id}`);
    })
    .then(data => {
        console.log(data.name);
        return fetchData(`${data.origin.url}`);
    })
    .then(data => {
        console.log(data.dimension);
    })
    .catch(err => console.log(err));
