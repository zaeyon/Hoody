const setHomeFeedList = (homeFeedList) => {
    return {
        type: 'SET_HOME_FEED_LIST',
        payload: homeFeedList,
    }
}

export default {
    setHomeFeedList,
};