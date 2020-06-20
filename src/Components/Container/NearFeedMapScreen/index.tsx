import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';




const Container = Styled.SafeAreaView`
 flex: 1;
 background-color:#ffffff;
`

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 7;
`;


const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: ${wp('4%')};
height: ${wp('4%')};
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

interface Props {
    navigation: any,
    route: any,
}

const NearFeedMapScreen = ({navigation, route}: Props) => {

    useEffect(() => {
        if(route.params?.currentLatitude) {
            console.log("route.params.currentLatitude,", route.params.currentLatitude)

            console.log("route.params.currentLongitude,", route.params.currentLongitude)
        }
    }, [])


  return (
    <Container>

<HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
              <HeaderTitleText>내주변 후기</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
        </RightContainer>
      </HeaderContainer>
    <MapView
      style={{flex:1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: route.params.currentLatitude,
        longitude: route.params.currentLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    </Container>
  );
}

export default NearFeedMapScreen;