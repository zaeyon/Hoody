import axios from 'axios';
const baseUrl = 'https://d2268182fd89.ngrok.io';

const POSTScrapCollection = (collectionId) => {
    const url = baseUrl + '/scrap/collection?collectionId=' + collectionId;
    
    return new Promise(function(resolve, reject) {
        axios
        .post(url)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTScrapCollection;