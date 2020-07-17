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
    case 'ADD_LIKE':
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      }
    default:
      return state;
  }
};

export default currentUser;
