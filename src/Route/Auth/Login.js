import axios from 'axios';
import allActions from '~/action';
import {setAutoLoginUser} from '~/AsyncStorage/User';

const baseUrl = 'https://069fc9fc1c9a.ngrok.io';


const Login = (email, password, fcmToken) => {
    const url = baseUrl + '/auth/login';
    console.log("Login email11", email);
    console.log("Login password11", password);
    console.log("Login fcmToken", fcmToken);

    let form = new FormData();
    form.append('email', email);
    form.append('password', password);
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
          resolve(response);
          console.log("로그인성공 response", response)
          setAutoLoginUser(email, response.data.user.nickname, response.data.user.id, response.data.sessionId, "login");
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error.response);
        });
    });
}

export default Login;