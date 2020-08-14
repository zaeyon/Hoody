import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
padding-top: 15px;
padding-bottom: 15px;
 width: ${wp('100%')};
 height: ${wp('28%')};
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.4px;
 border-top-width: 0.4px;
 border-color: #ECECEE;
`;

const FeedInfoContainer = Styled.View`
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
margin-top: 16px;
`;

const DeleteText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #FF3B30;
`;

const FeedImageContainer = Styled.View`
 padding-right: 3px;
 padding-left: 8px;
 flex-direction: row;
 align-items: center;
`;

const FeedImage = Styled.Image`
 width: ${wp('30%')};
 height: ${wp('21%')};
 border-radius: 10px;
 margin-right: 3px;
`;

const NoImage = Styled.View`
 width: ${wp('30%')};
 height: ${wp('21%')};
 border-radius: 10px;
 margin-right: 3px;
 background-color: #ECECEE;
`;

const RightContainer = Styled.View`
 flex-direction: row;
`;

const OrderingIconContainer = Styled.View`
 background-color: #ffffff;
 justify-content: center;
`;

const OrderingIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 margin-right: 2px;
`;

interface Props {
    mainTag: string,
    rating: number,
    expense: string,
    mainImageUri: string,
    drag: any,
    isActive: any,
}

const OrderingFeedItem = ({mainTag, rating, expense, mainImageUri, drag, isActive}: Props) => {
    return (
        <Container>
            <FeedInfoContainer>
                <TagContainer>
                    <MainTagText>{"#" + mainTag}</MainTagText>
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
            <RightContainer>
            <FeedImageContainer>
                {mainImageUri && (
                <FeedImage
                source={{uri:mainImageUri}}/>
                )}
                {!mainImageUri && (
                <NoImage/>
                )}
            </FeedImageContainer>
            <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
            <OrderingIconContainer>
                <OrderingIcon
                source={require('~/Assets/Images/ic_ordering.png')}/>
            </OrderingIconContainer>
            </TouchableWithoutFeedback>
            </RightContainer>
        </Container>
    )
}

export default OrderingFeedItem