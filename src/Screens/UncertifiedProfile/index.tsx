import React from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '~/Screens/LoginScreen';

const Container = Styled.View`
  flex: 1;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;

const AuthenticationStack = createStackNavigator();

function AuthenticationStackScreen() {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'center',
      }}>
      <AuthenticationStack.Screen
        name="UncertifiedProfile"
        component={UncertifiedProfile}
      />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
}

const UncertifiedProfile = ({navigation}) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 20}}>회원가입</Text>
    </Container>
  );
};

export default UncertifiedProfile;
