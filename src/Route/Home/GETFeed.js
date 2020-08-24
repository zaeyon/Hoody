import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io'; 

const GETFeed = (offset, limit) => {
    const url = baseUrl + '/feed?offset=' + offset + "&limit=" + limit;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETFeed;