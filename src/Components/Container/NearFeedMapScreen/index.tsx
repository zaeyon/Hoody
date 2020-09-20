import React, {useEffect, useState, createRef, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Text, Dimensions, FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, MapViewAnimated} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';

import SlidingUpPanel from '~/Components/Presentational/NearFeedMapScreen/SlidingUpPanel';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import NearFeedItem from '~/Components/Presentational/NearFeedMapScreen/NearFeedItem';
import { onChange } from 'react-native-reanimated';

// Route
import GETSearchSurroundPost from '~/Route/Search/GETSearchSurroundPost';

const Container = Styled.View`
 flex: 1;
 background-color:#ffffff;
`

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.86%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
padding-left: 16px;
padding-bottom: 13px;
padding-top: 15px;
padding-right: 16px;
background-color: #ffffff;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const HeaderLogoImage = Styled.Image`
 width: ${wp('23.3%')};
 height: ${wp('5.5%')};
`;


const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-bottom: 13px;
padding-top: 15px;
padding-right: 16px;
justify-content: center;
align-items: center;
background-color: #ffffff;
`;

const HeaderMarkerImage = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderCancelImage = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 1px;
 background-color: #F1F1F1;
`;


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
 padding-right: 2.5px;
 padding-bottom: 8px;
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
 padding-bottom: 7.8px;
 padding-right: 2.5px;
 width: 50px;
 height: 50px;
`;

const PanelContainer = Styled.View`
 background-color: #ffffff;
 border-top-left-radius: 15px;
 border-top-right-radius: 15px;
 padding-bottom: 16px;
 flex: 1;
`;

const PanelHeaderContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('15%')};
padding-left: 16px;
padding-right: 16px;
 padding-top: 4px;
 align-items: center;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const LocationPanelHeaderContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('23%')};
padding-left: 16px;
padding-right: 16px;
 padding-top: 4px;
 align-items: center;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const PanelToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
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
padding-top: 2px;
padding-bottom: 2px;
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

const CurrentLocationText = Styled.Text`
font-weight: 500;
font-size: 16px;
color: #333333;
`;

const RadiusRangeText = Styled.Text`
margin-left: 4px;
font-weight: 500;
font-size: 16px;
color: #267DFF;
`;

const DropDownIcon = Styled.Image`
margin-left: 3px;
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const NoImageMarkerImage = Styled.Image`
width: 20px;
height: 20px;
`;

const NearAllFeedCountContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
width: ${wp('100%')};
padding-top: 10px;
padding-bottom:15px;

`;

const NearAllFeedCountText = Styled.Text`
font-weight: 500;
font-size: 16px;
color: #333333;
`;

const RadiusSettingModalContainer = Styled.View`
width: ${wp('100%')}
height: ${wp('40%')};
background-color: #ffffff;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
`;


const RadiusSettingHeaderContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
padding-top: 14px;
padding-bottom: 14px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
justify-content: space-between;
`;

const RadiusSettingText = Styled.Text`
font-weight: 600;
color: #1D1E1F;
font-size: 18px;
`;

const RadiusSettingCancelText = Styled.Text`
font-size: 16px;
color: #C6C7CC;
`;

const RadiusItemListContainer = Styled.View`
 padding-top: 0px;
 flex-direction: row;
 padding-left: 16px;
 padding-right: 16px;
`;

const RadiusItemBackground = Styled.View`
 border-width: 1px;
 border-color: #ECECEE;
 background-color: #FAFAFA;
 border-radius: 20px;
 padding-top: 8px;
 padding-bottom: 8px;
 padding-left: 12px;
 padding-right: 12px;
 flex-direction: row;
 margin-right: 15px;
`;

const RadiusItemRangeText = Styled.Text`
 font-weight: 500;
 font-size: 18px;
 color: #8E9199;
`;

const PanelToggleContainer = Styled.View`
 width: ${wp('100%')};
 padding-top: 4px;
 padding-bottom: 12px;
 align-items: center;
`;

const SelectedLocationInfoContainer = Styled.View`
margin-top: 12px;
padding-bottom: 13px;
flex-direction: column;
`;

const SelectedLocationRatingFeedCountContainer = Styled.View`
 width: ${wp('100%')};
 padding-left: 16px;
 padding-right: 16px;
 margin-top: 6px;
 flex-direction: row;
 align-items: center;
 background-color: #FFFFFF;
`;

const SelectedLocationNameContainer = Styled.View`
width: ${wp('100%')}
padding-left: 16px;
padding-right: 16px;
`;

const SelectedLocationNameText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const SelectedLocationRatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const SelectedLocationRatingText = Styled.Text`
 margin-left: 2px;
 font-weight: 500;
 font-size: 14px;
 color: #56575C;
`;

const SelectedLocationFeedCountText = Styled.Text`
margin-left: 8px;
font-weight: 500;
font-size: 14px;
color: #56575C;
`;

const LocationFloatingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('12%')};
 padding-bottom: 13px;
 padding-right: 13px;
 align-items: flex-end;
`;

const LocationFloatingButton = Styled.View`
 border-radius: 100px;
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
 background-color: #FFFFFF;
 justify-content: flex-end;
 align-items: center;
 justify-content: center;
`;

const GPSIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderShadowContainer = Styled.View`
 width: ${wp('100%')};
 height: 0.5px;
 background-color:#FFFFFF;
`;

const LoadingContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')};
 height: ${hp('100%')};
 align-items: center;
 justify-content: center;
`;





interface Props {
    navigation: any,
    route: any,
}

interface Region {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
}


const NearFeedMapScreen = ({navigation, route}: Props) => {
    const [nearLocationListData, setNearLocationListData] = useState<Array<object>>([]);
    const [nearAllFeedListData, setNearAllFeedListData] = useState<Array<object>>([]);
    const [panelHeight, setPanelHeight] = useState<number>(hp('80%'));
    const [allowPanelDragging, setAllowPanelDragging] = useState<boolean>(true);
    const [allowListDragging, setAllowListDragging] = useState<boolean>(true);
    const [radiusSettingModalVisible, setRadiusSettingModalVisible] = useState<boolean>(false);
    const [selectLocationMarker, setSelectLocationMarker] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<object>({});
    const [locationFeedList, setLocationFeedList] = useState<Array<object>>([]);
    const [currentUserAddress, setCurrentUserAddress] = useState<string>();
    const [loadingNearFeedMap, setLoadingNearFeedMap] = useState<boolean>(true);

    const [selectedRadius, setSelectedRadius] = useState<object>({
      index: 1,
      range: 1,
      unit: "km",
      selected: false,
    });
    const [radiusList, setRadiusList] = useState<Array<object>>([
      {
        index: 0,
        range: 500,
        unit: "m",
        selected: false,
      },
      {
        index: 1,
        range: 1,
        unit: "km",
        selected: true,
      },
      {
        index: 2,
        range: 2,
        unit: "km",
        selected: false,
      },
    ])

    const [currentUserLocation, setCurrentUserLocation] = useState<any>();
    
    const [currentMapRegion, setCurrentMapRegion] = useState<Region>();

    const [completeOpenPanel, setCompleteOpenPanel] = useState<boolean>(false);
    var allFeedPanelRef = useRef(null);
    var mapRef = useRef(null);
    var locationPanelRef = useRef(null);

    const {height} = Dimensions.get('window')
    const LatLng = {
      latitude: 37.567859,
      longitude: 126.998215,
    }
    
  const API_KEY = 'd824d5c645bfeafcb06f24db24be7238';


  useEffect(() => {
    loadCurrentUserLocation()
  }, [])

    // 사용자 행정구역 정보 불러오기
    /*
    useEffect(() => {
        console.log("getStatusBarHeight", getStatusBarHeight());
        if(route.params?.currentLatitude) {
            console.log("route.params.currentLatitude,", route.params.currentLatitude)
            console.log("route.params.currentLongitude,", route.params.currentLongitude)
            fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${route.params.currentLongitude}&y=${route.params.currentLatitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${API_KEY}`,
                },
              },
            )
            .then((response) => response.json())
            .then((json) => {
              console.log("현재 사용자의 행정구역정보", json);
              setCurrentUserAddress(json.documents[1].region_3depth_name)
            })
        }
    }, [route.params?.currentLongitude, route.params?.currentLatitude])
  */

    useEffect(() => {
      
    }, [selectedRadius])
    

    const loadCurrentUserLocation = () => {
      var hasLocationPermission = true;
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
              console.log("사용자 현재 위치", position);
              setCurrentUserLocation(position.coords);
              setCurrentMapRegion({
              latitude:  position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0421,
              })

              GETSearchSurroundPost(position.coords.latitude, position.coords.longitude, selectedRadius.range)
              .then(function(response) {
              console.log("GETSearchSurroundPost response", response);
              var tmpNearLocationListData = new Array();
              var tmpNearAllFeedListData = new Array();

              for(const[key, value] of Object.entries(response.postsByAddress)) {
              console.log("value", value);
              tmpNearLocationListData.push({
                location: key,
                post: value,
                selected: false,
              })
              tmpNearAllFeedListData = tmpNearAllFeedListData.concat(value.posts);
              }

              setTimeout(() => {
                tmpNearAllFeedListData.sort(function(a, b) {
                return b["likes"] - a["likes"];
              })
              setNearLocationListData(tmpNearLocationListData);
              setTimeout(() => {
                setNearAllFeedListData(tmpNearAllFeedListData);
                setLoadingNearFeedMap(false);
              })
            })
            })
            .catch(function(error) {
              console.log("GETSearchSurroundPost error", error);
              setLoadingNearFeedMap(false);
            })

            fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${API_KEY}`,
                },
              },
            )
            .then((response) => response.json())
            .then((json) => {
              console.log("현재 사용자의 행정구역정보", json);
              setCurrentUserAddress(json.documents[1].region_3depth_name)
            })
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }


        );
      }
    }

    const changeSelectedRadius = () => {
      GETSearchSurroundPost(currentUserLocation.latitude, currentUserLocation.longitude, selectedRadius.range)
              .then(function(response) {
              console.log("GETSearchSurroundPost response", response);
              var tmpNearLocationListData = new Array();
              var tmpNearAllFeedListData = new Array();

              for(const[key, value] of Object.entries(response.postsByAddress)) {
              console.log("value", value);
              tmpNearLocationListData.push({
                location: key,
                post: value,
                selected: false,
              })
              tmpNearAllFeedListData = tmpNearAllFeedListData.concat(value.posts);
              }

              setTimeout(() => {
                tmpNearAllFeedListData.sort(function(a, b) {
                return b["likes"] - a["likes"];
              })
              setNearLocationListData(tmpNearLocationListData);
              setTimeout(() => {
                setNearAllFeedListData(tmpNearAllFeedListData);
                setLoadingNearFeedMap(false);
              })
            })
            })
            .catch(function(error) {
              console.log("GETSearchSurroundPost error", error);
            })
    }


    /*
    useEffect(() => {
      var tmpNearLocationListData = new Array();
      var tmpNearAllFeedListData = new Array();
      for(const[key, value] of Object.entries(TEST_NEAR_FEED_DATA.postsByAddress)) {
        tmpNearLocationListData.push({
          location: key,
          post: value,
          selected: false,
        })
        tmpNearAllFeedListData = tmpNearAllFeedListData.concat(value.posts);
      }

      setTimeout(() => {
        tmpNearAllFeedListData.sort(function(a, b) {
          return b["likes"] - a["likes"];
        })
        console.log("tmpNearLocationListData", tmpNearLocationListData);
        console.log("tmpNearAllFeedListData", tmpNearAllFeedListData);
        setNearLocationListData(tmpNearLocationListData);
        setTimeout(() => {
          setNearAllFeedListData(tmpNearAllFeedListData);
        })
      })
    }, [])
    */

    const onChangePanelState = (panelState: any) => {
      setCompleteOpenPanel(panelState)
    }

    const onDragEndPanel = (position: any, gestureState: any) => {
      console.log("onDragEndPanel gestureState", gestureState);
      console.log("onDragEndPanel position", position);

      if(position < 645) {
        if(!selectLocationMarker) allFeedPanelRef.current.hide();
        else locationPanelRef.current.hide();
      }
    }

    const onMomentumPanelDragEnd = (gestureState) => {
     console.log("onMomentumPanelDragEnd", gestureState);
    }


    async function getCamera() {
      const camera = await mapRef.current.getCamera();

      return camera;
   }


    const onPressLocationMarker = (coordinate:any, index:number, feedList:any) => {
      console.log("onPressLocationMarker coordinate", coordinate.nativeEvent);
      console.log("onPressLocationMarker index", index);
      console.log("onPressLocationMarker feedList", feedList);
      var tmpLocationInfo = {
        name: feedList.location,
        avgRating: feedList.post.metaData.AvgStarRate.toFixed(1),
        feedCount: feedList.post.metaData.num,
      }

      var selectedMarkerCamera = {
        center: {
          latitude: coordinate.nativeEvent.coordinate.latitude,
          longitude: coordinate.nativeEvent.coordinate.longitude,
        },
        pitch: 0,
        heading: 0,
      }

      getCamera()
      .then(function(response) {
        console.log("response",response);
        setSelectLocationMarker(true);
        setLocationInfo(tmpLocationInfo);
      setLocationFeedList(feedList.post.posts);

        selectedMarkerCamera.zoom = response.zoom;

        setTimeout(() => {
          mapRef.current.setCamera(selectedMarkerCamera, 200)
        })
      }).catch(function(error) {
        console.log("error", error)
      })
    }

    const clickToRadiusItem = (item:any, index:any) => {
      var tmpRadiusList = radiusList;
      tmpRadiusList.forEach((element, index2) => {
        if(index2 === index) {
          element.selected = true;
        } else {
          element.selected = false;
        }
      })

      console.log("tmpRadiusList", tmpRadiusList);
      setRadiusList(tmpRadiusList);
      setSelectedRadius(item);      
      setRadiusSettingModalVisible(false);
      changeSelectedRadius();
    }

    const onRegionChange = (location: any) => {
      setCurrentMapRegion(currentMapRegion);
    console.log("onRegionChange", location);
   }



    const renderNearFeedItem = ({item, index}: any) => {
      return (
        <NearFeedItem
        postId={item.id}
        mainTag={item.mainTags.name}
        subTag1={item.subTagOnes ? item.subTagOnes.name : null}
        subTag2={item.subTagTwos ? item.subTagTwos.name : null}
        rating={item.starRate}
        expense={item.expense != null ? item.expense : null}
        location={item.address ? item.address.address : null}
        likeCount={item.likes}
        commentCount={item.commentsCount + item.replysCount}
        mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].thumbnailImg: null}
        createdAt={item.createdAt}
        navigation={navigation}
        />
      )
    }

    const renderRadiusItem = ({item, index}: any) => {
      return (
        <TouchableWithoutFeedback onPress={() => clickToRadiusItem(item, index)}>
        <RadiusItemBackground style={item.selected && {borderColor:'#267DFF'}}>
          <RadiusItemRangeText style={item.selected && {color: '#267DFF'}}>{item.range+item.unit}</RadiusItemRangeText>
        </RadiusItemBackground>
        </TouchableWithoutFeedback>
      )
    }

  return (
    <Container>
<HeaderBar style={[{marginTop:getStatusBarHeight()}]}>
        <HeaderLeftContainer>
          <CurrentLocationText>{currentUserAddress ? currentUserAddress + " 주변" : "내 주변"}</CurrentLocationText>
          <TouchableWithoutFeedback onPress={() => setRadiusSettingModalVisible(true)}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <RadiusRangeText>{selectedRadius.range+selectedRadius.unit}</RadiusRangeText>
          <DropDownIcon
          source={require('~/Assets/Images/HeaderBar/ic_dropDown.png')}/>
          </View>
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <HeaderRightContainer>
          <HeaderCancelImage
          source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
        </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
      <HeaderShadowContainer style={styles.headerBarShadow}>
      </HeaderShadowContainer>
      <MapView
      ref={mapRef}
      style={{flex:1}}
      provider={PROVIDER_GOOGLE}
      onRegionChange={onRegionChange}
      initialRegion={currentMapRegion}
      showsUserLocation={true}>
        {nearLocationListData?.map((location, index) => {
          console.log("nearLocationListData", location)
          if(location.post.metaData.num >= 10) {
          return (
          <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.post.metaData.lat,
            longitude: location.post.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_big.png')}>
            <MarkerThumbnailContainer>
              <MarkerThumbnailImage
                 style={!location.post.metaData.coverImg && {width: 30, height: 30, marginBottom:0, marginRight:0}}
                 source={
                 location.post.metaData.coverImg
                 ? {uri:location.post.metaData.coverImg}
                 : require('~/Assets/Images/Map/ic_hash.png')
                   }/>
              <FeedCountContainer>
              <FeedCountBackground>
                <FeedCountText style={{opacity:0}} >{location.post.metaData.num}</FeedCountText>
              </FeedCountBackground>
              <FeedCountText2>{location.post.metaData.num}</FeedCountText2>
              </FeedCountContainer>
            </MarkerThumbnailContainer>
          </Marker>
        )} else if(location.post.metaData.num === 1) {
          return (
            <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.post.metaData.lat,
            longitude: location.post.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_small.png')}>
            <SmallMarkerThumbnailContainer>
              <SmallMarkerThumbnailImage
              style={!location.post.metaData.coverImg && {width: 20, height: 20, marginTop:7, marginLeft:7}}
              source={
              location.post.metaData.coverImg
              ? {uri:location.post.metaData.coverImg}
              : require('~/Assets/Images/Map/ic_hash.png')
                }/>
            </SmallMarkerThumbnailContainer>
          </Marker>
          )} else if(1 < location.post.metaData.num && location.post.metaData.num < 10) {
            return (
              <Marker
          onPress={(coordinate:any) => onPressLocationMarker(coordinate, index, location)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            coordinate={{
              latitude: location.post.metaData.lat,
              longitude: location.post.metaData.long,
            }}
            image={require('~/Assets/Images/Map/ic_marker_small.png')}>
              <OneMoreThenMarkerThumbnailContainer>
              <SmallMarkerThumbnailImage
              style={!location.post.metaData.coverImg && {width: 20, height: 20, marginBottom:0, marginRight:0}}
              source={
              location.post.metaData.coverImg
              ? {uri:location.post.metaData.coverImg}
              : require('~/Assets/Images/Map/ic_hash.png')
                }/>
                 <FeedCountContainer>
              <OneMoreThanFeedCountBackground>
                <OneMoreThanFeedCountText style={{opacity:9}} >{location.post.metaData.num}</OneMoreThanFeedCountText>
              </OneMoreThanFeedCountBackground>
              </FeedCountContainer>
              </OneMoreThenMarkerThumbnailContainer>
            </Marker>
            )} 
        })}
      </MapView>
      {loadingNearFeedMap && (
        <LoadingContainer>
          <ActivityIndicator/>
        </LoadingContainer>
      )}
      {!selectLocationMarker && (
      <SlidingUpPanel
      ref={allFeedPanelRef}
      allowListDragging={allowListDragging}
      allowDragging={allowPanelDragging}
      draggableRange={{top: panelHeight, bottom: wp('13.3%') + wp('37.3%') + wp('12%')}}
      showBackdrop={false}
      onDragEnd={(position:any, gestureState:any) => onDragEndPanel(position, gestureState)}
      backdropOpacity={0.1}
      onChangePanelState={onChangePanelState}
      completeOpenPanel={completeOpenPanel}
      >
        {/*
        <LocationFloatingContainer>
        <LocationFloatingButton style={styles.floatingButtonShadow}>
          <GPSIcon
          source={require('~/Assets/Images/Map/ic_gps.png')}/>
        </LocationFloatingButton>
        </LocationFloatingContainer>
        */}
        <PanelContainer
        style={styles.panelShadow}>
          <PanelHeaderContainer>
            <PanelToggleButton/>
          <NearAllFeedCountContainer>
          <NearAllFeedCountText>{nearAllFeedListData.length === 0 ? "주변에 등록된 게시글이 없습니다." : "게시글 " + nearAllFeedListData.length+ "개"}</NearAllFeedCountText>
          </NearAllFeedCountContainer>
          </PanelHeaderContainer>
          <FlatList
          onScroll={(e) => {
            let offset = e.nativeEvent.contentOffset.y;
            let index = parseInt(offset / wp('37.3%'));
            console.log("now index is " + index);
            if(index > 0) {
              setAllowPanelDragging(false);
            } else if(index == 0) {
              setAllowPanelDragging(true);
            }
          }}
          contentContainerStyle={{paddingBottom: 210}}
          showsVerticalScrollIndicator={false}
          data={nearAllFeedListData}
          keyExtractor={(item, index) => ""+index}
          renderItem={renderNearFeedItem}
          />
        </PanelContainer>
      </SlidingUpPanel>
      )}

{selectLocationMarker && (
         <SlidingUpPanel
         ref={locationPanelRef}
         allowListDragging={allowListDragging}
         allowDragging={allowPanelDragging}
         draggableRange={{top: panelHeight, bottom:  wp('13.3%') + wp('37.3%') + wp('12%')}}
         showBackdrop={false}
         backdropOpacity={0.1}
         onDragEnd={(position:any, gestureState:any) => onDragEndPanel(position,gestureState)}
      onChangePanelState={onChangePanelState}
      completeOpenPanel={completeOpenPanel}>
        {/*
        <LocationFloatingContainer>
          <LocationFloatingButton style={styles.floatingButtonShadow}>
            <GPSIcon
            source={require('~/Assets/Images/Map/ic_gps.png')}/>
          </LocationFloatingButton>
          </LocationFloatingContainer>
        */}
           <PanelContainer onLayout={(event) => {
             console.log("event.layout.height", event);
           }}
           style={styles.panelShadow}>
             <LocationPanelHeaderContainer
             onLayout={(event) => {
               const height = event.nativeEvent.layout.height;
             }}>
               <PanelToggleButton/>
             <SelectedLocationInfoContainer>
               <SelectedLocationNameContainer>
               <SelectedLocationNameText>{locationInfo.name}</SelectedLocationNameText>
               </SelectedLocationNameContainer>
               <SelectedLocationRatingFeedCountContainer>
                 <SelectedLocationRatingImage
                 source={require('~/Assets/Images/ic_newStar.png')}/>
                 <SelectedLocationRatingText>{locationInfo.avgRating}</SelectedLocationRatingText>
                 <SelectedLocationFeedCountText>{"게시글 "+locationInfo.feedCount+"개"}</SelectedLocationFeedCountText>
               </SelectedLocationRatingFeedCountContainer>
             </SelectedLocationInfoContainer>
             </LocationPanelHeaderContainer>
             <FlatList
          keyboardShouldPersistTaps={"handled"}
             onScroll={(e) => {
               let offset = e.nativeEvent.contentOffset.y;
               let index = parseInt(offset / wp('37.3%'));
               console.log("now index is " + index);
               if(index > 0) {
                 setAllowPanelDragging(false);
               } else if(index == 0) {
                 setAllowPanelDragging(true);
               }
             }}
             contentContainerStyle={{paddingBottom: 210}}
             showsVerticalScrollIndicator={false}
             data={locationFeedList}
             keyExtractor={(item, index) => ""+index}
             renderItem={renderNearFeedItem}
             />
           </PanelContainer>
         </SlidingUpPanel>

      )}
      <Modal
      testID={'modal'}
      onBackdropPress={() => setRadiusSettingModalVisible(false)}
      isVisible={radiusSettingModalVisible}
      backdropOpacity={0.25}
      style={styles.modalView}>
        <RadiusSettingModalContainer>
          <PanelToggleContainer>
            <PanelToggleButton/>
          </PanelToggleContainer>
          <RadiusSettingHeaderContainer>
            <RadiusSettingText>검색 반경 설정</RadiusSettingText>
            <TouchableWithoutFeedback onPress={() => setRadiusSettingModalVisible(false)}>
            <RadiusSettingCancelText>취소</RadiusSettingCancelText>
            </TouchableWithoutFeedback>
          </RadiusSettingHeaderContainer>
          <RadiusItemListContainer>
            <FlatList
            data={radiusList}
            horizontal={true}
            keyExtractor={({index}: any) =>  `${index}`}
            renderItem={renderRadiusItem}/>
          </RadiusItemListContainer>
        </RadiusSettingModalContainer>
      </Modal>
    </Container>
  );
}


const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  panelShadow : {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 9
  },
  
  floatingButtonShadow : {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },

  headerBarShadow : {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 20
  }
});

export default NearFeedMapScreen;