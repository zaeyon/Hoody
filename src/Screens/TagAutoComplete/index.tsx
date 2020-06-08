import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native'

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
margin-top: 40px;
width: ${wp('80%')};
height: 70px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const InputContainer = Styled.View`
`;

const TagInput = Styled.TextInput`
font-size: 20px;
 width: ${wp('75.5%')};
 height: ${hp('5%')};
 padding-left: 5px;
`;


const HashImage = Styled.Image`
 width: ${wp('4.5%')};
 height: ${hp('3.4%')};
`;


const InputBottomBorder = Styled.View`
 position: absolute;
 bottom: 6px;
 width: ${wp('75.5%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const TagResultContainer = Styled.View`

border-top-width: 0.3px;
border-color: #c3c3c3;
 
`;

const TagResultItemContainer = Styled.View`

width: ${wp('100%')};
padding: 10px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.3px;
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

    const renderItem = ({item, index}) => {
        return (
            <TagResultItemContainer>
                <TagNameText>{'#' + item.tagName}</TagNameText>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo", {
                    selectTag: item.tagName,
                    tagType: tagType
                })}>
                <UseTagButtonText>사용</UseTagButtonText>
                </TouchableWithoutFeedback>
            </TagResultItemContainer>
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
          <HeaderTitleText>게시물 정보</HeaderTitleText>
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
            source={require('~/Assets/Images/ic_sharp.png')}/>
            <InputContainer>
            <TagInput
            autoFocus={true}/>
            <InputBottomBorder/>
            </InputContainer>
        </TagInputContainer>
        <TagResultContainer>
            <FlatList
            data={tagData}
            renderItem={renderItem}/>
        </TagResultContainer>
    </Container>
    );
}

export default TagAutoComplete;
