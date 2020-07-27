const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {},
        loggedIn: false,
      };
    case 'SET_LIKE_FEEDS':
      return {
        ...state,
        likeFeeds: action.payload,
      }
    case 'SET_SCRAP_FEEDS':
      return {
        ...state,
        scrapFeeds: action.payload,
      }
    case 'SET_USER_ALL_FEEDS':
      return {
        ...state,
        userAllFeeds: action.payload,
      }
    case 'SET_USER_RECENT_SEARCH':
      return {
        ...state,
        userRecentSearch: action.payload,
      }
    default:
      return state;
  }
};

export default currentUser;
