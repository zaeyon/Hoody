const setUser = (userObj) => {
  return {
    type: 'SET_USER',
    payload: userObj,
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const setLikeFeeds = (likeFeeds) => {
  return {
    type: 'SET_LIKE_FEEDS',
    payload: likeFeeds
  };
};

const setScrapFeeds = (scrapFeeds) => {
  return {
    type: 'SET_SCRAP_FEEDS',
    payload: scrapFeeds
  }
}

const setUserAllFeeds = (userAllFeeds) => {
  return {
    type: 'SET_USER_ALL_FEEDS',
    payload: userAllFeeds
  }
}

const setUserRecentSearch = (recentSearchList) => {
  return {
    type: 'SET_USER_RECENT_SEARCH',
    payload: recentSearchList,
  }
}

const setInputedKeywordList = (inputedKeywordList) => {
  return {
    type: 'SET_INPUTED_KEYWORD_LIST',
    payload: inputedKeywordList,
  }
}

const setCollectionFeedList = (collectionFeedList) => {
  return {
    type: 'SET_COLLECTION_FEED_LIST',
    payload: collectionFeedList,
  }
}

export default {
  setUser,
  logOut,
  setLikeFeeds,
  setScrapFeeds,
  setUserAllFeeds,
  setUserRecentSearch,
  setInputedKeywordList,
  setCollectionFeedList,
};
