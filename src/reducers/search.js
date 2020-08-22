const search = (state = {
    searchResultFeedList: []
}, action) => {
    switch(action.type) {
        case 'SET_USER_RECENT_SEARCH':
            return {
                ...state,
                userRecentSearch: action.payload,
            }
        case 'SET_SEARCH_RESULT_FEED_LIST':
            return {
                ...state,
                searchResultFeedList: action.payload,
            }

            default:
                return state;
    }
};

export default search;

