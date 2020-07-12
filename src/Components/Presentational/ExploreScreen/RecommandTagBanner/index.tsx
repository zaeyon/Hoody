import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('42.6%')};
`;

const BannerImage = Styled.Image`
flex:1;
`;

const TagNameText = Styled.Text`
font-weight: bold;
font-size: 22px;
color: #ffffff;
`;

const TagDescripText = Styled.Text`
font-weight: 600;
font-size: 17px;
color: #ffffff;
opacity: 0.8;
`;

const TagFeedCountText = Styled.Text`
font-weight: 600;
`;

const RecommandTagBanner = ({}) => {
    return (
        <Container>
            <BannerImage
            source={{uri:'https://dimg.donga.com/wps/NEWS/IMAGE/2020/03/11/100120917.4.jpg'}}
            resizeMode={"cover"}/>
        </Container>
    )
}

export default RecommandTagBanner;