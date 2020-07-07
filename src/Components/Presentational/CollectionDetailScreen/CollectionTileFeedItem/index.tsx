import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileTileFeedItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('51.1%')};
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 5px;
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

const RatingExpanseContainer = Styled.View`
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

const ExpanseText = Styled.Text`
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



const CollectionTileFeedItem = ({}) => {
    return (
        <ProfileTileFeedItemContainer>
            <TileFeedImage
            source={{uri:'https://img.maisonkorea.com/2019/05/msk_5ce1e0ac196ee-1200x800.jpg'}}/>
            <TagListContainer>
                <TagText>#아씨에뜨앤</TagText>
            </TagListContainer>
            <RatingExpanseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>5 · </RatingText>
                <ExpanseText>13,000원</ExpanseText>
            </RatingExpanseContainer>
            <LocationContainer>
                <LocationText>종로구 종로동</LocationText>
            </LocationContainer>
        </ProfileTileFeedItemContainer>
    )
}

export default CollectionTileFeedItem;