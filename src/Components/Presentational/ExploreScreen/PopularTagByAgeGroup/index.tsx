import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TileFeedItem from '~/Components/Presentational/ExploreScreen/TileFeedItem';




const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 padding-top: 20px
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 8px;
 background-color: #ffffff;
`;

const AgeGroupText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #333333;
`;

const PopularTagListContainer = Styled.View`
padding-top: 2px;
padding-bottom: 4px;
`;

const PopularTagItemBackground = Styled.View`
 margin-left: 6px;
 height: ${wp('8%')};
 justify-content: center;
 align-items: center;
 padding-left: 14px;
 padding-right: 14px;
 border-width: 1px;
 border-color: #ECECEE;
 border-radius: 7px;
 background-color: #F5F5F7;
`;

const UnselectPopularTagNameText = Styled.Text`
 font-weight: 600;
 font-size: 14px;
 color: #8E9199;
`;

const SelectTagFeedListContainer = Styled.View`
 
`;

const TEST_POPULARY_TAG = [
    {
        name: "Tag",
        selected: false,
    },
    {
        name: "Tag",
        selected: false,
    },
    {
        name: "을지로",
        selected: false,
    },
    {
        name: "피자나라치킨공주",
        selected: false,
    },
    {
        name: "재난지원금",
        selected: false,
    }
]


const TEST_FEED_DATA = [
    {
      id: 1,
      user : {
        profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '테스트닉네임'
      },
      createAt: '2020-05-22',
      starRate: 2.5,
      likes: 13,
      hits: 2,
      mainTags : {
        name: '메인태그'
      },
      subTagOnes: {
        name: '서브태그1'
      },
      subTagTwos: {
        name: '서브태그2'
      },
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
      createAt: '2020-06-22',
      starRate: 4,
      likes: 13,
      hits: 2,
      mainTags : {
        name: '스타벅스'
      },
      subTagOnes: {
        name: '아이스아메리카노'
      },
      subTagTwos: {
        name: '아아'
      },
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
      createAt: '2020-05-22',
      starRate: 2.5,
      likes: 13,
      hits: 2,
      mainTags : {
        name: '메인태그'
      },
      subTagOnes: {
        name: '서브태그1'
      },
      subTagTwos: {
        name: '서브태그2'
      },
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
    {
        id: 4,
        user : {
          profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
          nickname: '테스트닉네임'
        },
        createAt: '2020-05-22',
        starRate: 2.5,
        likes: 13,
        hits: 2,
        mainTags : {
          name: '메인태그'
        },
        subTagOnes: {
          name: '서브태그1'
        },
        subTagTwos: {
          name: '서브태그2'
        },
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
  }

const PopularTagByAgeGroup = ({navigation}: Props) => {
    const [popularTagListData, setPopularTagListData] = useState<Array<object>>();
    const [changeSelectedTag, setChangeSelectedTag] = useState<boolean>(false);
    const [selectedTagFeedListData, setSelectedTagFeedListData] = useState<Array<object>>([]);

    useEffect(() => {
        setPopularTagListData(TEST_POPULARY_TAG);
        setSelectedTagFeedListData(TEST_FEED_DATA);
    }, [])

    const selectPopularTag = (item: object, index: number) => {
        var tmpPopularTagList = popularTagListData.map(function(tag, index2) {
            if(index != index2) {
                tag.selected = false
                return tag
            } else if(index === index2) {
                tag.selected = true
                return tag
            }
        })

        //tmpPopularTagList[index].selected = !popularTagListData[index].selected;
        setPopularTagListData(tmpPopularTagList);
        setChangeSelectedTag(!changeSelectedTag);
        console.log("select tag index", index)
    }

    const renderPopularTagItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => selectPopularTag(item, index)}>
            <PopularTagItemBackground style={[index === 0 &&  styles.firstTagItem || index === TEST_POPULARY_TAG.length-1 && styles.lastTagItem, item.selected && styles.selectTagBackground]}>
                <UnselectPopularTagNameText style={item.selected && styles.selectTagText}>{"#" + item.name}</UnselectPopularTagNameText>
            </PopularTagItemBackground>
            </TouchableWithoutFeedback>
        )
    }

    const renderSelectTagFeedItem = ({item, index}: any) => {
        return (
            <TileFeedItem
            navigation={navigation}
            />
        )
    }

    return (
        <Container>
            <HeaderContainer>
                <AgeGroupText>20대 인기 태그</AgeGroupText>
            </HeaderContainer>
            <PopularTagListContainer>
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={popularTagListData}
            renderItem={renderPopularTagItem}/>
            </PopularTagListContainer>
            <SelectTagFeedListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={{paddingLeft:16, paddingRight:16}}
                columnWrapperStyle={{marginTop:8}}
                numColumns={2}
                data={selectedTagFeedListData}
                renderItem={renderSelectTagFeedItem}
                />
            </SelectTagFeedListContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    firstTagItem : {
        marginLeft: 16
    },
    lastTagItem : {
        marginRight: 16,
    },
    selectTagBackground : {
        backgroundColor: '#267DFF',
        borderWidth: 1,
        borderColor: '#267DFF',
        borderRadius: 7,
    },
    selectTagText: {
        color: '#FFFFFF'
    }
})

export default PopularTagByAgeGroup;