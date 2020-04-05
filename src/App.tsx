import * as React from 'react';
import {View, Text, Button, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';
import Navigator from '~/Navigator';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert('카메라 권한을 허용해주세요.');
    }
  } catch (err) {
    console.warn(err);
  }
}

function App() {
  requestCameraPermission();
  return <Navigator />;
}

export default App;
