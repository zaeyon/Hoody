import axios from 'axios';
const baseUrl = 'https://9ed9874dfb94.ngrok.io';

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