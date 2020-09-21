import React, {useEffect, useState, useMemo, useRef} from 'react';
import {TouchableWithoutFeedback, FlatList, View, Keyboard, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import allActions from '~/action';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

// Local Component
//import FeedItem from '~/Components/Presentational/FeedListScreen/MomoizedFeedItem';
import MomoizedFeedItem from '~/Components/Presentational/FeedListScreen/MomoizedFeedItem';

import PopularTagItem from '~/Components/Presentational/FeedListScreen/PopularTagItem';
import SearchBar from '~/Components/Presentational/FeedListScreen/SearchBar'
import SearchResult from '~/Components/SearchResult';
import SearchAutoComplete from '~/Components/Presentational/SearchScreen/SearchAutoCompleteItem';

// Route
import GetAllFeed from '~/Route/Post/TestFeed';
import GETSearchAutoComplete from '~/Route/Search/GETSearchAutoComplete';
import GETFeed from '~/Route/Home/GETFeed';



const Container = Styled.SafeAreaView`
 background-color: #ffffff;
 flex:1;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;


const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #333333;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 8px 10px 15px
 align-items: center;
 justify-content: center;
`;

const ReviewMapIcon = Styled.Image`
 width: ${wp('8%')}px;
 height: ${wp('8%')}px;
`;

const NoFeedListContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 padding-bottom: ${hp('30%')}
 background-color: #ffffff;
 justify-content: center;
 align-items: center;
`;

const FeedListContainer = Styled.View`
 width: ${wp('100%')}px;
 padding-bottom: ${isIphoneX() ? hp("5.5%") : hp("8%")}
 background-color: #ffffff;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;


const TagAutoCompleteContainer = Styled.View`
width: ${wp('100%')}px;
top: 0px;
position: absolute;
background-color: #ffffff;
`;

const LoadingContainer = Styled.View`
width: ${wp('100%')};
height:${hp('100%')};
margin-top: ${hp('35%')};
 background-color:#FFFFFF;
 align-items: center;
`;

const NoFeedEmoji = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const NoFeedMainText = Styled.Text`
margin-top: 8px;
font-weight: 600;
color: #1D1E1F;
font-size: 18px;

`;

const NoFeedSubText = Styled.Text`
margin-top: 5px;
font-size: 15px;
color: #56575C;
`;


interface Props {
  navigation: any,
  route: any
}

var offset = 0;
var limit = 10;

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com'; 

function FeedListScreen({navigation, route}: Props) {
  const [feedListData, setFeedListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [desArray, setDesArray] = useState();
  const [query, setQuery] = useState();
  const [category, setCategory] = useState("popular");
  const [autoComplete, setAutoComplete] = useState();
  const [resultCategory, setResultCategory] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [onRefreshFeedList, setOnRefreshFeedList] = useState<boolean>(false);
  const [noMoreFeedListData, setNoMoreFeedListData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const currentUser = useSelector((state: any) => state.currentUser);
  const feedList = useSelector((state: any) => state.feedList);
  const dispatch = useDispatch();

  const homeFeedListRef = useRef(null);

  console.log("feedList", feedList);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('background state notification: ',remoteMessage);
      if(remoteMessage.data.type === "comment") {
        navigation.navigate("FeedStack", {
          screen: "CommentListScreen",
          params: {
          postId: remoteMessage.data.postId,
          pushAlarm: true,
          }
        })
      } else if(remoteMessage.data.type === "like") {
        navigation.navigate("FeedStack", {
          screen: 'LikeListScreen',
          params: {
          postId: remoteMessage.data.postId,
          pushAlarm: true,
          }
        })
      } else if(remoteMessage.data.type === "follow") {
        navigation.navigate("AnotherUserProfileStack", {
          screen: 'AnotherUserProfileScreen',
          params: {requestedUserNickname: remoteMessage.data.userNickname}
        });
      } else if(remoteMessage.data.type === "reply") {
        
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('quite state notification: ', remoteMessage);
          if(remoteMessage.data.type === "comment") {
            navigation.navigate("FeedStack", {
              screen: "CommentListScreen",
              params: {
              postId: remoteMessage.data.postId,
              pushAlarm: true,
              }
            })
          } else if(remoteMessage.data.type === "like") {
            navigation.navigate("FeedStack", {
              screen: 'LikeListScreen',
              params: {
              postId: remoteMessage.data.postId,
              pushAlarm: true,
              }
            })
          } else if(remoteMessage.data.type === "follow") {
            navigation.navigate("AnotherUserProfileStack", {
              screen: 'AnotherUserProfileScreen',
              params: {requestedUserNickname: remoteMessage.data.userNickname}
            });
          } else if(remoteMessage.data.type === "reply") {
            
          }
        }
      });
  });

  useEffect(() => {
    if(feedList.homeTabPress) {
      console.log("홈탭 눌림");
      homeFeedListRef.current.scrollTo({x: 0, y: 0, animated: true})
      dispatch(allActions.feedListAction.setHomeTabPress(false))
    }
  }, [feedList])

  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = () => {
    GETFeed(offset, limit)
    .then(function(response) {
    console.log("홈 피드 목록 가져오기 성공", response);
    //setFeedListData(response.result);
    dispatch(allActions.feedListAction.setHomeFeedList(response.result));
    setLoading(false);
    setRefreshing(false)
    setOnRefreshFeedList(!onRefreshFeedList)
  })
  .catch(function(error) {
    console.log("피드 목록 가져오기 실패", error);
  })
};


  const onFocusSearch = () => {
    setSearchFocus(true);
  }
  
  const onBlurSearch = () => {
    if(searchFocus === true) {
    setSearchFocus(false);
    Keyboard.dismiss();
    }
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom;
	}

  const onScrollBottom = (e: any) => {
    if(isCloseToBottom(e.nativeEvent)) {
      loadMoreFeedListData()
    }
  }


  const onRefreshFeedListData = () => {
    offset = 0;
    limit = 10;
    console.log("onRefreshFeedListData")
    setRefreshing(true)
    setNoMoreFeedListData(false);
    setTimeout(() => {
      getFeedData()
    }, 10)
  } 

  const loadMoreFeedListData = () => {
    if(noMoreFeedListData) {
      return
    }
    if(!noMoreFeedListData) {
      console.log("피드리스트 데이터 더 불러오기")
      offset = offset + 10;
      var url = baseUrl + '/feed?offset=' + offset + "&limit=" + limit;  

      console.log("피드리스트데이터 불러오기 offset", offset);
      console.log("피드리스트 데이터 불러오기 limit", limit)
     
      axios
       .get(url)
       .then(function(response) {
       if(response.data.result.length === 0) {
         console.log("더이상 불러올 데이터 없음", feedListData);
         setNoMoreFeedListData(true);
       } else if(response.data.result.length > 0) {
         console.log("불러올 데이터 존재", response.data.result.length)
         //setFeedListData(feedListData.concat(response.data.result)) 
        dispatch(allActions.feedListAction.setHomeFeedList(feedList.homeFeedList.concat(response.data.result)));
        
       }
       })
       .catch(function(error) {
         console.log("피드 불러오기 실패", error);       
       })
  }
  }

  const renderFeedItem = ({item, index}: any) => {
    console.log("홈화면 renderFeedItem item", item);
    return (
      <MomoizedFeedItem
        id={item.id}
        profile_image={item.user.thumbnailImg}
        nickname={item.user.nickname}
        createdAt={item.createdAt}
        rating={item.starRate}
        main_tag={item.mainTags.name}
        sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
        sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
        like_count={item.likes}
        comment_count={item.commentsCount}
        reply_count={item.replysCount}
        scrap_count={0}
        mediaFiles={item.mediaFiles}
        image_count={item.mediaFiles.length}
        location={item.address?item.address.address:null}
        expense={item.expense?item.expense:null}
        desArray={item.descriptions}
        navigation={navigation}
        productArray={item.Products}
        userLike={item.Likers}
        userScrap={item.Scraps}
        />
   )
}
  
  return (
    <Container>
      <HeaderBar>
          <HeaderLeftContainer>
          <HeaderTitleText>피드</HeaderTitleText>
          </HeaderLeftContainer>
      </HeaderBar>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator
          size={"small"}/>
        </LoadingContainer>
      )}
      {!loading && (
      <ScrollView
      ref={homeFeedListRef}
      style={{backgroundColor:'#FFFFFF'}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefreshFeedListData}
        />}
      onMomentumScrollEnd={onScrollBottom}
      >
      <BodyContainer>
      {feedList.homeFeedList[0] && (
      <FeedListContainer>
      <FlatList
      showsVerticalScrollIndicator={false}
      data={feedList.homeFeedList}
      renderItem={renderFeedItem}
      />
      </FeedListContainer>
      )}
      {!feedList.homeFeedList[0] && (
      <NoFeedListContainer>
        <NoFeedEmoji
        source={require('~/Assets/Images/Emoji/emo_noFeed.png')}/>
        <NoFeedMainText>아직 게시글이 없네요.</NoFeedMainText>
        <NoFeedSubText>     추천 친구를 팔로우하고{"\n"}피드를 풍성하게 만들어보세요!</NoFeedSubText>
      </NoFeedListContainer>
      )}
      </BodyContainer>
      </ScrollView>
      )}
    </Container>
  );
}

export default FeedListScreen;

 /*
      GETFeed(offset, limit).then(function(response) {
      console.log("파드 목록 가져오기 성공", response);
      if(response.result.length === 0) {
        console.log("더이상 불러올 데이터 없음", feedListData);
        setNoMoreFeedListData(true);
        setLoading(false);
      } else if(response.result.length > 0) {
        console.log("불러올 데이터 존재")
        setLoading(false);
        setFeedListData(feedListData.concat(response.result))
        //setFeedListData([...feedListData, ...response.result])
      }
    })
    .catch(function(error) {
      console.log("피드 목록 가져오기 실패", error);
    })
    */ 
