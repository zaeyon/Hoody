import React from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity, FlatList} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background-color: #FFFFFF;
width: ${wp('100%')};
height: ${wp('86%')};
align-items: center;
justify-content: center;
`;

const FeedItemContainer = Styled.View`
 background-color: #FFFFFF;
 border-radius: 8;
 width: ${wp('90%')};
 height: ${wp('81%')};
 flex-direction: column;
 
`;

const HeaderContainer = Styled.View`
 flex:1;
 flex-direction: row;
`;

const ProfileImage = Styled.Image`
 border-radius: 100;
`;

const HeaderLeft = Styled.View`
 flex:1.5;
 justify-content: center;
 align-items: center;
`;

const HeaderCenter = Styled.View`
flex:3;
justify-content: center;
flex-direction: column;
`;

const HeaderRight = Styled.View`
flex:1;
`;

const BodyContainer = Styled.View`
 flex:2;
 justify-content: center;
 align-items: center;

`;

const ImageContainer = Styled.View`
`;

const ReviewImage = Styled.Image`
 border-radius: 8px;
 width: ${wp('83%')};
 height: ${wp('40%')}; 
`;

const FooterContainer = Styled.View`
 flex: 0.8;
 flex-direction: column;
 margin-top: 10px;
 margin-left: 10px;
 
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
 align-items: flex-end;
`;

const RatingText = Styled.Text`
  font-family: 'Arita4.0_B';
  font-size: 22px;
  color: #707070;
`;

const CertainRatingText = Styled.Text`
  font-family: 'Arita4.0_L';
  font-size: 13px;
  margin-bottom: 2px;
  color: #707070;
`;

const TagText = Styled.Text`
  font-family: 'Arita4.0_M';
  font-size: 14px;
  margin-left: 5px;
  flex: 1;
`;

const FavoriteContainer = Styled.View`
margin-top: 6px;
flex-direction: row;
align-items: center;
`;

const FavoriteImage = Styled.Image`
margin-right: 5px;
`;

const FavoriteText = Styled.Text`
 font-family: 'Arita4.0_L';
 font-size: 11;
 color : #AAB2B7;
`;

const ReviewContent = Styled.Text`
 margin: 0px 0px 0px 5px;
 font-family: 'Arita4.0_L';
 font-size: 12;
 color: #000000;
 flex: 10;
`;

const ImageCountContainer = Styled.View`
 border-radius: 4px;
 background-color: #F7F7F7;
 width: ${wp('10%')};
 height: ${wp('10%')};
 align-items: center;
 justify-content: center;
`;

const ImageCountView = Styled.View`
 position: absolute;
 right: 7;
 bottom: 13;
`;

const ImageCountText = Styled.Text`
 font-family: 'Arita4.0_B';
 font-size: 15;
 color: #707070;
`;

interface Props {
  id: number;
  profile_image: string;
  nickname: string;
  write_time: string;
  rating: number;
  favorite_count: number;
  main_image: string;
  tag_list: string;
  review_content: string;
  image_count: number;
}

const FeedItem2 = ({
  id,
  profile_image,
  nickname,
  write_time,
  rating,
  favorite_count,
  main_image,
  tag_list,
  review_content,
  image_count,
}: Props) => {
  const shadowOpt = {
    width: wp('91%'),
    height: wp('81%'),
    color: '#000000',
    border: 3,
    radius: 10,
    opacity: 0.06,
    x: -2,
    y: 1,
  };

  const imageCountShadow = {
    width: wp('10%'),
    height: wp('10%'),
    color: '#000000',
    border: 3,
    radius: 5,
    opacity: 0.09,
    x: 0,
    y: 0,
    style: {marginVertical: -18},
  };

  const tagList = tag_list.split('&#&');

  return (
    <Container>
      <BoxShadow setting={shadowOpt}>
        <FeedItemContainer>
          <HeaderContainer>
            <HeaderLeft>
              <ProfileImage
                style={{width: 57, height: 57}}
                source={{
                  uri: profile_image,
                }}
              />
            </HeaderLeft>
            <HeaderCenter>
              <UserNameText>{nickname}</UserNameText>
              <WriteTimeText>{write_time}</WriteTimeText>
            </HeaderCenter>
            <HeaderLeft>
              <RatingContainer>
                <RatingText>{rating}</RatingText>
                <CertainRatingText> / 5</CertainRatingText>
              </RatingContainer>
              <FavoriteContainer>
                <FavoriteImage
                  style={{width: 14, height: 14}}
                  source={require('~/Assets/Images/ic_heart2.png')}
                  tintColor="#AAB2B7"
                />
                <FavoriteText>{favorite_count}</FavoriteText>
              </FavoriteContainer>
            </HeaderLeft>
          </HeaderContainer>
          <BodyContainer>
            <ReviewImage
              source={{
                uri: main_image,
              }}
            />
            <ImageCountView>
              <BoxShadow setting={imageCountShadow}>
                <ImageCountContainer>
                  <ImageCountText>+{image_count}</ImageCountText>
                </ImageCountContainer>
              </BoxShadow>
            </ImageCountView>
          </BodyContainer>
          <FooterContainer>
            <FlatList
              data={tagList}
              renderItem={({item}) => <TagText>#{item}</TagText>}
              horizontal={true}
            />
            <ReviewContent>{review_content}</ReviewContent>
          </FooterContainer>
        </FeedItemContainer>
      </BoxShadow>
    </Container>
  );
};

export default FeedItem2;
