import React from 'react';
import Styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = Styled.View`
  flex: 1;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;

const UncertifiedProfile = () => {
  return (
    <Container>
      <Text>로그인</Text>
      <Text style={{marginTop: 20}}>회원가입</Text>
    </Container>
  );
};

export default UncertifiedProfile;
