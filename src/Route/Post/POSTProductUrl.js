import axios from 'axios';
import { SegmentedControlIOSComponent } from 'react-native';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com'

const POSTProductUrl = (productUrl) => {
    console.log("입력된 productUrl", productUrl); 

    const url = baseUrl + "/post/productUrl";

    const form = new FormData();
    form.append("productUrl", productUrl);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form, {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*'
        })
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
            console.log("error");
        })
    })
}

export default POSTProductUrl;
