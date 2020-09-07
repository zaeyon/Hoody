import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Platform, View, Alert} from 'react-native';
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

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';

// Route
import POSTSocialId from '~/Route/Auth/POSTSocialId';
import GETEmailCheck from '~/Route/Auth/GETEmailCheck';

const Container = Styled.View`
 flex: 1;
 background-color: #267DFF;
 align-items: center;
`;

const AppIconImage = Styled.Image`
width: ${wp('42%')};
height: ${wp('42%')};
`;

const LogoContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('65%')};
 justify-content: center;
 align-items: center;
 flex: 2;
`;

const LogoImage = Styled.Image`
width: ${wp('30%')};
height: ${wp('9%')};
`;

const IntroText = Styled.Text`
margin-top: 7px;
color: #FFFFFF;
font-size: 18px;
font-weight: bold;
`;

const AuthContainer = Styled.View`
width: ${wp('100%')};
 justify-content: center;
 align-items: center;
 flex: 1.4;
`;

const SocialLoginContainer = Styled.View`
margin-top: 20px;
  width: ${wp('100%')};
 justify-content: center;
 flex-direction: column;
 align-items: center;
`;


const LoginContainer = Styled.View`
`;

const SignupContainer = Styled.View`
`;

const KakaoLoginButton = Styled.View`
margin-top: 7px;
width: ${wp('91.46%')};
height: ${wp('14.4%')};
background-color: #FEE500;
border-radius: 10px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const GoogleLoginButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('14.4%')};
background-color: #FFFFFF;
border-radius: 10px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const GoogleIcon = Styled.Image`
  width: ${wp('6.4%')};
  height: ${wp('6.4%')};
`;

const GoogleLoginText = Styled.Text`
 margin-left: 6px;
 font-weight: 600;
 font-size: 16px;
 color: #333333;
`;

const KakaoIcon = Styled.Image`
  width: ${wp('5.8%')};
  height: ${wp('5.35%')};
`;

const KakaoLoginText = Styled.Text`
margin-left: 6px;
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const AppleIcon = Styled.Image`
  width: ${wp('5.35%')};
  height: ${wp('6.4%')};
`;

const AppleLoginText = Styled.Text`
margin-left: 6px;
font-weight: 600;
font-size: 16px;
color: #ffffff;
`;

const AppleLoginButton = Styled.View`
margin-top: 7px;
width: ${wp('91.46%')};
height: ${wp('14.4%')};
background-color: #1D1E1F;
border-radius: 10px;
align-items: center;
justify-content: center;
flex-direction: row;
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
text-decoration-line: underline
`;

const ReviewImage = Styled.Image`
 width: ${wp('100%')};
 height: ${wp('100%')};
`;

const LocalContainer = Styled.View`
width: ${wp('100%')};
flex-direction: row;
justify-content: space-between;
padding-top: 20px;
padding-left: 68px;
padding-right: 68px;
`;

const LocalLoginText = Styled.Text`
 font-weight: 600;
 font-size: 16px;
 color: #ffffff;
`;

const LocalSignupText = Styled.Text`
margin-top:2px;
font-weight: 600;
 font-size: 16px;
 color: #ffffff;
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

  async function onAppleButtonPress() {
    // performs login request
    /*
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });
  
    // get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // user is authenticated
      console.log("credentialState", credentialState)
    }
    */

    if(appleAuth.isSupported) {
   const requestOptions = {
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  };

  const { user } = await appleAuth.performRequest(requestOptions);

  try {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // authorized
    }
  } catch (error) {
    if (error.code === AppleAuthError.CANCELED) {
      console.log("AppleAuthError.CANCELED");
    }
    if (error.code === AppleAuthError.FAILED) {
      console.log("AppleAuthError.FAILED");
    }
    if (error.code === AppleAuthError.INVALID_RESPONSE) {
      console.log("INVALID_RESPONSE");
    }
    if (error.code === AppleAuthError.NOT_HANDLED) {
      console.log("NOT_HANDLED")
    }
    if (error.code === AppleAuthError.UNKNOWN) {
      console.log("UNKNOWN");
    }
  }

    } else {
      console.log("애플로그인을 지원하지않는 기기입니다.")
      Alert.alert('애플 로그인을 지원하지않는 기기입니다.' , '' , [
        {
          text: "확인",
          onPress:() => 0,
        }
      ])
    }
  }

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

  const getKakaoProfile = (socialId: string) => {
    logCallback('Get Profile Start', setProfileLoading(true));

    KakaoLogins.getProfile()
      .then((result) => {
        setProfile(result);
        logCallback(
          `Get Profile Finished:${JSON.stringify(result)}`,
          setProfileLoading(false),
        );
        POSTSocialId(result.id, result.email, 'kakao')
        .then(function(response) {
          console.log("소셜로그인 성공", response)
        })
        .catch(function(error) {
          console.log("소셜로그인 실패", error);
          GETEmailCheck(result.email)
          .then(function(response) {
          console.log("GETEmailCheck response", response);
          if(response.message === "이미 가입된 이메일입니다.") {

          } else if(response.message === "가입할 수 있는 이메일입니다.") {
          navigation.navigate('ProfileInput', {
            socialId: result.id,
            socialEmail: result.email,
            socialNickname: result.nickname,
            socialGender: result.gender,
            socialProvider: 'kakao',
          });
          }
          })
          .catch(function(error) {
            console.log("GETEmailCheck error", error)
            if(error.status === 403) {
              console.log("이미 사용중인 이메일", error.status);
              //setEmailOverlap(true);
            }
          })
          
          
        })

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
      if(Platform.OS === "android") {
      const token = await GoogleSignin.getTokens();
      console.log('사용자 토큰', token);
      const userInfo = await GoogleSignin.signIn();
      console.log('구글 로그인 성공 사용자 정보:', userInfo);
      navigation.navigate('ProfileInput', {
        socialId: userInfo.idToken,
        socialEmail: userInfo.user.email,
        socialNickname: userInfo.user.name,
        socialProvider: 'google',
      })
      } else if(Platform.OS === 'ios') {
        const userInfo = await GoogleSignin.signIn();
        console.log('구글 로그인 성공 사용자 정보:', userInfo);
        navigation.navigate('ProfileInput', {
          socialId: userInfo.idToken,
          socialEmail: userInfo.user.email,
          socialNickname: userInfo.user.name,
          socialProvider: 'google',
        })
        
      } 
    } catch (error) {
      console.log('구글 로그인 실패', error);
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
    if(Platform.OS === 'ios')
    {
      console.log("플랫폼 IOS")
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '452626894835-9q66v8ngdvg46lkmdmknevhbshud0alj.apps.googleusercontent.com', 
        
      });
  } else {
    GoogleSignin.configure();
  }
  };



  return (
    <Container>
      <LogoContainer>
        <AppIconImage
        source={require('~/Assets/Images/Logo/appIcon.png')}/>
        <LogoImage
        source={require('~/Assets/Images/Logo/HoodyLogo.png')}/>
        <IntroText>
          소비 네트워크의 시작
        </IntroText>
      </LogoContainer>
      <AuthContainer>
      <SocialLoginContainer>
      <TouchableWithoutFeedback onPress={() => googleLogin()}>
          <GoogleLoginButton>
            <GoogleIcon
            source={require('~/Assets/Images/SocialLogin/ic_google.png')}/>
            <GoogleLoginText>구글로 로그인</GoogleLoginText>
          </GoogleLoginButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => kakaoLogin()}>
          <KakaoLoginButton>
            <KakaoIcon
            source={require('~/Assets/Images/SocialLogin/ic_kakao.png')}/>
            <KakaoLoginText>카카오톡으로 로그인</KakaoLoginText>
          </KakaoLoginButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onAppleButtonPress()}>
        <AppleLoginButton>
          <AppleIcon
          source={require('~/Assets/Images/SocialLogin/ic_apple.png')}/>
          <AppleLoginText>애플로 로그인</AppleLoginText>
        </AppleLoginButton>
        </TouchableWithoutFeedback>
       
      </SocialLoginContainer>
      <LocalContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('LoginScreen')}>
            <LoginContainer>
            <LocalLoginText>이메일로 로그인</LocalLoginText>
            </LoginContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('BasicInput')}>
            <SignupContainer>
            <LocalSignupText>회원가입</LocalSignupText>
            </SignupContainer>
          </TouchableWithoutFeedback>
      </LocalContainer>
      </AuthContainer>
    </Container>
  );
};


export default Unauthorized;
