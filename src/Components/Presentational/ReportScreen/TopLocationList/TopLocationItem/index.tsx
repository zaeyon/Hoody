import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

const TagPostIcon = Styled.Image`
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const TagWonIcon = Styled.Image`
margin-left: 6px;
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const TagStarIcon = Styled.Image`
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
    rank: number,
    address: string,
    avgRating: number,
}

const TopLocationItem = ({navigation, rank, address, avgRating}: Props) => {

    const moveToTopLocationDetail = () => {
        navigation.navigate("TopLocationDetailScreen", {
            address: address,
            avgRating: avgRating,
            rank: rank,
        })
    }

    return (
    <TouchableWithoutFeedback onPress={() => moveToTopLocationDetail()}>
        <Container>
            <TagContainer>
                <TagRankingText>{rank}</TagRankingText>
                <TagNameText>{address}</TagNameText>
            </TagContainer>
            <TagEvaluateContainer>
                <TagStarIcon
                source={require('~/Assets/Images/Report/ic_newStar.png')}/>
                <TagEvaluateValueText>{avgRating}</TagEvaluateValueText>
                <TagDisclosureIcon
                source={require('~/Assets/Images/Report/ic_disclosure.png')}/>
            </TagEvaluateContainer>
        </Container>
    </TouchableWithoutFeedback>
    )
}

export default TopLocationItem;