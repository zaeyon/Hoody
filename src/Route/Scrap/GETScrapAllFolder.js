import axios from 'axios';
const baseUrl = 'https://c04104131d01.ngrok.io';

const GETScrapAllFolder = () => {
    const url = baseUrl + "/scrap/folder/all";

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETScrapAllFolder;