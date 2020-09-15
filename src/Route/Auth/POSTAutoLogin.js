import axios from 'axios';

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';


const POSTAutoLogin = (userId, sessionId, fcmToken) => {
    const url = baseUrl + '/auth/autologin';

    console.log("POSTAutoLogin fcmToken", fcmToken);
    console.log("POSTAutoLogin userId", userId);

    let form = new FormData();

    form.append('userId', userId);
    form.append('sessionId', sessionId);
    form.append("fcmToken", fcmToken);

    return new Promise(function (resolve, reject) {
      axios
        .post(url, form, {
          //withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response);
        });
    });
}

export default POSTAutoLogin;