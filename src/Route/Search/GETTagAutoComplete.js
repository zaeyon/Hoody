import axios from 'axios';
const baseUrl = 'https://39c3aa47b6d2.ngrok.io'

const GETTagAutoComplete = (query) => {
    console.log("입력된 검색 키워드", query);

    const url = baseUrl + "/search/tag?q=" + query;
    
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

export default GETTagAutoComplete;