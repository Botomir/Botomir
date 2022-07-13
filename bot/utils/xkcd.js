const axios = require('axios');

function getComic(number) {
    return axios.get(`http://xkcd.com/${number}/info.0.json`)
        .then((res) => res.data);
}

function getNewestComic() {
    return axios.get('http://xkcd.com/info.0.json')
        .then((res) => res.data);
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
