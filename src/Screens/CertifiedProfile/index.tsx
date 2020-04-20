import React, {useState, useContext, useEffect} from 'react';
import {
  NativeScrollEvent,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  ScrollView,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ProfileHeader from '~/Screens/ProfileHeader';
import PinterMap from '~/Screens/PinterMap';
import FeedItem from '~/Components/FeedItem';

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
 font-family: 'Arita4.0_M';
 background-color: #FFFFFF;
`;

const ViewAllText = Styled.Text`
font-size: 13px;
font-family: 'Arita4.0_L';
color: #c3c3c3;
`;

const ReviewHeaderContainer = Styled.View`
 background-color: #FFFFFF;
 align-items: center;
 justify-content: space-between;
 flex-direction: row;
 padding: 10px 15px 10px 15px;
 margin-top: 15px;
`;

const ReviewText = Styled.Text`

 font-size: 15px;
 font-family: 'Arita4.0_M';
`;

const MyFeedList = Styled.View`
 background-color: #FFFFFF;
 flex-direction: column;
`;

function CertifiedProfile({navigation}) {
  const imageWidth = Dimensions.get('window').width / 3;

  const isBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <ScrollView
      backgroundColor="#FFFFFF"
      stickyHeaderIndices={[2]}
      onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isBottom(event.nativeEvent)) {
        }
      }}>
      <ProfileContainer>
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
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('PinterMap')}>
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
      </TouchableWithoutFeedback>
      <ReviewHeaderContainer>
        <ReviewText>리뷰</ReviewText>
        <ViewAllText>View All</ViewAllText>
      </ReviewHeaderContainer>
    </ScrollView>
  );
}

export default CertifiedProfile;
