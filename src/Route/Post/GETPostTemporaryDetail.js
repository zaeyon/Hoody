import axios from 'axios';
const baseUrl = 'https://bf02c7fd7028.ngrok.io'; 

const GETPostTemporaryDetail = (feedId) => {
    url = baseUrl + '/post/temporary/detail?postId=' + feedId;

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

export default GETPostTemporaryDetail;