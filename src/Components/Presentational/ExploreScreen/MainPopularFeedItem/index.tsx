import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('91%')};
 height: ${wp('55.5%')};
`;

const FeedBackgroundImage = Styled.Image`
 border-radius: 10px;
 width: ${wp('91%')};
 height: ${wp('55.5%')};
`;

const FeedInfoContainer = Styled.View`
width: ${wp('91')};
position: absolute;
bottom: 0;
background-color: #00000030;
padding-top: 10px;
padding-left: 13px;
padding-bottom: 12px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
`;

const FeedMainTagNameText = Styled.Text`
 font-weight: 700;
 font-size: 18px;
 color: #FFFFFF;
`;

const FeedLocationText = Styled.Text`
 margin-top: 3px;
 font-weight: 500;
 font-size: 13px;
 color: #FFFFFF;
`;

const FeedRatingBackground = Styled.View`
 width: ${wp('12.8%')};
 height: ${wp('6.6%')}
 border-radius: 26;
 background-color: #00000090;
 position: absolute;
 top: 11px;
 right: 11px;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const FeedRatingStarImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const FeedRatingText = Styled.Text`
 margin-left: 3px;
 color: #ffffff;
 font-size: 13px;
 font-weight: 500;
`;

interface Props {
    feedId: number,
    mainImageUri: string,
    mainTag: string,
    address: string,
    rating: number,
    navigation: any,
}

const MainPopularFeedItem = ({navigation, feedId, mainImageUri, mainTag, address, rating}: Props) => {

    console.log("메인 피드 아이템 mainImageUri", mainImageUri);

    const moveToFeedDetail = () => {
        navigation.navigate("FeedStack", {
            screen: "FeedDetailScreen",
            params: {
                feedId: feedId,
                update: true,
            }
        })
    }
    return (
    <TouchableWithoutFeedback onPress={() => moveToFeedDetail()}>
        <Container>
            <FeedBackgroundImage
            source={{uri:mainImageUri}}/>
            <FeedInfoContainer>
            <FeedMainTagNameText>{"#" + mainTag}</FeedMainTagNameText>
            <FeedLocationText>{address ? address : ""}</FeedLocationText>
            </FeedInfoContainer>
            <FeedRatingBackground>
                <FeedRatingStarImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <FeedRatingText>{rating}</FeedRatingText>
            </FeedRatingBackground>
        </Container>
    </TouchableWithoutFeedback>
    )
}

export default MainPopularFeedItem




