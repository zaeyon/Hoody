import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileTileFeedItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('')}
 align-items: center;
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 5px;
`;

const FeedInfoContainer = Styled.View`
width: ${wp('44.2%')}
height: 200;
`;

const TagListContainer = Styled.View`
 margin-top: 6px;
 flex-direction: row;
`;

const TagText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #333333;
`;

const RatingExpenseContainer = Styled.View`
 margin-top: 1px;
 flex-direction: row;
 align-items: center;
`;

const RatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 2px;
 font-weight: 500;
 font-size: 13px;
 color: #50555C;
`;

const ExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #50555C;
`;

const LocationContainer = Styled.View`
margin-top: 1px;
 
`;

const LocationText = Styled.Text`
font-size: 13px;
color: #898A8D;
`;



const CollectionDraggableFeedItem = ({}) => {
    return (
        <ProfileTileFeedItemContainer>
            <TileFeedImage
            source={{uri:'https://img.maisonkorea.com/2019/05/msk_5ce1e0ac196ee-1200x800.jpg'}}/>
            <FeedInfoContainer>
            <TagListContainer>
                <TagText>#아씨에뜨앤</TagText>
            </TagListContainer>
            <RatingExpenseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>5 · </RatingText>
                <ExpenseText>13,000원</ExpenseText>
            </RatingExpenseContainer>
            <LocationContainer>
                <LocationText>종로구 종로동</LocationText>
            </LocationContainer>
            </FeedInfoContainer>
        </ProfileTileFeedItemContainer>
    )
}

export default CollectionDraggableFeedItem;