import React, {useState, useEffect} from 'react';
import {
  FlatList, View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, Picker, StyleSheet,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import ScrollableTabView, { DefaultTabBar,} from 'rn-collapsing-tab-bar';

import {getCurrentUser} from '~/AsyncStorage/User';
import UserIntroduction from '~/Components/Presentational/ProfileScreen/UserIntroduction';
import AnotherUserProfileTabBar from '~/Components/Presentational/AnotherUserProfileScreen/AnotherUserProfileTabBar';
import ProfileFeedList from '~/Components/Presentational/ProfileScreen/ProfileFeedList';
import ProfileCollectionList from '~/Components/Presentational/ProfileScreen/ProfileCollectionList';

import GetProfileFeedByList from '~/Route/Profile/GetProfileFeedByList';
import GETProfileFeedByDate from '~/Route/Profile/GETProfileFeedByDate';
import GetProfileCollection from '~/Route/Profile/GetProfileCollection';

import {getStatusBarHeight} from 'react-native-status-bar-height';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const FeedListTabContainer = Styled.View`
 background-color: #ffffff;
 
`;

const CollectionListTabContainer = Styled.View`
 background-color: #ffffff;
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
`;

const MyProfileSettingContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
 justify-content: center;

`;

const MyProfileSettingButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')}; 
`;

const HeaderBackContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
 justify-content: center;
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
 padding-left: 10px;
 padding-right: 12px;
`;

const MyProfileReportImage = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const MyProfileReportText = Styled.Text`
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const MyProfileReviewMapContainer = Styled.View`
margin-left: 7px;
 height: ${wp('9')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
 flex-direction: row;
 padding-left: 9px;
 padding-right: 10px;
 justify-content: space-between;
 align-items: center;
`;

const MyProfileReviewMapImage = Styled.Image`
 width: ${wp('5.5%')};
 height: ${wp('5.5%')};
`;

const MyProfileReviewMapText = Styled.Text`
 margin-left: 5px;
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const LoadingContainer = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
 width: ${wp('100%')};
 height: ${hp('100%')};
 margin-top: ${hp('35%')};
`;
 

const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 10px;
 align-items: center;
`;

const ProfileModalContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('76%')};
 background-color: #ffffff;
 border-top-left-radius: 10px;
 border-top-right-radius: 10px;
 padding-bottom: 30px;
`;

const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;

const ModalTabItemContainer = Styled.View`
 height: ${wp('17%')};
 flex-direction: row;
 align-items: center;
 padding-left: 16px;
 padding-right: 16px;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const ModalTabItemIconImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #1D1E1F;
`;

const ModalTabItemLabelText = Styled.Text`
 margin-left: 11px;
 font-size: 18px;
 color: #1D1E1F;
`;

const YearPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;

const MonthPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;


const PickerHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')};
 height: ${wp('11.2%')};
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 padding-left: 16px;
 position: absolute;
 top: 0;
`;

const PickerFinishContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-right: 16px
`;

const PickerFinishText = Styled.Text`
 font-size: 16px;
 color: #267DFF;
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
    expense: 2000,
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
    expense: 2000,
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
    expense: 2000,
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

const deviceWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get("window").height;

const YEAR_LIST = [
  2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
]

const MONTH_LIST = [
  12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
]


interface Props {
  navigation: any,
  route: any,
}

const AnotherUserProfileScreen = ({navigation, route}: Props) => {

  const getCurrentYear = (date: Date) => {
    return date.getFullYear();
  }

  const getCurrentMonth = (date: Date) => {
    return date.getMonth() + 1;
  }

  const [feedListTabHeight, setFeedListTabHeight] = useState<number>(containerHeight);
  const [collectionListTabHeight, setCollectionListTabHeight] = useState<number>(containerHeight);
  const [userInfoData, setUserInfoData] = useState<object>({});
  const [feedListData, setFeedListData] = useState<Array<object>>([]);
  const [collectionListData, setCollectionListData] = useState<Array<object>>([]);
  const [selectedFeedSortType, setSelectedFeedSortType] = useState<string>("list");
  const [changeProfileData, setChangeProfileData] = useState<boolean>(false);
   const [followed, setFollowed] = useState<boolean>(false);

  const [userProfileInfo, setUserProfileInfo] = useState<object>({})
  const [feedListDataByDate, setFeedListDataByDate] = useState<Array<object>>([]);

  const [refreshingProfileFeed, setRefreshingProfileFeed] = useState<boolean>(false);
  const [refreshingProfileCollection, setRefreshingProfileCollection] = useState<boolean>(false);
  const [feedMapCount, setFeedMapCount] = useState<number>(0);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const [visibleYearPicker, setVisibleYearPicker] = useState<boolean>(false);
  const [visibleMonthPicker, setVisibleMonthPicker] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear(new Date()));
  const [changingYear, setChangingYear] = useState<number>(getCurrentYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth(new Date()));
  const [changingMonth, setChangingMonth] = useState<number>(getCurrentMonth(new Date()));

  const [loadingProfileFeedByList, setLoadingProfileFeedByList] = useState<boolean>(true);
  const [loadingProfileFeedByDate, setLoadingProfileFeedByDate] = useState<boolean>(true);
  const [loadingProfileCollection, setLoadingProfileCollection] = useState<boolean>(true);

  const currentUser = useSelector((state) => state.currentUser);
  
  useEffect(() => {
    if(route.params?.requestedUserNickname) { 
    console.log("profile route.params", route.params?.requestedUserNickname)
    console.log("currentUser.user.profileImage", currentUser.user.profileImage);

      GetProfileFeedByList(route.params.requestedUserNickname)
      .then(function(response) {
        setLoadingProfile(false);
        setLoadingProfileFeedByList(false);
        getFeedListDataByDate();
        console.log(
        "GetProfileFeedByList response@@", response.posts)
        setUserInfoData(response);
        if(response.followed == true) {
          setFollowed(true)
        } else {
          setFollowed(false)
        }
        setFeedListData(response.posts);
        setChangeProfileData(!changeProfileData);
        console.log("요청된 프로필 정보@@@", response);
        let tmpFeedMapCount = 0;
        for(var i = 0; i < response.posts.length; i++) {
          if(response.posts[i].address) {
            tmpFeedMapCount = tmpFeedMapCount + 1;
          }
        }

        setTimeout(() => {
          setFeedMapCount(tmpFeedMapCount);
        }, 10)

        var profileInfo = {
          profileImage : response.profileImg,
          nickname: response.nickname,
          description: response.description
        }
        setUserProfileInfo(profileInfo);
        console.log("response.followed", response.followed)
      }).catch(function(error) {
        console.log("GetUserProfile error", error);
      })

      GetProfileCollection(route.params.requestedUserNickname)
      .then(function(response) {
        console.log("GetProfileCollection response", response);
        setCollectionListData(response.profileUser.collections);
        setChangeProfileData(!changeProfileData);
      })
      .catch(function(error) {
        console.log("GetProfileCollection error", error);
      })
    }

  }, [route.params?.requestedUserNickname])

  const onRefreshProfileFeed = () => {
    console.log("프로필 데이터 불러오기");
    setRefreshingProfileFeed(true);
    getFeedListData();
  }

  const onRefreshProfileCollection = () => {
    setRefreshingProfileCollection(true);
    getCollectionListData();
  }

  const getFeedListData = () => {
    GetProfileFeedByList(route.params?.requestedUserNickname)
    .then(function(response) {
      setLoadingProfileFeedByList(false);
      setUserInfoData(response);
      if(response.followed == true) {
        setFollowed(true)
      } else {
        setFollowed(false)
      }

      let tmpFeedMapCount = 0;
        for(var i = 0; i < response.posts.length; i++) {
          if(response.posts[i].address) {
            tmpFeedMapCount = tmpFeedMapCount + 1;
          }
        }

        setTimeout(() => {
          setFeedMapCount(tmpFeedMapCount);
        }, 10)

      setFeedListData(response.posts);
      setChangeProfileData(!changeProfileData);
      setRefreshingProfileFeed(false);
    }).catch(function(error) {
      console.log("GetUserProfile error", error);
    })  
  }

  const getCollectionListData = () => {
    GetProfileCollection(route.params?.requestedUserNickname)
    .then(function(response) {
      console.log("GetProfileCollection response", response);
      console.log("GetProfileCollection response.profileUser.colllections", response.profileUser.collections);
      setRefreshingProfileCollection(false);
      setCollectionListData(response.profileUser.collections);
      setChangeProfileData(!changeProfileData);
    })
    .catch(function(error) {
      console.log("GetProfileCollection error", error);
    })
  }


  const getFeedListDataByDate = () => {
    GETProfileFeedByDate(route.params?.requestedUserNickname, changingYear + "-" + changingMonth)
    .then(function(response) {
      setLoadingProfileFeedByDate(false);
      setRefreshingProfileFeed(false);
      console.log("GETProfileFeedByDate response", response)
      var tmpFeedListByDate = new Array();

      for(const[key, value] of Object.entries(response)) {
        var date = new Date(key)
        
        tmpFeedListByDate.push({
          title: date.getDate(),
          data: [value],
        })
      }

      setTimeout(() => {
      setFeedListDataByDate(tmpFeedListByDate);
      })
    })
    .catch(function(error) {
      console.log("GETProfileFeedByDate error", error);
    })
  }


  const moveToLocationFeedMap = () => {
    navigation.navigate("FeedMapScreen", {
      nickname: route.params?.requestedUserNickname
    });
  }

  const measureFeedListTab = (event) => {
    setFeedListTabHeight(event.nativeEvent.layout.height);
  }

  const measureCollectionListTab = (event) => {
    setCollectionListTabHeight(event.nativeEvent.layout.height);
  }

  const changeInFeedSortType = (sortType: string) => {
    setSelectedFeedSortType(sortType);
  }

  const addNewCollection = () => {
    navigation.navigate("CollectionStack", {
      screen: "CollectionUploadScreen"
    })
  }

  const moveToFollowListScreen = (requestedType: string) => {
    console.log("requestedType", requestedType);
    navigation.navigate("FollowListScreen", {
      requestedType: requestedType,
      nickname: userInfoData.nickname,
      followerCount: userInfoData.followersCount,
      followingCount: userInfoData.followingsCount,
    });
  }

  const navigateGoBack = () => {
     console.log("navigateGoBack route", route);
      if(route.params?.requestScreen) {
        navigation.navigate("SearchScreen");
      } else if(route.params?.request === "Alarm") {
        console.log("alarmScreem")
        navigation.navigate("AlarmScreen");
      } else {
        console.log("goBack")
        navigation.goBack();
      }
  }

  const followUser = () => {
    setFollowed(true);
  }

  const unfollowUser = () => {
    setFollowed(false);
  }


  const openYearPicker = () => {
    setVisibleYearPicker(true);
  }

  const selectYearPicker = () => {
    setVisibleYearPicker(false);

    if(changingYear != selectedYear) {
      setLoadingProfileFeedByDate(true);
      setSelectedYear(changingYear)
      getFeedListDataByDate()
    }
  }

  const cancelYearPicker = () => {
    setChangingYear(selectedYear);
    setVisibleYearPicker(false);
  }

  const openMonthPicker = () => {
    setVisibleMonthPicker(true);
  }

  const selectMonthPicker = () => {
    setSelectedMonth(changingMonth);
    setVisibleMonthPicker(false);

    if(changingMonth != selectedMonth) {
      setLoadingProfileFeedByDate(true);
      setSelectedMonth(changingMonth);
      getFeedListDataByDate()
    }
  }

  const cancelMonthPicker = () => {
    setChangingMonth(selectedMonth);
    setVisibleMonthPicker(false);
  }

  const moveToReport = () => {
    Alert.alert('서비스 준비중입니다.', '', [
      {
        text: '확인',
        onPress: () => 0,
      }
    ]);

    /*
    navigation.navigate("ReportScreen");
    */
  }





  const userIntroComponent = () => {
    /*
    if(myProfileScreen === true) { 
    return (
      <UserIntroduction
      profileImage={currentUser.user ? currentUser.user.profileImage : ''}
      nickname={currentUser.user ? currentUser.user.nickname : ''}
      description={currentUser.user ? currentUser.user.description : ''}
      followerCount={userInfoData.followersCount}
      followingCount={userInfoData.followingsCount}
      feedCount={userInfoData.postsCount}
      moveToFollowListScreen={moveToFollowListScreen}
      />
    )
    } else if(myProfileScreen === false) {
      return (
        <UserIntroduction
        profileImage={route.params.requestedUserProfileImage}
        nickname={route.params.requestedUserNickname}
        description={userInfoData.description}
        followerCount={userInfoData.followersCount}
        followingCount={userInfoData.followingsCount}
        feedCount={userInfoData.postsCount}
        moveToFollowListScreen={moveToFollowListScreen}
        />
      )
    }
    */
   return (
     <UserIntroduction
     userId={userInfoData ? userInfoData.id: ""}
     followed={followed} 
     followUserProp={followUser}
     unfollowUserProp={unfollowUser}
     profileImage={userInfoData ? userInfoData.profileImg: ""}
     nickname={userInfoData ? userInfoData.nickname : ""}
     description={userInfoData ? userInfoData.description : ""}
     followerCount={userInfoData ? userInfoData.followersCount : ""}
     followingCount={userInfoData ? userInfoData.followingsCount : ""}
     feedCount={userInfoData ? userInfoData.postsCount : 0}
     moveToFollowListScreen={moveToFollowListScreen}
     currentUserProfileBool={currentUser.user.nickname === route.params?.requestedUserNickname ? true : false}/>
   )
  }

  return ( 
    <Container>
       <HeaderBar>
        <HeaderLeftContainer>
          <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
            <HeaderBackContainer>
            <HeaderBackIcon
            source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
            </HeaderBackContainer>
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <HeaderRightContainer>
          {currentUser.user.nickname === route.params?.requestedUserNickname && (   
          <TouchableWithoutFeedback onPress={() => moveToReport()}>
          <MyProfileReportContainer>
          <MyProfileReportImage
          source={require('~/Assets/Images/HeaderBar/ic_report.png')}/>
          <MyProfileReportText>리포트</MyProfileReportText>
        </MyProfileReportContainer>
        </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => moveToLocationFeedMap()}>
          <MyProfileReviewMapContainer>
            <MyProfileReviewMapImage
            source={require('~/Assets/Images/HeaderBar/ic_marker.png')}/>
            <MyProfileReviewMapText>{feedMapCount}</MyProfileReviewMapText>
          </MyProfileReviewMapContainer>
          </TouchableWithoutFeedback>
        </HeaderRightContainer>
      </HeaderBar>
      {loadingProfile && (
        <LoadingContainer>
          <ActivityIndicator/>
        </LoadingContainer>
      )}
      {!loadingProfile && (
      <ScrollableTabView
      loadMoreSearchFeedData={() => 0}
      loadMoreSearchCollectionData={() => 0}
      refreshingFeed={refreshingProfileFeed}
      refreshingCollection={refreshingProfileCollection}
      onRefreshFeed={onRefreshProfileFeed}
      onRefreshCollection={onRefreshProfileCollection}
      collapsableBar={userIntroComponent()}
      initialPage={0}
      tabContentHeights={[feedListTabHeight, collectionListTabHeight]}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      prerenderingSiblingsNumber={Infinity}
      renderTabBar={() => <AnotherUserProfileTabBar
      currentUserNickname={currentUser.user.nickname}
      requestedUserNickname={route.params?.requestedUserNickname} 
      changeInFeedSortType={changeInFeedSortType}
      selectedFeedSortType={selectedFeedSortType}
      addNewCollection={addNewCollection}
      />}
      >
      <FeedListTabContainer onLayout={(event) => measureFeedListTab(event)}
      tabLabel='게시글'>
       <ProfileFeedList
       loadingProfileFeedByList={loadingProfileFeedByList}
       loadingProfileFeedByDate={loadingProfileFeedByDate}
       userProfileInfo={userProfileInfo}
       navigation={navigation}
       feedListData={feedListData ? feedListData : ""}
       feedListDataByDate={feedListDataByDate ? feedListDataByDate : []}
       currentSortType={selectedFeedSortType}
       requestNickname={userInfoData ? userInfoData.nickname : ""}
       openYearPicker={openYearPicker}
       openMonthPicker={openMonthPicker}
       selectedYear={selectedYear}
       selectedMonth={selectedMonth}
       />
      </FeedListTabContainer>
      <CollectionListTabContainer 
      onLayout={(event) => measureCollectionListTab(event)}
      tabLabel="컬렉션">
       <ProfileCollectionList
       collectionListData={collectionListData}
       navigation={navigation}
       requestNickname={userInfoData ? userInfoData.nickname : ""}
       /> 
      </CollectionListTabContainer>
      </ScrollableTabView>
      )}
      <Modal
          isVisible={visibleYearPicker}
          onBackdropPress={() => cancelYearPicker()}
          backdropOpacity={0.25}
          style={styles.modalView}>
          <YearPickerContainer>
            <Picker
            selectedValue={changingYear}
            onValueChange={(itemValue, itemIndex) => setChangingYear(itemValue)}>
            {YEAR_LIST.map((year) => {
              return (
                <Picker.Item label={year+"년"} value={year}/>
              )
            })}
            </Picker>
            <PickerHeaderContainer>
              <TouchableWithoutFeedback onPress={() => selectYearPicker()}>
              <PickerFinishContainer>
                <PickerFinishText>완료</PickerFinishText>
              </PickerFinishContainer>
              </TouchableWithoutFeedback>
            </PickerHeaderContainer>
          </YearPickerContainer>
        </Modal>
          <Modal
          isVisible={visibleMonthPicker}
          onBackdropPress={() => cancelMonthPicker()}
          backdropOpacity={0.25}
          style={styles.modalView}>
          <MonthPickerContainer>
            <Picker
            selectedValue={changingMonth}
            onValueChange={(itemValue, itemIndex) => setChangingMonth(itemValue)}>
            {MONTH_LIST.map((month) => {
              return (
                <Picker.Item label={month+"월"} value={month}/>
              )
            })}
            </Picker>
            <PickerHeaderContainer>
              <TouchableWithoutFeedback onPress={() => selectMonthPicker()}>
              <PickerFinishContainer>
                <PickerFinishText>완료</PickerFinishText>
              </PickerFinishContainer>
              </TouchableWithoutFeedback>
            </PickerHeaderContainer>
          </MonthPickerContainer>
          </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default AnotherUserProfileScreen;
