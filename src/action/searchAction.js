
const setUserRecentSearch = (recentSearchList) => {
    return {
      type: 'SET_USER_RECENT_SEARCH',
      payload: recentSearchList,
    }
  }

export default {
    setUserRecentSearch,
  };
  