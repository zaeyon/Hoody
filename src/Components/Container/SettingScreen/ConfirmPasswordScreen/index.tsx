import React from 'react';
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

const ConfirmPasswordScreen = ({navigation, route}: Props) => {

    const moveToNewPasswordSetting = () => {
        navigation.navigate("NewPasswordSettingScreen");
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
                <HeaderTitleText>비밀번호 확인</HeaderTitleText>
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
                    />
                </ItemContainer>
                <ItemContainer style={{marginTop:22}}>
                    <ItemLabelText>비밀번호</ItemLabelText>
                    <ItemTextInput
                    editable={true}
                    secureTextEntry={true}
                    />
                </ItemContainer>
            </BodyContainer>
            <FinishButtonContainer>
                <AboveKeyboard>
                    <TouchableWithoutFeedback onPress={() => moveToNewPasswordSetting()}>
                    <FinishButton>
                        <FinishText>완료</FinishText>
                    </FinishButton>
                    </TouchableWithoutFeedback>
                </AboveKeyboard>
            </FinishButtonContainer>
        </Container>
    )
}

export default ConfirmPasswordScreen;