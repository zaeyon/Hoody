import React, {useEffect, useState, createRef, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Text, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, MapViewAnimated} from 'react-native-maps';


const MarkerThumbnailImage = Styled.Image`
 width: 50px;
 height: 50px;
 border-radius: 50px;
`;

const MarkerThumbnailContainer = Styled.View`
 flex:1;
 width: 66px;
 height: 66px;
 justify-content: center;
 align-items: center;
 padding-top: 0px;
 padding-left: 0px;
 padding-right: 3px;
 padding-bottom: 6px;
`;

const SmallMarkerThumbnailImage = Styled.Image`
 width: 34px;
 height: 34px;
 border-radius: 50px;
`;

const SmallMarkerThumbnailContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 padding-top: 4.2px;
 padding-left: 7px;
`;

const OneMoreThenMarkerThumbnailContainer = Styled.View`
flex:1;
 justify-content: center;
 align-items: center;
 padding-top: 4.2px;
 padding-left: 7px;
 width: 50px;
 height: 50px;
`;


const FeedCountContainer = Styled.View`
position: absolute;
top: 0px;
right: 0px;
`;

const FeedCountBackground = Styled.View`
padding-top: 4px;
padding-bottom: 4px;
padding-left: 6px;
padding-right: 6px;
border-radius: 26px;
background-color: #00000095;
`;

const OneMoreThanFeedCountBackground = Styled.View`
padding-top: 4px;
padding-bottom: 4px;
padding-left: 7.5px;
padding-right: 7.5px;
border-radius: 50px;
background-color: #00000095;
`;

const FeedCountText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #FFFFFF;
`;


const FeedCountText2 = Styled.Text`
top: 3.5px;
left: 6px;
position: absolute;
font-weight: 500;
font-size: 13px;
color: #FFFFFF;
`;


const OneMoreThanFeedCountText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #FFFFFF;
`;


const OneMoreThanFeedCountText2 = Styled.Text`
top: 3.5px;
left: 7.5px;
position: absolute;
font-weight: 500;
font-size: 13px;
color: #FFFFFF;
`;



interface Props {
    mapRef: any,
    mapRegion: any,
    initialMapRegion: any,
    locationListData: any,
    onPressLocationMarker: (coordinate:any, index:number, location:any) => void,
    onRegionChange: (location:any) => void,
}

const FeedMap = ({mapRef,mapRegion, initialMapRegion, locationListData, onPressLocationMarker, onRegionChange}: Props) => {

    return (
      <MapView
      onRegionChangeComplete={(Region:any) => onRegionChange(Region)}
      ref={mapRef}
      style={{flex:1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialMapRegion}
      showsUserLocation={true}>
        {locationListData?.map((location, index) => {
          if(location.metaData.num >= 10) {
            return (
         <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.metaData.lat,
            longitude: location.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_big.png')}>
            <MarkerThumbnailContainer>
              <MarkerThumbnailImage
                 style={!location.metaData.coverImg && {width: 40, height: 40, marginBottom:11, marginRight:8}}
                 source={
                 location.metaData.coverImg
                 ? {uri:location.metaData.coverImg}
                 : require('~/Assets/Images/Map/ic_hash.png')
                   }/>
              <FeedCountContainer>
              <FeedCountBackground>
                <FeedCountText style={{opacity:0}} >{location.metaData.num}</FeedCountText>
              </FeedCountBackground>
              <FeedCountText2>{location.metaData.num}</FeedCountText2>
              </FeedCountContainer>
            </MarkerThumbnailContainer>
          </Marker>
        )} else if(location.metaData.num === 1) {
          return (
            <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.metaData.lat,
            longitude: location.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_small.png')}>
            <SmallMarkerThumbnailContainer>
              <SmallMarkerThumbnailImage
              style={!location.metaData.coverImg && {width: 20, height: 20, marginTop:7, marginLeft:7}}
              source={
              location.metaData.coverImg
              ? {uri:location.metaData.coverImg}
              : require('~/Assets/Images/Map/ic_hash.png')
                }/>
            </SmallMarkerThumbnailContainer>
          </Marker>
          )} else if(1 < location.metaData.num && location.metaData.num < 10) {
            return (
              <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            coordinate={{
              latitude: location.metaData.lat,
              longitude: location.metaData.long,
            }}
            image={require('~/Assets/Images/Map/ic_marker_small.png')}>
              <OneMoreThenMarkerThumbnailContainer>
              <SmallMarkerThumbnailImage
              style={!location.metaData.coverImg && {width: 20, height: 20, marginBottom:11, marginRight:8}}
              source={
              location.metaData.coverImg
              ? {uri:location.metaData.coverImg}
              : require('~/Assets/Images/Map/ic_hash.png')
                }/>
                 <FeedCountContainer>
              <OneMoreThanFeedCountBackground>
                <OneMoreThanFeedCountText style={{opacity:9}} >{location.metaData.num}</OneMoreThanFeedCountText>
              </OneMoreThanFeedCountBackground>
              <OneMoreThanFeedCountText2>{location.metaData.num}</OneMoreThanFeedCountText2>
              </FeedCountContainer>
              </OneMoreThenMarkerThumbnailContainer>
            </Marker>
            )} 
        })}
      </MapView>
    )
}


const MemoizedFeedMap= React.memo(FeedMap);

export default MemoizedFeedMap;