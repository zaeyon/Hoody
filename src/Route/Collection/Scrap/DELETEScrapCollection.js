import axios from 'axios';
const baseUrl = 'https://85a2bd05d031.ngrok.io';

const POSTScrapFeed = (collectionId) => {
    const url = baseUrl + '/scrap/collection?collectionId=' + collectionId;

    var form = new FormData();
    form.append("collectionId", collectionId);
    
    return new Promise(function(resolve, reject) {
        axios
        .delete(url, form)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTScrapFeed;