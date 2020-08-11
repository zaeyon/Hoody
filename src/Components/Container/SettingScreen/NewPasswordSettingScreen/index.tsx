import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';


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
 flex: 1;
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
width: ${wp('100%')};
padding-left: ${wp('4.2%')};
position:absolute;
bottom: 20px;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
 background-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const FinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const NewPasswordSettingScreen = ({navigation, route}: Props) => {

    const [inputedNewPassword, setInputedNewPassword] = useState<string>('')
    const [inputedConfirmNewPassword, setInputedConfirmNewPassword] = useState<string>('');

    const [blankPassword, setBlankPassword] = useState<boolean>(false);
    const [shortPassword, setShortPassword] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [confirmedPassword, setConfirmedPassword] = useState<boolean>(false);

    const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
    const [confirmPasswordInputFocus, setConfirmPasswordInputFocus] = useState<boolean>(false);

    const onFocusPasswordInput = () => {
        setPasswordInputFocus(true);
    }

    const onUnfocusPasswordInput = () => {
        setPasswordInputFocus(false);
    }

    const onFocusConfirmPasswordInput = () => {
        setConfirmPasswordInputFocus(true);
    }

    const onUnfocusConfirmPasswordInput = () => {
        setConfirmPasswordInputFocus(false);
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
                <HeaderTitleText>새 비밀번호 설정</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <DescripText>
                비밀번호는 영문, 숫자를 포함한 8자 이상으로 설정해주세요.</DescripText>
                <ItemContainer style={{marginTop:36}}>
                    <ItemLabelText>새 비밀번호</ItemLabelText>
                    <ItemTextInput
                    style={passwordInputFocus && {borderColor: '#267DFF'}}
                    editable={true}
                    secureTextEntry={true}
                    onSubmitEditing={() => onUnfocusPasswordInput()}
                    onEndEditing = {() => onUnfocusPasswordInput()}
                    onFocus={() => onFocusPasswordInput()}
                    />
                </ItemContainer>
                <ItemContainer style={{marginTop:22}}>
                    <ItemLabelText>새 비밀번호 확인</ItemLabelText>
                    <ItemTextInput
                    style={confirmPasswordInputFocus && {borderColor: '#267DFF'}}
                    editable={true}
                    secureTextEntry={true}
                    onSubmitEditing={() => onUnfocusConfirmPasswordInput()}
                    onEndEditing={() => onUnfocusConfirmPasswordInput()}
                    onFocus={() => onFocusConfirmPasswordInput()}
                    />
                </ItemContainer>
            </BodyContainer>
            <FinishButtonContainer>
                <AboveKeyboard>
                    <FinishButton>
                        <FinishText>다음</FinishText>
                    </FinishButton>
                </AboveKeyboard>
            </FinishButtonContainer>
        </Container>
    )
}

export default NewPasswordSettingScreen;