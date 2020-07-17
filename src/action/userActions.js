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

const addLike = () => {
  return {
    type: 'ADD_LIKE',
  };
};

const deleteLike = () => {
  return {
    type: 'DELETE_LIKE',
  }
}

export default {
  setUser,
  logOut,
  setLikeFeeds,
  addLike,
  deleteLike,
};
