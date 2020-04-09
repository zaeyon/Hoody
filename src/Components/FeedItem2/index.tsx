import React from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import SubImageList from '~/Components/FeedItem/SubImageList';
import TagList from '~/Components/FeedItem/TagList';
import {BoxShadow} from 'react-native-shadow';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
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
 flex: 1;
 flex-direction: column;
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
 margin: 0px 0px 0px 12px;
 font-family: 'Arita4.0_L';
 font-size: 12;
 color: #000000;
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

const FeedItem2 = () => {
  const shadowOpt = {
    width: wp('91%'),
    height: wp('81%'),
    color: '#000000',
    border: 10,
    radius: 10,
    opacity: 0.08,
    x: 0,
    y: 3,
    style: {marginVertical: 15},
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

  return (
    <BoxShadow setting={shadowOpt}>
      <Container>
        <HeaderContainer>
          <HeaderLeft>
            <ProfileImage
              style={{width: 57, height: 57}}
              source={{
                uri:
                  'http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84.jpg',
              }}
            />
          </HeaderLeft>
          <HeaderCenter>
            <UserNameText>b_doggy</UserNameText>
            <WriteTimeText>47 seconds ago</WriteTimeText>
          </HeaderCenter>
          <HeaderLeft>
            <RatingContainer>
              <RatingText>4.8</RatingText>
              <CertainRatingText> / 5</CertainRatingText>
            </RatingContainer>
            <FavoriteContainer>
              <FavoriteImage
                style={{width: 14, height: 14}}
                source={require('~/Assets/Images/ic_heart2.png')}
                tintColor="#AAB2B7"
              />
              <FavoriteText>249</FavoriteText>
            </FavoriteContainer>
          </HeaderLeft>
        </HeaderContainer>
        <BodyContainer>
          <ReviewImage
            source={{
              uri: 'https://t1.daumcdn.net/cfile/tistory/25053C40592D09D50A',
            }}
          />
          <ImageCountView>
            <BoxShadow setting={imageCountShadow}>
              <ImageCountContainer>
                <ImageCountText>+5</ImageCountText>
              </ImageCountContainer>
            </BoxShadow>
          </ImageCountView>
        </BodyContainer>
        <FooterContainer>
          <TagList
            tags={[
              {tag: '#키엘'},
              {tag: '#수분크림'},
              {tag: '#하울'},
            ]}></TagList>
          <ReviewContent>
            이번에 남자친구가 선물해준 키엘 수분 크림을 사용해봤는데 너무 좋은거
            같아요.
          </ReviewContent>
        </FooterContainer>
      </Container>
    </BoxShadow>
  );
};

export default FeedItem2;
