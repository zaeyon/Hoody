import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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

interface Props {
    navigation: any,
    route: any,
}

const LocationFeedMapScreen = ({navigation, route}: Props) => {
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
            }}/>
        </Container>
    )
}

export default LocationFeedMapScreen;
