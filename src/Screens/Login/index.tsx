import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {Keyboard, Button, Text} from 'react-native';
import Input from '~/Components/Input';
import auth from '@react-native-firebase/auth';
import LoginButton from '~/Components/Button';

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <LoginTitle {...props} />,
      headerRight: () => <Text></Text>,
    });
  }, []);

  return (
    <Container>
      <FormContainer>
        <Logo>HOOGING</Logo>
        <Input
          style={{marginBottom: 16}}
          placeholder="이메일"
          onChangeText={(text: string) => setEmail(text)}
        />
        <Input
          style={{marginBottom: 16}}
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
          onPress={() => {
            auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                console.log('User account signed in!');
              })
              .catch((error) => {
                if (error.code === 'auth/email-alreay-in-use') {
                  console.log('That email address is already in use!');
                }
                if (error.code === 'auth/incalid-email') {
                  console.log('That email address is invalid!');
                }
                console.log(error);
              });
          }}
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
