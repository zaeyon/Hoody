import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;


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


interface Props {
    navigation: any,
    route: any,
}

const CollectionFeedMapScreen = ({navigation, route}: Props) => {
    
    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderTitleText>컬렉션 지도</HeaderTitleText>
                </HeaderLeftContainer>
                <HeaderRightContainer>
                    <HeaderCancelImage
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
            </HeaderBar>
        </Container>

    )
}

export default CollectionFeedMapScreen