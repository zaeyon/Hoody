import axios from 'axios';
const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

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