import axios from 'axios';
const baseUrl = 'https://2eb0c2057794.ngrok.io';

const POSTFollowTag = (tagId) => {
    const url = baseUrl + "/tag/follow?tagId=" + tagId;
    console.log("POSTFollowTag tagId", tagId);

    return new Promise(function(resolve, reject) {
        axios
        .post(url)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTFollowTag;