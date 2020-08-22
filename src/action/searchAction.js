
const setUserRecentSearch = (recentSearchList) => {
    return {
      type: 'SET_USER_RECENT_SEARCH',
      payload: recentSearchList,
    }
  }

const setTagKeywordFollow = (tagKeywordFollow) => {
  return {
    type : 'SET_TAG_KEYWORD_FOLLOW',
    payload: tagKeywordFollow,
  }
}

const setSearchResultFeedList = (searchResultFeedList) => {
  return {
    type: 'SET_SEARCH_RESULT_FEED_LIST',
    payload: searchResultFeedList,
  }
}

export default {
    setUserRecentSearch,
    setTagKeywordFollow,
    setSearchResultFeedList,
  };
  