import axios from 'axios';
const baseUrl = 'https://5af9132796cd.ngrok.io'; 

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