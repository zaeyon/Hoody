import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

// Import Local Component
import SearchResultTopTabNavigator from '~/Components/Presentational/SearchResultScreen/SearchResultTopTabNavigator';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
 padding-right: 16px;
 background-color: #ffffff;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
padding-top: 12px;
padding-bottom: 16px;
background-color: #ffffff;
`;

const HeaderFilterIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const KeywordItemListContainer = Styled.View`
 padding-top: 2px;
 padding-bottom: 2px;
 align-items: center;
 flex-direction: row;
 background-color: #ffffff;
`;

const KeywordItemBackground = Styled.View`
 margin-left: 8px;
 border-radius: 7px;
 border-width: 1px;
 border-color: #ECECEE;
 flex-direction: row;
`;

const KeywordItemContainer = Styled.View`
padding-left: 12px;
padding-top: 8px;
padding-bottom: 8px;
align-items: center;
flex-direction: row;
`;

const KeywordProfileContainer = Styled.View`
padding-left: 12px;
padding-top: 4px;
padding-bottom: 4px;
align-items: center;
flex-direction: row;
`;


const KeywordItemProfileImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
border-radius: 100px;
border-width: 0.6px;
border-color: #F4F4F7;
`;

const KeywordItemText = Styled.Text`
color: #1D1E1F;
font-size: 15px;
font-weight: 500;
`;

const RemoveKeywordItemContainer = Styled.View`
align-items: center;
justify-content: center;
padding-left: 10px;
padding-right: 12px;
`;

const RemoveKeywordIcon = Styled.Image`
 width: ${wp('4.26%')};
 height: ${wp('4.26%')};
`;

const FilterModalContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('59%')};
 background-color: #FFFFFF;
 border-top-left-radius: 14px;
 border-top-right-radius: 14px;
`;


const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 22px;
 align-items: center;
`;

const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;

const ModalTitleContainer = Styled.View`
padding-top: 8px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ModalTitleText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #1D1E1F;
`;

const ModalApplyText = Styled.Text`
font-size: 16px;
color: #267DFF;
`;

const ModalTabContainer = Styled.View`
height: ${wp('12.5%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const ModalTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const ModalTabLabelText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SearchResultListContainer = Styled.View`
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
      createAt: '2020-05-22',
      starRate: 2.5,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
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
      createAt: '2020-06-22',
      starRate: 4,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
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
      createAt: '2020-05-22',
      starRate: 2.5,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
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
  

interface Props {
    navigation: any,
    route: any,
}

const SearchResultScreen = ({navigation, route}: Props) => {
    const [keywordList, setKeywordList] = useState<Array<object>>([]);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>(0);
    const currentUser = useSelector((state: any) => state.currentUser);
    const dispatch = useDispatch();


var radio_props = [
    {label: '인기순', value: 0 },
    {label: '최신순', value: 1}
  ];

    useEffect(() => {
        if(route.params?.keywordList) {
            console.log("route.params.keywordList", route.params.keywordList);
            setKeywordList(route.params.keywordList);
        }

    }, [route.params?.keywordList])

    const showFilterModal = () => {
        setFilterModalVisible(true);
    }

    const onPressRadioButton = (i: number) => {
        setSelectedRadioIndex(i)
    }

    const applySearchFilter = () => {
        setFilterModalVisible(false);
    }

    const removeKeywordItem = (index:number) => {
        var removedKeywordList = currentUser.inputedKeywordList;
        removedKeywordList.splice(index, 1);
        dispatch(allActions.userActions.setInputedKeywordList(removedKeywordList));
    }

    const renderKeywordItem = ({item, index}: any) => {
        console.log("renderKeywordItem", item);
        if(item.type == "태그") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <KeywordItemContainer>
                    <KeywordItemText>{"#" + item.item.name}</KeywordItemText>
                </KeywordItemContainer>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "계정") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <KeywordProfileContainer>
                    <KeywordItemProfileImage
                    source={{uri:item.item.profileImg}}/>
                    <KeywordItemText
                    style={{marginLeft: 6}}
                    >{item.item.nickname}</KeywordItemText>
                </KeywordProfileContainer>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "장소") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <KeywordItemContainer>
                    <KeywordItemText>{item.item.address}</KeywordItemText>
                </KeywordItemContainer>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        }
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>검색 결과</HeaderTitleText>
                <TouchableWithoutFeedback onPress={() => showFilterModal()}>
                    <HeaderRightContainer>
                        <HeaderFilterIcon
                        source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <KeywordItemListContainer>
                <FlatList
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
                horizontal={true}
                data={currentUser.inputedKeywordList}
                renderItem={renderKeywordItem}
                />
            </KeywordItemListContainer>
            <SearchResultListContainer>
                <SearchResultTopTabNavigator
                navigation={navigation}
                feedResultListData={TEST_FEED_DATA}
                />
            </SearchResultListContainer>
            <Modal
            style={styles.filterModal}
            isVisible={filterModalVisible}
            backdropOpacity={0.25}
            swipeDirection={['down']}
            onSwipeComplete={() => setFilterModalVisible(false)}
            onBackdropPress={() => setFilterModalVisible(false)}>
                <FilterModalContainer>
                    <ModalHeaderContainer>
                        <ModalToggleButton/>
                    </ModalHeaderContainer>
                    <ModalTitleContainer>
                        <ModalTitleText>
                            검색 필터
                        </ModalTitleText>
                        <TouchableWithoutFeedback onPress={() => applySearchFilter()}>
                        <ModalApplyText>
                            적용
                        </ModalApplyText>
                        </TouchableWithoutFeedback>
                    </ModalTitleContainer>
                            <RadioForm>
                            {radio_props.map((obj, i) => (
                            <ModalTabContainer>
                                <ModalTabInfoContainer>
                            <RadioButton 
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{}}/>
                            </RadioButton>

                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedRadioIndex === i}
                                onPress={() => onPressRadioButton(i)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                            </ModalTabInfoContainer>
                            </ModalTabContainer>
                             ))}
                           </RadioForm>
                </FilterModalContainer>
            </Modal>

        </Container>
    )
}

const styles = StyleSheet.create({
    firstKeyword: {
        marginLeft: 10,
    },
    lastKeyword: {
        marginRight: 10,
    },
    filterModal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})

export default SearchResultScreen;


