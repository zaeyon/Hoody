import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CollectionFeedItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('37.3%')};
 background-color: #ffffff;
 flex-direction: row;
 border-bottom-width: 0.6px;
 border-color: #eeeeee;
 justify-content: space-between;
`;

const CollectionFeedInfoContainer = Styled.View`
padding: 22px 16px 22px 18px;
justify-content: space-between;
`;

const FeedMetaInfoContainer = Styled.View`
`;

const TagListContainer = Styled.View`
flex-direction: row;
`;

const MainTagText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
 color: #3384ff;
`;

const SubTagText = Styled.Text`
 margin-left: 5px;
 font-size: 15px;
 font-weight: 600;
 color: #cccccc;
`;

const RatingExpanseContainer = Styled.View`
 margin-top: 8px;
 flex-direction: row;
`;

const RatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 3px;
 font-size: 13px;
 font-weight: 500;
 color: #333333;
`;

const ExpanseText = Styled.Text`
font-size: 13px;
font-weight: 500;
color: #333333;
`;

const LocationContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
`;

const LocationText = Styled.Text`
font-size: 13px;
color: #8e8e8e;
`;

const FeedLikeCommentContainer = Styled.View`
 flex-direction: row;
`;

const LikeIcon = Styled.Image`
width: ${wp('4.7%')};
height: ${wp('4.3%')};
`;

const LikeCountText = Styled.Text`
 margin-left: 4px;
 font-weight: 500;
 font-size: 13px;
 color: #cccccc;
`;

const CommentIcon = Styled.Image`
margin-left: 10px;
 width: ${wp('4.3%')};
 height: ${wp('4.3%')};
`;

const CommentCountText = Styled.Text`
 margin-left: 4px;
 font-weight: 500;
 font-size: 13px;
 color: #cccccccc;
`;


const CollectionFeedImageContainer = Styled.View`
 padding: 22px 16px 22px 0px;
`;

const FeedMainImage = Styled.Image`
 width: ${wp('34.6%')};
 height: ${wp('26.6%')};
 border-radius: 10px;
`;


const CollectionFeedItem = ({}) => {
    return (
        <CollectionFeedItemContainer>
        <CollectionFeedInfoContainer>
        <FeedMetaInfoContainer>
        <TagListContainer>
            <MainTagText>#아씨앤뜨앤</MainTagText>
            <SubTagText>#을지로카페</SubTagText>
        </TagListContainer>
        <RatingExpanseContainer>
            <RatingImage
            source={require('~/Assets/Images/ic_newStar.png')}/>
            <RatingText>3.5 · </RatingText>
            <ExpanseText>420.000원</ExpanseText>
        </RatingExpanseContainer>
        <LocationContainer>
            <LocationText>하이데어</LocationText>
        </LocationContainer>
        </FeedMetaInfoContainer>
        <FeedLikeCommentContainer>
         <LikeIcon
         source={require('~/Assets/Images/ic_like.png')}/>
         <LikeCountText>32</LikeCountText>
         <CommentIcon
         source={require('~/Assets/Images/ic_comment.png')}/>
         <CommentCountText>13</CommentCountText>   
        </FeedLikeCommentContainer>
        </CollectionFeedInfoContainer>
        <CollectionFeedImageContainer>
        <FeedMainImage
        source={{uri:'https://d2uh4olaxaj5eq.cloudfront.net/fit-in/1080x0/3d655d9b-3ca8-4c4b-bbaf-7519bdc09f42.jpg'}}/>
        </CollectionFeedImageContainer>
        </CollectionFeedItemContainer>
    )
}

export default CollectionFeedItem;