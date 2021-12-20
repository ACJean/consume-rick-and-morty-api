const options = document.getElementsByClassName('home-content__option');

const  fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                xhttp.status === 200 
                    ? resolve(JSON.parse(xhttp.responseText)) 
                    : reject(new Error(`Error ${url}`));
            }
        };
        xhttp.send();
    });
}

const fetchChallenge = async () => {
    const url = "https://rickandmortyapi.com/api/character/";
    try {
        const data = await fetchData(url);
        const character = await fetchData(`${url}${data.results[0].id}`);
        const origin = await fetchData(character.origin.url);

        document.getElementById('NumberCharacters').textContent = data.info.count;
        document.getElementById('CharacterImage').src = character.image;
        document.getElementById('CharacterImage').alt = character.name;
        document.getElementById('CharacterName').textContent = character.name;
        document.getElementById('Dimension').textContent = origin.dimension;
    } catch (error) {
        console.log(error);
    }
}

const fetchCharacters = async () => {
    const url = "https://rickandmortyapi.com/api/character/";
    try {
        const data = await fetchData(url);
        const contentList = document.getElementById('ContentCharacters').getElementsByClassName('content__list')[0];
        data.results.forEach(character => {
            contentList.innerHTML += `<div class=\"card\">`+
                                        `<figure class=\"card__figure card__figure--border-bottom\">`+
                                            `<img class=\"card__image\" src=\"${character.image}\" alt=\"${character.name}\"/>`+
                                            `<figcaption class=\"card__figcaption\">${character.name}</figcaption>`+
                                        `</figure>`+
                                        `<div class=\"card__body\">`+
                                            `<div class=\"card__properties\">`+
                                                `<h5 class=\"card__title\">Species:</h5>`+
                                                `<p class=\"card__text\">${character.species}</p>`+
                                                `<h5 class=\"card__title\">Gender:</h5>`+
                                                `<p class=\"card__text\">${character.gender}</p>`+
                                            `</div>`+
                                        `</div>`+
                                    `</div>`;
        });
    } catch (error) {
        console.log(error);
    }
}

for (let option of options) {
    option.firstChild.addEventListener('click', event => {
        let sectionId;
        for (let option of options) {
            sectionId = option.firstChild.getAttribute('href').replace('#', '');
            if (!sectionId) continue;
            document.getElementById(sectionId).classList.remove('content__option--show');
        }
        sectionId = event.target.getAttribute('href').replace('#', '');
        if (!sectionId) return;
        document.getElementById(sectionId).classList.toggle('content__option--show');
    }, false);
}