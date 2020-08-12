import axios from 'axios';
const baseUrl = "https://dac549af8a8b.ngrok.io";

const POSTCreateCollection = (coverImage, name, description, open, includeLocation, postIds) => {
    const url = baseUrl + "/collection/create";
    var form = new FormData();
    console.log("coverImage", coverImage);
    console.log("name", name);
    console.log("description", description);
    console.log("open", open);
    console.log("includeLocation", includeLocation);
    console.log("postIds", postIds);
   
    form.append("name", name);
    form.append('open', open);
    form.append("coverImg", coverImage);
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