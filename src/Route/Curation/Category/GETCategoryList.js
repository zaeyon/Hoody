import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const GETCategoryList = () => {
    const url = baseUrl + '/curation/categoryList';

    return new Promise(function(resolve, reject){
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

export default GETCategoryList;