import axios from 'axios';
const baseUrl = "http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com";

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
    formData.append(`coverImg`, {
        uri: coverImg.uri,
        name: coverImg.filename.toLowerCase(),
        type: 'image/jpeg',
    })
    formData.append("description", description);
    formData.append("includeLocation", includeLocation);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error.response);
        })
    })
}

export default POSTCollectionUpdate;