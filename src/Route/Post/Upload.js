import axios from 'axios';
const baseUrl = 'https://a63b85bce587.ngrok.io'; 

const PostUpload = (desArray, mediaArray,mainTag, subTag1, subTag2, rating, location, longitude, latitude, certifiedLocation, dump, sequence, products) => {
    const url = baseUrl + "/post/upload"

    console.log("업로드할 사진", mediaArray);
    console.log("업로드할 desArray", desArray);
    console.log("업로드할 상품", products);


    var form = new FormData();

    // IOS simulator 테스트용 이미지 추가
    form.append('mediaFile', {
        name: "test",
        type: 'image/jpeg',
        uri:  'https://mp-seoul-image-production-s3.mangoplate.com/722502_1537752067560597.jpg',
    });
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
    //form.append('sequence', sequence);
    // ios simulator 테스트용
    form.append('sequence', "DM");
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