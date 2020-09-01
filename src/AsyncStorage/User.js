import AsyncStorage from '@react-native-community/async-storage';

const setAutoLoginUser = async(email,nickname, userId, sessionId, state) => {

    if(state === "logout") {
      console.log("로그아웃");
     await AsyncStorage.setItem('autoLogin_user', JSON.stringify("NoLogined"))
    } else if(state === "login") {
        try { 
            const loginedUser = {
                email: email,
                nickname: nickname,
                userId: userId,
                sessionId: sessionId,
                state: state
            }
            console.log("setAutoLoginUser email", email);
            console.log("SetAutoLogin User nickname", nickname);
            console.log("setAutoLoginUser userId", userId);
            console.log("setAutoLoginUser sessionId", sessionId);
            await AsyncStorage.setItem('autoLogin_user', JSON.stringify(loginedUser))
    
        } catch (e) {
            console.log("AsynckStorage 저장 실패", e);
        }
    }
}

const getAutoLoginUser = async() => {
    try {
        const autoLoginUser = await AsyncStorage.getItem('autoLogin_user')

        console.log("autoLoginUser", autoLoginUser);
        if(autoLoginUser == null) {
            console.log("로그인된사용자 없음")
            return "NoLogined"
        } else {
            return JSON.parse(autoLoginUser)
        }
    } catch(e) {
        console.log("getAutoLoginUser error", e);
    }
}

export {getAutoLoginUser, setAutoLoginUser};