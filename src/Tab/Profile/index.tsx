import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {View, Text} from 'react-native';
import CertifiedProfile from '~/Screens/CertifiedProfile';
import UncertifiedProfile from '~/Screens/UncertifiedProfile';
import Login from '~/Screens/Login';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const Profile = ({navigation}) => {
  // Set an initializing state whilst Firebase connects

  return <Login navigation={navigation} />;
};

export default Profile;
