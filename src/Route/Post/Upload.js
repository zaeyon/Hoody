import axios from 'axios';
const baseUrl = 'https://c04104131d01.ngrok.io'; 

const PostUpload = (desArray, mediaArray,mainTag, subTag1, subTag2, rating, expense,  location, longitude, latitude, certifiedLocation, dump, sequence, products, spendDate, openState, subTag1Exis, subTag2Exis) => {
    const url = baseUrl + "/post/upload"

    console.log("업로드할 사진", mediaArray);
    console.log("업로드할 desArray", desArray);
    console.log("업로드할 상품", products);
    console.log("업로드 spendDate", spendDate)


    console.log("업로드 subTag1", subTag1);
    console.log("업로드 subTag2", subTag2);
    console.log("업로드 subTag1Exis", subTag1Exis)
    console.log("업로드 subTag2Exis", subTag2Exis);


    var form = new FormData();

    // IOS simulator 테스트용 이미지 추가
    form.append('mediaFiles',  mediaArray);
    form.append('descriptions', desArray);
    form.append('starRate', rating);
    form.append('expense', expense);
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

    form.append("spendDate", spendDate);
    
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