import React, {useState, useLayoutEffect, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
  keyboardEvent,
} from 'react-native';
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
 width: ${wp('6.5%')};
 height: ${wp('6.5%')};
 border-width: 10px;
 tint-color: #000000;
`;

const FinishButtonContainer = Styled.View`
 justify-content:flex-end;
 background-color:#000000;
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

const FinishButton = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8.8%')};
 position: absolute;
 bottom: 0;
 background-color: #23E5D2;
 justify-content: center;
 align-items: center;
`;

const FinishText = Styled.Text`
font-size: 20px;
color: #ffffff;
`;

const UnvalidEmailText = Styled.Text`
 font-size: 14px;
 position: absolute;
 bottom: -15px;
 color: #FF0000;
`;

const ProfileImage = Styled.Image`
 width: ${wp('25%')};
 height: ${wp('25%')};
 border-radius: 100;
`;

const ProfileInput = ({navigation, route}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [profileImage, setProfileImage] = useState(
    'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
  );
  const [inputedNickname, setInputedNickname] = useState('');

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    console.log('키보드 높이', e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  useEffect(() => {
    if (route.params?.profileImage) {
      console.log('프로필사진선택 : ', route.params.profileImage);
      setProfileImage(route.params.profileImage);
    }
  }, [route.params?.profileImage]);

  return (
    <Container>
      <Header>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <CloseButton source={require('~/Assets/Images/ic_back.png')} />
        </TouchableWithoutFeedback>
        <HeaderTitle>회원가입</HeaderTitle>
        <CloseButton
          style={{tintColor: '#ffffff'}}
          source={require('~/Assets/Images/ic_back.png')}
        />
      </Header>
      <InputContainer style={{marginTop: 60}}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Gallery_ProfileImage')}>
          <ProfileImage source={{uri: profileImage}} />
        </TouchableWithoutFeedback>
        <LabelInputContainer>
          <Input
            placeholder="닉네임"
            onChangeText={(text: string) => setInputedEmail(text)}
            onSubmitEditing={(text: string) =>
              checkEmail(text.nativeEvent.text)
            }
            onEndEditing={(text: string) => checkEmail(text.nativeEvent.text)}
          />
          <InputBottomLine />
        </LabelInputContainer>
      </InputContainer>
      <UnabledFinishButton style={{marginBottom: keyboardHeight}}>
        <FinishText>완료</FinishText>
      </UnabledFinishButton>

      {/*
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ProfileInput')}>
          <FinishButton style={{marginBottom: keyboardHeight}}>
            <FinishText>완료</FinishText>
          </FinishButton>
        </TouchableWithoutFeedback>
      */}
    </Container>
  );
};

export default ProfileInput;
