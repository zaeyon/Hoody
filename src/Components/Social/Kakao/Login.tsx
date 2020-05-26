import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Image, YelloBox} from 'react-native';

import KakaoLogins from '@react-native-seoul/kakao-login';

if (!KakaoLogins) {
  console.log('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};

export default function KakaoLogin() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  logCallback('Login Start', setLoginLoading(true));
  KakaoLogins.login()
    .then((result) => {
      setToken(result.accessToken);
      logCallback(
        `Login Finished: ${JSON.stringify(result)}`,
        setLoginLoading(false),
      );
    })
    .catch((err) => {
      if (err.code === 'E_CANCELLED_OPERATION') {
        logCallback(`Login Canclled:${err.message}`, setLoginLoading(false));
      } else {
        logCallback(
          `Login Faild:${err.code} ${err.message}`,
          setLoginLoading(false),
        );
      }
    });
}
