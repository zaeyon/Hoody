import axios from 'axios';
const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

const GETRecommendUser = () => {
    const url = baseUrl + "/curation/recommendUser";

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

export default GETRecommendUser;