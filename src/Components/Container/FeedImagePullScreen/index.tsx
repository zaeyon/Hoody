import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #000000;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelContainer = Styled.View`
 padding-top: 6px
 padding-left: 16px;
 padding-bottom: 14px;
 padding-right: 16px;
 background-color:#ffffff;
`;

const HeaderCancelIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #ffffff;
`;

const SelectedImage = Styled.Image`
`;

interface Props {
    navigation: any,
    route: any,
}

const FeedImagePullScreen = ({navigation, route}: Props) => {
    return (
        <Container>
            <HeaderCancelContainer>
                <HeaderCancelIcon
                source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
            </HeaderCancelContainer>
            <SelectedImage
            source={{uri:route.params?.selectedImage.uri}}/>
        </Container>
    )
}

export default FeedImagePullScreen;

