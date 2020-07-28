import axios from 'axios';
const baseUrl = 'https://e099b324fe09.ngrok.io';

const POSTLike = (userId, postId) => {
    const url = baseUrl + '/like?userId=' + userId + "&postId=" + postId;

    return new Promise(function(resolve, reject) {
        axios
        .post(url)
        .then(function(response) {
            console.log("POSTLike response", response)
            resolve(response);
        })
        .catch(function(error) {
            console.log("POSTLike error", error)
            reject(error);
        })
    })
}

const DELETELike = (userId, postId) => {
    const url = baseUrl + '/like?userId=' + userId + '&postId=' + postId;

    return new Promise(function(resolve, reject) {
        axios
        .delete(url)
        .then(function(response) {
            console.log("DELETELike response", response)
            resolve(response);
        })
        .catch(function(error) {
            console.log("DELETELike error", error);
            reject(error);
        })
    })
}





export {POSTLike, DELETELike};
