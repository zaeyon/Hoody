import axios from 'axios';
const baseUrl = 'https://d2268182fd89.ngrok.io';

const DELETELikeCollection = (collectionId) => {
    const url = baseUrl + '/collection/like?collectionId=' + collectionId;
 
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

export default DELETELikeCollection;