import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';
import { WebView } from 'react-native-webview';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
background-color: #ffffff;
justify-content: center;
align-items: center;
padding-top: 7px;
padding-left: 16px;
padding-bottom: 13px;
padding-right: 16px;
`;

const HeaderCancelIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

interface Props {
    navigation: any,
    route: any,
}


const ProductWebView = ({navigation, route}: Props) => {
    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <HeaderCancelIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
        <WebView
        source={{ uri: route.params?.uri}}
      />
      </Container>
    )
}

export default ProductWebView;