import axios from 'axios';
const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

const GETVerifyEmail = (email) => {
    const url = baseUrl + '/auth/emailVerify?email=' + email;
    
    console.log("인증코드보낼 email", email);

    var formData = new FormData();
    formData.append("email", email);

    console.log("formData", formData);

    return new Promise(function(resolve, reject) {
        axios
        .get(url, formData)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error.response);
        });
    })
}

export default GETVerifyEmail;