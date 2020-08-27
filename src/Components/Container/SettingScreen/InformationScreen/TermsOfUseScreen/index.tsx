import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, Keyboard, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/action';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 


// Route
import GETLogout from '~/Route/Auth/GETLogout';

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
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
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
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderReportContainer = Styled.View`
 position: absolute;
 right: 16px;
`;

const HeaderReportText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #FF3B30;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const ItemTitleContainer = Styled.View`
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
`;

const ItemTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const QuestionTypeListContainer = Styled.View`
 flex-direction: row;
 background-color: #ffffff;
 align-items: center;
 padding-top: 7px;
 padding-bottom: 7px;
 padding-left: 16px;
 padding-right: 16px;
 border-width: 0.6px;
 border-color: #ECECEE;
`;

const TabItemContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('15%')};
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const TabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('15%')};
justify-content: space-between;
`;

const TabItemLabelText = Styled.Text`
 font-size: 16px;
 color: #1D1E1F;
`;

const TabItemContentText = Styled.Text`
 font-size: 16px;
 color: #333333;
`;

const TabItemRightContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const TabItemDisclosureIcon = Styled.Image`
 margin-left: 5px;
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const QuestionTypeBackground = Styled.View`
 padding-top: 9px;
 padding-bottom: 9px;
 padding-left: 14px;
 padding-right: 14px;
 border-radius: 20px;
 background-color: #FAFAFA;
 align-items: center;
 border-width: 1px;
 border-color: #ECECEE;
 margin-right: 6px;
`;

const QuestionTypeText = Styled.Text`
color: #8E9199;
font-weight: 500;
font-size: 17px;
`;

const UserInfoQuestionContainer = Styled.View`
background-color: #FFFFFF;
`;

const PostQuestionContainer = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const ErrorQuestionContainer = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const AnswerContainer = Styled.View`
padding-top: 15px;
padding-bottom: 15px;
padding-left: 16px;
padding-right: 16px;
background-color: #F7F7F7;
`;

const AnswerText = Styled.Text`
font-size: 15px;
color: #1D1E1F;
`;

interface Props {
    navigation: any,
    route: any,
}

const TermsOfUseScreen = ({navigation, route}: Props) => {

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
                <HeaderTitleText>이용 약관</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>   
            </BodyContainer>
        </Container>
    )
}

export default TermsOfUseScreen;



