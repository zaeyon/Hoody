import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
  Alert
} from 'react-native';
import Styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';
import {createStore} from 'redux';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging'


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

// Waring 노란색창 숨기기
console.disableYellowBox = true;

function App() {
  const [pushToken, setPushToken] = useState<string>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      console.log("푸시 알림 message", message);
    })
  }, [])


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission()
    if (enabled) {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        setPushToken(fcmToken)
        console.log("fcmToken", fcmToken);
      }
    } else {
      const authorized = await messaging().requestPermission()
      if (authorized) setIsAuthorized(true)
    }
  }, [])

  const saveTokenToDatabase = useCallback(async (token) => {
    //const { error } = await setFcmToken(token)
    //if (error) throw Error(error)
  }, [])


  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await messaging().getToken()
      if (currentFcmToken !== pushToken) {
        return saveTokenToDatabase(currentFcmToken)
      }

      return messaging().onTokenRefresh((token) => saveTokenToDatabase(token))
    }
  }, [pushToken, isAuthorized])

  useEffect(() => {
    foregroundListener()
    handlePushToken()
    saveDeviceToken()
    requestCameraPermission()
  }, [])


  useEffect(() => {
    SplashScreen.hide();
  })

  return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
}

export default App;
