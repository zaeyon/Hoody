import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com'; 

const POSTCollectionFeed = (collectionId, feedIds) => {
    const url = baseUrl + '/collection/post';

    console.log("collectionId", collectionId);
    console.log("feedIds", feedIds);

    var formData = new FormData();
    formData.append("collectionId", collectionId);
    formData.append("posts", feedIds);

    console.log("formData", formData);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            console.log("POSTCollectionFeed",response);
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTCollectionFeed;