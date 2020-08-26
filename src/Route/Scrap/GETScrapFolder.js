import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com/';

const GETScrapFolder = (folderId) => {
    const url = baseUrl + "/scrap/folder?scrapFolderId=" + folderId;

    console.log("GETScrapFolder folderId", folderId);

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

export default GETScrapFolder;