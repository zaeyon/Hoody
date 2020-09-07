import axios from 'axios';

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';


const POSTSocial = (socialId, email ,provider) => {
    const url = baseUrl + '/auth/social';

    console.log("POSTSocial socialId", socialId);
    console.log("POSTSocial email", email);
    console.log("POSTSocial provider", provider);

    let form = new FormData();
    form.append('socialId', socialId);
    form.append('email', email);
    form.append('provider', provider);
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

export default POSTSocial;