import * as React from 'react';
import Styled from 'styled-components/native';
import {Text} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {Rating} from 'react-native-ratings';

const Container = Styled.SafeAreaView`
  flex: 1;
  height: 100%;
  background-color: #FFFFFF;
  flex-direction: row;
  padding: 10px;
`;

const MyHoogingText = Styled.Text`
  font-size: 19px;
  color: #000000;
  text-align: center;
`;

const UploadButton = Styled.Text`
 font-size: 19px;
 color: #001BD8;
`;

const CloseButton = Styled.Image`
 
`;

const Inner = Styled.View`
  flex-direction: column;
  width: 100%;
  border-width: 1px;
  border-radius: 5px;
  border-color: #c3c3c3;
`;

const Title = Styled.View`
 flex-direction: row;
 height: 40px;
 padding: 8px;
 align-items: center;
 justify-content: space-between;
`;

const ImageRatingContainer = Styled.View`
 padding: 10px 20px;
 flex-direction: row;
 flex: 2.0;
 align-items: center;
 border-bottom-width: 0.4px;
 border-color: #c3c3c3;
 justify-content:space-around;
`;

const RocationContainer = Styled.View`
flex: 0.7;
border-bottom-width: 0.4px;
border-color: #c3c3c3;
padding: 0px 15px;
`;

const TagContainer = Styled.View`
flex: 0.7;
border-bottom-width: 0.4px;
border-color: #c3c3c3;
padding: 0px 15px;
`;

const CommentContainer = Styled.View`
flex: 3.5;
border-bottom-width: 0.4px;
border-color: #c3c3c3;
padding: 0px 15px;
`;

const GalleryContainer = Styled.View`
 flex: 3;
`;

const SelectedImage = Styled.View`
 border-radius: 5px;
 width: 100px;
 height: 100px;
 border-width: 1px;
 border-color: #c3c3c3;
 justify-content: center;
 align-items: center;
`;

const RocationInput = Styled.TextInput`
 font-size: 15px;
`;

const TagInput = Styled.TextInput`
 font-size: 15px;
`;

const CameraIcon = Styled.Image`
`;

const CommentInput = Styled.TextInput`
`;

function Upload({navigation}) {
  const ratingCompleted = rating => {
    console.log(`Rating is: + ${rating}`);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text onPress={() => 1} title="공유" />,
    });
  }, [navigation]);

  return (
    <Container>
      <Inner>
        <Title>
          <CloseButton
            style={{width: 20, height: 20}}
            source={require('~/Assets/Images/close_gray.png')}
          />
          <MyHoogingText>나의 후깅</MyHoogingText>
          <UploadButton>공유</UploadButton>
        </Title>
        <ImageRatingContainer>
          <SelectedImage>
            <CameraIcon
              style={{width: 25, height: 25}}
              source={require('~/Assets/Images/camera.png')}
            />
          </SelectedImage>
          <Rating
            onFinishRating={ratingCompleted}
            style={{paddingVertical: 10}}
            imageSize={33}
          />
        </ImageRatingContainer>
        <RocationContainer>
          <RocationInput placeholder="위치 추가" />
        </RocationContainer>
        <TagContainer>
          <TagInput placeholder="태그" />
        </TagContainer>
        <CommentContainer>
          <CommentInput placeholder="comment ..." />
        </CommentContainer>
        <GalleryContainer>
          {/*          <CameraRollPicker callback={this.getSelectedImage} /> */}
        </GalleryContainer>
      </Inner>
    </Container>
  );
}

export default Upload;
