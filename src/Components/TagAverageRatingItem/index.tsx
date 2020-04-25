import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('40%')};
 height: ${hp('13%')};
 border-radius: 10px;
 border-width: 0.5px;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const TagThumbnail = Styled.Image`
 width: ${wp('5%')};
 height: ${wp('5%')};
 border-radius: 100px;
`;

const TagInfoContainer = Styled.View`
 flex-direction: column;
 justify-content: center;
`;

const TagNameText = Styled.Text`
font-family: 'Roboto-light';
font-size: 13px;
`;

const TagCountText = Styled.Text`
font-family: 'Roboto-light';
font-size: 13px;
`;

const TagRatingText = Styled.Text`
font-family: 'Roboto-light';
font-size: 13px;
`;

const TagAverageRatingItem = () => {
  return (
    <Container>
      <TagThumbnail
        source={{
          uri:
            'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
        }}
      />
      <TagInfoContainer>
        <TagNameText>#하하</TagNameText>
        <TagCountText>후기수 : 123</TagCountText>
        <TagRatingText>평점 : 4.5</TagRatingText>
      </TagInfoContainer>
    </Container>
  );
};

export default TagAverageRatingItem;
