import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTBirthdateUpdate = (birthdate) => {
    const url = baseUrl + '/user/update/birthdate';
    
    console.log("변경할 birthdate", birthdate);

    var formData = new FormData();
    formData.append("birthdate", birthdate);

    console.log("formData", formData);

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

export default POSTBirthdateUpdate;