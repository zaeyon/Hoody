import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const DELETEScrapFeed = (postIdArray) => {
    const url = baseUrl + '/scrap/folder/posts';
    console.log("Delete postIdArray", JSON.stringify(postIdArray));

    var form = new FormData();
    form.append("postIds", JSON.stringify(postIdArray))

    return new Promise(function(resolve, reject) {
        axios
        .delete(url,{data: form})
        .then(function(response) {
            console.log("DELETEScrapFeed response", response)
            resolve(response)
        })
        .catch(function(error) {
            console.log("DELETEScrapFeed error", error)
            reject(error)
        })
    })
}

export default DELETEScrapFeed;