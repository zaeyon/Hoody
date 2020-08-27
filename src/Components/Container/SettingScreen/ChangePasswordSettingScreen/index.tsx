import React, {useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';

// Route
import POSTChangePassword from '~/Route/Auth/POSTChangePassword';


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

const DisabledFinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
 background-color: #ECECEE;
 justify-content: center;
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

const FinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #ffffff;
`;

const UnvalidInputText = Styled.Text`
 margin-left: 10px;
 font-size: 13px;
 position: absolute;
 bottom: -18px;
 color: #FF0000;
`;


const FocusInputText = Styled.Text`
 margin-left: 10px;
 font-size: 13px;
 position: absolute;
 bottom: -18px;
 color: #267DFF;
`;


interface Props {
    navigation: any,
    route: any,
}

const ChangePasswordSettingScreen = ({navigation, route}: Props) => {
    const [inputedNewPassword, setInputedNewPassword] = useState<string>("")
    const [inputedNewPasswordConfirm, setInputedNewPasswordConfirm] = useState<string>("");

    const [blankPassword, setBlankPassword] = useState<boolean>(false);
    const [shortPassword, setShortPassword] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [confirmedPassword, setConfirmedPassword] = useState<boolean>(false);
    const [passwordSame, setPasswordSame] = useState(true);
    const [confirmedPasswordSame, setConfirmedPasswordSame] = useState(false);


    const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
    const [confirmPasswordInputFocus, setConfirmPasswordInputFocus] = useState<boolean>(false);


  var emailInputRef = useRef(null);
  var passwordInputRef = useRef(null);
  var passwordConfirmInputRef = useRef(null);


  function checkPassword(str: string) {
    var blank_pattern = /[\s]/g;
    var pattern_num = /[0-9]/; // 숫자
    var pattern_eng = /[a-zA-Z]/; // 문자
    var strArray = str.split('');

    if (!str) {
      console.log('비밀번호값이 없음');
      setBlankPassword(false);
      setValidPassword(true);
      setConfirmedPassword(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('비밀번호값에 공백 포함');
      setBlankPassword(true);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (strArray.length < 8) {
      console.log('비밀번호 8자리 미만');
      setShortPassword(true);
      setBlankPassword(false);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (pattern_eng.test(str) && pattern_num.test(str)) {
      setValidPassword(true);
      setShortPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(true);
    } else {
      console.log('비밀번호값에 문자,숫자 미포함');
      setValidPassword(false);
      setShortPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(false);
    }
  }

    const onFocusPasswordInput = () => {
        setPasswordInputFocus(true);
    }

    const onUnfocusPasswordInput = (text: string) => {
        checkPassword(text);
        setPasswordInputFocus(false);

    }

    const onFocusConfirmPasswordInput = () => {
        setConfirmPasswordInputFocus(true);
    }

    const onUnfocusConfirmPasswordInput = () => {
        setConfirmPasswordInputFocus(false);
        setPasswordSame(true)
    }


  function changingPassword(str: string) {
    if (str === inputedNewPasswordConfirm) {
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    }

    setInputedNewPassword(str);
    var blank_pattern = /[\s]/g;
    var pattern_num = /[0-9]/; // 숫자
    var pattern_eng = /[a-zA-Z]/; // 문자
    var strArray = str.split('');

    if (!str) {
      console.log('비밀번호값이 없음');
      setConfirmedPassword(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('비밀번호값에 공백 포함');
      setConfirmedPassword(false);
    } else if (strArray.length < 8) {
      console.log('비밀번호 8자리 미만');
      setConfirmedPassword(false);
    } else if (pattern_eng.test(str) && pattern_num.test(str)) {
      setConfirmedPassword(true);
    } else {
      console.log('비밀번호값에 문자,숫자 미포함');
      setConfirmedPassword(false);
    }
  }

  const onChangeNewPasswordConfirmInput = (text:string) => {
      setInputedNewPasswordConfirm(text);
  }

  const clickFinish = () => {
      if(inputedNewPassword !== inputedNewPasswordConfirm) {
          setPasswordSame(false);
          console.log("validPassword", validPassword);
          console.log("비밀번호 불일치");
          
      } else {
        POSTChangePassword(route.params.email, inputedNewPassword)
        .then(function(response) {
          console.log("비밀번호 변경 성공", response);
          Alert.alert("비밀번호가 변경되었습니다.", '' , [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate("AccountSettingScreen");

              }
            }
          ])
          
        })
        .catch(function(error) {
          console.log("비밀번호 변경 실패", error);
        })
      }
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
                    autoCapitalize={"none"}
                    autoFocus={true}
                    style={passwordInputFocus && {borderColor: '#267DFF'} || blankPassword || (!validPassword && !blankPassword && !passwordInputFocus) && {borderColor:'#FF3B30'}}
                    editable={true}
                    value={inputedNewPassword}
                    onChangeText={(text:string) => changingPassword(text)}
                    secureTextEntry={true}
                    onSubmitEditing={(text:any) => onUnfocusPasswordInput(text.nativeEvent.text)}
                    onEndEditing = {(text:any) => onUnfocusPasswordInput(text.nativeEvent.text)}
                    onFocus={() => onFocusPasswordInput()}
                    clearButtonMode={"while-editing"}
                    />
                    {blankPassword && !passwordInputFocus && (
                    <UnvalidInputText>공백은 사용할 수 없습니다.</UnvalidInputText>
                    )}
                    {(!validPassword || shortPassword) && !blankPassword && (inputedNewPassword.length > 0) && (!passwordInputFocus) && (
                    <UnvalidInputText>영문, 숫자 포함 8자 이상</UnvalidInputText>
                    )}
                    {passwordInputFocus && (
                    <FocusInputText>영문, 숫자 포함 8자 이상</FocusInputText>
                    )}
                    </ItemContainer>
                    <ItemContainer style={{marginTop:22}}>
                <ItemLabelText>새 비밀번호 확인</ItemLabelText>
                    <ItemTextInput
                    style={((!passwordSame && validPassword) && {borderColor: '#FF3B30'}) || confirmPasswordInputFocus && {borderColor: '#267DFF'}}
                    value={inputedNewPasswordConfirm}
                    editable={true}
                    secureTextEntry={true}
                    onChangeText={(text:string) => onChangeNewPasswordConfirmInput(text)}
                    onSubmitEditing={() => onUnfocusConfirmPasswordInput()}
                    onEndEditing={() => onUnfocusConfirmPasswordInput()}
                    onFocus={() => onFocusConfirmPasswordInput()}
                    />
                    {!passwordSame && validPassword && (
                      <UnvalidInputText>비밀번호가 일치하지 않습니다.</UnvalidInputText>

                    )}
                </ItemContainer>
            </BodyContainer>
            <FinishButtonContainer>
                <AboveKeyboard>
                    {(!confirmedPassword || inputedNewPasswordConfirm.length === 0 ) && (
                    <DisabledFinishButton>
                        <FinishText style={{color:'#8E9199'}}>완료</FinishText>
                    </DisabledFinishButton>
                    )}
                    {(inputedNewPassword !== "" && inputedNewPasswordConfirm !== "" && inputedNewPassword.length > 0 && inputedNewPasswordConfirm.length > 0) && confirmedPassword && (
                    <TouchableWithoutFeedback onPress={() => clickFinish()}>
                    <FinishButton>
                        <FinishText>완료</FinishText>
                    </FinishButton>
                    </TouchableWithoutFeedback>
                    )}
                </AboveKeyboard>
            </FinishButtonContainer>
        </Container>
    )
}

export default ChangePasswordSettingScreen;