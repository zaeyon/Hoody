import axios from 'axios';
const baseUrl = 'https://68d96a6e1632.ngrok.io';

const GETRecommendCollection = () => {
    const url = baseUrl + '/curation/recommendCollection';

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

export default GETRecommendCollection;