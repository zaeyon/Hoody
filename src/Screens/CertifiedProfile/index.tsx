import React, {useState, useContext, useEffect} from 'react';
import {
  NativeScrollEvent,
  Dimensions,
  NativeSyntheticEvent,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  SafeAreaView
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ProfileHeader from '~/Screens/ProfileHeader';
import PinterMap from '~/Screens/PinterMap';
import {FlatGrid} from 'react-native-super-grid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import KakaoLogins from '@react-native-seoul/kakao-login';

import GetUserProfile from '~/Route/Profile/GetProfileFeedByList';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const MyProfileSettingButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const MyProfileReportContainer = Styled.View`
 width: ${wp('22%')};
 height: ${wp('9')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding-left: 4px;
 padding-right: 12px;
`;

const MyProfileReportImage = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const MyProfileReportText = Styled.Text`
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const MyProfileReviewMapContainer = Styled.View`
margin-left: 7px;
width: ${wp('22%')};
 height: ${wp('9')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;


const MyProfileReviewMapImage = Styled.Image`
 width: ${wp('6.6%')};
 height: ${wp('6.6%')};
`;


const MyProfileReviewMapText = Styled.Text`
 margin-left: 5px;
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;


function CertifiedProfile({navigation}) {
  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser);
  const dispatch = useDispatch();
  
  const userReview_arr = [
    'https://d28dpoj42hxr8c.cloudfront.net/files/topics/9592_ext_14_ko_0.png?v=1456718570',
    'https://img.kbs.co.kr/kbs/620/nsimg.kbs.co.kr/data/news/2019/11/27/4331817_Z1f.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRiHGyfVX0g8i9yxoFqsJhX9K7Ww-EOx71LPAyDqHArNibwcfc&usqp=CAU',
  ];

  /*
  useEffect(() => {
    GetUserProfile(currentUser.user.nickname)
    .then(function(response) {
      console.log("유저프로필", response)
    })
    .catch(function(error) {
      console.log("유저프로필 불러오기실패", error);
    })

  },[])
  */

  const isBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  function Logout() {
    console.log('접속 사용자 정보', currentUser);
    if (currentUser.user.provider === 'kakao') {
      KakaoLogins.logout()
        .then((result) => {
          console.log('로그아웃성공', result);
          dispatch(allActions.userActions.logOut());
        })
        .catch((err) => {
          console.log('에러 발생', err.code, err.message);
        });
    } else {
      dispatch(allActions.userActions.logOut());
    }
  }



  return (
    <Container>
      <HeaderBar>
        <HeaderLeftContainer>
          <MyProfileSettingButton
          source={require('~/Assets/Images/ic_hamburger.png')}
          />
        </HeaderLeftContainer>
        <HeaderRightContainer>
          <MyProfileReportContainer>
            <MyProfileReportImage
            source={require('~/Assets/Images/ic_report.png')}/>
            <MyProfileReportText>리포트</MyProfileReportText>
          </MyProfileReportContainer>
          <MyProfileReviewMapContainer>
            <MyProfileReviewMapImage
            source={require('~/Assets/Images/ic_reviewMap.png')}/>
            <MyProfileReviewMapText>299</MyProfileReviewMapText>
          </MyProfileReviewMapContainer>
        </HeaderRightContainer>
      </HeaderBar>

    </Container>
  );
}

export default CertifiedProfile;

/*
<PinterMapContainer>
          <PinterMapHeaderContainer>
            <PinterMapText>핀터맵</PinterMapText>
            <ViewAllText>View All</ViewAllText>
          </PinterMapHeaderContainer>
          <MapViewContainer>
            <MapView
              style={{height: 200}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </MapViewContainer>
        </PinterMapContainer>
        */
