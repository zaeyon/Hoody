
import React from 'react';
import {
    FlatList, View, Text, Dimensions,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'rn-collapsing-tab-bar';
import Styled from 'styled-components/native';

import ProfileFeedList from '~/Components/Presentational/ProfileScreen/ProfileFeedList';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
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
const containerHeight = Dimensions.get('window').height;

class ProfileTestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabOneHeight: containerHeight,
            tabTwoHeight: containerHeight
        }
    }

    measureTabOne = (event) => {
        this.setState({
            tabOneHeight: event.nativeEvent.layout.height
        })
    }
    measureTabTwo = (event) => {
        this.setState({
            tabTwoHeight: event.nativeEvent.layout.height
        })
    }
    collapsableComponent = () => {
        return (
            <View style={{ height: 200, backgroundColor: 'red', width: deviceWidth }}>
                <TouchableOpacity onPress={() => { alert('Alert') }}>
                    <Text>Alert</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { tabOneHeight, tabTwoHeight } = this.state;
        return (
        <Container>
        <ScrollableTabView
            collapsableBar={this.collapsableComponent()}
            initialPage={0}
            tabContentHeights={[tabOneHeight, tabTwoHeight]}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <DefaultTabBar inactiveTextColor="white" activeTextColor="white" backgroundColor="blue" />}
        >
            <View onLayout={(event) => this.measureTabOne(event)} tabLabel='Tab #1'>
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

            </View>
            <View onLayout={(event) => this.measureTabTwo(event)} tabLabel='Tab #2'>
                <View style={{ height: 4000, backgroundColor: "orange" }}>
                    <TouchableOpacity onPress={() => { alert('Alert') }}>
                        <Text>Alert</Text>
                    </TouchableOpacity>
                    <Text >Project</Text>
                </View>
            </View>
        </ScrollableTabView>
        </Container>
        );
    }
}

export default ProfileTestScreen;