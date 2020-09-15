const keyword = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INPUTED_KEYWORD_LIST':
        return {
          ...state,
          inputedKeywordList: action.payload,
        }
      default:
        return state;
    }
  };
  
  export default keyword;
  