import axios from 'axios';
const baseUrl = "https://fd458451ac2f.ngrok.io";

const POSTCollectionUpdate = (collectionId, name, open, coverImg, description, includeLocation) => {
    const url = baseUrl + "/collection/update";

    console.log("컬랙션 수정 collectionId", collectionId);
    console.log("컬렉션 수정 name", name);
    console.log("컬렉션 수정 open", open);
    console.log("컬렉션 수정 coverImg", coverImg);
    console.log("컬렉션 수정 description", description);
    console.log("컬렉션 수정 includeLocation", includeLocation);

    var formData = new FormData();

    formData.append("collectionId", collectionId);
    formData.append("name", name);
    formData.append("open", open);
    formData.append("coverImg", coverImg);
    formData.append("description", description);
    formData.append("includeLocation", includeLocation);

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