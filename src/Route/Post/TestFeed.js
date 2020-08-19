import axios from 'axios';
const baseUrl = 'https://08f9c4787309.ngrok.io'; 

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