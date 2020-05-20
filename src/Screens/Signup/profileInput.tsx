import React, {useLayoutEffect, useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {Text, Button, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BaseRouter} from '@react-navigation/native';
import Amplify, {Auth} from 'aws-amplify';
const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const FinishText = Styled.Text`
 font-size: 16px;
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
margin-top: 50px;
 width: ${wp('80%')};
 height: ${hp('70%')};
 align-items: center;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('80%')};
 margin-top: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('80%')};
height: 50px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('80%')};
height: 0.5px;
background-color: #c3c3c3;
`;

const ProfileImage = Styled.Image`
width: ${wp('25%')};
height: ${wp('25%')};
border-radius: 100;
`;

const Header = Styled.View`
position: absolute;
top: 0px;
bottom: 0px;
width: ${wp('100%')};
height: ${hp('7.5%')};
elevation: 1;
border-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-right: 10px;
padding-left: 10px;
`;

const HeaderTitle = Styled.Text`
font-size: 17px;
`;

const ProfileInput = ({navigation, route}: Props) => {
  const [profileImage, setProfileImage] = useState(
    'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
  );
  const {signup_email, signup_password} = route.params;
  const [signUpNickname, setSignUpNickname] = useState('');
  const [signUpBirthday, setSignUpBirthday] = useState('');
  const [signUpGender, setSignUpGender] = useState('');

  async function signUp(
    username,
    password,
    email,
    birthdate,
    gender,
    nickname,
  ) {
    console.log(email, password, username, birthdate, gender);
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          birthdate, // optional - E.164 number convention
          gender, // other custom attributes
          nickname,
        },
      });
      console.log({user});
      console.log('유저 인증', {user});
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  useEffect(() => {
    if (route.params?.profileImage) {
      console.log('프로필사진선택 : ', route.params.profileImage);
      setProfileImage(route.params.profileImage);
    }
  }, [route.params?.profileImage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() =>
            signUp(
              signup_email,
              signup_password,
              signup_email,
              signUpBirthday,
              signUpGender,
              signUpNickname,
            )
          }>
          <FinishText>완료</FinishText>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Header>
        <HeaderTitle>취소</HeaderTitle>
        <HeaderTitle>회원가입</HeaderTitle>
        <TouchableWithoutFeedback
          onPress={() =>
            signUp(
              signup_email,
              signup_password,
              signup_email,
              signUpBirthday,
              signUpGender,
              signUpNickname,
            )
          }>
          <HeaderTitle>다음</HeaderTitle>
        </TouchableWithoutFeedback>
      </Header>
      <InputContainer style={{marginTop: 100}}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Gallery_ProfileImage')}>
          <ProfileImage source={{uri: profileImage}} />
        </TouchableWithoutFeedback>
        <LabelInputContainer>
          <TextInputLabelText>닉네임</TextInputLabelText>
          <Input
            placeholder="2 ~ 12자"
            onChangeText={(text: string) => setSignUpNickname(text)}
          />
          <InputBottomLine />
        </LabelInputContainer>
        <LabelInputContainer>
          <TextInputLabelText>생년월일</TextInputLabelText>
          <Input
            placeholder="ex) 1993.12.08"
            onChangeText={(text: string) => setSignUpBirthday(text)}
          />
          <InputBottomLine />
        </LabelInputContainer>
        <LabelInputContainer>
          <TextInputLabelText>성별</TextInputLabelText>
          <Input
            placeholder="표시 안함"
            onChangeText={(text: string) => setSignUpGender(text)}
          />
          <InputBottomLine />
        </LabelInputContainer>
      </InputContainer>
    </Container>
  );
};

export default ProfileInput;
