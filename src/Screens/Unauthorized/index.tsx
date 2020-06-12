import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

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

const AuthContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('30%')};
 justify-content: center;
 align-items: center;
`;

const SocialLoginContainer = Styled.View`
margin-top: 20px;
  width: ${wp('100%')};
height: ${hp('8%')};
 justify-content: center;
 flex-direction: row;
 align-items: center;
`;

const LocalContainer = Styled.View`
 align-items: center;
`;

const LoginContainer = Styled.View`
 width: ${wp('100%')};
height: ${hp('8%')};
margin-top: 0px;
 align-items: center;
 justify-content: center;
 margin-bottom: 5px;
`;

const SignupContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('5%')};
justify-content: center;
align-items: center;
`;

const KakaoLoginButton = Styled.Image`
margin-left: 5px;
width: ${wp('16%')};
height: ${wp('16%')};
`;

const GoogleLoginButton = Styled.Image`
margin-left: 5.5px;
width: ${wp('15%')};
height: ${wp('15%')};
`;

const AppleLoginButton = Styled.Image`
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
height: ${Platform.select({ ios: hp('6.5%'), android: hp('8.5%')})};
background-color: #23e5d2;
border-radius: 20px;
border-width: 0.3px;
border-color: #cccccc;
justify-content: center;
align-items: center;
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

if (!KakaoLogins) {
  console.log('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};

const Unauthorized = ({navigation}) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login()
      .then((result) => {
        setToken(result.accessToken);
        logCallback(
          `Login Finished: ${JSON.stringify(result)}`,
          setLoginLoading(false),
        );
        getKakaoProfile();
      })
      .catch((err) => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Canclled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Faild:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };

  const getKakaoProfile = () => {
    logCallback('Get Profile Start', setProfileLoading(true));

    KakaoLogins.getProfile()
      .then((result) => {
        setProfile(result);
        logCallback(
          `Get Profile Finished:${JSON.stringify(result)}`,
          setProfileLoading(false),
        );

        navigation.navigate('ProfileInput', {
          socialId: result.accessToken,
          socialEmail: result.email,
          socialNickname: result.nickname,
          socialGender: result.gender,
          socialProvider: 'kakao',
        });
      })
      .catch((err) => {
        logCallback(
          `Get Profile Failed:${err.code} ${err.message}`,
          setProfileLoading(false),
        );
      });
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const token = await GoogleSignin.getTokens();
      console.log('사용자 토큰', token);
      const userInfo = await GoogleSignin.signIn();
      console.log('구글 로그인 성공 사용자 정보:', userInfo);
      navigation.navigate('ProfileInput', {
        socialId: token.accessToken,
        socialEmail: userInfo.user.email,
        socialNickname: userInfo.user.name,
        socialProvider: 'google',
      });
    } catch (error) {
      console.log('구글 로그인 실패', error.code);
      console.log('statusCodes', statusCodes);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId: "com.googleusercontent.apps.829653698047-sqnl4mf76c4srsupi6vaq1kd70sg0f7l"
    });
  };

  return (
    <Container>
      <LogoContainer>
        <HoogingLogo source={require('~/Assets/Images/Logo/logo.png')} />
      </LogoContainer>
      <AuthContainer>
      <SocialLoginContainer>
        <TouchableWithoutFeedback onPress={() => kakaoLogin()}>
          <KakaoLoginButton
            source={require('~/Assets/Images/SocialLogin/ic_kakaoLogin.png')}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => googleLogin()}>
          <GoogleLoginButton
            source={require('~/Assets/Images/SocialLogin/ic_googleLogin.png')}
          />
        </TouchableWithoutFeedback>
        <AppleLoginButton
          source={require('~/Assets/Images/SocialLogin/ic_appleLogin.png')}
        />
      </SocialLoginContainer>
      <LocalContainer>
        <LoginContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('LoginScreen')}>
            <LoginButton>
              <LoginText>이메일로 로그인</LoginText>
            </LoginButton>
          </TouchableWithoutFeedback>
        </LoginContainer>
        <SignupContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('BasicInput')}>
            <SignupText>이메일 가입하기</SignupText>
          </TouchableWithoutFeedback>
        </SignupContainer>
      </LocalContainer>
      </AuthContainer>
    </Container>
  );
};


export default Unauthorized;
