import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTScrapFeed = (postIdArray) => {
    const url = baseUrl + '/scrap/folder/posts';
    console.log("postIdArray", JSON.stringify(postIdArray));
    var form = new FormData();
    form.append("postIds", JSON.stringify(postIdArray));
    /*
    for(var item of form.entries()) {
        console.log("form value", item);
    }
    */

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTScrapFeed;