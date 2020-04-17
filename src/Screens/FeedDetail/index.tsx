import React from 'react';
import Styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
   flex: 1;
   background-color: #FFFFFF;
`;

const HeaderContainer = Styled.View`
 flex:0.55;
 flex-direction: row;
 padding-left: 7px;
 padding-right: 7px;
`;

const ProfileImage = Styled.Image`
 border-radius: 100;
`;

const HeaderLeft = Styled.View`
 flex:1.0;
 justify-content: center;
 align-items: center;
`;

const HeaderCenter = Styled.View`
flex:3.3;
justify-content: center;
flex-direction: column;
align-items: flex-start;
`;

const HeaderRight = Styled.View`
flex:1.0;
justify-content: center;
align-items: center;
`;

const UserNameText = Styled.Text`
  font-family: 'Arita4.0_B';
`;

const WriteTimeText = Styled.Text`
  font-family: 'Arita4.0_L';
  font-size: 11px;
  margin-top: 4px;
  color: #AAB2B7;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 margin-bottom: 15px;
`;

const RatingText = Styled.Text`
  font-family: 'Arita4.0_B';
  font-size: 20px;
  color: #707070;
`;

const CertainRatingText = Styled.Text`
  font-family: 'Arita4.0_L';
  font-size: 13px;
  margin-bottom: 2px;
  color: #707070;
`;

const FavoriteContainer = Styled.View`
margin-top: 6px;
flex-direction: row;
align-items: center;
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

const FavoriteImage = Styled.Image`
margin-right: 5px;
`;

const FavoriteText = Styled.Text`
 font-family: 'Arita4.0_L';
 font-size: 11;
 color : #AAB2B7;
`;

const FeedDetail = ({route, navigation}: Props) => {
  const imageWidth = Dimensions.get('window').width;
  const imageHeight = Dimensions.get('window').width;
  const {
    profile_image,
    nickname,
    write_time,
    rating,
    favorite_count,
    tag_list,
    review_content,
    rocation,
    review_image_list,
  } = route.params;
  var reviewImage_Array = review_image_list.split('$#$');
  return (
    <Container>
      <HeaderContainer>
        <HeaderLeft>
          <ProfileImage
            style={{width: 45, height: 45}}
            source={{
              uri: profile_image,
            }}
          />
        </HeaderLeft>
        <HeaderCenter>
          <UserNameText>{nickname}</UserNameText>
          <WriteTimeText>{write_time}</WriteTimeText>
        </HeaderCenter>
        <HeaderRight>
          <RatingContainer>
            <RatingText>{rating}</RatingText>
            <CertainRatingText> / 5</CertainRatingText>
          </RatingContainer>
        </HeaderRight>
      </HeaderContainer>
      <FeedImageContainer>
        <SliderBox
          images={reviewImage_Array}
          disableOnPress={true}
          resizeMode="cover"
          sliderBoxHeight={imageHeight}
        />
      </FeedImageContainer>
      <CommentContainer>
        <CommentText style={{fontFamily: 'Arita4.0_M'}}></CommentText>
      </CommentContainer>
      <BottomBorder />
    </Container>
  );
};

export default FeedDetail;
