import axios from 'axios';
const baseUrl = 'https://dac549af8a8b.ngrok.io';

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