import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io'; 

const GETPostTemporary = () => {
    url = baseUrl + '/post/temporary';

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

export default GETPostTemporary;