const feedList = (state = {
    homeFeedList: [],
}, action) => {
    switch(action.type) {
        case 'SET_HOME_FEED_LIST':
            return {
                ...state,
                homeFeedList: action.payload,
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