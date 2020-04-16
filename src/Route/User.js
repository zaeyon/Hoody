import axios from 'axios';

const baseUrl = 'http://15.164.185.120:3000';
function checkLogin(email, password) {
  const userData = {
    email: email,
    pw: password,
  };
  console.log('userData: ', userData);

  restHTTPPost(baseUrl + '/signIn', userData).then(function (data) {
    console.log('hh', data);
  });
}

function restHTTPPost(url, data = null) {
  console.log('data: ', data);
  let form = new FormData();
  form.append('email', data.email);
  form.append('pw', data.pw);
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
        console.log('response : ', response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log('error : ', error);
        reject(error);
      });
  });
}
function restHTTPGet(url, params = null) {
  // let result = [];
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: {params},
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ',
        },
      })
      .then(function (response) {
        console.log('response : ', response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log('error : ', error);
        reject(error);
      });
  });
}

export {checkLogin, restHTTPGet};
