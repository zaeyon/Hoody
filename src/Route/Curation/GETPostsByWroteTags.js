import axios from 'axios';
const baseUrl = 'https://2eb0c2057794.ngrok.io';

const GETPostsByWroteTags = () => {
    const url = baseUrl + "/curation/postsByWroteTags";

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(erro) {
            reject(error);
        })
    })
}

export default GETPostsByWroteTags;