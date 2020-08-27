import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';

// Route


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

interface Props {
    navigation: any,
    route: any,
}

const VerifyEmailScreen = ({navigation, route}: Props) => {
    const [confirm, setConfirm] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    
    const moveToNewPasswordSetting = () => {
        navigation.navigate("ChangePasswordSettingScreen");
    }

    const checkConfirmedPassword = () => {
        Login(route.params.email, password)
        .then(function(response) {
            if(response.status === 200) {
                setConfirm(true)
                moveToNewPasswordSetting();
            }
        })
        .catch(function(response) {
            console.log("response", response);
        })
    }
    
    const onChangePassword = (text: string) => {
        setPassword(text);
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
                <DescripText>
                회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해주세요.
                </DescripText>
                <ItemContainer style={{marginTop:22}}>
                    <ItemLabelText>이메일</ItemLabelText>
                    <ItemTextInput
                    editable={false}
                    value={route.params?.email}
                    />
                </ItemContainer>
            </BodyContainer>
            <FinishButtonContainer>
                <AboveKeyboard>
                    {password === "" && (
                    <DisabledFinishButton>
                        <FinishText style={{color:'#8E9199'}}>다음</FinishText>
                    </DisabledFinishButton>
                    )}
                    {password !== "" && password.length > 0 && (
                    <TouchableWithoutFeedback onPress={() => checkConfirmedPassword()}>
                    <FinishButton>
                        <FinishText>다음</FinishText>
                    </FinishButton>
                    </TouchableWithoutFeedback>
                    )}
                </AboveKeyboard>
            </FinishButtonContainer>
        </Container>
    )
}

export default VerifyEmailScreen;