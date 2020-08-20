import axios from 'axios';
const baseUrl = 'https://783a648c9ca5.ngrok.io'; 

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