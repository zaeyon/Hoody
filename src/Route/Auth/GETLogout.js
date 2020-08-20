import axios from 'axios';
const baseUrl = 'https://b7fb6e3d4f9a.ngrok.io';

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