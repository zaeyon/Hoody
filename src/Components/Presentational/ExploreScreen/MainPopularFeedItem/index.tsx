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
 background-color: #ffffff;
`;

const FeedBackgroundImage = Styled.Image`
 flex: 1;
 border-radius: 5px;
`;

const FeedInfoContainer = Styled.View`
width: ${wp('91')};
position: absolute;
bottom: 0;
background-color: #00000030;

padding-top: 10px;
padding-left: 13px;
padding-bottom: 12px;

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
    navigation: any,
}

const MainPopularFeedItem = ({navigation}: Props) => {
    return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("FeedDetailScreen")}>
        <Container>
            <FeedBackgroundImage
            source={{uri:'https://travelblog.expedia.co.kr/wp-content/uploads/2016/12/010.jpg'}}/>
            <FeedInfoContainer>
            <FeedMainTagNameText>#북방의_장미_치앙마이</FeedMainTagNameText>
            <FeedLocationText>태국 치앙마이</FeedLocationText>
            </FeedInfoContainer>
            <FeedRatingBackground>
                <FeedRatingStarImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <FeedRatingText>3.5</FeedRatingText>
            </FeedRatingBackground>
        </Container>
    </TouchableWithoutFeedback>

    )
}

export default MainPopularFeedItem




