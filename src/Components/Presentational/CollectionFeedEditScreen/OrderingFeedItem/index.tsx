import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('25%')};
 flex-direction: row;
 justify-content: space-between;
`;

const FeedInfoContainer = Styled.View`
 padding-top: 13px;
 padding-bottom: 13px;
 padding-left: 16px;
 padding-right: 8px;
 flex-direction: column;
`;

const TagContainer = Styled.View`
 flex-direction: row
`;

const MainTagText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #1D1E1F;
`;

const MetadataContainer = Styled.View`
 margin-top: 8px;
 flex-direction: row;
 align-items: center;
`;

const RatingStarImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 1px;
 font-weight: 500;
 font-size: 13px;
 color: #56575C;
`;

const ExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #56575C;
`;

const DeleteContainer = Styled.View`
margin-top: 18px;
`;

const DeleteText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #FF3B30;
`;

const FeedImageContainer = Styled.View`
 padding-top: 8px;
 padding-bottom: 8px;
 padding-right: 3px;
 padding-left: 8px;
 flex-direction: row;
 align-items: center;
`;

const FeedImage = Styled.Image`
 width: ${wp('30%')};
 height: ${wp('21%')};
 border-radius: 10px;
`;

const OrderingIcon = Styled.Image`
`;

interface Props {
    mainTag: string,
    rating: number,
    expense: string,
    mainImageUri: string
}

const OrderingFeedItem = ({mainTag, rating, expense, mainImageUri}: Props) => {
    return (
        <Container>
            <FeedInfoContainer>
                <TagContainer>
                    <MainTagText>{mainTag}</MainTagText>
                </TagContainer>
                <MetadataContainer>
                <RatingStarImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <ExpenseText>{expense ? " · " + expense + "원" : ""}</ExpenseText>
                </MetadataContainer>
                <DeleteContainer>
                    <DeleteText>삭제</DeleteText>
                </DeleteContainer>
            </FeedInfoContainer>
            <FeedImageContainer>
                <FeedImage
                source={{uri:mainImageUri}}/>
                <OrderingIcon
                source={require('~/Assets/Images/ic_ordering.png')}/>
            </FeedImageContainer>
        </Container>
    )
}

export default OrderingFeedItem