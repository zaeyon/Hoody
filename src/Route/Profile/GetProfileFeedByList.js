import axios from 'axios';
const baseUrl = 'https://8151dd98f053.ngrok.io';

const GetProfileFeedByList = (nickname) => {
 const url = baseUrl + '/user/profile?nickname=' + nickname + "&type=post&view=feed";
 
 console.log("nickname", nickname)

 return new Promise(function(resolve, reject) {
     axios
     .get(url)
     .then(function(response) {
         resolve(response.data)
         console.log("사용자 프로필 정보", response.data)
     })
     .catch(function(error) {
         reject(error);
     });
 })
}

export default GetProfileFeedByList;