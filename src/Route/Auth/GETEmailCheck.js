import axios from 'axios';
const baseUrl = 'https://b7fb6e3d4f9a.ngrok.io';

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