import axios from 'axios';
const baseUrl = 'https://2eb0c2057794.ngrok.io';

const DELETEScrapCollection = (collectionId) => {
    const url = baseUrl + '/scrap/collection?collectionId=' + collectionId;
 
    return new Promise(function(resolve, reject) {
        axios
        .delete(url)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default DELETEScrapCollection;