const fetchData = require('../utils/HttpUtilCallback');
const URL = "https://rickandmortyapi.com/api/character/";

fetchData(URL, (error, data) => {
    if (error) return console.error(error);
    fetchData(URL + data.results[0].id, (error2, data2) => {
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, (error3, data3) => {
            if (error3) return console.error(error3);
            console.log(data.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
})