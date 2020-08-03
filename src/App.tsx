import * as React from 'react';
import {
  View,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import Styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';
import {createStore} from 'redux';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '~/reducers';
import Unauthorized from '~/Screens/Unauthorized';
import AuthUser from '~/Auth';
import AppNavigator from '~/Navigator';
import Navigator from '~/Navigator';
import RNLocation from 'react-native-location';

const Container = Styled.View`
  
`;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

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

// 위치 권한 확인
RNLocation.configure({
  distanceFilter: 1, // Meters
  desiredAccuracy: {
    ios: "best",
    android: "balancedPowerAccuracy"
  },
  // Android only
  androidProvider: "auto",
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: "other",
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})

function App() {
  requestCameraPermission();
  return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
}

export default App;
