import React, {useState, useEffect} from 'react';
import {
  FlatList, View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, StyleSheet
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import Modal from 'react-native-modal';
import ScrollableTabView, { DefaultTabBar,} from 'rn-collapsing-tab-bar';

import {getCurrentUser} from '~/AsyncStorage/User';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// local component
import UserIntroduction from '~/Components/Presentational/ProfileScreen/UserIntroduction';
import ProfileTabBar from '~/Components/Presentational/ProfileScreen/ProfileTabBar';
import ProfileFeedList from '~/Components/Presentational/ProfileScreen/ProfileFeedList';
import ProfileCollectionList from '~/Components/Presentational/ProfileScreen/ProfileCollectionList';

// route
import GetProfileFeedByList from '~/Route/Profile/GetProfileFeedByList';
import GETProfileFeedByDate from '~/Route/Profile/GETProfileFeedByDate';
import GetProfileCollection from '~/Route/Profile/GetProfileCollection';

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
 height: ${wp('11.7%')};
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

interface Props {
  navigation: any,
  route: any,
}

const ProfileScreen = ({navigation, route}: Props) => {
  const [feedListTabHeight, setFeedListTabHeight] = useState<number>(containerHeight);
  const [collectionListTabHeight, setCollectionListTabHeight] = useState<number>(containerHeight);
  const [userInfoData, setUserInfoData] = useState<object>({});
  const [feedListData, setFeedListData] = useState<Array<object>>([]);
  const [feedListDataByDate, setFeedListDataByDate] = useState<Array<object>>([]);
  const [collectionListData, setCollectionListData] = useState<Array<object>>([]);
  const [selectedFeedSortType, setSelectedFeedSortType] = useState<string>("list");
  const [changeProfileData, setChangeProfileData] = useState<boolean>(false);
  const [currentUserProfileBool, setCurrentUserProfileBool] = useState<boolean>(true);
  const [followed, setFollowed] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if(currentUser.user) { 
    console.log("currentUser.user.profileImage", currentUser.user.profileImage);

      GetProfileFeedByList(currentUser.user.nickname)
      .then(function(response) {
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
        dispatch(allActions.userActions.setUserAllFeeds(response.posts));
        console.log("요청된 프로필 정보@@@", response)
        console.log("response.followed", response.followed)
      }).catch(function(error) {
        console.log("GetUserProfile error", error);
      })

      GETProfileFeedByDate(currentUser.user.nickname, "2020-07")
      .then(function(response) {
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

      GetProfileCollection(currentUser.user.nickname)
      .then(function(response) {
        console.log("GetProfileCollection response", response);
        console.log("GetProfileCollection response.profileUser.colllections", response.profileUser.collections)
        setCollectionListData(response.profileUser.collections);
        setChangeProfileData(!changeProfileData);
      })
      .catch(function(error) {
        console.log("GetProfileCollection error", error);
      })
    }

  }, [route.params?.collectionListChange])

  useEffect(() => {
    console.log("Profile route", route);
    console.log("Profile navigation", navigation);
    
  }, [route.params?.requestedUserNickname])

  const moveToLocationFeedMap = () => {
    navigation.navigate("LocationFeedMapScreen");
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
    navigation.navigate("CollectionUploadScreen")
  }

  const moveToFollowListScreen = (requestedType: string) => {
    console.log("requestedType", requestedType);
    navigation.navigate("FollowListScreen", {
      requestedType: requestedType,
      nickname: currentUser.user ? currentUser.user.nickname : null,
      followerCount: userInfoData.followersCount,
      followingCount: userInfoData.followingsCount,
    });
  }

  const moveToSetting = () => {
    navigation.navigate("SettingScreen");
    setProfileModalVisible(false)
  }

  const moveToScrapList = () => {
    navigation.navigate("ScrapListScreen");
    setProfileModalVisible(false);
  }

  const moveToProfileEdit = () => {
    navigation.navigate("ProfileEditScreen");
    setProfileModalVisible(false);
  }

  const navigateGoBack = () => {
      navigation.goBack();
  }

  const followUser = () => {
    setFollowed(true);
  }

  const unfollowUser = () => {
    setFollowed(false);
  }

  const clickToHamburger = () => {
    setProfileModalVisible(true)
  }



  const userIntroComponent = () => {
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
     currentUserProfileBool={currentUserProfileBool}
     moveToFollowListScreen={moveToFollowListScreen}/>
   )
  }

  return (
    <Container>
       <HeaderBar>
        <HeaderLeftContainer>
          {currentUserProfileBool && (
          <TouchableWithoutFeedback onPress={() => clickToHamburger()}>
          <MyProfileSettingContainer>
          <MyProfileSettingButton
          source={require('~/Assets/Images/HeaderBar/ic_hamburger.png')}
          />
          </MyProfileSettingContainer>
          </TouchableWithoutFeedback>
          )}
          {!currentUserProfileBool && (
          <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
            <HeaderBackContainer>
            <HeaderBackIcon
            source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
            </HeaderBackContainer>
          </TouchableWithoutFeedback>
          )}

        </HeaderLeftContainer>
        <HeaderRightContainer>
          {currentUserProfileBool && (
          <MyProfileReportContainer>
          <MyProfileReportImage
          source={require('~/Assets/Images/ic_report.png')}/>
          <MyProfileReportText>리포트</MyProfileReportText>
        </MyProfileReportContainer>
          )}
          <TouchableWithoutFeedback onPress={() => moveToLocationFeedMap()}>
          <MyProfileReviewMapContainer>
            <MyProfileReviewMapImage
            source={require('~/Assets/Images/ic_reviewMap.png')}/>
            <MyProfileReviewMapText>299</MyProfileReviewMapText>
          </MyProfileReviewMapContainer>
          </TouchableWithoutFeedback>
        </HeaderRightContainer>
      </HeaderBar>
      <ScrollableTabView
      collapsableBar={userIntroComponent()}
      initialPage={0}
      tabContentHeights={[feedListTabHeight, collectionListTabHeight]}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      prerenderingSiblingsNumber={Infinity}
      renderTabBar={() => <ProfileTabBar 
      changeInFeedSortType={changeInFeedSortType}
      selectedFeedSortType={selectedFeedSortType}
      addNewCollection={addNewCollection}
      />}
      >
      <FeedListTabContainer onLayout={(event) => measureFeedListTab(event)}
      tabLabel='게시글'>
       <ProfileFeedList
       navigation={navigation}
       feedListData={feedListData ? feedListData : []}
       feedListDataByDate={feedListDataByDate ? feedListDataByDate : []}
       currentSortType={selectedFeedSortType}
       />
      </FeedListTabContainer>
      <CollectionListTabContainer
      onLayout={(event) => measureCollectionListTab(event)}
      tabLabel="컬렉션">
       <ProfileCollectionList
       profileImage={userInfoData.profileImg ? userInfoData.profileImg : null}
       profileNickname={userInfoData.nickname ? userInfoData.nickname : null}
       collectionListData={collectionListData}
       navigation={navigation}
       /> 
      </CollectionListTabContainer>
      </ScrollableTabView>
      <Modal
      testID={'modal'}
      onBackdropPress={() => setProfileModalVisible(false)}
      isVisible={profileModalVisible}
      backdropOpacity={0.25}
      onSwipeComplete={() => setProfileModalVisible(false)}
      swipeDirection={['down']}
      style={styles.modalView}>
      <ProfileModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToSetting()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          source={require('~/Assets/Images/Profile/BottomModal/ic_setting.png')}/>
          <ModalTabItemLabelText>설정</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToScrapList()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          source={require('~/Assets/Images/Profile/BottomModal/ic_scrap.png')}/>
          <ModalTabItemLabelText>스크랩</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToProfileEdit()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          source={require('~/Assets/Images/Profile/BottomModal/ic_profile.png')}/>
          <ModalTabItemLabelText>프로필 편집</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
      </ProfileModalContainer>
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

export default ProfileScreen;
