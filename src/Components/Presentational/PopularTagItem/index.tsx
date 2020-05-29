import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
`;

const PopularTagItemContainer = Styled.View`
  width: ${wp('19%')};
  height: ${hp('12%')};
  justify-content: center;
  align-items: center;
`;

const TagImageContainer = Styled.View`
`;

const TagImage = Styled.Image`
 position: absolute;
 width: ${wp('12.8%')};
 height: ${wp('12.8%')};
 border-radius: 100px;
`;

const TagImageBorder = Styled.View`
 width: ${wp('13.8%')};
 height: ${wp('13.8%')};
 border-radius: 100px;
 border-width: 1px;
 border-color: #DB005B;
 justify-content: center;
 align-items: center;
`;

const TagNameText = Styled.Text`
 margin-right: 2px;
 color: #AAB2B7;
 font-size: 12px;
`;

interface Props {
  tag_image: string;
  tag_name: string;
}

const PopularTagItem = ({tag_image, tag_name}: Props) => {
  return (
    <Container>
      <PopularTagItemContainer>
        <TagImageContainer>
          <TagImageBorder>
            <TagImage source={{uri: tag_image}}></TagImage>
          </TagImageBorder>
        </TagImageContainer>
        <TagNameText>#{tag_name}</TagNameText>
      </PopularTagItemContainer>
    </Container>
  );
};

export default PopularTagItem;
