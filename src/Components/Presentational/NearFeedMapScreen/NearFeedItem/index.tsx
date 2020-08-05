import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('37.3%')};
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const FeedInfoContainer = Styled.View`
 padding-top: 22px;
 padding-left: 16px;
 padding-right: 8px;
 padding-bottom: 22px;
`;

const FeedImageContainer = Styled.View`
 padding-top: 22px;
 padding-bottom: 22px;
 padding-right: 16px;
 padding-left: 8px;
`;

const FeedTagListContainer = Styled.View`
 flex-direction: row;
`;

const FeedTagListText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #1D1E1F;
`;

const FeedMetaDataContainer = Styled.View`
flex-direction: row;
margin-top: 8px;
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
margin-left: 1px;
font-weight: 500;
font-size: 13px;
color: #56575C;
`;

const LocationContainer = Styled.Text`
margin-top: 8px;
flex-direction: row;
`;

const LocationText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #8E9199;
`;

const FeedSocialInfoContainer = Styled.View`
 margin-top: 25px;
 flex-direction: row;
`;

const SocialItemContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const LikeIcon = Styled.Image`
width: ${wp('3%')};
height: ${wp('2.66%')};
tint-color: #8E9199;
`;

const LikeCount = Styled.Text`
font-size: 12px;
color: #8E9199;
margin-left: 2px;
`;

const CommentIcon = Styled.Image`
margin-left: 6px;
width: ${wp('2.66%')};
height: ${wp('2.66%')};
tint-color: #8E9199;

`;

const CommentCount = Styled.Text`
font-size: 12px;
color: #8E9199;
margin-left: 2px;
`;

const FeedMainImage = Styled.Image`
width: ${wp('26.6%')};
height: ${wp('26.6%')};
border-radius: 10px;
`;

interface Props {
    feedId: number,
    mainTag: string,
    subTag1: string,
    subTag2: string,
    rating: number,
    expense: number,
    location: string,
    likeCount: number,
    commentCount: number,
    mainImageUri: string
}

const NearFeedItem = ({feedId, mainTag, subTag1, subTag2, rating, expense, location, likeCount, commentCount, mainImageUri}: Props) => {
    return (
        <Container>
            <FeedInfoContainer>
                <FeedTagListContainer>
                    <FeedTagListText>
                        {"#" +mainTag}
                        {subTag1 && (
                            <FeedTagListText>
                                {" #"+subTag1}
                            {subTag2 && (
                                <FeedTagListText>{" #" + subTag2}
                                </FeedTagListText>
                            )}
                            </FeedTagListText>
                        )}
                    </FeedTagListText>
                </FeedTagListContainer>
                <FeedMetaDataContainer>
                    <RatingStarImage
                    source={require('~/Assets/Images/ic_newStar.png')}/>
                    <RatingText>{rating}</RatingText>
                    <ExpenseText>{expense ?  " · " + expense + "원" : ""}</ExpenseText>
                </FeedMetaDataContainer>
                <LocationContainer>
                    {location && (
                    <LocationText>{location}</LocationText>
                    )}
                </LocationContainer>
                <FeedSocialInfoContainer>
                    <SocialItemContainer>
                        <LikeIcon
                        source={require('~/Assets/Images/ic_like.png')}/>
                        <LikeCount>
                            {likeCount}
                        </LikeCount>
                    </SocialItemContainer>
                    <SocialItemContainer>
                        <CommentIcon
                        source={require('~/Assets/Images/ic_comment.png')}/>
                        <CommentCount>
                            {commentCount}
                        </CommentCount>
                    </SocialItemContainer>
                </FeedSocialInfoContainer>
            </FeedInfoContainer>
            <FeedImageContainer>
                {mainImageUri && (
<FeedMainImage
source={{uri:mainImageUri}}/>
                )}
            </FeedImageContainer>
        </Container>    
    )
}

export default NearFeedItem;


