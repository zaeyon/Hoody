import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, FlatList} from 'react-native';

import ProfileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileFeedItem';


const Container = Styled.View`
 flex: 1;
 background-color: #c3c3c3;
`;

const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 flex:1;
`;

const UserCollectionListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
flex:1;
`;

const UserScrapListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
flex:1;
`;

const NoCollectionContainer = Styled.View`
 background-color: #ffffff;
 align-items: center;
 justify-content: center;
 flex:1;
`;

const AddCollectionButton = Styled.View`
 background-color:#EFEFEF;
 width: ${wp('32.5%')};
 height: ${wp('32.5%')};
 justify-content: center;
 align-items: center;
 border-radius: 10px;
`;

const AddCollectionIcon = Styled.Image`
 width: ${wp('10.6%')};
 height: ${wp('10.6%')};
`;

const AddCollectionMainText = Styled.Text`
 margin-top: 25px;
 font-size: 19px;
 color: #3384FF;
 font-weight: 600;
`;

const AddCollectionSubText = Styled.Text`
margin-top: 10px;
font-size: 16px;
color: #4b4b4b;
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

  interface Props {
      navigation: any,
      route: any
      collectionArray: any,
  }

const UserPostTopTabNavigator = ({navigation, route, collectionArray}: Props) => {
    const PostTopTab = createMaterialTopTabNavigator();

    const renderProfileFeedItem = ({item, index}) => {
        return (
            <ProfileFeedItem
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
        )
    }

    function FeedList() {
        return (
            <UserFeedListContainer>
                <FlatList
                data={TEST_FEED_DATA}
                renderItem={renderProfileFeedItem}/>
            </UserFeedListContainer>
        )
    }

    function CollectionList() { 
        if(!collectionArray) {
            return (
                <NoCollectionContainer>
                    <AddCollectionButton>
                        <AddCollectionIcon
                        source={require('~/Assets/Images/ic_bluePlus.png')}
                        />
                    </AddCollectionButton>
                    <AddCollectionMainText>첫 컬렉션을 만들어 보세요 :)</AddCollectionMainText>
                    <AddCollectionSubText>나만의 키워드로 게시글들을 분류할 수 있어요.</AddCollectionSubText>

                </NoCollectionContainer>
            )
        } else {
            <UserCollectionListContainer>
                <Text>ss</Text>
            </UserCollectionListContainer>
        }
    }

    function ScrapList() {
        return (
            <UserScrapListContainer>
                <Text>Scrap List</Text>
            </UserScrapListContainer>
        )
    }


    return (
        <Container>
            <PostTopTab.Navigator
            initialRouteName="게시글"
            swipeEnabled={true}
            tabBarOptions={{
                activeTintColor:'#000000',
                inactiveTintColor:'#cccccc',
                indicatorStyle:{backgroundColor:'#000000'},
                labelStyle:{fontSize:17, fontWeight:'600'},
                tabStyle:{width: wp('19%'), height: 43, justifyContent:'center'},
                indicatorStyle:{width: wp('12.5%'), marginLeft: wp('3.25%'), backgroundColor:'#000000'},

            }}>
                <PostTopTab.Screen
                name="게시글"
                component={FeedList}
                />
                <PostTopTab.Screen
                name="컬렉션"
                component={CollectionList}
                />
                <PostTopTab.Screen
                name="스크랩"
                component={ScrapList}
                />
            </PostTopTab.Navigator>
        </Container>
    )
}

export default UserPostTopTabNavigator;
