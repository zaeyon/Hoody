import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native'

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
`;

const BackButtonContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

interface Props {
    navigation: any,
    route: any,
}

const SettingScreen = ({navigation, route}: Props) => {
    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <BackButtonContainer>
                    <BackButton
                    source={require('~/Assets/Images/ic_back.png')}/>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                <HeaderRightContainer>

                </HeaderRightContainer>
            </HeaderBar>
        </Container>
    )
}

export default SettingScreen;