import axios from 'axios';
const baseUrl = 'https://c04104131d01.ngrok.io';

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