import axios from 'axios';

const baseUrl = 'http://15.164.185.120:3000';
function checkLogin(email, password) {
  const userData = {
    email: {email},
    password: {password},
  };
  restHTTPGet(baseUrl + '/signIn', userData).then(function (data) {
    console.log('hh', data);
  });
}

function restHTTPPost(url, data = null) {
  return new Promise(function (resolve, reject) {
    axios
      .post(url, {
        data: {data},
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
function restHTTPGet(url, params = null) {
  // let result = [];
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: {params},
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
