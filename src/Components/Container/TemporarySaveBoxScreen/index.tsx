
import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #e5e5e570;
`;

const TemporarySaveItemContainer = Styled.View`
 padding-top: 19px;
 padding-bottom: 19px;
 padding-left: 16px;
 padding-right: 16px;
 border-bottom-width: 0.6px
 border-color: #ECECEE;
`;

const TagListText = Styled.Text`
 font-size: 16px;
 color: #1D1E1F;
 `;

 const SaveDateText = Styled.Text`
font-size: 11px;
color: #C4C4C4;
 `;

 const RemoveText = Styled.Text`
  font-size: 16px;
  color: #ff3b30;
 `;

const TemporarySaveBoxScreen = ({navigation, route}: any) => {
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
                <HeaderRightContainer>
                    <HeaderEditText>편집</HeaderEditText>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
            </BodyContainer>
        </Container>
    )

}

export default TemporarySaveBoxScreen;