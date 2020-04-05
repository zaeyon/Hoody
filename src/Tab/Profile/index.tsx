import React, {useState, useContext, useEffect} from 'react';
import {
  NativeScrollEvent,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  ScrollView,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ProfileHeader from '~/Screens/ProfileHeader';
import PinterMap from '~/Screens/PinterMap';
import FeedItem from '~/Components/FeedItem';

const ProfileContainer = Styled.View`
  flex: 1;
  background-color: #FEFFFF;
  border-bottom-width: 0.4px;
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
 border-width: 0.4px;
 border-color: #C3C3C3;
`;

const PinterMapTextContainer = Styled.View`
 background-color: #FFFFFF;
 align-items: center;
 justify-content: center;
 padding: 5px;
`;

const PinterMapText = Styled.Text`
 font-size: 23px;
`;

const MyFeedList = Styled.View`
 background-color: #FFFFFF;
 flex-direction: column;
`;

function Profile({navigation}) {
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
      <TouchableOpacity onPress={() => navigation.navigate('PinterMap')}>
        <PinterMapContainer>
          <PinterMapTextContainer>
            <PinterMapText>Pinter Map</PinterMapText>
          </PinterMapTextContainer>
          <MapViewContainer>
            <MapView
              style={{height: 170}}
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
      </TouchableOpacity>
      <MyFeedList>
        <FeedItem
          name="hooging"
          photo="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          description="을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 에어팟보다 기능이 좋다는것을 알 수 있었다."
          mainImage="https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000"
          rating="4.5 / 5"
        />
        <FeedItem
          name="hooging"
          photo="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          description="을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 에어팟보다 기능이 좋다는것을 알 수 있었다."
          mainImage="https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000"
          rating="4.5 / 5"
        />

        <FeedItem
          name="hooging"
          photo="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          description="을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 에어팟보다 기능이 좋다는것을 알 수 있었다."
          mainImage="https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000"
          rating="4.5 / 5"
        />
      </MyFeedList>
    </ScrollView>
  );
}

export default Profile;
