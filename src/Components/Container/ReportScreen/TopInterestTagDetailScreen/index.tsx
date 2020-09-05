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
 background-color: #FAFAFA;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('29.6%')};
 background-color: #FAFAFA;

 border-bottom-width: 0.5px;
 border-color: #F1F1F1;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 12.5px 15px 13px 16px;
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
 width: ${wp('7.5%')};
 height: ${wp('7.5%')};
`;

const TagEvaluateContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
 flex: 1;
`;

const TagEvaluateItemContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
align-items: center;
`;

const TagEvaluateItemLabelText = Styled.Text`
font-size: 14px;
color: #8E8E8E;
`;

const TagEvaluateItemValueText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const TagValueContainer = Styled.View`
margin-top: 2px;
align-items: center;
flex-direction: row;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #e5e5e570;
`;

const RatingStarIcon = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

interface Props {
    navigation: any,
    route: any,
}

const TopInterestTagDetailScreen = ({navigation, route}: Props) => {
    return (
        <Container>
          <HeaderBar>
              <HeaderContainer>
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
              </HeaderContainer>
              <TagEvaluateContainer>
                  <TagEvaluateItemContainer style={{flex:2}}>
                      <TagEvaluateItemLabelText>평균 별점</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <RatingStarIcon
                      source={require('~/Assets/Images/ic_newStar.png')}/>
                      <TagEvaluateItemValueText style={{marginLeft:2}}>544</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
                  <TagEvaluateItemContainer style={{flex:1}}>
                      <TagEvaluateItemLabelText>평균 가격</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <TagEvaluateItemValueText>124</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
                  <TagEvaluateItemContainer style={{flex:2}}>
                      <TagEvaluateItemLabelText>게시글</TagEvaluateItemLabelText>
                      <TagValueContainer>
                      <TagEvaluateItemValueText>32</TagEvaluateItemValueText>
                      </TagValueContainer>
                  </TagEvaluateItemContainer>
              </TagEvaluateContainer>
          </HeaderBar>
          <BodyContainer>

          </BodyContainer>
        </Container>
    )
}

export default TopInterestTagDetailScreen;