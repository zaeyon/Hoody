import axios from 'axios';
const baseUrl = 'https://08f9c4787309.ngrok.io';

const POSTLikeCollection = (collectionId) => {
    const url = baseUrl + '/collection/like?collectionId=' + collectionId;
   
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

export default POSTLikeCollection;