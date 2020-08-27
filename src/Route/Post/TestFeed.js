import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com'; 

const GetAllFeed = () => {
    url = baseUrl + "/feed/testFeed";

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

export default GetAllFeed;