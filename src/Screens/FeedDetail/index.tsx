import React from 'react';
import Styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const Container = Styled.View`
   flex: 1;
   background-color: #FFFFFF;
`;
const TextView = Styled.Text`
`;

const FeedImageContainer = Styled.View`
`;

const FeedImage = Styled.Image`
`;

const CommentContainer = Styled.View`
  padding: 10px 10px 40px 20px;
  align-items: center;
  justify-content: center;
`;

const CommentText = Styled.Text`
`;

const BottomBorder = Styled.View`
  background-color: #C3C3C3;
  width: 100%;
  height: 0.4px;
`;

interface Props {
  images: Array<string>;
  rocation: string;
  comment: string;
  rating: number;
  profileImage: string;
}
const FeedDetail = ({route, navigation}) => {
  const imageWidth = Dimensions.get('window').width;
  const imageHeight = Dimensions.get('window').width;
  const {content} = route.params;
  return (
    <Container>
      <FeedImageContainer>
        <FeedImage
          style={{width: imageWidth, height: imageHeight}}
          source={{
            uri:
              'https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000',
          }}
        />
      </FeedImageContainer>
      <CommentContainer>
        <CommentText style={{fontFamily: 'Arita4.0_M'}}>
          {JSON.stringify(content).replace(/\"/g, '')}
        </CommentText>
      </CommentContainer>
      <BottomBorder />
    </Container>
  );
};

export default FeedDetail;
