const feedList = (state = {
    homeFeedList: [],
    homeTabPress: false,
}, action) => {
    switch(action.type) {
        case 'SET_HOME_FEED_LIST':
            return {
                ...state,
                homeFeedList: action.payload,
            }
        
        case 'SET_HOME_TAB_PRESS':
            return {
                ...state,
                homeTabPress: action.payload,
            }
        
        case 'SET_LOCATION_FEED_LIST':
            return {
                ...state,
                locationFeedList: action.payload,
            }

            default:
                return state;
    }
};

export default feedList;