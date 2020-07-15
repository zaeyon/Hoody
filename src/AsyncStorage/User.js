import AsyncStorage from '@react-native-community/async-storage';

const setCurrentUser = async(email,nickname, state) => {
    try { 
        const loginedUser = {
            email: email,
            nickname: nickname,
            state: state
        }
        console.log("setCurrentUser email", email);
        console.log("SetCurrentUSer nickname", nickname);
        await AsyncStorage.setItem('current_user', JSON.stringify(loginedUser))

    } catch (e) {
        console.log("AsynckStorage 저장 실패", e);
    }
}

const getCurrentUser = async() => {
    try {
        const currentUser = await AsyncStorage.getItem('current_user')

        console.log("currentUser222", currentUser);
        if(currentUser == null) {
            console.log("로그인된사용자 없음")
            return "NoLogined"
        } else {
            return JSON.parse(currentUser)
        }
    } catch(e) {
        console.log("getCurrentUser error", e);
    }
}

export {getCurrentUser, setCurrentUser};