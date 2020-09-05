import AsyncStorage from '@react-native-community/async-storage';

const setNotifySetting = async(like, comment, follower, event) => {
    try {
    const notifySetting = {
        like: like,
        comment: comment,
        follower: follower,
        event: event,
    }
    await AsyncStorage.setItem('@notify_setting', JSON.stringify(notifySetting));
    } catch (e) {
        console.log("알림 설정 AsyncStorage 저장 실패", e)
    }
}

const getNotifySetting = async() => {
    try {
        const notifySetting = await AsyncStorage.getItem('@notify_setting')
        console.log("getNotifySetting notifySetting", notifySetting);
            return JSON.parse(notifySetting);
    } catch(e) {
        console.log("getAutoLoginUser error", e);
    }
}

export {getNotifySetting, setNotifySetting};