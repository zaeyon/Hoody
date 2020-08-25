import axios from 'axios';
const baseUrl = 'https://d15a7753d61e.ngrok.io';

const GETSearchResult = (type, query, order, offset, limit) => {
    console.log("입력된 검색 query", query)
    console.log("입력된 검색 type", type);
    console.log("입력된 검색 order", order);
    console.log("검색 offset", offset);
    console.log("검색 limit", limit);

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