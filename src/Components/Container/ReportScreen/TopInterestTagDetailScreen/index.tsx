import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('29.6%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color: #FAFAFA;

 border-bottom-width: 0.5px;
 border-color: #F1F1F1;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 7px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderViewMoreIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #e5e5e570;
`;

interface Props {
    navigation: any,
    route: any,
}

const TopInterestTagDetailScreen = ({navigation, route}: Props) => {
    return (
        <Container>
          <HeaderBar>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <HeaderLeftContainer>
                  <BackButtonContainer>
                      <BackButton
                      source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                  </BackButtonContainer>
              </HeaderLeftContainer>
              </TouchableWithoutFeedback>
              <HeaderTitleText>{"#카페"}</HeaderTitleText>
              <HeaderRightContainer>
                  <HeaderViewMoreIcon
                  source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
              </HeaderRightContainer>
          </HeaderBar>
          <BodyContainer>

          </BodyContainer>
        </Container>
    )
}

export default TopInterestTagDetailScreen;