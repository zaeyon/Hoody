import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com';

const GETEmailCheck = (email) => {

    console.log("중복검사 email", email);

    const url = baseUrl + "/auth/emailCheck"

    var formData = new FormData();
    formData.append("email", email);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            console.log("GETEmailCheck response.data", response);
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response);
        })
    })
}

export default GETEmailCheck;