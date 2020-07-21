import axios from 'axios';
const baseUrl = 'https://5639a4004695.ngrok.io';

const POSTFollowUser = (targetUserId) => {
    const url = baseUrl + '/user/follow?userId=' + targetUserId;

    return new Promise(function(resolve, reject) {
        axios
        .post(url)
        .then(function(response) {
            console.log("POSTFollow response", response)
            resolve(response);
        })
        .catch(function(error) {
            console.log("POSTFollow error", error)
            reject(error);
        })
    })
}

const DELETEUnfollowUser = (targetUserId) => {
    const url = baseUrl + '/user/follow?userId=' + targetUserId;

    return new Promise(function(resolve, reject) {
        axios
        .delete(url)
        .then(function(response) {
             console.log("DELETEUnfollowUser response", response)
             resolve(response);
        })
        .catch(function(error) {
            console.log("DELETEUnfollowUser error", error);
            reject(error);
        })
    })
}

export {POSTFollowUser, DELETEUnfollowUser};

