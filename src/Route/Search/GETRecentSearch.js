import axios from 'axios';
const baseUrl = 'https://19b97d6d2bd8.ngrok.io'

const GETSearchAutoComplete = (offset, limit) => {
    offset = 0;
    limit = 20;

    const url = baseUrl + "/search/recentSearch?offset=" + offset +"&limit=" + limit;
    
    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export default GETSearchAutoComplete;