import axios from 'axios';
const baseUrl = 'https://f5b0c7d7e0a3.ngrok.io';

const POSTProfileUpdate = ( description: string, profileImage?: string, nickname?: string) => {
  const url = baseUrl + '/user/profile/update';

  console.log("수정된 nickname", nickname);
  console.log("수정된 description", description);
  console.log("수정된 profileImage", profileImage);

  var form = new FormData();

      if(nickname) {
      form.append("nickname", nickname);
      }

      form.append("profileImg", profileImage);
      form.append("description", description);

      console.log("POSTProfileUpdate", form);

      return new Promise(function(resolve, reject) {
      axios
      .post(url, form)
      .then(function(response) {
          resolve(response);
      })
      .catch(function(error) {
          reject(error.response);
      })
  })
}

export default POSTProfileUpdate;

