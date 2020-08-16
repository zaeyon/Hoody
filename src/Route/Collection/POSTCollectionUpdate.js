import axios from 'axios';
const baseUrl = "https://2eb0c2057794.ngrok.io";

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