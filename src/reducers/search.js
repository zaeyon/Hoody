const search = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_RECENT_SEARCH':
            return {
                ...state,
                userRecentSearch: action.payload,
            }

            default:
                return state;
    }
};

export default search;

