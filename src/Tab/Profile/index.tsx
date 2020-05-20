import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {View, Text} from 'react-native';
import CertifiedProfile from '~/Screens/CertifiedProfile';
import UncertifiedProfile from '~/Screens/UncertifiedProfile';
import Login from '~/Screens/Login';
import {createStore} from 'redux';
import {useSelector} from 'react-redux';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const Profile = ({navigation}) => {
  const currentUser = useSelector((state) => state.currentUser);
  // Set an initializing state whilst Firebase connects
  {
    /*
  if (currentUser.loggedIn) {
    return <CertifiedProfile navigation={navigation} />;
  } else {
    return <Login navigation={navigation} />;
  }
*/
  }
  return <Login navigation={navigation} />;
};
export default Profile;
