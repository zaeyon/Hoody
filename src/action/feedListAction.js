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

export default {
    setHomeFeedList,
    setLocationFeedList,
};