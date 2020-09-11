import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

// Import Local Component
import SearchResultTopTabNavigator from '~/Components/Presentational/SearchResultScreen/SearchResultTopTabNavigator';
import SearchResultTabBar from '~/Components/Presentational/SearchResultScreen/SearchResultTabBar';
import MemoizedFeedItem from '~/Components/Presentational/SearchResultScreen/MemoizedFeedItem';
import CollectionItem from '~/Components/Presentational/SearchResultScreen/CollectionItem';
import SearchFeedList from '~/Components/Presentational/SearchResultScreen/SearchFeedList';
import ScrollableTabView from 'rn-collapsing-tab-bar'
// Route
import GETSearchResult from '~/Route/Search/GETSearchResult';
import POSTFollowTag from '~/Route/Tag/POSTFollowTag';
import DELETEUnfollowTag from '~/Route/Tag/DELETEUnfollowTag';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
 padding-right: 16px;
 background-color: #ffffff;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleContainer = Styled.View`
 background-color: #ffffff;
`;

const HeaderTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
padding-top: 12px;
padding-bottom: 16px;
background-color: #ffffff;
`;

const HeaderFilterIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const KeywordItemListContainer = Styled.View`
 padding-top: 2px;
 padding-bottom: 2px;
 align-items: center;
 flex-direction: row;
 background-color: #ffffff;
`;

const KeywordItemBackground = Styled.View`
 margin-left: 8px;
 border-radius: 7px;
 border-width: 1px;
 border-color: #ECECEE;
 flex-direction: row;
`;

const KeywordItemContainer = Styled.View`
padding-left: 12px;
padding-top: 8px;
padding-bottom: 8px;
padding-right: 10px;
align-items: center;
flex-direction: row;
background-color: #ffffff;
`;

const KeywordProfileContainer = Styled.View`
padding-left: 12px;
padding-top: 4px;
padding-right: 10px;
padding-bottom: 4px;
align-items: center;
flex-direction: row;
`;


const KeywordItemProfileImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
border-radius: 100px;
border-width: 0.6px;
border-color: #F4F4F7;
`;

const KeywordItemText = Styled.Text`
color: #1D1E1F;
font-size: 15px;
font-weight: 500;
`;

const RemoveKeywordItemContainer = Styled.View`
align-items: center;
justify-content: center;
padding-left: 0px;
padding-right: 12px;
`;

const RemoveKeywordIcon = Styled.Image`
 width: ${wp('4.26%')};
 height: ${wp('4.26%')};
`;

const FilterModalContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('59%')};
 background-color: #FFFFFF;
 border-top-left-radius: 14px;
 border-top-right-radius: 14px;
`;


const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 22px;
 align-items: center;
`;

const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;

const ModalTitleContainer = Styled.View`
padding-top: 8px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ModalTitleText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #1D1E1F;
`;

const ModalApplyText = Styled.Text`
font-size: 16px;
color: #267DFF;
`;

const ModalTabContainer = Styled.View`
height: ${wp('12.5%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const ModalTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const ModalTabLabelText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SearchResultListContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const FeedListTabContainer = Styled.View`
 background-color: #ffffff;
`;

const CollectionListTabContainer = Styled.View`
 background-color: #ffffff;
 padding-top: 3px;
`;

const SingleKeywordContainer = Styled.View`
 padding-top: 12px;
 padding-bottom: 12px;
 padding-left: 16px;
 padding-right: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const SingleKeywordItemContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('18%')};
`;

const SingleKeywordInfoContainer = Styled.View`
 flex-direction: row;
`;

const SingleKeywordImage = Styled.Image`
 border-radius: 100px;
 width: ${wp('13.3%')};
 height: ${wp('13.3%')};
`;

const SingleKeywordTextContainer = Styled.View`
 width: ${wp('56%')};
 margin-left: 10px;
`;

const SingleKeywordFeedCountText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #1D1E1F;
`;

const SingleKeywordDescripText = Styled.Text`
 margin-top: 3px;
 font-size: 15px;
 color: #8E9199;
`;

const SingleKeywordFollowButton = Styled.View`
width: ${wp('17%')};
height: ${wp('8.5%')};
background-color: #267DFF;
border-radius: 8px;
align-items: center;
justify-content: center;
`;

const SingleKeywordFollowText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #FFFFFF;
`;


const SingleKeywordFollowingButton = Styled.View`
width: ${wp('17%')}
height: ${wp('8.5%')};
border-radius: 8px;
background-color: #ffffff;
justify-content: center;
align-items: center;
border-width: 1px;
border-color: #77A7F1;
`;

const SingleKeywordFollowingText = Styled.Text`
 font-size: 14px;
 font-weight: 500;
 color: #77A7F1;
`;

const NoSearchResultContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('50%')};
 align-items: center;
 justify-content: center;
 background-color: #ffffff;
`;

const NoSearchResultText = Styled.Text`
 font-size: 15px;
 color: #56575C;
`;

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('100%')};
 background-color: #FFFFFF;
 margin-top: ${hp('35%')};
 align-items: center;
`;



  const containerHeight = Dimensions.get("window").height;
  

interface Props {
    navigation: any,
    route: any,
}

var feedOffset = 0;
var feedLimit = 10;

var collectionOffset = 0;
var collectionLimit = 10;

const SearchResultScreen = ({navigation, route}: Props) => {
    const [keywordList, setKeywordList] = useState<Array<object>>([]);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>(1);
    const [feedListTabHeight, setFeedListTabHeight] = useState<number>(containerHeight);
    const [collectionListTabHeight, setCollectionListTabHeight] = useState<number>(containerHeight);
    const [searchResultFeedListData, setSearchResultFeedListData] = useState<Array<object>>([]);
    const [searchResultCollectionListData, setSearchResultCollectionListData] = useState<Array<object>>([]);
    const [singleKeyword, setSingleKeyword] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<string>("createdAt");
    const [selectedType, setSelectedType] = useState<string>("post");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [currentUserFollowing, setCurrentUserFollowing] = useState<boolean>(false);
    const [noSearchFeedList, setNoSearchFeedList] = useState<boolean>(false);
    const [noSearchCollectionList, setNoSearchCollectionList] = useState<boolean>(false);

    const [noMoreSearchFeedData, setNoMoreSearchFeedData] = useState<boolean>(false);
    const [noMoreSearchCollectionData, setNoMoreSearchCollectionData] = useState<boolean>(false);

    const [refreshingSearchData, setRefreshingSearchData] = useState<boolean>(false);
    const [refreshingSearchCollectionData, setRefreshingSearchCollectionData] = useState<boolean>(false);
    const [loadingFeed, setLoadingFeed] = useState<boolean>(true);
    const [loadingCollection, setLoadingCollection] = useState<boolean>(true);

    const [searchSort, setSearchSort] = useState<string>("createdAt");

    
    const currentUser = useSelector((state: any) => state.currentUser);
    const dispatch = useDispatch();

    var radio_props = [
      {label: '인기순', value: 0 },
      {label: '최신순', value: 1}
    ];

    var query = "";

    useEffect(() => {
      if(currentUser?.inputedKeywordList) {
        console.log("currentUser.inputedKeywordList", currentUser.inputedKeywordList);
        if(currentUser.inputedKeywordList.length === 1) {
          if(currentUser.inputedKeywordList[0].type === "계정") {
            if(currentUser.user.nickname === currentUser.inputedKeywordList[0].item.nickname) {
              navigation.navigate("Profile");
            } else {
              navigation.navigate("AnotherUserProfileStack", {
                screen: 'AnotherUserProfileScreen',
                params: {requestedUserNickname: currentUser.inputedKeywordList[0].item.nickname, requestScreen: "SearchResultScreen"}
            }) 
            }
          } else {
            setSingleKeyword(true);
          }
        }

        currentUser.inputedKeywordList.forEach((keyword: any, index: number) => {
          if(keyword.type === "태그") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "tag:" + keyword.item.name  
            } else {
              query = query + "tag:" + keyword.item.name + ","
            }
          } else if(keyword.type === "계정") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "user:" + keyword.item.nickname
            } else {
              query = query + "user:" + keyword.item.nickname + ","
            } 
          } else if(keyword.type === "장소") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "address:" + keyword.item.address
            } else {
              query = query + "address:" + keyword.item.address + ","
            }
          }

          setTimeout(() => {
            feedOffset = 0;
            feedLimit = 10;

            collectionOffset = 0;
            collectionLimit = 10;

            setSearchQuery(query);
            keywordSearchFeedList(query, searchSort, feedOffset, feedLimit);
            keywordSearchCollectionList(query, searchSort, collectionOffset, collectionLimit);
          })
        })
      }

    }, [currentUser, searchSort])

    const keywordSearchFeedList = (query: string, order: string, feedOffset: number, feedLimit: number) => {
      GETSearchResult("post", query, order, feedOffset, feedLimit)
            .then(function(response) {
            console.log("keywordSearchFeedList response", response);
            setSearchResultFeedListData(response.data);
            setLoadingFeed(false);
            setRefreshingSearchData(false);
            if(response.data.length == 0) {
              setNoSearchFeedList(true);
            } else {
              setNoSearchFeedList(false);
            }
            var tmpKeywordList = currentUser?.inputedKeywordList;
            if(currentUser?.inputedKeywordList.length === 1) {
              if(currentUser.inputedKeywordList[0]?.type === "태그") {
                if(response.tagFollowing[currentUser.inputedKeywordList[0]?.item.name]) {
                  console.log("태그 팔로우됌")
                  setCurrentUserFollowing(true)
                } else {
                  setCurrentUserFollowing(false)
                } 
              } else if(currentUser.inputedKeywordList[0]?.type === "계정") {
                if(response.tagFollowing[currentUser.inputedKeywordList[0]?.item.nickname]) {
                  setCurrentUserFollowing(true)
                } else {
                  setCurrentUserFollowing(false)
                }
              }
            }
            //dispatch(allActions.userActions.setInputedKeywordList(tmpKeywordList));
            })
            .catch(function(error) {
            console.log("GETSearchResult error", error);
      })
    }

    const keywordSearchCollectionList = (query: string, order: string, collectionOffset: number, collectionLimit: number) => {
      GETSearchResult("collection", query, order, collectionOffset, collectionLimit)
      .then(function(response) {
        console.log("GETSearch Collection response", response);
        setLoadingCollection(false);
        setSearchResultCollectionListData(response.data);
        setRefreshingSearchCollectionData(false);
        if(response.data.length == 0) {
          setNoSearchCollectionList(true);
        } else {
          setNoSearchCollectionList(false);
        }
        
      })
      .catch(function(error) {
        console.log("GETSearch Collection error", error);
      })
    }

    const showFilterModal = () => {
        setFilterModalVisible(true);
    }

    const onPressRadioButton = (i: number) => {
        setSelectedRadioIndex(i)
        console.log("selectedRadioIndex", i);
    }

    const applySearchSort = () => {
        setFilterModalVisible(false);
        if(selectedRadioIndex == 0 && searchSort === "createdAt") {
          setSearchSort("popular");
          /*
          setTimeout(() => {
          keywordSearchFeedList(searchQuery ,selectedType, "popular", 0, 20);
          }, 10)
          */
        } else if(selectedRadioIndex == 1 && searchSort === "popular") {
          setSearchSort("createdAt");
          /*
          setTimeout(() => {
            keywordSearchFeedList(searchQuery ,selectedType, "createdAt", 0, 20);
          }, 10)
          */
        }
    }

    const measureFeedListTab = (event) => {
        setFeedListTabHeight(event.nativeEvent.layout.height);
    }

    const measureCollectionListTab = (event) => {
        setCollectionListTabHeight(event.nativeEvent.layout.height);
    }

    const removeKeywordItem = (index:number) => {
        var removedKeywordList = currentUser.inputedKeywordList;
        removedKeywordList.splice(index, 1);
        dispatch(allActions.userActions.setInputedKeywordList(removedKeywordList));
    }

    const followKeyword = () => {
      setCurrentUserFollowing(true)
      POSTFollowTag(currentUser.inputedKeywordList[0]?.item.id)
      .then(function(response) {
        console.log("followKeyword response", response);
      })
      .catch(function(error) {
        console.log("followKeyword error", error);
      })
    }

    const unfollowKeyword = () => {
      setCurrentUserFollowing(false);
      DELETEUnfollowTag(currentUser.inputedKeywordList[0]?.item.id)
      .then(function(response) {
        console.log("unfollowKeyword response", response);
      })
      .catch(function(error) {
        console.log("unfollowKeyword error", error);
      })

    }

    const selectKeywordListItem = (index: number) => {
      console.log("index", index);
      var tmpKeywordList = currentUser.inputedKeywordList;
      var selectedSingleKeywordList = tmpKeywordList.splice(index, 1);
      dispatch(allActions.userActions.setInputedKeywordList(selectedSingleKeywordList));
      console.log("selectedSingleKeywordList", selectedSingleKeywordList);
      console.log("currentUser.inputedKeywordList", currentUser.inputedKeywordList);
    }

    const selectProfileKeywordListItem = (index: number, item: object) => {
      navigation.navigate("AnotherUserProfileStack", {
        screen: 'AnotherUserProfileScreen',
        params: {requestedUserNickname: item.item.nickname}
      })
      
    }

    const navigateGoBack = () => {
      navigation.goBack();
      setTimeout(() => {
        if(route.params?.requestType === "trendTag") {
          dispatch(allActions.userActions.setInputedKeywordList([]))
        }
      })
    }

    const onRefreshSearchFeedData = () => {
      console.log("피드데이터 리로드")
      feedOffset = 0;
      feedLimit = 10;

      setRefreshingSearchData(true);
      setNoMoreSearchFeedData(false);

      setTimeout(() => {
        keywordSearchFeedList(searchQuery, searchSort, feedOffset, feedLimit);
      }, 10);
    }

    const onRefreshSearchCollectionData = () => {
      collectionOffset = 0;
      collectionLimit = 10;

      setRefreshingSearchCollectionData(true);
      setNoMoreSearchCollectionData(false);

      setTimeout(() => {
        keywordSearchCollectionList(searchQuery, searchSort, collectionOffset, collectionLimit);
      }, 10);
    }

    const loadMoreSearchFeedData = () => {
      if(noMoreSearchFeedData || refreshingSearchData) {
        return
      } else {
      console.log("게시글 검색 결과 무한 스크롤");
  
      feedOffset = feedOffset + 10;
      feedLimit = feedLimit + 10;

      console.log("offset", feedOffset);
      console.log("limit", feedLimit);


      setTimeout(() => {
        GETSearchResult("post", searchQuery, searchSort, feedOffset, feedLimit)
              .then(function(response) {
              console.log("GETSearchResult response", response);
              if(response.data.length === 0) {
                console.log("더이상 불러올 데이터 없음")
                setNoMoreSearchFeedData(true);
              } else {
              setSearchResultFeedListData(searchResultFeedListData.concat(response.data));
              }
              })
              .catch(function(error) {
              console.log("GETSearchResult error", error);
        })
      }, 50)
      }
    }

    const loadMoreSearchCollectionData = () => {
      if(noMoreSearchCollectionData || refreshingSearchCollectionData) {
        return
      } else {
      console.log("컬렉션 검색 결과 무한 스크롤");
  
      collectionOffset = collectionOffset + 10;
      collectionLimit = collectionLimit + 10;

      console.log("offset", collectionOffset);
      console.log("limit", collectionLimit);


      setTimeout(() => {
        GETSearchResult("collection", searchQuery, searchSort, collectionOffset, collectionLimit)
              .then(function(response) {
              console.log("GETSearchResult response", response);
              if(response.data.length === 0) {
                setNoMoreSearchCollectionData(true);
              } else {
              setSearchResultCollectionListData(searchResultCollectionListData.concat(response.data));
              }
              })
              .catch(function(error) {
              console.log("GETSearchResult error", error);
        })
      }, 50)
      }
    }

    const keywordListContainer = () => {
      
      if(!singleKeyword) {
        return (
          <KeywordItemListContainer>
              <FlatList
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={"handled"}
              horizontal={true}
              data={currentUser.inputedKeywordList}
              renderItem={renderKeywordItem}
              />
          </KeywordItemListContainer>    
      )
      } else {
        return (
          <SingleKeywordItemContainer>
            {currentUser.inputedKeywordList[0]?.type === "태그" && (
              <SingleKeywordContainer>
                <SingleKeywordInfoContainer>
              <SingleKeywordImage
              source={require('~/Assets/Images/SearchResult/ic_tagImage.png')}/>
              <SingleKeywordTextContainer>
              <SingleKeywordFeedCountText>{((currentUser.inputedKeywordList[0]?.item.reviewNum != undefined) ? currentUser.inputedKeywordList[0]?.item.reviewNum : "0")  + "개의 게시물"}</SingleKeywordFeedCountText>
                <SingleKeywordDescripText>{currentUserFollowing ? "이미 팔로우하신 태그입니다." : "#" + currentUser.inputedKeywordList[0]?.item.name + "를(을) 팔로우하고 소식을 받아보세요."}</SingleKeywordDescripText>
              </SingleKeywordTextContainer>
              </SingleKeywordInfoContainer>
              {currentUserFollowing && (
              <TouchableWithoutFeedback onPress={() => unfollowKeyword()}>
                <SingleKeywordFollowingButton>
                  <SingleKeywordFollowingText>팔로잉</SingleKeywordFollowingText>
                </SingleKeywordFollowingButton>
                </TouchableWithoutFeedback>
              )}
              {!currentUserFollowing && (
              <TouchableWithoutFeedback onPress={() => followKeyword()}>
              <SingleKeywordFollowButton>
              <SingleKeywordFollowText>팔로우</SingleKeywordFollowText>
            </SingleKeywordFollowButton>
            </TouchableWithoutFeedback>
              )}
              </SingleKeywordContainer>
            )}
            {currentUser.inputedKeywordList[0]?.type === "장소" && (
              <SingleKeywordContainer>
                <SingleKeywordInfoContainer>
              <SingleKeywordImage
              source={require('~/Assets/Images/SearchResult/ic_placeImage.png')}/>
              <SingleKeywordTextContainer>
                <SingleKeywordFeedCountText>{(currentUser.inputedKeywordList[0]?.item.reviewNum != undefined) ? currentUser.inputedKeywordList[0]?.item.reviewNum : "0"  + "개의 게시물"}</SingleKeywordFeedCountText>
                <SingleKeywordDescripText>{currentUser.inputedKeywordList[0]?.item.address}</SingleKeywordDescripText>
              </SingleKeywordTextContainer>
              </SingleKeywordInfoContainer>
              </SingleKeywordContainer>
            )}
          </SingleKeywordItemContainer>
        )
      }
    }

    const renderKeywordItem = ({item, index}: any) => {
        if(item.type == "태그") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <TouchableWithoutFeedback onPress={() => selectKeywordListItem(index)}>
                <KeywordItemContainer>
                    <KeywordItemText>{"#" + item.item.name}</KeywordItemText>
                </KeywordItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "계정") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}> 
                <TouchableWithoutFeedback onPress={() => selectProfileKeywordListItem(index, item)}>
                <KeywordProfileContainer>
                    <KeywordItemProfileImage
                    source={{uri:item.item.profileImg}}/>
                    <KeywordItemText
                    style={{marginLeft: 6}}
                    >{item.item.nickname}</KeywordItemText>
                </KeywordProfileContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "장소") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <TouchableWithoutFeedback onPress={() => selectKeywordListItem(index)}>
                <KeywordItemContainer>
                    <KeywordItemText>{item.item.address}</KeywordItemText>
                </KeywordItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        }
    }


    const renderFeedItem = ({item, index}: any) => {
        return (
            <MemoizedFeedItem
                  id={item.id}
                  profile_image={item.user.profileImg}
                  nickname={item.user.nickname}
                  createdAt={item.createdAt}
                  rating={item.starRate}
                  main_tag={item.mainTags.name}
                  sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
                  sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
                  like_count={item.likes}
                  comment_count={item.commentsCount}
                  reply_count={item.replysCount}
                  mediaFiles={item.mediaFiles}
                  image_count={item.mediaFiles.length}
                  location={item.address?item.address.address:null}
                  expense={item.expense?item.expense:null}
                  desArray={item.descriptions}
                  navigation={navigation}
                  productArray={item.Products}
                />
        )
    }

    const renderCollectionItem = ({item, index}: any) => {
      return (
        <CollectionItem
        collectionId={item.id ? item.id : null}
        coverImage={item.coverImg ? item.coverImg : null}
        name={item.name ? item.name : null}
        navigation={navigation}
        profileNickname={item.Posts[0] ? item.Posts[0].user.nickname : null}
        profileImage={item.Posts[0] ? item.Posts[0].user.profileImg : null}
        />

      )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleContainer>
                <FlatList
                contentContainerStyle={{backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center'}}
                horizontal={true}
                data={currentUser.inputedKeywordList}
                renderItem={({item, index}) => {
                  if(item.type === "태그") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ?"#" + item.item.name : "#" + item.item.name +", "}</HeaderTitleText>
                    )
                  } else if(item.type === "장소") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ? item.item.address : item.item.address + ", "}</HeaderTitleText>
                  )
                  } else if(item.type === "계정") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ? item.item.nickname : item.item.nickname + ", "}</HeaderTitleText>
                  )
                  }
                }}/>
                </HeaderTitleContainer>
                <TouchableWithoutFeedback onPress={() => showFilterModal()}>
                    <HeaderRightContainer>
                        <HeaderFilterIcon
                        source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <ScrollableTabView
            refreshingFeed={refreshingSearchData}
            refreshingCollection={refreshingSearchCollectionData}
            onRefreshFeed={onRefreshSearchFeedData}
            onRefreshCollection={onRefreshSearchCollectionData}
            loadMoreSearchFeedData={loadMoreSearchFeedData}
            loadMoreSearchCollectionData={loadMoreSearchCollectionData}
            collapsableBar={keywordListContainer()}
            initialPage={0}
            tabContentHeights={[feedListTabHeight, collectionListTabHeight]}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <SearchResultTabBar/>}
            >
            <FeedListTabContainer
            onLayout={(event) => measureFeedListTab(event)}
            tabLabel="게시글">
            {loadingFeed && (
              <LoadingContainer>
                <ActivityIndicator/>
              </LoadingContainer>
            )}
            {!loadingFeed && (
            <SearchFeedList
            route={route}
            navigation={navigation}
            feedListData={searchResultFeedListData}/>
            )}
            </FeedListTabContainer>
            <CollectionListTabContainer
            onLayout={(event) => measureCollectionListTab(event)}
            tabLabel="컬렉션">
            {loadingCollection && (
              <LoadingContainer>
                <ActivityIndicator/>
              </LoadingContainer>
            )}
            {!noSearchCollectionList && !loadingCollection && (
            <FlatList
            columnWrapperStyle={{justifyContent:'space-between', paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, backgroundColor:'#ffffff'}}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index: any) => index}
            data={searchResultCollectionListData}
            renderItem={renderCollectionItem}/>
            )}
            {noSearchCollectionList && !loadingCollection && (
            <NoSearchResultContainer>
              <NoSearchResultText>검색된 컬렉션이 없어요.</NoSearchResultText>
            </NoSearchResultContainer>
            )}
            </CollectionListTabContainer>
            </ScrollableTabView>
            <Modal
            style={styles.filterModal}
            isVisible={filterModalVisible}
            backdropOpacity={0.25}>
                <FilterModalContainer>
                    <ModalHeaderContainer>
                        <ModalToggleButton/>
                    </ModalHeaderContainer>
                    <ModalTitleContainer>
                        <ModalTitleText>
                            검색 필터
                        </ModalTitleText>
                        <TouchableWithoutFeedback onPress={() => applySearchSort()}>
                        <ModalApplyText>
                            적용
                        </ModalApplyText>
                        </TouchableWithoutFeedback>
                         </ModalTitleContainer>
                            <RadioForm>
                            {radio_props.map((obj, i) => (
                            <TouchableWithoutFeedback onPress={() => onPressRadioButton(i)}>
                            <ModalTabContainer>
                            <ModalTabInfoContainer>
                            <RadioButton 
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 250, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedRadioIndex === i}
                                onPress={() => onPressRadioButton(i)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                            </ModalTabInfoContainer>
                            </ModalTabContainer>
                            </TouchableWithoutFeedback>
                             ))}
                           </RadioForm>
                </FilterModalContainer>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    firstKeyword: {
        marginLeft: 10,
    },
    lastKeyword: {
        marginRight: 10,
    },
    filterModal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})

export default SearchResultScreen;


