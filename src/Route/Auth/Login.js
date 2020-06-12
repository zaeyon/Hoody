import axios from 'axios';
import allActions from '~/action';

const baseUrl = 'https://fb79033da0c4.ngrok.io';


const Login = (email, password) => {
    const url = baseUrl + '/auth/login';
    console.log("email", email);
    console.log("password", password)

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
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error);
        });
    });

}

export default Login;