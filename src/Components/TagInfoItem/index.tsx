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
 elevation: 0.35;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const TagThumbnail = Styled.Image`
 width: ${wp('15%')};
 height: ${wp('15%')};
 border-radius: 100px;
`;

const TagInfoContainer = Styled.View`
 padding-left: 6px;
 flex-direction: column;
 justify-content: center;
`;

const TagNameText = Styled.Text`
font-family: 'Roboto-Light';
font-size: 13px;
`;

const TagCountText = Styled.Text`
font-family: 'Roboto-Light';
font-size: 13px;
`;

const TagRatingText = Styled.Text`
font-family: 'Roboto-Light';
font-size: 13px;
`;

interface Props {
  tagName: string;
  tagThumbnail: string;
  tagReviewCount: number;
  tagRatingAverage: number;
}

const TagInfoItem = ({
  tagName,
  tagThumbnail,
  tagReviewCount,
  tagRatingAverage,
}: Props) => {
  return (
    <Container>
      <TagThumbnail
        source={{
          uri:
            'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
        }}
      />
      <TagInfoContainer>
        <TagNameText>#{tagName}</TagNameText>
        <TagCountText>후기수: {tagReviewCount}</TagCountText>
        <TagRatingText>평점: {tagRatingAverage}</TagRatingText>
      </TagInfoContainer>
    </Container>
  );
};

export default TagInfoItem;
