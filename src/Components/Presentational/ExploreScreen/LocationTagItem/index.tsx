import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
  width: ${wp('100%')};
  height: ${wp('17%')};
  flex-direction: row;
`;

const TagImageContainer = Styled.View`
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 16px;
 padding-right: 5px;
`;

const TagImageBackground = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('11.7%')};
 border-radius: 100px;
 border-width: 0.5px;
 border-color: #F4F4F6;
 align-items: center;
 justify-content: center;
`;

const HashImage = Styled.Image`
  width: ${wp('6.4%')}px;
  height: ${wp('6.4%')}px;
`;

const TagInfoContainer = Styled.View`
 padding-top: 15px;
 padding-left: 5px;
 padding-bottom: 15px;
 padding-right: 16px;
`;

const TagNameText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #1D1E1F;
`;

const TagLocationText = Styled.Text`
 font-size: 15px;
 color: #C6C7CC;
`;

const TagCountText = Styled.Text`
margin-top: 3px;
font-size: 15px;
color: #C6C7CC;
`;

const LocationTagItem = () => {
    return (
        <Container>
            <TagImageContainer>
                <TagImageBackground>
                    <HashImage
                    source={require('~/Assets/Images/ic_hash.png')}/>
                </TagImageBackground>
                </TagImageContainer>
                <TagInfoContainer>
                    <TagNameText>#회식장소</TagNameText>
                    <TagCountText>233게시글</TagCountText>
                </TagInfoContainer>
        </Container>
    )
}

export default LocationTagItem;
