import axios from 'axios'; // api 호출 모듈
// 최상단 URL
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const GETTopTagDetailList = (tagName, yearMonth) => {
    const url = baseUrl + '/arrangement/tags/detail?tagName='+tagName+'&yearMonth='+yearMonth;
    console.log(url)

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

export default GETTopTagDetailList;