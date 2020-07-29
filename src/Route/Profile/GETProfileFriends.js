import axios from 'axios';
const baseUrl = 'https://d8e1fd0aa26c.ngrok.io';

const GETProfileFriends = (type, query, offset, limit, targetUser) => {
    const url = baseUrl + '/user/profile/friends?targetUser=' + targetUser + "&type=" + type + "&q=" +  query + "&offset=" + offset + "&limit=" + limit 

    console.log("팔로우리스트 요청 targetUser", targetUser);

    console.log("필로우리스트 요청 url", url)

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            console.log("response: ", response);
            resolve(response.data);
        })
        .catch(function(error) {
            console.log("error: ", error);
            reject(error)
        });
    })
}

export default GETProfileFriends;