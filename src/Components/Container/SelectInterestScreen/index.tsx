import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Route
import POSTCategory from '~/Route/Curation/POSTCategory'


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
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

const BackButtonContainer = Styled.View`
 padding: 12.5px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
 flex: 1;
 width: ${wp('100%')};
 flex-direction: row;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 16px;
`;

const InterestItemBackground = Styled.View`
 margin-right: 5px;
 padding-top: 10px;
 padding-bottom: 9px;
 padding-left: 14px;
 padding-right: 14px;
 background-color: #f7f7f7;
 border-radius: 20px;
 align-items: center;
 justify-content: center;
 border-width: 1px;
 border-color: #ECECEE;
`;

const InterestItemText = Styled.Text`
 font-size: 18px;
 color: #56575C;
`;

const BottomContainer = Styled.View`
 position: absolute;
 bottom: 10px;
 align-items: center;
 justify-content: center;
`;

const DisabledFinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
background-color: #ECECEE;
border-radius: 10px;
align-items: center;
justify-content: center;
`;

const DisabledFinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #8E9199;
`;

const FinishButton = Styled.View`
 width: ${wp('91.46%')};
 height: ${wp('13.33%')};
 background-color: #267DFF;
 border-radius: 10px;
 align-items: center;
 justify-content: center;
`;

const FinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #FFFFFF;
`;

const SkipContainer = Styled.View`
margin-top: 10px;
width: ${wp('50.46%')};
height: ${wp('13.33%')};
background-color: #FFFFFF;
border-radius: 10px;
align-items: center;
justify-content: center;
`;

const SkipText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #56575C;
`;

const INTEREST_ITEM_LIST = [
    {
        name: "음식",
        selected: false,
    },
    {
        name: "테크",
        selected: false,
    },
    {
        name: "영화",
        selected: false,
    },
    {
        name: "예능·오락",
        selected: false,
    },
    {
        name: "드라마",
        selected: false,
    },
    {
        name: "여행",
        selected: false,
    },
    {
        name: "화장품",
        selected: false,
    },
    {
        name: "반려동물",
        selected: false,
    },
    {
        name: "패션",
        selected: false,
    },
    {
        name: "일상",
        selected: false,
    },
    {
        name: "욜로",
        selected: false,
    },
    {
        name: "가성비",
        selected: false,
    },

]

interface Props {
    navigation: any,
    route: any,
}

interface InterestObj {
    name: string,
    selected: boolean,
}


const SelectInterestScreen = ({navigation, route}: Props) => {
    const [interestList, setInterestList] = useState<Array<InterestObj>>(INTEREST_ITEM_LIST);
    const [selectedInterestList, setSelectedInterestList] = useState<Array<object>>([])
    const [changeInterest, setChangeInterest] = useState<boolean>(false);
    const dispatch = useDispatch();

    const finishSelectInterest = () => {
        var interestListStr = JSON.stringify(selectedInterestList);
        POSTCategory(interestListStr)
        .then(function(response) {
            console.log("관심사 선택 성공", response)
            dispatch(
                allActions.userActions.setUser({
                    email: route.params?.email,
                    birthDate: route.params?.birthDate,
                    gender: route.params?.gender,
                    socialId: route.params?.socialId,
                    provider: route.params?.provider,
                    profileImage: route.params?.profileImage,
                    nickname: route.params?.nickname,
                    userId: route.params?.userId,
                })
            )
            dispatch(
                allActions.userActions.setInputedKeywordList([])
            )
            setSelectedInterestList([]);
        })
        .catch(function(error) {
            console.log("관심사 선택 오류", error);
        })
    }

    const skipSelectInterest = () => {
        dispatch(
            allActions.userActions.setUser({
                email: route.params?.email,
                birthDate: route.params?.birthDate,
                gender: route.params?.gender,
                socialId: route.params?.socialId,
                provider: route.params?.provider,
                profileImage: route.params?.profileImage,
                nickname: route.params?.nickname,
                userId: route.params?.userId,
            })
        )

        dispatch(
            allActions.keywordAction.setInputedKeywordList([])
        )
    }

    const selectInterestItem = (item:any, index: number) => {
        if(!item.selected) {
            var tmpInterestList = interestList;
            tmpInterestList[index].selected  = true;
            setInterestList(tmpInterestList);
            var tmpSelectedInterestList = selectedInterestList;
            tmpSelectedInterestList.push(item.name);
            setSelectedInterestList(tmpSelectedInterestList);
            setChangeInterest(!changeInterest);
        } else {
            var tmpInterestList = interestList;
            tmpInterestList[index].selected = false;
            setInterestList(tmpInterestList);
            var tmpSelectedInterestList = selectedInterestList;
            var index = tmpSelectedInterestList.findIndex((obj) => obj === item);
            tmpSelectedInterestList.splice(index, 1);
            setSelectedInterestList(tmpSelectedInterestList);
            setChangeInterest(!changeInterest)
        }
    }

    const renderInterestItem = ({item, index}: any) => {
        return (
        <TouchableWithoutFeedback onPress={() => selectInterestItem(item ,index)}>
            <InterestItemBackground style={item.selected && {backgroundColor:'#267DFF', borderColor: '#267DFF'}}>
                <InterestItemText style={item.selected && {color: '#FFFFFF'}}>{item.name}</InterestItemText>
            </InterestItemBackground>
        </TouchableWithoutFeedback>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <BackButtonContainer>
                        <HeaderEmptyContainer/>
                    </BackButtonContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>관심사 선택</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <FlatList
                style={{paddingTop:10}}
                numColumns={4}
                columnWrapperStyle={{marginBottom:10}}
                data={interestList}
                renderItem={renderInterestItem}
                />

            </BodyContainer>
            <BottomContainer>
                {selectedInterestList.length > 0 && (
                <TouchableWithoutFeedback onPress={() => finishSelectInterest()}>
                <FinishButton>
                    <FinishText>완료</FinishText>
                </FinishButton>
                </TouchableWithoutFeedback>
                )}
                {selectedInterestList.length === 0 && (
                <DisabledFinishButton>
                    <DisabledFinishText>완료</DisabledFinishText>
                </DisabledFinishButton>
                )}
                <TouchableWithoutFeedback onPress={() => skipSelectInterest()}>
                <SkipContainer>
                    <SkipText>건너뛰기</SkipText>
                </SkipContainer>
                </TouchableWithoutFeedback>
            </BottomContainer>
        </Container>
    )
}

export default SelectInterestScreen;




