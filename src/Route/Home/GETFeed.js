import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com'; 

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