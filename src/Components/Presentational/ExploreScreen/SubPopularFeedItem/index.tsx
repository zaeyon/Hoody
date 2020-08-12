import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native'
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

const FeedRatingExpenseContainer = Styled.View`
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

const FeedExpenseText = Styled.Text`
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

interface Props {
    navigation: any,
    mainImageUri: string,
    feedId: number,
    mainTag: string,
    address: string,
    expense: string,
    rating: rating
}

const SubPopularFeedItem = ({navigation, mainImageUri, feedId, mainTag, address, expense, rating}: Props) => {

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
        <Container>
            <FeedImageContainer>
                <FeedMainImage
                source={{uri:mainImageUri}}/>
            </FeedImageContainer>
            <FeedInfoContainer>
                <FeedTagText>{"#"+mainTag}</FeedTagText>
                <FeedRatingExpenseContainer>
                    <FeedRatingImage
                    source={require('~/Assets/Images/ic_newStar.png')}/>
                    <FeedRatingText>{rating}</FeedRatingText>
                    <FeedExpenseText>{expense ?" · " +  expense + "원" : null}</FeedExpenseText>
                </FeedRatingExpenseContainer>
                <FeedLocationText>{address}</FeedLocationText>
            </FeedInfoContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default SubPopularFeedItem;