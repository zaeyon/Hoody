import axios from 'axios';
import allActions from '~/action';
import AsyncStorage from '@react-native-community/async-storage';
import {setAutoLoginUser} from '~/AsyncStorage/User';

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const SignUp = (email, password, nickname, birthdate, gender, socialId, provider, fcmToken) => {
    const url = baseUrl + '/auth/signUp';

    console.log("Signup fcmToken", fcmToken);

    let form = new FormData();

    form.append('email', email);
    form.append('password', password);
    form.append('nickname', nickname);
    form.append('birthdate', birthdate);
    form.append('gender', gender);
    form.append('socialId', socialId);
    form.append('provider', provider);
    form.append("fcmToken", fcmToken);

    console.log("signup form", form);

    return new Promise(function (resolve, reject) {
        axios
          .post(url, form, {
            //withCredentials: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json; charset=utf-8' 
            },
          })
          .then(function (response) {
            console.log('response : ', response);
            resolve(response);
            if (response.status === 201) {
              console.log('회원가입 성공');
              console.log("회원가입성공 닉네임", response.data.user.nickname)
              setAutoLoginUser(email, response.data.user.nickname, response.data.user.id, response.data.sessionId, "login");
            } else if(response.status === 400) {
              console.log("response", response);
            }
          })
          .catch(function (error) {
            console.log("error", error);
            reject(error.response);
          });
      });
}

export default SignUp;