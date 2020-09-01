import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTReportDemand = (reason, description) => {
    const url = baseUrl + '/report/demand';

    console.log("신고 resson", reason);
    console.log("신고 description", description);

    var formData = new FormData();

    formData.append("reason", reason);
    formData.append("description", description);

    console.log("신고 formData", formData);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTReportDemand;