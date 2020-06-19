import axios from 'axios';
const baseUrl = "https://c7ede387e39b.ngrok.io";

const PostComment = (postId, comment) => {
    console.log("댓글 입력 postId", postId);
    console.log("댓글 입력 comment", comment);

    var url = baseUrl + '/comment/post?postId=' + postId;

    var form = new FormData();
    form.append("comment", comment);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

const GetComment = (postId) => {
    var url = baseUrl + '/comment/allComment?postId=' + postId;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export {PostComment, GetComment};