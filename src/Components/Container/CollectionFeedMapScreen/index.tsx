import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;


const HeaderBar = Styled.SafeAreaView`
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

const MarkerThumbnailImage = Styled.Image`
 width: 34px;
 height: 34px;
 border-radius: 50px;
`;

const MarkerThumbnailContainer = Styled.View`
flex:1;
justify-content: center;
align-items: center;
padding-top: 4.2px;
padding-left: 7px;
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
  

const CollectionFeedMapScreen = ({navigation, route}: Props) => {
    
    const [locationFeedList, setLocationFeedList] = useState<Array<object>>([]);
    const [initialMapRegion, setInitialMapRegion] = useState<Region>({
        latitude:  35.9,
        longitude: 127.8,
        latitudeDelta: 2.5022,
        longitudeDelta: 4.0421,
      })

    useEffect(() => {
        if(route.params?.locationFeedList) {
            setLocationFeedList(route.params.locationFeedList);
        }
    }, [route.params?.locationFeedList]);
    
    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderTitleText>지도</HeaderTitleText>
                </HeaderLeftContainer>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderRightContainer>
                    <HeaderCancelImage
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <MapView
                  style={{flex:1}}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={initialMapRegion}>
                      {locationFeedList?.map((item, index) => {
                        console.log("locationFeedList item", item);
                       return (
                        <Marker
                        coordinate={{
                            latitude: item.address.geographLat,
                            longitude: item.address.geographLong,
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        image={require('~/Assets/Images/Map/ic_marker_small.png')}>
                        <MarkerThumbnailContainer>
                            <MarkerThumbnailImage
                            style={!item.mediaFiles[0] && {width: 20, height: 20, marginTop:7, marginLeft:7}}
                            source={
                            item.mediaFiles[0]
                            ? {uri:item.mediaFiles[0].url}
                            : require('~/Assets/Images/Map/ic_hash.png')
                            }/>
                        </MarkerThumbnailContainer>
                        </Marker>
                       )
                      })}
                  </MapView>
        </Container>
    )
}

export default CollectionFeedMapScreen