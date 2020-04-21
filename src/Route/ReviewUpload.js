import axios from 'axios';
const baseUrl = 'http://15.164.185.120:3000';

const ReviewUpload = async (image) => {
  console.log('image:', image.uri);
  var photo = {
    uri: image.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };

  var formData = new FormData();
  formData.append('file', photo);

  axios({
    method: 'POST',
    url: baseUrl + '/files/default?objectName=jaeyeontest',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(function (response) {
      console.log('response', response);
    })
    .catch(function (error) {
      console.log('error', error);
    });
};

export default ReviewUpload;
