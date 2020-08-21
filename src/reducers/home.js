const home = (state = {
    homeFeedList: [],
}, action) => {
    switch(action.type) {
        case 'SET_HOME_FEED_LIST':
            return {
                ...state,
                homeFeedList: action.payload,
            }

            default:
                return state;
    }
};

export default home;