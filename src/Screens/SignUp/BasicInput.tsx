import React, {useState, useLayoutEffect, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const NextText = Styled.Text`
 font-size: 17px;
 color: #000000;
 margin-right: 13px;
`;

const TextInputLabelText = Styled.Text`
position: absolute;
font-size:14px;
color: #707070;
align-self: flex-start;
`;

const InputContainer = Styled.View`
 width: ${wp('85%')};
 height: ${hp('70%')};
 align-items: center;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('85%')};
 margin-bottom: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('85%')};
height: 50px;
font-size: 16px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('85%')};
height: 0.5px;
background-color: #c3c3c3;
`;

const Header = Styled.View`
position: absolute;
top: 0px;
width: ${wp('100%')};
height: ${hp('8%')};
border-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-right: 10px;
padding-left: 10px;
`;

const HeaderTitle = Styled.Text`
font-size: 20px;
`;

const CloseButton = Styled.Image`
 width: ${wp('5.0%')};
 height: ${wp('5.0%')};
 tint-color: #000000;
`;

const FinishButtonContainer = Styled.View`
 justify-content:flex-end;
 background-color:#000000;
`;

const FinishButton = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8.8%')};
 position: absolute;
 bottom: 0;
 background-color: #23E5D2;
 justify-content: center;
 align-items: center;
`;

const UnabledFinishButton = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8.8%')};
 position: absolute;
 bottom: 0;
 background-color: #cccccc;
 justify-content: center;
 align-items: center;
`;

const FinishText = Styled.Text`
font-size: 20px;
color: #ffffff;
`;

const UnvalidInputText = Styled.Text`
 font-size: 14px;
 position: absolute;
 bottom: -15px;
 color: #FF0000;
`;

const BasicInput = ({navigation, route}) => {
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPassword, setInputedPassword] = useState('');
  const [inputedPasswordSame, setInputedPasswordSame] = useState('');
  const [passwordSame, setPasswordSame] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [blankEmail, setBlankEmail] = useState(false);
  const [blankPassword, setBlankPassword] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [passwordHasNum, setPasswordHasNum] = useState(false);
  const [passwordHasAlp, setPasswordHasAlp] = useState(false);

  const [confirmedEmail, setConfirmedEmail] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [confirmedPasswordSame, setConfirmedPasswordSame] = useState(false);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    console.log('키보드 높이', e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  const moveToProfileInput = () => {
    console.log('inputedEmail', inputedEmail);
  };

  function checkEmail(str) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;

    if (!str) {
      console.log('값이 없음');
      setEmptyEmail(true);
      setBlankEmail(false);
      setValidEmail(true);
      setConfirmedEmail(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('공백 포함');
      setBlankEmail(true);
      setEmptyEmail(false);
      setValidEmail(false);
      setConfirmedEmail(false);
    } else if (!regExp.test(str)) {
      console.log('올바른 이메일 형식 아님');
      setValidEmail(false);
      setEmptyEmail(false);
      setBlankEmail(false);
      setConfirmedEmail(false);
    } else {
      setValidEmail(true);
      setEmptyEmail(false);
      setBlankEmail(false);
      setConfirmedEmail(true);
    }
  }

  function changingEmail(str) {
    setEmptyEmail(false);
    setBlankEmail(false);
    setValidEmail(true);
    setConfirmedEmail(false);
    setInputedEmail(str);
  }

  function checkPassword(str) {
    var blank_pattern = /[\s]/g;
    var pattern_num = /[0-9]/; // 숫자
    var pattern_eng = /[a-zA-Z]/; // 문자
    var strArray = str.split('');

    if (!str) {
      console.log('비밀번호값이 없음');
      setEmptyPassword(true);
      setBlankPassword(false);
      setValidPassword(true);
      setConfirmedPassword(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('비밀번호값에 공백 포함');
      setBlankPassword(true);
      setEmptyPassword(false);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (strArray.length < 8) {
      console.log('비밀번호 8자리 미만');
      setShortPassword(true);
      setBlankPassword(false);
      setEmptyPassword(false);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (pattern_eng.test(str) && pattern_num.test(str)) {
      setValidPassword(true);
      setShortPassword(false);
      setEmptyPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(true);
    } else {
      console.log('비밀번호값에 문자,숫자 미포함');
      setValidPassword(false);
      setShortPassword(false);
      setEmptyPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(false);
    }
  }

  function changingPassword(str) {
    if (str === inputedPasswordSame) {
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    }
    setValidPassword(true);
    setShortPassword(false);
    setEmptyPassword(false);
    setBlankPassword(false);
    setPasswordSame(true);
    setConfirmedPassword(false);
    setInputedPassword(str);
  }

  function checkPasswordSame(str) {
    if (inputedPassword === str) {
      console.log('비밀번호 일치');
      console.log('inputedPasswlrd', inputedPassword);
      console.log('str', str);
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    } else {
      setPasswordSame(false);
      setConfirmedPasswordSame(false);
      console.log('비밀번호 불일치');
      console.log('inputedPasswlrd', inputedPassword);
      console.log('str', str);
    }
  }

  function changingPasswordSame(str) {
    if (str === inputedPassword) {
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    } else {
      setPasswordSame(false);
      setConfirmedPasswordSame(false);
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => moveToProfileInput()}>
          <NextText>다음</NextText>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Header>
        <CloseButton source={require('~/Assets/Images/close.png')} />
        <HeaderTitle>회원가입</HeaderTitle>
        <CloseButton
          style={{tintColor: '#ffffff'}}
          source={require('~/Assets/Images/close.png')}
        />
      </Header>
      <InputContainer style={{marginTop: 60}}>
        <LabelInputContainer>
          <Input
            autoCapitalize="none"
            placeholder="이메일"
            onChangeText={(text: string) => changingEmail(text)}
            onSubmitEditing={(text: string) =>
              checkEmail(text.nativeEvent.text)
            }
            onEndEditing={(text: string) => checkEmail(text.nativeEvent.text)}
          />
          <InputBottomLine />
          {blankEmail && (
            <UnvalidInputText>공백은 사용할 수 없습니다.</UnvalidInputText>
          )}
          {!validEmail && !blankEmail && (
            <UnvalidInputText>올바른 이메일형식이 아닙니다.</UnvalidInputText>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Input
            autoCapitalize="none"
            placeholder="비밀번호 (영문,숫자포함 8자리이상)"
            onChangeText={(text: string) => changingPassword(text)}
            onSubmitEditing={(text: string) =>
              checkPassword(text.nativeEvent.text)
            }
            onEndEditing={(text: string) =>
              checkPassword(text.nativeEvent.text)
            }
            secureTextEntry={true}
          />
          <InputBottomLine />
          {blankPassword && (
            <UnvalidInputText>공백은 사용할 수 없습니다.</UnvalidInputText>
          )}
          {(!validPassword || shortPassword) && !blankPassword && (
            <UnvalidInputText>영문,숫자포함의 8자리이상</UnvalidInputText>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Input
            autoCapitalize="none"
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onChangeText={(text: string) => changingPasswordSame(text)}
            onSubmitEditing={(text: string) =>
              checkPasswordSame(text.nativeEvent.text)
            }
            onEndEditing={(text: string) =>
              checkPasswordSame(text.nativeEvent.text)
            }
          />
          <InputBottomLine />
          {!passwordSame && (
            <UnvalidInputText>비밀번호가 일치하지 않습니다.</UnvalidInputText>
          )}
        </LabelInputContainer>
      </InputContainer>
      {(!confirmedEmail || !confirmedPassword || !confirmedPasswordSame) && (
        <UnabledFinishButton style={{marginBottom: keyboardHeight}}>
          <FinishText>다음</FinishText>
        </UnabledFinishButton>
      )}
      {confirmedEmail && confirmedPassword && confirmedPasswordSame && (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ProfileInput')}>
          <FinishButton style={{marginBottom: keyboardHeight}}>
            <FinishText>다음</FinishText>
          </FinishButton>
        </TouchableWithoutFeedback>
      )}
    </Container>
  );
};

export default BasicInput;
