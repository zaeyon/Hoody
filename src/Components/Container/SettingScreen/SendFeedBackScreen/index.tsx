import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, Keyboard} from 'react-native';
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
padding: 12.5px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderSendContainer = Styled.View`
 position: absolute;
 right: 16px;
`;

const HeaderSendText = Styled.Text`
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


const TabToggleContainer = Styled.View`
height: ${wp('15%')};
align-items: center;
justify-content: center;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const TabToggleText = Styled.Text`
color: #267DFF;
font-size: 16px;
`;

const RadioModalContainer = Styled.View`
 flex: 1;
 background-color:#ffffff;
`;
 

const RadioTabContainer = Styled.View`
height: ${wp('14%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const RadioTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
padding-top: 11px;
justify-content: space-between;
border-top-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const RadioButtonContainer = Styled.View`
position: absolute;
top: 18px;
right: 0;
`;

const FeedbackDescripContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
 padding-top: 20px;
 padding-bottom: 20px;
 padding-left: 16px;
 padding-right: 16px;
`;

const FeedbackTextInput = Styled.TextInput`
flex: 1;
font-size: 17px;
padding-bottom: 100px;
color: #56575C;
`;

const DescripContainer = Styled.View`
background-color: #FAFAFA;
padding-top: 20px;
padding-left: 16px;
padding-bottom: 20px;
padding-right: 16px;
`;

const MainDescripText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SubDescripText = Styled.Text`
margin-top: 10px;
font-size: 14px;
color: #8E9199;
`;


interface Props {
    navigation: any,
    route: any,
}

const SendFeedbackScreen = ({navigation, route}: Props) => {
    const [feedback, setFeedback] = useState<string>("");

    const onChangeFeedbackInput = (text: string) => {
        setFeedback(text);
    }
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                <HeaderTitleText>의견</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderSendContainer>
                        <HeaderSendText>보내기</HeaderSendText>
                    </HeaderSendContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}>
            <BodyContainer>
                <DescripContainer>
                    <MainDescripText>후디의 성장을 위해 의견을 전달해주세요!</MainDescripText>
                    <SubDescripText>마음에 드는 점 또는 개선해야 할 점을 알려주세요.{"\n"}
여러분의 의견이 서비스 개선에 큰 도움이 됩니다.</SubDescripText>

                </DescripContainer>
                <FeedbackDescripContainer>
                    <FeedbackTextInput
                    multiline={true}
                    onChangeText={(text:string) => onChangeFeedbackInput(text)}
                    value={feedback}
                    />
                </FeedbackDescripContainer>
            </BodyContainer>
            </KeyboardAwareScrollView>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default SendFeedbackScreen;



