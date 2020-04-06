import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import CertifiedProfile from '~/Screens/CertifiedProfile';
import UncertifiedProfile from '~/Screens/UncertifiedProfile';
import Login from '~/Screens/Login';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const Profile = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }>
          로그아웃
        </Text>
      ),
    });
  });

  if (initializing) return null;
  if (!user) {
    return <Login navigation={navigation} />;
  }
  return <CertifiedProfile navigation={navigation} />;
};

export default Profile;
