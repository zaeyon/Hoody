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
  return <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>로그인</Text>;
}

const Login = ({navigation}) => {
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

  const baseUrl = 'http://15.164.185.120:3000';

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

  const Login = () => {
    const url = 'https://e82f43910fe9.ngrok.io/' + 'auth/login';
    submitingEmail = email;
    submitingPassword = password;
    console.log('로그인 요청 email', submitingEmail);
    console.log('로그인 요청 password', submitingPassword);

    let form = new FormData();
    form.append('email', submitingEmail);
    form.append('password', submitingPassword);
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
          if (response.status === 200) {
            console.log('로그인 성공', response);
            dispatch(
              allActions.userActions.setUser({
                email: submitingEmail,
                password: submitingPassword,
              }),
            );
          }
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error);
        });
    });
  };

  return (
    <Container>
      <FormContainer>
        <Logo>HOOGING</Logo>
        <Input
          style={{marginBottom: 16, borderBottomWidth: 0.3}}
          placeholder="이메일"
          onChangeText={(text: string) => setEmail(text)}
        />
        <Input
          style={{marginBottom: 16, borderBottomWidth: 0.3}}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <PasswordReset onPress={() => navigation.navigate('PasswordReset')}>
          비밀번호 재설정
        </PasswordReset>
        <LoginButton
          label="로그인"
          style={{marginBottom: 24}}
          onPress={() => Login()}
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

Login.navigationOptions = {
  headerShown: false,
};

export default Login;
