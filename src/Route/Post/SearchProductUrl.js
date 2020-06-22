import axios from 'axios';
import { SegmentedControlIOSComponent } from 'react-native';
const baseUrl = 'https://7aba7fe3e57e.ngrok.io'

const SearchProductUrl = (productUrl) => {
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

export default SearchProductUrl;
