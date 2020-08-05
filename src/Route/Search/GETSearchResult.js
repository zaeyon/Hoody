import axios from 'axios';
const baseUrl = 'https://f5b0c7d7e0a3.ngrok.io';

const GETSearchResult = (type, query, order, offset, limit) => {
    console.log("입력된 검색 query", query)
    console.log("입력된 검색 type", type);
    console.log("입력된 검색 order", order);

    const url = baseUrl + "/search/results?type=" + type + "&query=" + query + "&order=" + order + "&offset=" + offset +"&limit=" + limit;
    
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

export default GETSearchResult;