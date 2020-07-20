import axios from 'axios';
const baseUrl = 'https://56a952a6ea9b.ngrok.io'

const GetAutoComplete = (query, category) => {
    console.log("입력된 검색 키워드", query);
    console.log("검색 카테고리", category);

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

export default GetAutoComplete;