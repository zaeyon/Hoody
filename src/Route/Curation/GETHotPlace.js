import axios from 'axios';
const baseUrl = 'https://68d96a6e1632.ngrok.io';

const GETHotPlace = () => {
    const url = baseUrl + '/curation/holPlace';

    return new Promise(function(resolve, reject){
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

export default GETHotPlace;