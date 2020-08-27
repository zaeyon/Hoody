import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';

// Route
import GETVerifyEmail from '~/Route/Auth/GETVerifyEmail';

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

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
 background-color: #FFFFFF;
 padding-top:  29px;
 align-items: center;
 padding-left: 16px;
 padding-right: 16px;
`;

const DescripText = Styled.Text`
 font-size: 14px;
 color: #898A8D;
`;

const ItemContainer = Styled.View`
`;

const ItemLabelText = Styled.Text`
 font-weight: 600;
 font-size: 16px;
 color: #1D1E1F;
`;

const ItemTextInput = Styled.TextInput`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
background-color: #FAFAFA;
margin-top: 10px;
padding-left: 10px;
padding-right: 10px;
border-width: 1.5px;
border-color: #FAFAFA;
`;

const FinishButtonContainer = Styled.View`
margin-top: 30px;
width: ${wp('100%')};
align-items: center;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
 background-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const DisabledFinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
 background-color: #ECECEE;
 justify-content: center;
 align-items: center;
`;

const FinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #ffffff;
`;

const PasswordFindText = Styled.Text`
color: #50555C;
font-size: 14px;
`;

const PasswordFindContainer = Styled.View`
width: ${wp('91.46%')};
padding-top: 15px;
`;

const UnconfirmedPasswordText = Styled.Text`
font-size: 13px;
color: #FF3B30;
`;

const UnvalidInputText = Styled.Text`
 margin-left: 10px;
 font-size: 13px;
 position: absolute;
 bottom: -18px;
 color: #FF0000;
`;

interface Props {
    navigation: any,
    route: any,
}

const VerifyEmailScreen = ({navigation, route}: Props) => {
    const [email, setEmail] = useState<string>(route.params?.email ? route.params.email : "")
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [changingEmail, setChangingEmail] = useState<boolean>(false);
    const [emailInputFocus, setEmailInputFocus] = useState<boolean>(false);


  function checkEmail(str: string) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;

    if (!str) {
      console.log('값이 없음');
      setValidEmail(false);
      return false
    } else if (blank_pattern.test(str) === true) {
      console.log('공백 포함');
      setValidEmail(false);
      return false
    } else if (!regExp.test(str)) {
      console.log('올바른 이메일 형식 아님');
      setValidEmail(false);
      return false
    } else {
      setValidEmail(true);
      return true
    }
  }


    const onChangeEmailInput = (text: string) => {
        setEmail(text);
        setChangingEmail(true);
    }

    const sendAuthCodeToEmail = () => {
        setChangingEmail(false);
        if(checkEmail(email)) {
            console.log("올바른 이메일", email);
            GETVerifyEmail(email)
            .then(function(response) {
                console.log("인증코드 보냄", response);
            })
            .catch(function(error) {
                console.log("인증코드 보내기 실패", error);
            })

        } else {
            console.log("잘못된 이메일", email);

        }

    }

    const onFocusEmailInput = () => {
        setEmailInputFocus(true);
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
                <HeaderTitleText>비밀번호 찾기</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <ItemContainer>
                    <ItemLabelText>이메일</ItemLabelText>
                    <ItemTextInput
                    style={(!validEmail && !changingEmail) && {borderColor:'#FF3B30'} || emailInputFocus && {borderColor:'#267DFF'}}
                    editable={true}
                    value={email}
                    onChangeText={(text:string) => onChangeEmailInput(text)}
                    onFocus={() => onFocusEmailInput()}
                    />
                    {!validEmail && !changingEmail && (
                    <UnvalidInputText>올바른 이메일형식이 아닙니다.</UnvalidInputText>
                    )}
                </ItemContainer>
            </BodyContainer>
            <FinishButtonContainer>
                    {email === "" && (
                    <DisabledFinishButton>
                        <FinishText style={{color:'#8E9199'}}>인증코드 전송</FinishText>
                    </DisabledFinishButton>
                    )}
                    {email !== "" && email.length > 0 && (
                    <TouchableWithoutFeedback onPress={() => sendAuthCodeToEmail()}>
                    <FinishButton>
                        <FinishText>인증코드 전송</FinishText>
                    </FinishButton>
                    </TouchableWithoutFeedback>
                    )}
            </FinishButtonContainer>
        </Container>
    )
}

export default VerifyEmailScreen;