import axios from 'axios';
const baseUrl = 'https://08f9c4787309.ngrok.io';

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