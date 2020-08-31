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
    case 'SET_INPUTED_KEYWORD_LIST':
      return {
        ...state,
        inputedKeywordList: action.payload,
      }
    case 'SET_COLLECTION_FEED_LIST':
      return {
        ...state,
        collectionFeedList: action.payload,
      }
    case 'SET_REAL_TIME_Add_LIKE':
      return {
        ...state,
        realTimeAddLike: action.payload,
      }
    case 'SET_REAL_TIME_REMOVE_LIKE':
      return {
        ...state,
        realTimeRemoveLike: action.payload,
      }
    case 'SET_FCM_TOKEN':
      return {
        ...state,
        fcmToken: action.payload,
      }

    default:
      return state;
  }
};

export default currentUser;
