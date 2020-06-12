import axios from 'axios';
const baseUrl = 'https://fb79033da0c4.ngrok.io'; 

const PostUpload = (desArray, mediaArray,mainTag, subTag1, subTag2, rating, location, longitude, latitude, certifiedLocation, dump, sequence, products) => {
    const url = baseUrl + "/post/upload"

    console.log("업로드할 사진", mediaArray);
    console.log("업로드할 desArray", desArray);

    // IOS simulator 테스트용 이미지 추가
    
/*
    form.append('mediaFile', {
        name: mediaArray[0].filename,
        type: 'image/jpeg',
        uri:  mediaArray[0].uri,
    });
*/
    var form = new FormData();
    form.append('description', desArray);
    form.append('starRate', rating);
    form.append('address', location);
    form.append('geographLong', longitude);
    form.append('geographLat', latitude);
    form.append('certifiedLocation', certifiedLocation);
    form.append('mainTag', mainTag);
    form.append('subTag1', subTag1);
    form.append('subTag2', subTag2);
    form.append('dump', dump);
    form.append('sequence', sequence);
    form.append('products', products);

    console.log("FormData", form);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form, {
          headers: {
              'Content-Type': 'multipart/form-data',
              Accept: '*/*'
          },  
        })
        .then(function(response) {
            console.log('response: ', response);
            resolve(response);
        })
        .catch(function(error) {
            console.log('error: ', error);
            reject(error);
        })
    })
}


export default PostUpload