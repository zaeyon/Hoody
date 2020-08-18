import axios from 'axios';
import allActions from '~/action';
import {setCurrentUser} from '~/AsyncStorage/User';

const baseUrl = 'https://11f9deb512eb.ngrok.io';


const Login = (email, password) => {
    const url = baseUrl + '/auth/login';
    console.log("email11", email);
    console.log("password11", password)

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
          setCurrentUser(email, response.data.user.nickname, "login");
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error);
        });
    });
}

export default Login;