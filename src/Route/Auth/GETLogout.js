import axios from 'axios';
const baseUrl = 'https://d15a7753d61e.ngrok.io';

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