import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TileFeedItemContainer = Styled.View`
 width: ${wp('47.8%')};
 height: ${wp('51.1%')};
`;

const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 10px;
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

const NoImageContainer = Styled.View`
background-color: #FAFAFA;
border-radius: 10px;
width: ${wp('44.2%')};
height: ${wp('35.1%')};
`;

interface Props {
    feedId: number,
    mainImageUri: string,
    mainTag: string,
    rating: number,
    expense: string,
    address: string,
    navigation: any,
}



const TileFeedItem = ({feedId, mainImageUri, mainTag, rating, expense, address, navigation}: Props) => {

    const moveToFeedDetail = () => {
        navigation.navigate("FeedStack", {
            screen: "FeedDetailScreen",
            params: {
                feedId: feedId,
            }
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToFeedDetail()}>
        <TileFeedItemContainer>
            {!mainImageUri && (
            <NoImageContainer>
            </NoImageContainer>
            )}
            <TileFeedImage
            source={{uri:mainImageUri}}/>
            <TagListContainer>
                <TagText>{"#"+mainTag}</TagText>
            </TagListContainer>
            <RatingExpenseContainer>
                <RatingImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <ExpenseText>{expense ?" · " + expense + "원" : ""}</ExpenseText>
            </RatingExpenseContainer>
            <LocationContainer>
                <LocationText>{address ? address : ""}</LocationText>
            </LocationContainer>
        </TileFeedItemContainer>
        </TouchableWithoutFeedback>
    )
}

export default TileFeedItem;