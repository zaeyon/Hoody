import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com'; 

const POSTNotifySetting = (like, comment, follower) => {
    const url = baseUrl + '/notify/setting'

    console.log("좋아요 알림", like);
    console.log("댓글 알림", comment);
    console.log("팔로우 알림", follower);

    var formData = new FormData();
    formData.append("like", like)
    formData.append("comment", comment);
    formData.append("follower", follower);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export default POSTNotifySetting;