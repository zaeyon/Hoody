import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io';

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