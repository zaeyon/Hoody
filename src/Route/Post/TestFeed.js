import axios from 'axios';
const baseUrl = 'https://f5b0c7d7e0a3.ngrok.io'; 

const GetAllFeed = () => {
    url = baseUrl + "/feed/testFeed";

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
          reject(error);  
        })
    })
}

export default GetAllFeed;