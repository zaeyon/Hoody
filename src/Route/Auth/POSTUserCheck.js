import axios from 'axios';
import allActions from '~/action';
import {setCurrentUser} from '~/AsyncStorage/User';

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTUserCheck = (email, password) => {
    const url = baseUrl + '/auth/checkUser';

    console.log("email11", email);
    console.log("password11", password);

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

export default POSTUserCheck;