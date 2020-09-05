import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FeedItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('51.1%')};
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 5px;
`;

const NoFeedImage = Styled.View`
width: ${wp('44.2%')};
height: ${wp('35.1%')};
border-radius: 5px;
background-color: #eeeeee;
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

interface Props {
    navigation: any,
    postId: number,
    mainImage: string,
    mainTag: string,
    rating: string,
    expense: string,
    location: string,
}
const ScrapFeedItem = ({navigation, postId, mainImage, mainTag, rating, expense, location}: Props) => {

    const moveToFeedDetail = () => {
        navigation.push("FeedStack", {
          screen: "FeedDetailScreen",
          params: {
          postId:postId,
          }
        })
      }

    return (
        <TouchableWithoutFeedback onPress={() => moveToFeedDetail()}>
        <FeedItemContainer>
            {mainImage && (
            <TileFeedImage
            source={{uri:mainImage}}/>
            )}
            {!mainImage && (
                <NoFeedImage>
                </NoFeedImage>
            )}
            <TagListContainer>
                <TagText>{"#"+mainTag}</TagText>
            </TagListContainer>
            <RatingExpenseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <ExpenseText>{expense ? " · " + expense+"원" : null}</ExpenseText>
            </RatingExpenseContainer>
            <LocationContainer>
                <LocationText>{location}</LocationText>
            </LocationContainer>
        </FeedItemContainer>
        </TouchableWithoutFeedback>
    )
}

export default ScrapFeedItem;