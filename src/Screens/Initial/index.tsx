import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const HoogingLogo = Styled.Image`
margin-left: 10px;
`;

const LoginButton = Styled.View`

`;

const SignUpButton = Styled.Text`
`;

const Initial = () => {
  return (
    <Container>
      <HoogingLogo source={require('~/Assets/Images/Logo/logo.png')} />
    </Container>
  );
};

export default Initial;
