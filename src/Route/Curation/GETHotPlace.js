import axios from 'axios';
const baseUrl = 'https://dac549af8a8b.ngrok.io';

const GETHotPlace = () => {
    const url = baseUrl + '/curation/hotPlace';

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