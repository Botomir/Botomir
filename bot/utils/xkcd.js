const fetch = require('node-fetch');

function getComic(number) {
    return fetch(`http://xkcd.com/${number}/info.0.json`)
        .then((res) => res.json());
}

function getNewestComic() {
    return fetch('http://xkcd.com/info.0.json')
        .then((res) => res.json());
}

function getRandomComic() {
    return getNewestComic()
        .then((comic) => {
            const number = Math.floor(Math.random() * comic.num + 1);
            return getComic(number);
        });
}

module.exports = {
    getRandomComic,
    getNewestComic,
    getComic,
};
