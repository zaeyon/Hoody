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

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
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
height: ${wp('12.2%')};
padding-left: 16px;
padding-right: 16px;
`;

const ModalTabInfoContainer = Styled.View`
height: ${wp('12.2%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const ModalTabLabelText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

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
    {label: 'byPopularity', value: 0 },
    {label: 'byNewest', value: 1}
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

    const renderKeywordItem = ({item, index}: any) => {
        console.log("renderKeywordItem", item);
        if(item.type == "태그") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <KeywordItemContainer>
                    <KeywordItemText>{"#" + item.item.name}</KeywordItemText>
                </KeywordItemContainer>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
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
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
            </KeywordItemBackground>
            )
        } else if(item.type == "장소") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <KeywordItemContainer>
                    <KeywordItemText>{item.item.address}</KeywordItemText>
                </KeywordItemContainer>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
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
                        <ModalApplyText>
                            적용
                        </ModalApplyText>
                    </ModalTitleContainer>
                    <ModalTabContainer>
                        <ModalTabInfoContainer>
                            <ModalTabLabelText>
                                인기순
                            </ModalTabLabelText>
                            <RadioForm>
                            {radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >

        <RadioButtonLabel
          obj={obj}
          index={i}
          onPress={() => onPressRadioButton(i)}
          labelHorizontal={true}
          labelStyle={{fontSize: 20, color: '#2ecc71'}}
          labelWrapStyle={{}}
        />
                            <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={selectedRadioIndex === i}
                           onPress={() => onPressRadioButton(i)}
          borderWidth={1}
          buttonInnerColor={'#e74c3c'}
          buttonOuterColor={selectedRadioIndex === i ? '#2196f3' : '#000'}
          buttonSize={20}
          buttonOuterSize={30}
          buttonStyle={{}}
          buttonWrapStyle={{marginLeft: 10}}
        />
      </RadioButton>
    ))}

                           </RadioForm>
                        </ModalTabInfoContainer>
                    </ModalTabContainer>
                    <ModalTabContainer>
                        <ModalTabInfoContainer>
                            <ModalTabLabelText>
                                최신순
                            </ModalTabLabelText>
                        </ModalTabInfoContainer>
                    </ModalTabContainer>
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


