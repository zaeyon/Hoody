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
 border-bottom-width: 1px;
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
 border-bottom-width: 1px;

`;

const FooterContainer = Styled.View`
 flex: 1;
 border-bottom-width: 1px;

`;

const UserNameText = Styled.Text`
  font-family: 'Arita4.0_B';
`;

const WriteTimeText = Styled.Text`
  font-family: 'Arita4.0_L';
  font-size: 11px;
  margin-top: 4px;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
 align-items: flex-end;
`;

const RatingText = Styled.Text`
  font-family: 'Arita4.0_B';
  font-size: 22px;
`;

const CertainRatingText = Styled.Text`
  font-family: 'Arita4.0_L';
  font-size: 13px;
  margin-bottom: 2px;
`;

const FavoriteContainer = Styled.View`
margin-top: 3px;
flex-direction: row;
align-items: center;
`;

const FavoriteImage = Styled.Image`
`;

const FavoriteText = Styled.Text`
 font-family: 'Arita4.0_L';
 font-size: 11;
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
                style={{width: 22, height: 22}}
                source={{
                  uri:
                    'https://i.pinimg.com/564x/29/8d/b1/298db12d2411dba1ed19329674469ba8.jpg',
                }}
              />
              <FavoriteText>249</FavoriteText>
            </FavoriteContainer>
          </HeaderLeft>
        </HeaderContainer>
        <BodyContainer></BodyContainer>
        <FooterContainer></FooterContainer>
      </Container>
    </BoxShadow>
  );
};

export default FeedItem2;
