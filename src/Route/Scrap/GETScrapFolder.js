import axios from 'axios';
const baseUrl = 'https://d15a7753d61e.ngrok.io';

const GETScrapFolder = (folderId) => {
    const url = baseUrl + "/scrap/folder?scrapFolderId=" + folderId;

    console.log("GETScrapFolder folderId", folderId);

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

export default GETScrapFolder;