import axios from 'axios';
const baseUrl = "https://069fc9fc1c9a.ngrok.io";

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