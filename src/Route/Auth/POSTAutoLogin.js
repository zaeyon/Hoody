import axios from 'axios';

const baseUrl = 'https://069fc9fc1c9a.ngrok.io';


const POSTAutoLogin = (userId, sessionId) => {
    const url = baseUrl + '/auth/autologin';

    console.log("POSTAutoLogin userId", userId);

    let form = new FormData();
    form.append('userId', userId);
    form.append('sessionId', sessionId);

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