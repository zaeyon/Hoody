import axios from 'axios';
const baseUrl = 'https://11f9deb512eb.ngrok.io';

const DELETECollection = (collectionId) => {
    const url = baseUrl + '/collection/delete';

    console.log("컬렉션 삭제 collectionId", collectionId);

    var formData = new FormData();
    formData.append("collectionId", collectionId);

    console.log("컬렉션 삭제 formData", formData);

    return new Promise(function(resolve, reject) {
        axios
        .delete(url, {data: formData})
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default DELETECollection;