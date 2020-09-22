import axios from 'axios';

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';


const POSTFcmToken = (userId, fcmToken) => {
    const url = baseUrl + '/auth/fcmToken';

    console.log("POSTFcmToken fcmToken", fcmToken);
    console.log("POSTFcmToken userId", userId);

    let form = new FormData();

    form.append('id', userId);
    form.append("fcmToken", fcmToken);

    console.log("POSTFcmToken form", form);

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

export default POSTFcmToken;