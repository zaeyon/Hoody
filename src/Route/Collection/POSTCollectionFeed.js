import axios from 'axios';
const baseUrl = 'https://fd458451ac2f.ngrok.io'; 

const POSTCollectionFeed = (collectionId, feedIds) => {
    const url = baseUrl + '/collection/post';

    console.log("collectionId", collectionId);
    console.log("feedIds", feedIds);

    var formData = new FormData();
    formData.append("collectionId", collectionId);
    formData.append("posts", feedIds);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTCollectionFeed;