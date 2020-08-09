import axios from 'axios';
const baseUrl = "https://2bc6662949ed.ngrok.io";

const GETCollectionDetailInfo = (collectionId) => {
    console.log("collectionId", collectionId);
    const url = baseUrl + "/collection?collectionId=" + collectionId;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETCollectionDetailInfo;