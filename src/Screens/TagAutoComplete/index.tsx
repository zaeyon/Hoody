import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList ,Keyboard, KeyboardAvoidingView} from 'react-native'

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
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
 flex-direction: row;
 justify-content: space-between;
 border-color: #c3c3c3;
`;

const TagNameText = Styled.Text`
font-size: 16px;
`;

const UseTagButtonText = Styled.Text`
font-size: 14px;
color: #4090FC;
`;

const TagAutoComplete = ({navigation, route}: Props) => {
    const [tagData, setTagData] = useState([
        {
            tagName: '자동완성테스트1'
        },
        {
            tagName: '자동완성테스트2'
        }
    ]);
    const [tagType, setTagType] = useState();

    const selectTag = (item) => {
        navigation.navigate("UploadAdditionInfo", {
            selectTag: item.tagName,
            tagType: tagType
        })
    }

    const renderItem = ({item, index}) => {
        return (
            <KeyboardAvoidingView>
            </KeyboardAvoidingView>
        )
    }

    useEffect(() => {
        if(route.params.tagType) {
            setTagType(route.params.tagType)
            console.log("태그타입", route.params.tagType);
        }
    }, [route.params.tagType])

    return (
    <Container>
    <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText></HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText></ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
        <TagInputContainer>
            <HashImage
            source={require('~/Assets/Images/ic_boldSharp.png')}/>
            <InputContainer>
            <TagInput
            autoFocus={true}/>
            </InputContainer>
        </TagInputContainer>
        <TagResultContainer>
            <FlatList
            keyboardShouldPersistTaps="handled"
            data={tagData}
            renderItem={({item, index}) => {
            return (
            <TagResultItemContainer>
            <TagNameText>{'#' + item.tagName}</TagNameText>
            </TagResultItemContainer>
            )
            }}/>
        </TagResultContainer>
    </Container>
    );
}

export default TagAutoComplete;
