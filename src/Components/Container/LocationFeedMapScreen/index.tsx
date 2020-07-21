import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #333333;
`;

const HeaderXContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const HeaderXIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const MapContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const MarkerContainer = Styled.View`
 background-color: #c3c3c3;
`;

const MarkerThumbnailImage = Styled.Image`
 width: 48px;
 height: 48px;
 border-radius: 50px;
`;

const MarkerThumbnailContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 padding: 3.5px;
`;

interface Props {
    navigation: any,
    route: any,
}

const TEST_LOCATION_FEED_DATA = [
    {
        index: 1,
        imageUri: 'https://mp-seoul-image-production-s3.mangoplate.com/1658798_1590602456196417.jpg',
        location: {
            latitude: 37.565633,
            longitude: 126.991251,
        }
    },
    {
        index: 1,
        imageUri: 'https://t1.daumcdn.net/cfile/tistory/99A83E3F5BC97A5E19',
        location: {
            latitude: 37.566313,
            longitude: 126.987941,
        }
    }
]

const LocationFeedMapScreen = ({navigation, route}: Props) => {
    const [locationFeedData, setLocationFeedData] = useState<Array<object>>();

    useEffect(() => {
       setLocationFeedData(TEST_LOCATION_FEED_DATA); 
    }, [])

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderTitleText>내 지도</HeaderTitleText>
                </HeaderLeftContainer>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderXContainer>
                    <HeaderXIcon
                    source={require('~/Assets/Images/ic_x.png')}
                    />
                </HeaderXContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 37.567859,
                longitude: 126.998215,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0421,
            }}>
                {locationFeedData?.map(feed => (
                    <Marker
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    coordinate={feed.location}
                    image={require('~/Assets/Images/ic_circleMarker_middle.png')}>
                        <MarkerThumbnailContainer>
                            <MarkerThumbnailImage
                            source={{uri:feed.imageUri}}/>
                        </MarkerThumbnailContainer>
                    </Marker>
                ))}
            </MapView>
        </Container>
    )
}

export default LocationFeedMapScreen;
