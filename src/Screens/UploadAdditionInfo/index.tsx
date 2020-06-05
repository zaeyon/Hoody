import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {Rating} from 'react-native-ratings';

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

const RatingContainer = Styled.View`
margin-top: 10px;
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
 margin-left: -2px;
 width: 25px;
 height: 25px;
`;

const HalfRatingStarImage = Styled.Image`
 margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const LabelText = Styled.Text`
font-size: 15px;
color:#000000;
`;

const MainTagContainer = Styled.View`
 margin-top: 15px;
 width: ${wp('80%')};
 height: 70px;
 flex-direction: column;
`;

const SubTagContainer = Styled.View`
margin-top: 20px;
 width: ${wp('80%')};
 height: 70px;
 flex-direction: column;
`;

const SubTagAddContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const IconInputContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const InputContainer = Styled.View`

`;

const SharpImage = Styled.Image`
 width: ${wp('4.5%')};
 height: ${hp('3.4')};
`;

const InputText = Styled.TextInput`
 font-size: 20px;
 width: ${wp('75.5%')};
 height: ${hp('5%')};
 padding-left: 5px;
`;

const InputBottomBorder = Styled.View`
 position: absolute;
 bottom: 3px;
 width: ${wp('75.5%')};
 height: 0.2px;
 background-color: #707070;
`;

const BottomArrowIcon = Styled.Image`
margin-left: 5px;
 width: ${wp("3%")};
 height: ${hp('1%')};
`;



const UploadAdditionInfo = ({navigation}) => {
    
    const ratingCompleted = (rating) => {
        console.log("rating", rating);
        
    }
    return (
        <Container>
                  <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo")}>
          <CenterContainer>
          <HeaderTitleText>{''}</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText>완료</ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
            <MainTagContainer>
                <LabelText>대표 태그</LabelText>
                <IconInputContainer>
                <SharpImage
                source={require('~/Assets/Images/ic_sharp.png')}/>
                <InputContainer>
                <InputText
                editable={false}
                />
                <InputBottomBorder/>
                </InputContainer>
                </IconInputContainer>
            </MainTagContainer>
            <RatingContainer>
              <Rating
              type="custom"
              onFinishRating={ratingCompleted}
              imageSize={35}
              fractions={0}
              startingValue={0}/>
            </RatingContainer>
            <SubTagContainer>
                <SubTagAddContainer>
                <LabelText>태그 추가</LabelText>
                <BottomArrowIcon
                source={require('~/Assets/Images/ic_bottomArrow.png')}/>
                </SubTagAddContainer>
            </SubTagContainer>
        </Container>
    )
}

export default UploadAdditionInfo;
