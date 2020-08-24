import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io';

const DELETEScrapFolder = (folderId) => {
    const url = baseUrl + "/scrap/folder";
    console.log("DELETEScrapFolder folderId", folderId);

    var formData = new FormData();
    formData.append("scrapFolderId", folderId);

    return new Promise(function(resolve, reject) {
        axios
        .delete(url, {
            data: formData
        })
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default DELETEScrapFolder;