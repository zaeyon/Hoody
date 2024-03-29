import axios from 'axios';
const baseUrl = "http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com";

const POSTCreateCollection = (coverImage, name, description, open, includeLocation, postIds) => {
    const url = baseUrl + "/collection/create";
    var form = new FormData();
    console.log("coverImage", coverImage);
    console.log("name", name);
    console.log("description", description);
    console.log("POSTcreateCollection open", open);
    console.log("includeLocation", includeLocation);
    console.log("postIds", postIds);
   
    form.append("name", name);
    form.append('open', open);
    form.append(`coverImg`, {
        uri: coverImage.uri,
        name: coverImage.filename.toLowerCase(),
        type: 'image/jpeg',
    })
    form.append("includeLocation", includeLocation);
    form.append("description", description);
    form.append("postIds", JSON.stringify(postIds));

    return new Promise(function(resolve, reject) {
        axios
        .post(url, form)
        .then(function(response) {
            console.log("create collection response", response);
            resolve(response);
        })
        .catch(function(error) {
            console.log("create collection error", error);
            reject(error);
        })
    })
}

export default POSTCreateCollection;