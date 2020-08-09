import axios from 'axios';
const baseUrl = 'https://2bc6662949ed.ngrok.io'; 

const PostUpload = (desArray, mediaArray,mainTag, subTag1, subTag2, rating, location, longitude, latitude, certifiedLocation, dump, sequence, products, openState, subTag1Exis, subTag2Exis) => {
    const url = baseUrl + "/post/upload"

    console.log("업로드할 사진", mediaArray);
    console.log("업로드할 desArray", desArray);
    console.log("업로드할 상품", products);


    var form = new FormData();

    // IOS simulator 테스트용 이미지 추가
    form.append('mediaFiles',  mediaArray);
    form.append('descriptions', desArray);
    form.append('starRate', rating);
    form.append('address', location);
    form.append('geographLong', longitude);
    form.append('geographLat', latitude);
    form.append('certifiedLocation', certifiedLocation);
    form.append('mainTag', mainTag);
    form.append('subTagOne', subTag1);
    form.append('subTagTwo', subTag2);
    form.append('temporary', dump);
    form.append('sequences', sequence);
    form.append('products', products);
    form.append('open', openState);

    form.append('subTagOneExistence', subTag1Exis);
    form.append('subTagTwoExistence', subTag2Exis);
    
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