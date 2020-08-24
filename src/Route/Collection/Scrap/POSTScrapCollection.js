import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io';

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