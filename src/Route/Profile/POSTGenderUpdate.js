import axios from 'axios';
const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

const POSTGenderUpdate = (gender) => {
    const url = baseUrl + '/user/update/gender';
    
    console.log("변경할 gender", gender);

    var formData = new FormData();
    formData.append("gender", gender);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        });
    })
}

export default POSTGenderUpdate;