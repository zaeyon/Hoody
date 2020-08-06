import axios from 'axios';
const baseUrl = 'https://f8c3ed7f93d4.ngrok.io';

const GETProfileFeedByDate = (nickname, requestedDate) => {
    const url = baseUrl + '/user/profile?nickname=' + nickname + "&type=post&view=listByDate&yearMonth=" + requestedDate;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
            console.log("GETProfileFeedByDate response", response.data);
        })
        .catch(function(error) {
            reject(error);
            console.log("GETProfileFeedByDate error", error)
        })
    })
}

export default GETProfileFeedByDate;