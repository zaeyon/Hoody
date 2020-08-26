import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com/';

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