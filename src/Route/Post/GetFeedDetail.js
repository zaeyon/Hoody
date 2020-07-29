import axios from 'axios';
const baseUrl = 'https://7697cfa1f65b.ngrok.io'; 

const GetFeedDetail = (postId) => {
    console.log("postId", postId);
    const url = baseUrl + '/post/?postId=' + postId;
    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export default GetFeedDetail;