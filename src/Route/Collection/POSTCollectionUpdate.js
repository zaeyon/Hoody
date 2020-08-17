import axios from 'axios';
const baseUrl = "https://c04104131d01.ngrok.io";

const POSTCollectionUpdate = (collectionId, name, ope) => {
    const url = baseUrl + "/collection/update";

    var formData = new FormData();

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTCollectionUpdate;