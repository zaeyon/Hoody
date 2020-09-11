import React, {useEffect, useState, createRef, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Text, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, MapViewAnimated} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

import SlidingUpPanel from '~/Components/Presentational/NearFeedMapScreen/SlidingUpPanel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NearFeedItem from '~/Components/Presentational/NearFeedMapScreen/NearFeedItem';
import { onChange } from 'react-native-reanimated';

import MemoizedFeedMap from '~/Components/Presentational/FeedMapScreen/FeedMap';

// Route
import GETUserMap from '~/Route/Profile/GETUserMap';

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
padding-bottom: 0px;
padding-top: 0px;
padding-right: 16px;
background-color: #ffffff;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const HeaderRefreshContainer = Styled.View`
background-color: #ffffff;
justify-content: center;
align-items: center;
padding-top: 0px;
padding-left: 5px;
padding-bottom: 0px;
`;

const HeaderRefreshIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;


const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 24px;
color: #333333;
`;

const HeaderLogoImage = Styled.Image`
 width: ${wp('23.3%')};
 height: ${wp('5.5%')};
`;


const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-bottom: 13px;
padding-top: 20px;
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


const FeedMapScreen = ({navigation, route}: Props) => {
    const [locationListData, setLocationListData] = useState<Array<object>>([]);
    const [allFeedListData, setAllFeedListData] = useState<Array<object>>([]);
    const [panelHeight, setPanelHeight] = useState<number>(hp('80%'));
    const [allowPanelDragging, setAllowPanelDragging] = useState<boolean>(true);
    const [allowListDragging, setAllowListDragging] = useState<boolean>(true);
    const [radiusSettingModalVisible, setRadiusSettingModalVisible] = useState<boolean>(false);
    const [selectLocationMarker, setSelectLocationMarker] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<object>({});
    const [locationFeedList, setLocationFeedList] = useState<Array<object>>([]);
    const [currentUserAddress, setCurrentUserAddress] = useState<string>();
    const [mapRegion, setMapRegion] = useState<Region>({
      latitude:  35.9,
      longitude: 127.8,
      latitudeDelta: 2.5022,
      longitudeDelta: 4.0421,
    })
    const [initialMapRegion, setInitialMapRegion] = useState<Region>({
      latitude:  35.9,
      longitude: 127.8,
      latitudeDelta: 2.5022,
      longitudeDelta: 4.0421,
    })
    const [refreshingMap, setRefreshingMap] = useState<boolean>(false);
    const [completeOpenPanel, setCompleteOpenPanel] = useState<boolean>(false);

    const [initialCamera, setInitialCamera] = useState<object>({
      center: {
      latitude:  35.9,
      longitude: 127.8,
    },
    pitch: 0,
    heading: 0,
    zoom: 8})
    
    var allFeedPanelRef = useRef(null);
    var mapRef = useRef(null);
    var locationPanelRef = useRef(null);

    useEffect(() => {
      if(route.params?.nickname) {
        GETUserMap(route.params?.nickname)
        .then(function(response) {
          console.log("사용자 피드 지도 데이터 불어오기 성공", response);
          var tmpLocationListData = new Array();
          var tmpAllFeedListData = new Array();

          for(const[key, value] of Object.entries(response)) {
            tmpLocationListData.push({
              location: key,
              metaData: value.metaData,
              posts: value.posts,
              selected: false,
            })
            tmpAllFeedListData = tmpAllFeedListData.concat(value.posts);
          }

          setTimeout(() => {
            tmpAllFeedListData.sort(function(a, b) {
              return b["likes"] - a["likes"];
            })

            setLocationListData(tmpLocationListData);
            setTimeout(() => {
              setAllFeedListData(tmpAllFeedListData);
            })
          }, 10)
        })
        .catch(function(error) {
          console.log("사용자 피드 지도 데이터 불어오기 실패", error);
        })
      }
    }, [route.params?.nickname])

    const getUserFeedMapData = () => {
      GETUserMap(route.params?.nickname)
        .then(function(response) {
        
          console.log("사용자 피드 지도 데이터 불어오기 성공", response);
          var tmpLocationListData = new Array();
          var tmpAllFeedListData = new Array();

          for(const[key, value] of Object.entries(response)) {
            tmpLocationListData.push({
              location: key,
              metaData: value.metaData,
              posts: value.posts,
              selected: false,
            })
            tmpAllFeedListData = tmpAllFeedListData.concat(value.posts);
          }

          setTimeout(() => {
            tmpAllFeedListData.sort(function(a, b) {
              return b["likes"] - a["likes"];
            })

            setLocationListData(tmpLocationListData);
            setTimeout(() => {
              setAllFeedListData(tmpAllFeedListData);
              setRefreshingMap(false);
            })
          }, 10)
        })
        .catch(function(error) {
          console.log("사용자 피드 지도 데이터 불어오기 실패", error);
        })
      
    }

    const onChangePanelState = (panelState: any) => {
      setCompleteOpenPanel(panelState)
    }

    const onDragEndPanel = (position: any, gestureState: any) => {
      console.log("onDragEndPanel gestureState", gestureState);
      console.log("onDragEndPanel position", position);

      if(position < 645) {
        if(!selectLocationMarker) 
        {
          console.log("allFeedPanelRef.hide", allFeedPanelRef);
          allFeedPanelRef.current.hide();
        } else {
          locationPanelRef.current.hide();
        } 
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
        avgRating: feedList.metaData.AvgStarRate.toFixed(1),
        feedCount: feedList.metaData.num,
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
      setLocationFeedList(feedList.posts);

        selectedMarkerCamera.zoom = response.zoom;

        setTimeout(() => {
          mapRef.current.setCamera(selectedMarkerCamera, 200)
        })
      }).catch(function(error) {
        console.log("error", error)
      })
    }

    const onRegionChange = (location: any) => {
        setInitialMapRegion(initialMapRegion)
      console.log("onRegionChange", location);
    
    }

    const onRefreshFeedMap = () => {
      setSelectLocationMarker(false);
      getUserFeedMapData()
      setTimeout(() => {
        var initialCamera = {
          center: {
            latitude:  35.9,
            longitude: 127.8,
          },
          pitch: 0,
          heading: 0,
          zoom: 7.03,
        }
        mapRef.current.setCamera(initialCamera, 200);
      }, 100)

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
        mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].url: null}
        createdAt={item.createdAt}
        navigation={navigation}
        />
      )
    }

  return (
    <Container>
<HeaderBar style={{marginTop:getStatusBarHeight()}}>
        <HeaderLeftContainer>
            <HeaderTitleText>지도</HeaderTitleText>
            <TouchableWithoutFeedback onPress={() => onRefreshFeedMap()}>
            <HeaderRefreshContainer>
              <HeaderRefreshIcon
              source={require('~/Assets/Images/HeaderBar/ic_refresh.png')}/>
            </HeaderRefreshContainer>
            </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <HeaderRightContainer>
          <HeaderCancelImage
          source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
        </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
         <MapView
      ref={mapRef}
      style={{flex:1}}
      provider={PROVIDER_GOOGLE}
      onRegionChange={onRegionChange}
      initialRegion={initialMapRegion}
      showsUserLocation={false}>
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
      {!selectLocationMarker && (
      <SlidingUpPanel
      ref={allFeedPanelRef}
      allowListDragging={allowListDragging}
      allowDragging={allowPanelDragging}
      draggableRange={{top: panelHeight, bottom: wp('30.0%')}}
      showBackdrop={false}
      onDragEnd={(position:any, gestureState:any) => onDragEndPanel(position, gestureState)}
      backdropOpacity={0.1}
      onChangePanelState={onChangePanelState}
      completeOpenPanel={completeOpenPanel}
      >
        <PanelContainer>
          <PanelHeaderContainer>
            <PanelToggleButton/>
          <NearAllFeedCountContainer>
          <NearAllFeedCountText>{allFeedListData.length === 0 ? "지도에 등록된 게시글이 없습니다." : "지도에 등록된 게시글 " + allFeedListData.length+ "개"}</NearAllFeedCountText>
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
          data={allFeedListData}
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
           <PanelContainer onLayout={(event) => {
             console.log("event.layout.height", event);
           }}>
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
    </Container>
  );
}


const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default FeedMapScreen;



/*
const TEST_NEAR_FEED_DATA = {
    "postsNum": 18,
    "postsByAddress": {
      "서울특별시 중구 을지로3가": {
        "metaData": {
          "num": 14,
          "SumStarRate": 54.5,
          "AvgStarRate": 3.892857142857143,
          "lat": 37.5658,
          "long": 126.991,
          "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720526950IMG_0652.JPG"
        },
        "posts": [
          {
            "spendDate": "2020-07-14",
            "likes": 20,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T13:12:46.000Z",
            "commentsCount": 13,
            "replysCount": 4,
            "id": 31,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594818766512IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594818766512IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 6,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T11:16:27.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 27,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594811787435IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594811787435IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 5,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T09:36:00.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 26,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594805759542IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594805759542IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 3,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T07:26:12.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 17,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594797972365IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594797972365IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 3,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T07:26:33.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 18,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594797992819IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594797992819IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": null,
            "starRate": 3.5,
            "createdAt": "2020-07-06T11:30:08.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 6,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/15940350080071591866431268IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940350080071591866431268IMG_1014.jpg"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-14T09:58:33.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 12,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594720713163IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720713163IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-14T09:53:49.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 9,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594720428725IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720428725IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": 10000,
            "starRate": 3.5,
            "createdAt": "2020-07-06T09:28:10.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 4,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/15940276899231591866431268IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940276899231591866431268IMG_1014.jpg"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-15T06:06:15.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 16,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594793170980IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594793170980IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-14T09:56:11.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 11,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594720570856IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720570856IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": 7500,
            "starRate": 3.5,
            "createdAt": "2020-07-06T11:30:43.000Z",
            "commentsCount": 1,
            "replysCount": 0,
            "id": 7,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/15940350429121591866431268IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940350429121591866431268IMG_1014.jpg"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-14T09:59:01.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 13,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594720740930IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720740930IMG_0652.JPG"
              }
            ]
          },
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 4,
            "createdAt": "2020-07-14T09:55:27.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 10,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/1594720526950IMG_0652.JPG",
                "size": 143232,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720526950IMG_0652.JPG"
              }
            ]
          }
        ]
      },
      "서울특별시 중구 을지로4가": {
        "metaData": {
          "num": 1,
          "SumStarRate": 3.8,
          "AvgStarRate": 3.8,
          "lat": 37.5652,
          "long": 126.99,
          "coverImg": ""
        },
        "posts": [
          {
            "spendDate": "2020-07-14",
            "likes": 0,
            "expense": 7500,
            "starRate": 3.8,
            "createdAt": "2020-07-28T06:36:49.000Z",
            "commentsCount": 5,
            "replysCount": 1,
            "id": 33,
            "mainTags": {
              "name": "testing"
            },
            "subTagOnes": {
              "name": "hellooo"
            },
            "subTagTwos": {
              "name": "worlddd"
            },
            "address": {
              "address": "서울특별시 중구 을지로4가",
              "geographLong": 37.5652,
              "geographLat": 126.99,
              "region": "서울특별시 중구"
            },
            "mediaFiles": []
          }
        ]
      },
      "성북초등학교": {
        "metaData": {
          "num": 1,
          "SumStarRate": 3.5,
          "AvgStarRate": 3.5,
          "lat": 37.5936,
          "long": 126.998,
          "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/15941037553741591866431268IMG_1014.jpg"
        },
        "posts": [
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": 7500,
            "starRate": 3.5,
            "createdAt": "2020-07-07T06:35:56.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 8,
            "mainTags": {
              "name": "test"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "성북초등학교",
              "geographLong": 37.5936,
              "geographLat": 126.998,
              "region": "서울특별시 성북구"
            },
            "mediaFiles": [
              {
                "filename": "original/15941037553741591866431268IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15941037553741591866431268IMG_1014.jpg"
              }
            ]
          }
        ]
      },
      "서울특별시 중구 을지로3가 홍원빌": {
        "metaData": {
          "num": 1,
          "SumStarRate": 3.5,
          "AvgStarRate": 3.5,
          "lat": 37.5657,
          "long": 126.991,
          "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/15940322460351591866431268IMG_1014.jpg"
        },
        "posts": [
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": 0,
            "starRate": 3.5,
            "createdAt": "2020-07-06T10:44:06.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 5,
            "mainTags": {
              "name": "test2"
            },
            "subTagOnes": {
              "name": "hello2"
            },
            "subTagTwos": {
              "name": "world2"
            },
            "address": {
              "address": "서울특별시 중구 을지로3가 홍원빌",
              "geographLong": 37.5657,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": [
              {
                "filename": "original/15940322460351591866431268IMG_1014.jpg",
                "size": 1183759,
                "mimetype": "image/jpeg",
                "index": 2,
                "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940322460351591866431268IMG_1014.jpg"
              }
            ]
          }
        ]
      },
      "114-6 Eulji-ro Jung-gu Seoul": {
        "metaData": {
          "num": 2,
          "SumStarRate": 3.8,
          "AvgStarRate": 3.8,
          "lat": 37.5658111,
          "long": 126.991111,
          "coverImg": ""
        },
        "posts": [
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": null,
            "starRate": 3.8,
            "createdAt": "2020-07-06T09:26:30.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 3,
            "mainTags": {
              "name": "testUpdate"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "114-6 Eulji-ro Jung-gu Seoul",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": []
          },
          {
            "spendDate": "2020-07-06",
            "likes": 0,
            "expense": null,
            "starRate": 3.8,
            "createdAt": "2020-07-06T09:26:30.000Z",
            "commentsCount": 0,
            "replysCount": 0,
            "id": 3,
            "mainTags": {
              "name": "testUpdate"
            },
            "subTagOnes": {
              "name": "hello"
            },
            "subTagTwos": {
              "name": "world"
            },
            "address": {
              "address": "114-6 Eulji-ro Jung-gu Seoul",
              "geographLong": 37.5658,
              "geographLat": 126.991,
              "region": "서울특별시 중구"
            },
            "mediaFiles": []
          }
        ]
      }
    }
  }
  */
  