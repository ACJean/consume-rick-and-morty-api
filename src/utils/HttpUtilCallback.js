let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const fetchData = (url, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = event => {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) callback(null, JSON.parse(xhttp.responseText));
            else {
                const error = new Error(`Error ${url}`);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

module.exports = fetchData;