import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';

const Container = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-top: 18px;
padding-bottom: 18px;
`;

const TagContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const TagRankingText = Styled.Text`
font-weight: 500;
font-size: 16px;
color: #1D1E1F;
`;

const TagNameText = Styled.Text`
margin-left: 19px;
font-weight: 600;
font-size: 16px;
color: #1D1E1F;
`;

const TagEvaluateContainer = Styled.View`
 align-items: center;
 flex-direction: row;
`;

const TagViewIcon = Styled.Image`
width: ${wp('3.73%')};
height: ${wp('3.2%')};
`;

const TagLikeIcon = Styled.Image`
margin-left: 6px;
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const TagCommentIcon = Styled.Image`
margin-left: 6px;
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const TagEvaluateValueText = Styled.Text`
margin-left: 3px;
font-weight: 500;
font-size: 14px;
color: #267DFF;
`;

const TagDisclosureIcon = Styled.Image`
margin-left: 6px;
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

interface Props {
    navigation: any,
}

const PopularTop5TagItem = ({navigation}: Props) => {

    const moveToPopularTagDetail = () => {
        navigation.navigate("TopPopularTagDetailScreen")
    }

    return (
    <TouchableWithoutFeedback onPress={() => moveToPopularTagDetail()}>
        <Container>
            <TagContainer>
                <TagRankingText>1</TagRankingText>
                <TagNameText>#카페</TagNameText>
            </TagContainer>
            <TagEvaluateContainer>
                <TagViewIcon
                source={require('~/Assets/Images/Report/ic_view.png')}/>
                <TagEvaluateValueText>12</TagEvaluateValueText>
                <TagLikeIcon
                source={require('~/Assets/Images/Report/ic_like.png')}/>
                <TagEvaluateValueText>22</TagEvaluateValueText>
                <TagCommentIcon
                source={require('~/Assets/Images/Report/ic_comment.png')}/>
                <TagEvaluateValueText>10</TagEvaluateValueText>
                <TagDisclosureIcon
                source={require('~/Assets/Images/Report/ic_disclosure.png')}/>
            </TagEvaluateContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default PopularTop5TagItem;