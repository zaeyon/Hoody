import axios from 'axios';
const baseUrl = 'https://19b97d6d2bd8.ngrok.io';

const GETLogout = () => {
    const url = baseUrl + '/auth/logout';

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETLogout;