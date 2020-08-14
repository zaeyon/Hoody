import axios from 'axios';
const baseUrl = "https://d2268182fd89.ngrok.io";

const GETCollectionDetailInfo = (collectionId) => {
    console.log("collectionId", collectionId);
    const url = baseUrl + "/collection?collectionId=" + collectionId;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            console.log("컬렉션상세정보", response);
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETCollectionDetailInfo;