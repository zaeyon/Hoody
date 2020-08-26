import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com/';

const POSTCreateScrapFolder = (folderName, postIds) => {
    const url = baseUrl + "/scrap/folder";

    console.log("Create Scrap Folder folderName", folderName);
    console.log("Create Scrap Folder postIds", postIds);

    var formData = new FormData();
    formData.append("folderName", folderName);
    formData.append("postIds", postIds);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTCreateScrapFolder;