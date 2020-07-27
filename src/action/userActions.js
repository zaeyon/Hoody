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

export default {
  setUser,
  logOut,
  setLikeFeeds,
  setScrapFeeds,
  setUserAllFeeds,
  setUserRecentSearch,
};
