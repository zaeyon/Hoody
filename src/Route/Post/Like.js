import axios from 'axios';
const baseUrl = 'https://94abb4de22fd.ngrok.io';

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

export default POSTLike;
