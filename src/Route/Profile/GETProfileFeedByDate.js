import axios from 'axios';
const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

const GETProfileFeedByDate = (nickname, requestedDate) => {
    const url = baseUrl + '/user/profile?nickname=' + nickname + "&type=post&view=listByDate&yearMonth=" + requestedDate;

    console.log("GETProfileFeedByDate 요청된 날짜", requestedDate)

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