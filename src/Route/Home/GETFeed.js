import axios from 'axios';
const baseUrl = 'https://9ed9874dfb94.ngrok.io'; 

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