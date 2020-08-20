import axios from 'axios';
const baseUrl = 'https://b7fb6e3d4f9a.ngrok.io';

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