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

export default {
  setUser,
  logOut,
  setLikeFeeds,
  setScrapFeeds,
};
