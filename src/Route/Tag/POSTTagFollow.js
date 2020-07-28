import axios from 'axios';
const baseUrl = 'https://e099b324fe09.ngrok.io';

const POSTTagFollow = (tagId) => {
    const url = baseUrl + "/tag/follow?tagId=" + tagId;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTTagFollow;