import axios from 'axios';
const baseUrl = 'https://5af9132796cd.ngrok.io';

const GETAgeGroupPopularTag = () => {
    const url = baseUrl + "/curation/ageGroupPopularTag";

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

export default GETAgeGroupPopularTag;