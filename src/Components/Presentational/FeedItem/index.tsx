import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 `;

const FeedItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('68%')};
 background-color:#ffffff;
 padding: 10px;
`;

const HeaderContainer = Styled.View`
 flex: 1.2;
 flex-direction: row;
 justify-content: space-between;
 `;

const BodyContainer = Styled.View`
 
 padding-top: 10px;
 flex: 10;
`;

const FooterContainer = Styled.View`
 flex: 3;
`;

const WriterContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
 margin-left: 5px;
`;

const WriterProfileImage = Styled.Image`
border-radius: 100px;
width: 30px;
height: 30px;
`;

const WriterNickname = Styled.Text`
margin-left: 5px;
font-size: 12px;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
margin-left: -2px;
width: 25px;
height: 25px;
`;

const HalfRatingStarImage = Styled.Image`
margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const ReviewImage = Styled.Image`
border-radius: 5px;
resize-mode:cover;
 height: 100%;
 width: 100%;
`;

const TagContainer = Styled.View`
flex-direction: row;
background-color: #c3c3c3;
`;

const TagBackground = Styled.View`
margin-left: 5px;
padding: 5px;
border-radius: 4px;
background-color: #ffffff;
opacity: 1;
`;

const TagText = Styled.Text`
color: #000000;
font-size: 15px;
`;

const SubTagText = Styled.Text`
color: #000000;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 8px;
 flex-direction: row;
 `;

const LocationContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const LocationIcon = Styled.Image`
 width: 14px;
 height: 14px;
`;

const LocationText = Styled.Text`
 font-size: 12px;
 color: #707070;
`;

const PriceContainer = Styled.View`
 margin-left: 8px;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const PriceIcon = Styled.Image`
 width: 14px;
 height: 14px;
`;

const PriceText = Styled.Text`
 margin-left: 2px;
 font-size: 12px;
 color: #707070;
`;

const DescriptionContainer = Styled.View`
padding-top: 3px;
padding-left: 3px;
`;

const DescriptionText = Styled.Text`
 font-size: 13px;
`;

const AdditionalInfoContainer = Styled.View`
 flex: 1px;
 flex-direction: row;
 justify-content: center;
 align-items: flex-end;
`;

const InfoLabelText = Styled.Text`
 font-size: 12px;
 color: #AAB2B7;
`;

const InfoCountText = Styled.Text`
 margin-left: 3px;
 font-size: 12px;
 color: #AAB2B7;
`;

const InfoDivider = Styled.Text`
 margin-left: 5px;
 margin-right: 5px;
 font-size: 15px;
 color: #AAB2B7;
`;

const Border = Styled.View`
 background-color: #c3c3c3;
 width: ${wp('100%')};
 height: 0.3px;
`;

interface Props {
  id: number;
  profile_image: string;
  nickname: string;
  write_time: string;
  rating: number;
  main_image: string;
  main_tag: string;
  sub_tag1?: string;
  sub_tag2?: string;
  review_content: string;
  image_count: number;
  favorite_count: number;
  comment_count: number;
  scrap_count: number;
}

const FeedItem = ({
  id,
  profile_image,
  nickname,
  write_time,
  rating,
  main_image,
  main_tag,
  sub_tag1,
  sub_tag2,
  review_content,
  image_count,
  favorite_count,
  comment_count,
  scrap_count,
}: Props) => {
  const [ratingInteger, setRatingInteger] = useState<boolean>();
  const [ratingArray, setRatingArray] = useState([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
  const [tagList, setTagList] = useState(['']);

  const tmpRatingArr = ['empty', 'empty', 'empty', 'empty', 'empty'];

  useEffect(() => {
    if (rating % 1 === 0) {
      setRatingInteger(true);
      for (var i = 0; i < rating; i++) {
        tmpRatingArr[i] = 'full';
        if (i === rating - 1) {
          console.log('ratingArray', ratingArray);
          setRatingArray(tmpRatingArr);
        }
      }
    } else {
      console.log('rating', rating);
      setRatingInteger(false);
      for (var i = 0; i < rating; i++) {
        if (i === rating - 0.5) {
          tmpRatingArr[i] = 'half';
          setRatingArray(tmpRatingArr);
        } else {
          tmpRatingArr[i] = 'full';
        }
      }
    }

    let tmpTagList = new Array();
    tmpTagList.push(main_tag);
    if (sub_tag1) tmpTagList.push(sub_tag1);
    if (sub_tag2) tmpTagList.push(sub_tag2);
    setTagList(tmpTagList);
  }, []);

  return (
    <Container>
      <FeedItemContainer>
        <HeaderContainer>
          <WriterContainer>
            <WriterProfileImage
              source={{uri: profile_image}}></WriterProfileImage>
            <WriterNickname>{nickname}</WriterNickname>
          </WriterContainer>
          <RatingContainer
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              horizontal={true}
              data={ratingArray}
              renderItem={({item, index}) => {
                if (item === 'full') {
                  return (
                    <RatingStarImage
                      source={require('~/Assets/Images/star-24px.png')}
                    />
                  );
                } else if (item === 'half') {
                  return (
                    <HalfRatingStarImage
                      source={require('~/Assets/Images/half-star-24px.png')}
                    />
                  );
                } else if (item === 'empty') {
                  return (
                    <RatingStarImage
                      source={require('~/Assets/Images/emptyStar-24px.png')}
                    />
                  );
                }
              }}
            />
          </RatingContainer>
        </HeaderContainer>
        <BodyContainer>
          <ReviewImage source={{uri: main_image}} />
          <TagContainer>
            <FlatList
              style={{position: 'absolute', right: 5, bottom: 5}}
              horizontal={true}
              data={tagList}
              renderItem={({item}) => (
                <TagBackground>
                  <TagText>{item}</TagText>
                </TagBackground>
              )}
            />
          </TagContainer>
        </BodyContainer>
        <FooterContainer>
          <LocationPriceContainer>
            <LocationContainer>
              <LocationIcon source={require('~/Assets/Images/marker.png')} />
              <LocationText>콩티드툴레아 도산점</LocationText>
            </LocationContainer>
            <PriceContainer>
              <PriceIcon source={require('~/Assets/Images/price.png')} />
              <PriceText>8,900원</PriceText>
            </PriceContainer>
          </LocationPriceContainer>
          <DescriptionContainer>
            <DescriptionText>{review_content}</DescriptionText>
          </DescriptionContainer>
          <AdditionalInfoContainer>
            <InfoLabelText>좋아요</InfoLabelText>
            <InfoCountText>{favorite_count}개</InfoCountText>
            <InfoDivider>|</InfoDivider>

            <InfoLabelText>댓글</InfoLabelText>
            <InfoCountText>{favorite_count}개</InfoCountText>
            <InfoDivider>|</InfoDivider>

            <InfoLabelText>스크랩</InfoLabelText>
            <InfoCountText>{favorite_count}개</InfoCountText>
          </AdditionalInfoContainer>
        </FooterContainer>
      </FeedItemContainer>
    </Container>
  );
};

export default FeedItem;
