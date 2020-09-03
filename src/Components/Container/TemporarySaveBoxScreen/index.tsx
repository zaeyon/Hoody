
import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import GETPostTemporary from '~/Route/Post/GETPostTemporary';
import DELETEPost from '~/Route/Post/DELETEPost';
import GETPostTemporaryDetail from '~/Route/Post/GETPostTemporaryDetail';


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
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
padding: 7px 15px 13px 16px;
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
padding: 13px 16px 13px 15px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HeaderDeclareText = Styled.Text`
position: absolute;
right: 15;
font-weight: 500;
font-size: 17px;
color: #FF3B30;
`;

const HeaderEditText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #267DFF;
`;

const HeaderFinishText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #267DFF;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TemporarySaveItemContainer = Styled.View`
 
 border-bottom-width: 0.6px
 border-color: #ECECEE;
 background-color: #FFFFFF;
 flex-direction: row;
 justify-content: space-between;
`;

const TagListContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const MainTagText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SubTagText = Styled.Text`
 font-size: 16px;
 color: #1D1E1F;
 `;

 const SaveDateText = Styled.Text`
font-size: 12.5px;
color: #C4C4C4;
 `;

 const FeedInfoContainer = Styled.View`
 padding-top: 19px;
 padding-bottom: 19px;
 padding-left: 16px;
 padding-right: 16px;
 justify-content: center;
 flex:1;
 `;

 const FeedRemoveContainer = Styled.View`
 padding-top: 19px;
 padding-bottom: 19px;
 padding-left: 16px;
 padding-right: 16px;
 align-items: center;
 justify-content: center;
 `;

 const FeedRemoveText = Styled.Text`
 font-size: 16px;
 color: #FF3B30;
 `;
 
 const TemporarySaveBoxScreen = ({navigation, route}: any) => {
    const [temporarySaveListData, setTemporarySaveListData] = useState<Array<object>>([]);
    const [temporarySaveListEdit, setTemporarySaveListEdit] = useState<boolean>(false);
    const [temporarySaveListChange, setTemporarySaveListChange] = useState<boolean>(false);


    useEffect(() => {
        GETPostTemporary()
        .then(function(response) {
            console.log("임시저장 게시글 불러오기 성공", response)
            setTemporarySaveListData(response);
        })
        .catch(function(error) {
            console.log("임시저장 게시글 불러오기 실패", error);
        })
    }, [])

    const clickToEdit = () => {
        setTemporarySaveListEdit(true);
    }

    const finishEditing = () => {
        setTemporarySaveListEdit(false);
    }

    const moveToTemporaryDetail = (postId: number) => {
        navigation.navigate("UploadScreen", {
            temporarySaved: true,
            temporaryFeedId: postId,
        })
    }

    const deleteTemporarySaveFeed = (postId: number, index: number) => {

        DELETEPost(postId)
        .then(function(response) {
            console.log("임시저장 게시글 삭제완료")
            var deletedTemporarySaveList = temporarySaveListData;
            deletedTemporarySaveList.splice(index, 1);
            setTemporarySaveListData(deletedTemporarySaveList);
            setTemporarySaveListChange(!temporarySaveListChange);
        })
        .catch(function(error) {
            console.log("DELETEPost error", error);
        })
    }

    const renderTemporarySaveItem = ({item, index}: any) => {

        var date = new Date(item.createdAt),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
        
        if(month.length > 2) month = "0" + month;
        if(day.length > 2) day =  "0" + day;
        var createdDate = year + ". " + month + ". " + day;
        
        return (
            <TemporarySaveItemContainer>
                <TouchableWithoutFeedback onPress={() => moveToTemporaryDetail(item.id)}>
                <FeedInfoContainer>
                <TagListContainer>
                <MainTagText>{"#" + item.mainTags.name}
                {item.subTagOnes && (
                    <SubTagText>{" #" + item.subTagOnes.name}
                    {item.subTagTwos && (
                        <SubTagText>{" #" + item.subTagTwos.name}</SubTagText>
                    )}
                    </SubTagText>
                )}
                </MainTagText>
                </TagListContainer>
                <SaveDateText>{createdDate + " 저장됌"}</SaveDateText>
                </FeedInfoContainer>
                </TouchableWithoutFeedback>
                {temporarySaveListEdit && (
                <TouchableWithoutFeedback onPress={() => deleteTemporarySaveFeed(item.id, index)}>
                <FeedRemoveContainer>
                    <FeedRemoveText>삭제</FeedRemoveText>
                </FeedRemoveContainer>
                </TouchableWithoutFeedback>
                )}
            </TemporarySaveItemContainer>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackButtonContainer>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>임시 보관함</HeaderTitleText>
                {!temporarySaveListEdit && (
                <TouchableWithoutFeedback onPress={() => clickToEdit()}>
                <HeaderRightContainer>
                    <HeaderEditText>편집</HeaderEditText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
                )}
                {temporarySaveListEdit && (
                <TouchableWithoutFeedback onPress={() => finishEditing()}>
                <HeaderRightContainer>
                    <HeaderEditText>완료</HeaderEditText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
                )}
            </HeaderBar>
            <BodyContainer>
                <FlatList
                data={temporarySaveListData}
                renderItem={renderTemporarySaveItem}/>
            </BodyContainer>
        </Container>
    )

}

export default TemporarySaveBoxScreen;