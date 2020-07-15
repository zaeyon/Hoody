
import React, {useState, useContext, useEffect, createRef, useRef} from 'react';
import {
  NativeScrollEvent,
  Dimensions,
  NativeSyntheticEvent,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  SafeAreaView,
  Animated,
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ProfileHeader from '~/Screens/ProfileHeader';
import PinterMap from '~/Screens/PinterMap';
import {FlatGrid} from 'react-native-super-grid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import UserIntroduction from '~/Components/Presentational/ProfileScreen/UserIntroduction';
import GetUserProfile from '~/Route/Profile/GetProfileFeedByList';
import ProfileTopTabNavigator from '~/Components/Presentational/ProfileScreen/ProfileTopTabNavigator';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
 
`;

const MyProfileSettingContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
 justify-content: center;

`;

const MyProfileSettingButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const MyProfileReportContainer = Styled.View`
 width: ${wp('22%')};
 height: ${wp('9')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding-left: 4px;
 padding-right: 12px;
`;

const MyProfileReportImage = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const MyProfileReportText = Styled.Text`
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const MyProfileReviewMapContainer = Styled.View`
margin-left: 7px;
width: ${wp('22%')};
 height: ${wp('9')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const MyProfileReviewMapImage = Styled.Image`
 width: ${wp('6.6%')};
 height: ${wp('6.6%')};
`;

const MyProfileReviewMapText = Styled.Text`
 margin-left: 5px;
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const ProfileTopTabContainer = Styled.View`
`;

const CollapsibleHeaderContainer = Styled.View`
`;

const TEST_FEED_DATA = [
  {
    id: 1,
    user : {
      profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
      nickname: '테스트닉네임'
    },
    createdAt: '2020-05-22',
    starRate: 2.5,
    mainTags : {
      name: '메인태그'
    },
    subTagOnes: {
      name: '서브태그1'
    },
    subTagTwos: {
      name: '서브태그2'
    },
    likes: 233,
    address : {
      address: '블루문 스터디 카페'
    },
    expanse: 2000,
    descriptions: [
      {
        description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
      },
      {
        description: "내용2"
      }
    ],
    mediaFiles: [
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
  {
    id: 2,
    user : {
      profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
      nickname: '하하'
    },
    createdAt: '2020-06-22',
    starRate: 4,
    mainTags : {
      name: '스타벅스'
    },
    subTagOnes: {
      name: '아이스아메리카노'
    },
    subTagTwos: {
      name: '아아'
    },
    likes: 233,
    address : {
      address: '범계역 스타벅스'
    },
    expanse: 2000,
    descriptions: [
      {
        description: "범계역 스타벅스에서 BLT 샌드위치를 먹었다."
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
      profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
      nickname: '테스트닉네임'
    },
    createdAt: '2020-05-22',
    starRate: 2.5,
    mainTags : {
      name: '메인태그'
    },
    subTagOnes: {
      name: '서브태그1'
    },
    subTagTwos: {
      name: '서브태그2'
    },
    likes: 233,
    address : {
      address: '블루문 스터디 카페'
    },
    expanse: 2000,
    descriptions: [
      {
        description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
      },
      {
        description: "내용2"
      }
    ],
    mediaFiles: [
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
      },
      {
        type: 'image',
        url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
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


const TEST_COLLECTION_DATA = [
  {
    name: '컬렉션1',
    coverImage: 'https://usercontents-c.styleshare.io/images/24756885/640x640',
  },
  {
    name: '컬렉션2',
    coverImage: 'https://img.sbs.co.kr/newimg/news/20190627/201328633_1280.jpg'
  },
  {
    name: '컬렉션3',
    coverImage: 'https://blogsimages.adobe.com/creativedialogue/files/2019/05/AdobeOnColour-Campaign_Creator-Deliverable-2-1350x1350.jpg'
  }
]

const TEST_SCRAP_DATA = [
  {
    name: '스크랩 앨범1',
    coverImage: 'https://img.theqoo.net/img/lwsBV.jpg'
  },
  {
    name: '앨범2',
    coverImage: 'https://t1.daumcdn.net/cfile/tistory/9966FB475D739E5017'
  }
]

interface Props {
    navigation: any,
    route: any,
}

function ProfileScreenTest({navigation, route}: Props) {
  const [headerMaxHeight, setHeaderMaxHeight] = useState(312);
  const [minHeaderHeight, setMinHeaderHeight] = useState<boolean>(false);
  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser);
  const dispatch = useDispatch();

  var H_MAX_HEIGHT = 0;
  const H_MIN_HEIGHT = hp('6.5%') + getStatusBarHeight();
  const H_SCROLL_DISTANCE = headerMaxHeight - H_MIN_HEIGHT;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [headerMaxHeight, H_MIN_HEIGHT],
    extrapolate: "clamp"
  })
  
  const isBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  function Logout() {
    console.log('접속 사용자 정보', currentUser);
    if (currentUser.user.provider === 'kakao') {
      KakaoLogins.logout()
        .then((result) => {
          console.log('로그아웃성공', result);
          dispatch(allActions.userActions.logOut());
        })
        .catch((err) => {
          console.log('에러 발생', err.code, err.message);
        });
    } else {
      dispatch(allActions.userActions.logOut());
    }
  }

  const onChangeHeaderHeight = (event) => {
    console.log("onchange")
    console.log("event.nativeEvent.layoutheight", event.nativeEvent.layout.height);
}


  const onScrollPostList = (nativeEvent) => {
    console.log("onScrollPostList nativeEvent", nativeEvent.nativeEvent.contentOffset.y);

    Animated.event([
      {nativeEvent: { contentOffset: {y: scrollOffsetY}}}
    ])
  }

  return (
    <Container> 
      <Animated.View
      onLayout={(event) => onChangeHeaderHeight(event)}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
         top: 0,
         height: headerScrollHeight,
         overflow: "hidden",
         zIndex: 10,
      }}>
      <CollapsibleHeaderContainer
      onLayout={(event) => {
        const height = event.nativeEvent.layout.height;
        console.log("CollapsibleHeader Height", height);
        setHeaderMaxHeight(height);
      }}
      >
      <HeaderBar style={{marginTop: getStatusBarHeight()}}>
        <HeaderLeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("SettingScreen")}>
          <MyProfileSettingContainer>
          <MyProfileSettingButton
          source={require('~/Assets/Images/ic_hamburger.png')}
          />
          </MyProfileSettingContainer>
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <HeaderRightContainer>
          <MyProfileReportContainer>
            <MyProfileReportImage
            source={require('~/Assets/Images/ic_report.png')}/>
            <MyProfileReportText>리포트</MyProfileReportText>
          </MyProfileReportContainer>
          <MyProfileReviewMapContainer>
            <MyProfileReviewMapImage
            source={require('~/Assets/Images/ic_reviewMap.png')}/>
            <MyProfileReviewMapText>299</MyProfileReviewMapText>
          </MyProfileReviewMapContainer>
        </HeaderRightContainer>
      </HeaderBar>
      <UserIntroduction/>
      </CollapsibleHeaderContainer>
      </Animated.View>
      <ScrollView
      onScroll={Animated.event([
        {nativeEvent: {contentOffset: {y: scrollOffsetY}}}
      ])}
      scrollEventThrottle={5}
      >
      <ProfileTopTabContainer style={{marginTop:290}}>
      <ProfileTopTabNavigator
      navigation={navigation}
      feedListData={TEST_FEED_DATA}
      collectionListData={TEST_COLLECTION_DATA}
      scrapListData={TEST_SCRAP_DATA}
      onScrollPostList={onScrollPostList}
      scrollOffsetY={scrollOffsetY}
      />
      </ProfileTopTabContainer>
      </ScrollView>
    </Container>
  );
}

export default ProfileScreenTest;

/*
<PinterMapContainer>
          <PinterMapHeaderContainer>
            <PinterMapText>핀터맵</PinterMapText>
            <ViewAllText>View All</ViewAllText>
          </PinterMapHeaderContainer>
          <MapViewContainer>
            <MapView
              style={{height: 200}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </MapViewContainer>
        </PinterMapContainer>
        */

