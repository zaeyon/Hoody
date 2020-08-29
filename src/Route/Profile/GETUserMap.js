import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const GETUserMap = (nickname) => {
    console.log("GETUserMap nickname", nickname);
    const url = baseUrl + '/user/map?nickname=' + "qzxcwq";

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

export default GETUserMap;