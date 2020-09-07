import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTCategory = (category) => {
    const url = baseUrl + '/curation/category';

    console.log("POSTCategory category", category)

    var form = new FormData();
    form.append("categories", category);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTCategory;