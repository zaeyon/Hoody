import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { Header } from 'react-native/Libraries/NewAppScreen';

import ProfileFeedList from '~/Components/Presentational/ProfileScreenTest/ProfileFeedList'
import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import UserIntroduction from '~/Components/Presentational/ProfileScreen/UserIntroduction';

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


const UserIntroductionContainer = Styled.View`
 background-color:#ffffff;
 flex-direction: column;
 padding-top: 20px;
 padding-bottom: 25px;
 padding-left: 16px;
 padding-right: 16px;
`;

const ProfileImage = Styled.Image`
 width: ${wp('18.7%')};
 height: ${wp('18.7%')};
 border-radius: 40px;
`;

const NoProfileImage = Styled.View`
width: ${wp('18.7%')};
height: ${wp('18.7%')};
border-radius: 40px;
background-color: #E2B1C7;
`;

const ProfileNicknameText = Styled.Text`
margin-top: 21px;
font-weight: 600;
font-size: 20px;
color: #000000;
`;

const ProfileBriefIntroText = Styled.Text`
margin-top: 9px;
font-size: 16px;
color: #000000;
`;

const ProfileUserInfoContainer = Styled.View`
margin-top: 20px;
flex-direction: row;
`;

const UserFeedContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const UserFollowerContainer = Styled.View`
margin-left: 11px;
flex-direction: row;
align-items: center;
`;

const UserFollowingContainer = Styled.View`
margin-left: 11px;
flex-direction: row;
align-items: center;
`;

const UserInfoLabelText = Styled.Text`
font-size: 15px;
color: #8E8E8E;
`;

const UserInfoCountText = Styled.Text`
margin-left: 3px;
font-weight: bold;
font-size: 15px;
color: #8E8E8E;
`;




const HeaderHeight = 400;
const TabBarHeight = 48;
const HeaderMinHeight = hp('6.5%');
const ScrollDistance = HeaderHeight - HeaderMinHeight;


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
  

class TabScene extends React.Component {
  render = () => {
    const windowHeight = Dimensions.get('window').height;
    const {
      numCols,
      data,
      renderItem,
      onGetRef,
      scrollY,
      onScrollEndDrag,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      onChangeHeaderHeight,
    } = this.props;

    const headerScrollHeight = scrollY.interpolate({
        inputRange: [0, ScrollDistance],
        outputRange: [HeaderHeight, HeaderMinHeight],
        extrapolate: "clamp"
     });
    return (
      <Animated.FlatList
        scrollToOverflowEnabled={true}
        numColumns={numCols}
        ref={onGetRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
              useNativeDriver: false,
              listener: event => {
                  onChangeHeaderHeight(headerScrollHeight);
              }
          },
          
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{
          backgroundColor:'#ffffff',
          marginTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 0,
          minHeight: windowHeight - (TabBarHeight),
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
}

const ProfileScreenTest = ({navigation, route}) => {
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: 'Tab1'},
    {key: 'tab2', title: 'Tab2'},
  ]);
  const [tab1Data] = useState(Array(40).fill(0));
  const [tab2Data] = useState(Array(30).fill(0));
  const [currentHeaderHeight, setCurrentHeaderHeight] = useState<number>(300);
  const scrollY = useRef(new Animated.Value(0)).current;

  const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
  const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onChangeHeaderHeight = (height: number) => {
      setCurrentHeaderHeight(height);
  }

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    console.log("onMomentumScrollEnd");
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });
   
    return (
      <Animated.View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: currentHeaderHeight,
          width: wp('100%'),
          zIndex: 1,
          backgroundColor:"#ffffff",
          overflow:"hidden"
      }}>
      <HeaderBar>
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
      </Animated.View>
    );
  };

  const rednerTab1Item = ({item, index}) => {
    return (
        <ProfileListFeedItem
        id={item.id}
        profile_image={item.user.profileImg}
        nickname={item.user.nickname}
        createdAt={item.createdAt}
        rating={item.starRate}
        main_tag={item.mainTags.name}
        sub_tag1={item.subTagOnes.name}
        sub_tag2={item.subTagTwos.name}
        like_count={item.likes}
        comment_count={12}
        scrap_count={23}
        mediaFiles={item.mediaFiles}
        image_count={item.mediaFiles.length}
        location={item.address.address}
        expanse={item.expanse}
        desArray={item.descriptions}
        navigation={navigation}
      />
    );
  };

  const rednerTab2Item = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 0,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        data = tab1Data;
        renderItem = rednerTab1Item;
        return (
        <ProfileFeedList
          navigation={navigation}
          onChangeHeaderHeight={onChangeHeaderHeight}
          feedList={TEST_FEED_DATA}
          currentSortType="list"
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
      );
      case 'tab2':
        numCols = 3;
        data = tab2Data;
        renderItem = rednerTab2Item;
        return (
        <TabScene
          onChangeHeaderHeight={onChangeHeaderHeight}
          numCols={numCols}
          data={data}
          renderItem={renderItem}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
      );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, HeaderMinHeight],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
            backgroundColor:'#ffffff',
          zIndex: 3,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => setIndex(index)}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#ffffff'}}>
      <View style={{flex: 1, backgroundColor:'#ffffff'}}>
{renderHeader()}
{renderTabView()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    width: '100%',
    backgroundColor: '#40C4FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  label: {fontSize: 16, color: '#222'},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#FFCC80'},
  indicator: {backgroundColor: '#222'},
});

export default ProfileScreenTest;