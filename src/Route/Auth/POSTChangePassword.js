import axios from 'axios';

const baseUrl = 'https://069fc9fc1c9a.ngrok.io';

const POSTChangePassword = (email, password) => {
    const url = baseUrl + '/auth/changePassword';

    console.log("비밀번호변경 email", email);
    console.log("비밀번호변경 password", password);

    let form = new FormData();
    form.append('email', email);
    form.append('password', password);

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
          resolve(response);
          console.log("response.data", response)
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error.response);
        });
    });
}

export default POSTChangePassword;