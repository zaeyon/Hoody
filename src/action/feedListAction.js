const setHomeFeedList = (homeFeedList) => {
    return {
        type: 'SET_HOME_FEED_LIST',
        payload: homeFeedList,
    }
}

const setLocationFeedList = (locationFeedList) => {
    return {
        type: 'SET_LOCATION_FEED_LIST',
        payload: locationFeedList,
    }
}

const setHomeTabPress = (homeTabPress) => {
    return {
        type: 'SET_HOME_TAB_PRESS',
        payload: homeTabPress,
    }
}

export default {
    setHomeTabPress,
    setHomeFeedList,
    setLocationFeedList,
};