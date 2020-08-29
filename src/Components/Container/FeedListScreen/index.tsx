import React, {useEffect, useState, useMemo} from 'react';
import {TouchableWithoutFeedback, FlatList, View, Keyboard, ScrollView, RefreshControl} from 'react-native';
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
 align-items: center;
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
 padding-bottom: 200px;
 background-color: #ffffff;
 justify-content: center;
 align-items: center;
`;

const FeedListContainer = Styled.View`
 width: ${wp('100%')}px;
 padding-bottom: 85px;
 background-color: #ffffff;
`;

const NoFeedText = Styled.Text`
 font-size: 17px;
 color: #c3c3c3;
`;

const BodyContainer = Styled.View`
 background-color: #ffffff;
`;


const TagAutoCompleteContainer = Styled.View`
width: ${wp('100%')}px;
top: 0px;
position: absolute;
background-color: #ffffff;
`;

const TEST_FEED_DATA = [
  {
    id: 1,
    user : {
      profileImg: 'https://i.pinimg.com/564x/36/64/bb/3664bbe5c35418ab85850b6314a84366.jpg',
      nickname: '카페인중독자'
    },
    createAt: '2020-05-22',
    starRate: 4.5,
    commentsCount: 12,
    replysCount: 3,
    likes: 23,
    mainTags : {
      name: '을지로'
    },
    subTagOnes: {
      name: '챔프커피'
    },
    subTagTwos: {
      name: '카페투어'
    },
    address : {
      address: '을지로 세운 대림상가 3층'
    },
    expense: "7,000",
    descriptions: [
      {
        description: "이태원에서 이제는 을지로 세운대림상가에 오픈을 한 을지로 '챔프커피' 3호점 입니다. 벌써 3호점이라니 대단합니다. "
      },
      {
        description: "내용2"
      }
    ],
    mediaFiles: [
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F88HeB%2Fbtqvzgs1M1X%2Ftjan249YhEJsAdZPKVSXsK%2Fimg.png'
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUrtBr%2FbtqvAAqwXeS%2F6g7fhDFgLs9Ks9BKvOZGZK%2Fimg.png'
      }
    ],
    paragraphData: [
      {
        type:"description",
        description: "내용1"
      },
      {
        type:"image",
        url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
      },
      {
        type:"description",
        description: "내용2"
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
      }
    ]
  },
  {
    id: 2,
    user : {
      profileImg: 'https://img.jjang0u.com/data3/chalkadak/306/201909/15/156850056031677.jpg',
      nickname: '고기조아'
    },
    createAt: '2020-06-22',
    starRate: 4,
    mainTags : {
      name: '멘야하나비'
    },
    subTagOnes: {
      name: '비빔라면'
    },
    subTagTwos: {
      name: '일식'
    },
    likes: 5,
    commentsCount: 3,
    replysCount: 1,
    address : {
      address: '멘야하나비 서울본점'
    },
    expense: "10,900",
    descriptions: [
      {
        description: "석촌 호수 인근에 위치한 '멘야하나비'는 일본 비빔라면이 주메뉴. 다소 생소해 보이지만 툭 치고 올라오는 쫄깃하고 매콤한 맛의, 볶은 고기와..."
      },
      {
        description: "ㅎ"
      }
    ],
    mediaFiles: [
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG'
      }
    ],
    paragraphData: [
      {
        type:"description",
        description: "내용1"
      },
      {
        type:"image",
        url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
      },
      {
        type:"description",
        description: "내용2"
      }
    ]
  },
  {
    id: 3,
    user : {
      profileImg: 'https://femiwiki-uploaded-files.s3.amazonaws.com/b/b5/%EB%85%B8%EB%9E%91%EC%83%89.png',
      nickname: '데헷'
    },
    createAt: '2020-05-22',
    starRate: 1.5,
    mainTags : {
      name: '스타벅스'
    },
    subTagOnes: {
      name: '포크커틀릿샌드위치'
    },
    likes: 233,
    address : {
      address: '스타벅스 범계역점'
    },
    expense: 5900,
    descriptions: [
      {
        description: "겹겹히 쌓은 등심으로 풍부한 식감의 커틀릿에 할라피뇨, 당근 잼을 넣어 매콤 달콤한 맛을 살린 든든한 샌드위치.. 라고 홈페이지에 소개 되어..."
      },
      {
        description: "내용2"
      }
    ],
    mediaFiles: [
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
      }
    ],
    paragraphData: [
      {
        type:"description",
        description: "내용1"
      },
      {
        type:"image",
        url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
      },
      {
        type:"description",
        description: "내용2"
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
      }
    ]
  },
];

const POPULAR_TAG_DATE = [
  {
    tag_image:
      'https://item.kakaocdn.net/do/aebede13eed766c14f8e46d68509586c7154249a3890514a43687a85e6b6cc82',

    tag_name: '아무거나',
  },
  {
    tag_image:
      'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/83096173_570405996888776_2961831972565807746_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=NvpWEnbC9AcAX_R_890&oh=c8945d8c09c40c2910563e0f8a22b621&oe=5EF86D59',
    tag_name: '배고파',
  },
];

interface Props {
  navigation: any,
  route: any
}

var offset = 0;
var limit = 20;

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
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.currentUser);
  const home = useSelector((state: any) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    getFeedData();
    //setFeedListData(TEST_FEED_DATA);
    if(currentUser.user) {
    console.log("currentUser.user.likeFeeds@@", currentUser.user.likeFeeds);
    }
    var hasLocationPermission = true;
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
              console.log("현재 위치", position);
              setCurrentLocation(position.coords);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
  }, []);

  useEffect(() => {
    GETSearchAutoComplete(query, category)
    .then(function(response) {
      console.log("검색 자동 완성", response);
      setAutoComplete(response.result);
    })
    .catch(function(error) {
      console.log("검색 자동 완성 실패", error);
    })
  }, [query, category])

  const getAllFeedData = () => {
      // 서버테스트용 데이터
      //setFeedListData(TEST_FEED_DATA);
    GetAllFeed().then(function(response) {
      setFeedListData(response);
      setRefreshing(false)
      setOnRefreshFeedList(!onRefreshFeedList)
      console.log("파드 목록 가져오기 성공@@", response);
    })
    .catch(function(error) {
      console.log("피드 목록 가져오기 실패", error);
    })
  };


  const getFeedData = () => {
    GETFeed(offset, limit).then(function(response) {
    console.log("파드 목록 가져오기 성공@@@", response);
    setFeedListData(response.result);
    //dispatch(allActions.feedListAction.setHomeFeedList(response.result));
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

  const changingSearchInput = (text:string) => {
    setQuery(text);
  }

  const changeSearchCategory = (changedCategory: string) => {
    setCategory(changedCategory)
  }

  const moveNearFeedMap = () => {
      console.log("currentLocation", currentLocation);

      navigation.navigate("NearFeedMapScreen", {
        currentLatitude: currentLocation.latitude,
        currentLongitude: currentLocation.longitude,
    })
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
    limit = 20;
    console.log("onRefreshFeedListData")
    setRefreshing(true)
    setNoMoreFeedListData(false);
    setTimeout(() => {
      getFeedData()
    }, 10)
  } 

  const loadMoreFeedListData = () => {
    setLoading(true);
    if(noMoreFeedListData) {
      return
    }
    if(!noMoreFeedListData) {
      console.log("피드리스트 데이터 더 불러오기")
      offset = offset + 20;
      limit = limit + 20;
      var url = baseUrl + '/feed?offset=' + offset + "&limit=" + limit;  
     
      axios
       .get(url)
       .then(function(response) {
       if(response.data.result.length === 0) {
         console.log("더이상 불러올 데이터 없음", feedListData);
         setNoMoreFeedListData(true);
         setLoading(false);
       } else if(response.data.result.length > 0) {
         console.log("불러올 데이터 존재")
         setLoading(false);
         setFeedListData(feedListData.concat(response.data.result))
       }
       })
       .catch(function(error) {
         console.log("피드 불러오기 실패", error);       
       })
  }
  }

  const renderFeedItem = ({item, index}: any) => {
    return (
      <MomoizedFeedItem
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
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefreshFeedListData}
        />}
      onMomentumScrollEnd={onScrollBottom}
      >
      <BodyContainer>
      {feedListData[0] && (
      <FeedListContainer>
      <FlatList
      showsVerticalScrollIndicator={false}
      data={feedListData}
      renderItem={renderFeedItem}
      />
      </FeedListContainer>
      )}
      {!feedListData[0] && (
      <NoFeedListContainer>
        <NoFeedText>등록된 게시글이 없습니다.</NoFeedText>
      </NoFeedListContainer>
      )}
      </BodyContainer>
      </ScrollView>
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
