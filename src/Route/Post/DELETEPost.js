import axios from 'axios';
const baseUrl = "https://11f9deb512eb.ngrok.io";

const DELETEPost = (postId) => {
    const url = baseUrl + '/post/delete?postId=' + postId;

    return new Promise(function(resolve, reject) {
        axios
        .delete(url)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default DELETEPost;