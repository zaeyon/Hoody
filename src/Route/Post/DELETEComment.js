import axios from 'axios';
const baseUrl = "https://fd458451ac2f.ngrok.io";

const DELETEComment = (commentId) => {
    console.log("삭제할 commentId", commentId);
    const url = baseUrl + '/comment/delete?commentId=' + commentId;
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

export default DELETEComment;