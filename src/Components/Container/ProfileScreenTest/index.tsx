import React, {useState, useEffect} from 'react';
import {
  FlatList, View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ScrollableTabView, { DefaultTabBar,} from 'rn-collapsing-tab-bar';

import UserIntroduction from '~/Components/Presentational/ProfileScreen/UserIntroduction';
import ProfileTabBar from '~/Components/Presentational/ProfileScreen/ProfileTabBar';

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

const deviceWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get("window").height;

interface Props {
  navigation: any,
  route: any,
}

const ProfileScreenTest = ({navigation, route}: Props) => {
  const [feedListTabHeight, setFeedListTabHeight] = useState<number>(containerHeight);
  const [collectionListTabHeight, setCollectionListTabHeight] = useState<number>(containerHeight);

  const measureFeedListTab = (event) => {
    setFeedListTabHeight(event.nativeEvent.layout.height);
  }

  const measureCollectionListTab = (event) => {
    setCollectionListTabHeight(event.nativeEvent.layout.height);
  }

  const userIntroComponent = () => {
    return (
      <UserIntroduction/>
    )
  }

  return (
    <Container>
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
      <ScrollableTabView
      collapsableBar={userIntroComponent()}
      initialPage={0}
      tabContentHeights={[feedListTabHeight, collectionListTabHeight]}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      prerenderingSiblingsNumber={Infinity}
      renderTabBar={() => <ProfileTabBar/>}>
      <FeedListTabContainer onLayout={(event) => measureFeedListTab(event)}
      tabLabel='게시글'>
        <View style={{ height: 2000, backgroundColor: "cyan" }}>
                    <TouchableOpacity onPress={() => { alert('Alert') }}>
                        <Text>Alert</Text>
                    </TouchableOpacity>
                    <Text >My</Text>
                    <FlatList
                        scrollEnabled={false}
                        bounces={true}
                        data={[{ key: 'a' }, { key: 'b' }]}
                        renderItem={({ item }) => <View style={{ height: 400 }}>
                            <Text>{item.key}</Text>
                        </View>}
                    />
                </View>
      </FeedListTabContainer>

      <CollectionListTabContainer onLayout={(event) => measureCollectionListTab(event)}
      tabLabel="컬렉션">
         <View style={{ height: 2000, backgroundColor: "cyan" }}>
                    <TouchableOpacity onPress={() => { alert('Alert') }}>
                        <Text>Alert</Text>
                    </TouchableOpacity>
                    <Text >My</Text>
                    <FlatList
                        scrollEnabled={false}
                        bounces={true}
                        data={[{ key: 'a' }, { key: 'b' }]}
                        renderItem={({ item }) => <View style={{ height: 400 }}>
                            <Text>{item.key}</Text>
                        </View>}
                    />
                </View>

      </CollectionListTabContainer>
      </ScrollableTabView>
    </Container>
  )
  
  
}

export default ProfileScreenTest

