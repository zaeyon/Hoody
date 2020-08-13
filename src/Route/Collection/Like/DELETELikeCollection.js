import axios from 'axios';
const baseUrl = 'https://85a2bd05d031.ngrok.io';

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