import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const LogoContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('70%')};
 justify-content: center;
 align-items: center;
`;

const SocialLoginContainer = Styled.View`
  width: ${wp('100%')};
height: ${hp('9%')};
 justify-content: center;
 flex-direction: row;
 align-items: center;
`;

const LocalContainer = Styled.View`
 align-items: center;
`;

const LoginContainer = Styled.View`
 width: ${wp('100%')};
height: ${hp('10%')};
margin-top: 0px;
 align-items: center;
 justify-content: center;
`;

const SignupContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('5%')};
justify-content: center;
align-items: center;
`;

const FacebookLogin = Styled.Image`
 width: ${wp('15%')};
 height: ${wp('15%')};
`;

const KakaoLogin = Styled.Image`
margin-left: 5px;
width: ${wp('16%')};
height: ${wp('16%')};
`;

const GoogleLogin = Styled.Image`
margin-left: 5.5px;
width: ${wp('15%')};
height: ${wp('15%')};
`;

const AppleLogin = Styled.Image`
margin-left: 6.7px;
width: ${wp('15%')};
height: ${wp('15%')};
`;

const HoogingLogo = Styled.Image`
margin-left: 10px;
margin-top: 40px;
`;

const LoginButton = Styled.View`
width: ${wp('80%')};
height: ${hp('8.5%')};
background-color: #23e5d2;
border-radius: 20px;
border-width: 0.3px;
border-color: #cccccc;
`;

const LoginText = Styled.Text`
position: absolute;
font-size: 18px;
color: #ffffff;
`;

const SignupText = Styled.Text`
font-size: 15px;
color: #707070;
`;

const Unauthorized = ({navigation}) => {
  return (
    <Container>
      <LogoContainer>
        <HoogingLogo source={require('~/Assets/Images/Logo/logo.png')} />
      </LogoContainer>
      <SocialLoginContainer>
        <FacebookLogin
          source={require('~/Assets/Images/SocialLogin/ic_facebookLogin.png')}
        />
        <KakaoLogin
          source={require('~/Assets/Images/SocialLogin/ic_kakaoLogin.png')}
        />
        <GoogleLogin
          source={require('~/Assets/Images/SocialLogin/ic_googleLogin.png')}
        />
        <AppleLogin
          source={require('~/Assets/Images/SocialLogin/ic_appleLogin.png')}
        />
      </SocialLoginContainer>
      <LocalContainer>
        <LoginContainer>
          <LoginButton />
          <LoginText>이메일로 로그인</LoginText>
        </LoginContainer>
        <SignupContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('BasicInput')}>
            <SignupText>이메일 가입하기</SignupText>
          </TouchableWithoutFeedback>
        </SignupContainer>
      </LocalContainer>
    </Container>
  );
};

export default Unauthorized;
