import axios from 'axios';
const baseUrl = 'https://fd458451ac2f.ngrok.io';

const GETTrendTags = () => {
    const url = baseUrl + '/curation/trendTags';

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

export default GETTrendTags;