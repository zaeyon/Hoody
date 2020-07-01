import axios from 'axios';
const baseUrl = 'https://a63b85bce587.ngrok.io';

const GetUserProfile = (nickname) => {
 const url = baseUrl + '/user/profile?nickname=' + nickname;
 console.log("nickname", nickname)

 return new Promise(function(resolve, reject) {
     axios
     .get(url)
     .then(function(response) {
         resolve(response.data)
         console.log("사용자 프로필 정보", response)
     })
     .catch(function(error) {
         reject(error);
     });
 })
}

export default GetUserProfile;