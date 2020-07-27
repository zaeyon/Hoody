import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList ,Keyboard, KeyboardAvoidingView} from 'react-native'

import GETSearchAutoComplete from '~/Route/Search/GETSearchAutoComplete';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 20px 20px 15px 20px;
 align-items: center;
 justify-content: center;
`;

const CancleText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const HeaderRightContainer = Styled.View`
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const TempoSaveText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const FinishContainer = Styled.View`
 margin-left: 15px;
 border-radius: 20px;
 background-color: #3384ff;
 padding: 9px 17px 9px 17px;
`;

const FinishText = Styled.Text`
 font-size: 17px
 font-weight: 600;
 color: #ffffff;
`;


const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 10px 20px 0px 20px;
`;


const LeftContainer = Styled.View`
`;

const CenterContainer = Styled.View`
justify-content: center;
margin-left: 7px;
`;

const RightContainer = Styled.View`
`;

const HeaderTitleText = Styled.Text`
 font-size: 16px;
 margin-left: 6px;
`;


const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const TagInputContainer = Styled.View`
margin-top: 10px;
padding-left: ${wp('11%')};
width: ${wp('90%')};
height: ${hp('5%')};
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #f3f3f3;
border-radius: 40px;
`;

const InputContainer = Styled.View`
`;

const TagInput = Styled.TextInput`
font-size: 18px;
width: ${wp('90%')};
height: ${hp('5%')};
 padding-left: 5px;
`;


const HashImage = Styled.Image`
 width: ${wp('3.3%')};
 height: ${hp('1.8%')};
 tint-color: #3384FF
`;


const InputBottomBorder = Styled.View`
 position: absolute;
 bottom: 6px;
 width: ${wp('75.5%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const TagResultContainer = Styled.View`
padding: 15px; 15px 15px 15px;
border-color: #c3c3c3;
 
`;

const TagResultItemContainer = Styled.View`
width: ${wp('90%')};
padding: 10px 0px 10px 0px;
 flex-direction: column;
 justify-content: space-between;
 border-color: #c3c3c3;
`;


const TagNameText = Styled.Text`
font-size: 16px;
font-weight: 500;
`;

const TagReviewNum = Styled.Text`
font-size: 15px;
color: #b9b9b9;
`;

const UseTagButtonText = Styled.Text`
font-size: 14px;
color: #4090FC;
`;

const RESULT_DATA_TEST = [
    {
        name: '리뷰테스트1',
        reviewNum: 11,
    },
    {
        name: '리뷰테스트3',
        reviewNum: 21,
    }
]

const TagSearchScreenTest = ({navigation, route}: Props) => {
    const [tagAutoCompleteArray, setTagAutoCompleteArray] = useState([]);
    const [firstTagResult, setFirstTagResult] = useState([]);
    const [tagType, setTagType] = useState();

    
    useEffect(() => {
        if(route.params?.tagType) {
            setTagType(route.params.tagType)
            console.log("태그타입", route.params.tagType);
        }
    }, [route.params?.tagType])

    const selectTag = (item) => {
        console.log("item", item);
        navigation.navigate("UploadScreen", {
            selectTagName: item.name,
            selectTagType: tagType
        })
    }

    const renderItem = ({item, index}) => {
        return (
            <KeyboardAvoidingView>
            </KeyboardAvoidingView>
        )
    }

    const changeTagInput = (query) => {
        GETSearchAutoComplete(query, "tag")
        .then(function(response) {
            console.log("태그 자동완성", response.result[0])
            setFirstTagResult(response.result[0]);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
    }


    return (
    <Container>
              <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <CancleText>취소</CancleText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderRightContainer>
                    <TempoSaveText></TempoSaveText>
                  
                </HeaderRightContainer>
            </HeaderBar>
        <TagInputContainer>
            <HashImage
            source={require('~/Assets/Images/ic_boldSharp.png')}/>
            <InputContainer>
            <TagInput
            autoFocus={true}
            onChangeText={(text: string) => changeTagInput(text)}
            autoCapitalize={false}
            />
            </InputContainer>
        </TagInputContainer>
        <TagResultContainer>
            <FlatList
            keyboardShouldPersistTaps="handled"
            data={RESULT_DATA_TEST}
            renderItem={({item, index}) => {
            return (
            <TouchableWithoutFeedback onPress={() => selectTag(item)}>
            <TagResultItemContainer>
            <TagNameText>{'#' + item.name}</TagNameText>
            <TagReviewNum>{item.reviewNum + " 후기"}</TagReviewNum>
            </TagResultItemContainer>
            </TouchableWithoutFeedback>
            )
            }}/>
        </TagResultContainer>
    </Container>
    );
}

export default TagSearchScreenTest;
