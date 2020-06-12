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

const ProfileContainer = Styled.View`
  flex: 1;
  background-color: #FEFFFF;
  border-color: #C3C3C3;
  
`;

const FeedContainer = Styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImageContainer = Styled.TouchableHighlight`
  background: #FFFFFF;
  padding: 1px;
`;

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 justify-content: center;
`;

const PinterMapContainer = Styled.View`
  background-color: #FFFFFF;
`;

const MapViewContainer = Styled.View`
 margin-top: 0px;
 background-color :#FFFFFF;

`;

const PinterMapHeaderContainer = Styled.View`
 background-color: #FFFFFF;
 align-items: center;
 justify-content: space-between;
 flex-direction: row;
 padding: 10px 15px 10px 15px;
`;

const PinterMapText = Styled.Text`
 font-size: 15px;
 
 background-color: #FFFFFF;
`;

const ViewAllText = Styled.Text`
font-size: 13px;

color: #c3c3c3;
`;

const ReviewHeaderContainer = Styled.View`
 background-color: #FFFFFF;
 align-items: center;
 justify-content: space-between;
 flex-direction: row;
 padding: 10px 15px 10px 15px;
`;

const ReviewText = Styled.Text`

 font-size: 15px;
 
`;

const MyFeedList = Styled.View`
 background-color: #FFFFFF;
 flex-direction: column;
`;

const ReviewFeedContainer = Styled.View`
 background-color: #FFFFFF;
 width: 100%;
`;

const ReviewImage = Styled.Image`
 width: ${wp('33%')};
 height: ${wp('33%')};
 margin-right: ${Platform.select({ios: 4, android: 4})};
`;

function CertifiedProfile({navigation}) {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const imageWidth = Dimensions.get('window').width / 3;
  const userReview_arr = [
    'https://d28dpoj42hxr8c.cloudfront.net/files/topics/9592_ext_14_ko_0.png?v=1456718570',
    'https://img.kbs.co.kr/kbs/620/nsimg.kbs.co.kr/data/news/2019/11/27/4331817_Z1f.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRiHGyfVX0g8i9yxoFqsJhX9K7Ww-EOx71LPAyDqHArNibwcfc&usqp=CAU',
  ];
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
    <ScrollView
      backgroundColor="#FFFFFF"
      stickyHeaderIndices={[2]}
      onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isBottom(event.nativeEvent)) {
        }
      }}>
      <ProfileContainer>
        <TouchableWithoutFeedback onPress={() => Logout()}>
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={{marginTop: 10, marginRight: 10, fontSize: 17}}>
              로그아웃
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <ProfileHeader
          image="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          posts={3431}
          follower={6530}
          following={217}
          IP={1290}
          name="맛집 후깅"
          tags="#을지로 #홍대입구 #신촌"
        />
      </ProfileContainer>
      <ReviewHeaderContainer>
        <ReviewText>리뷰</ReviewText>
        <ViewAllText>View All</ViewAllText>
      </ReviewHeaderContainer>
      <ReviewFeedContainer>
        <FlatGrid
          itemDimension={wp('100%')}
          horizontal={true}
          items={userReview_arr}
          spacing={0}
          renderItem={({item, index}) => {
            return <ReviewImage source={{uri: item}} />;
          }}
        />
      </ReviewFeedContainer>
    </ScrollView>
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
