import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width:${wp('100%')};
 height:${wp('24%')};
 flex-direction: row;
`;

const FeedImageContainer = Styled.View`
 padding-top: 8px;
 padding-bottom: 8px;
 padding-left: 16px;
 padding-right: 7px;
`;

const FeedMainImage = Styled.Image`
 width: ${wp('28%')};
 height: ${wp('19.6%')};
 border-radius: 10px;
`;

const FeedInfoContainer = Styled.View`
 padding-top: 8px;
 padding-bottom: 8px;
 padding-left: 7px;
 padding-right: 16px;
`;

const FeedTagText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
 color: #1D1E1F;
`;

const FeedRatingExpanseContainer = Styled.View`
 margin-top: 4px;
 flex-direction: row;
`;

const FeedRatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const FeedRatingText = Styled.Text`
 font-weight: 500;
 font-size: 13px;
 color: #56575C;
`;

const FeedExpanseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #56575C;
`;

const FeedLocationText = Styled.Text`
 margin-top: 4px;
 font-weight: 500;
 font-size: 13px;
 color: #8E9199;
`;

const SubPopularFeedItem = () => {
    return (
        <Container>
            <FeedImageContainer>
                <FeedMainImage
                source={{uri:'https://i.pinimg.com/originals/5d/99/89/5d9989c2ddc5aaa8a8627df55c998b62.jpg'}}/>
            </FeedImageContainer>
            <FeedInfoContainer>
                <FeedTagText>#Tag</FeedTagText>
                <FeedRatingExpanseContainer>
                    <FeedRatingImage
                    source={require('~/Assets/Images/ic_newStar.png')}/>
                    <FeedRatingText>3.5 · </FeedRatingText>
                    <FeedExpanseText>420.000원</FeedExpanseText>
                </FeedRatingExpanseContainer>
                <FeedLocationText>하이데어</FeedLocationText>
            </FeedInfoContainer>
        </Container>
    )
}

export default SubPopularFeedItem;