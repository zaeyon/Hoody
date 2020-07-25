import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
 padding-right: 16px;
 background-color: #ffffff;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
padding-top: 12px;
padding-bottom: 16px;
background-color: #ffffff;
`;

const HeaderFilterIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

interface Props {
    navigation: any,
    route: any,
}

const SearchResultScreen = ({navigation, route}: Props) => {
    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>검색 결과</HeaderTitleText>
                    <HeaderRightContainer>
                        <HeaderFilterIcon
                        source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
                </HeaderRightContainer>
            </HeaderBar>
        </Container>
    )
}

export default SearchResultScreen;


