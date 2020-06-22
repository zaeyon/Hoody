import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback} from 'react-native';
import LoginButton from '~/Components/Button';
import axios from 'axios';
import {resolvePlugin} from '@babel/core';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Login from '~/Route/Auth/Login';

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('80%')};
height: 50px;
`;

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 background-color: #c3c3c3;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('7%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('7%')};
flex: 7;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('7%')};
flex: 1;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const FormContainer = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Logo = Styled.Text`
  color: #292929;
  font-size: 40px
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  color: #3796EF;
  text-align: center;
  margin-bottom: 24px;
`;

const SignupText = Styled.Text`
  color: #929292;
  text-align: center;
`;

const SignupLink = Styled.Text`
  color: #3796EF;
`;

const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;

const Copyright = Styled.Text`
  color: #929292;
  text-align: center;
`;

function LoginTitle() {
  return <Text style={{fontSize: 17, }}>로그인</Text>;
}

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const counter = useSelector((state) => state.counter);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const user = {name: 'Rei'};
  let submitingEmail;
  let submitingPassword;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <LoginTitle {...props} />,
      headerRight: () => <Text></Text>,
    });
  }, []);

  function checkLogin(email, password) {
    const userData = {
      email: email,
      pw: password,
    };
    console.log('userData: ', userData);

    console.log('로그인 전 currentUser.loggedIn', currentUser.loggedIn);
    restHTTPPost(baseUrl + '/signIn', userData).then(function (data) {
      console.log('data.success', data.success);
      if (data.success === true) {
        dispatch(allActions.userActions.setUser(user));
        console.log('로그인 후 currentUser.loggedIn', currentUser.loggedIn);
      } else {
      }
    });
  }

  function restHTTPPost(url, data) {
    console.log('data: ', data);
    let form = new FormData();
    form.append('email', data.email);
    form.append('pw', data.pw);
    return new Promise(function (resolve, reject) {
      axios
        .post(url, form, {
          //withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        })
        .then(function (response) {
          console.log('response : ', response);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error);
        });
    });
  }

  const clickFinish = () => {
     submitingEmail = email;
    submitingPassword = password;
    console.log('로그인 요청 email', submitingEmail);
    console.log('로그인 요청 password', submitingPassword);

    Login(submitingEmail, submitingPassword)
    .then(function(response) {
      console.log('로그인성공 유저 정보@@', response.data.user);
      if(response.status === 200) {
        dispatch(
          allActions.userActions.setUser({
            email: submitingEmail,
            password: submitingPassword,
            nickname: response.data.user.nickname,
          })
        )
      }
    })
    .catch(function (error) {
      console.log("error: ", error);
    })
  };

  return (
    <Container>

<HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText>로그인</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText></ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <FormContainer>
        <Logo>HOOGING</Logo>
        <Input
          style={{marginBottom: 16, borderBottomWidth: 0.3}}
          placeholder="이메일"
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          style={{marginBottom: 16, borderBottomWidth: 0.3}}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          autoCapitalize="none"
        />
        <PasswordReset onPress={() => navigation.navigate('PasswordReset')}>
          비밀번호 재설정
        </PasswordReset>
        <LoginButton
          label="로그인"
          style={{marginBottom: 24}}
          onPress={() => clickFinish()}
        />
        <SignupText>
          계정이 없는가요?{' '}
          <SignupLink onPress={() => navigation.navigate('Signup')}>
            가입하기.
          </SignupLink>
        </SignupText>
      </FormContainer>
      <Footer>
        <Copyright>HOOGING</Copyright>
      </Footer>
    </Container>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
