import axios from 'axios';
const baseUrl = 'https://fd458451ac2f.ngrok.io';

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