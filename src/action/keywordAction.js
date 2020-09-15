
const setInputedKeywordList = (inputedKeywordList) => {
    return {
      type: 'SET_INPUTED_KEYWORD_LIST',
      payload: inputedKeywordList,
    }
  }

export default {
    setInputedKeywordList
};