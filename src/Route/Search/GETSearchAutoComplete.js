import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com'

const GETSearchAutoComplete = (query) => {
    console.log("입력된 검색 키워드", query);

    const url = baseUrl + "/search/predictive?q=" + query;
    
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