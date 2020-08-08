import axios from 'axios';
const baseUrl = 'https://19b97d6d2bd8.ngrok.io';

const GETSearchSurroundPost = (lat, long, radius) => {
    const url = baseUrl + "/search/surroundpost?lat=" + lat + "&long=" + long + "&radius=" + radius;

    console.log("radius", radius);

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

export default GETSearchSurroundPost;