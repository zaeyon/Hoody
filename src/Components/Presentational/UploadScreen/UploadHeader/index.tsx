import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';

const Container = Styled.View`
 background-color:#ffffff;

`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('10%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 border-bottom-width: 0.3px;
 border-color: #c3c3c3;
 padding: 10px;
`;

const LeftContainer = Styled.View`
`;

const CenterContainer = Styled.View`
justify-content: center;
margin-left: 7px;
`;

const RightContainer = Styled.View`
`;

const MainTagText = Styled.Text`
 font-size: 16px;
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

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const UploadButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 5px;
 flex-direction: row;
 justify-content: center;
`;

const LocationContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const LocationIcon = Styled.Image`
 width: 15px;
 height: 14px;
 tint-color: #707070;
`;

const LocationText = Styled.Text`
 font-size: 12px;
 margin-left: 4px;
 color: #707070;
`;

const ExpenseContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const ExpenseIcon = Styled.Image`
margin-left: 10px;
 width: 16px;
 height: 15px;
 tint-color: #707070;
`;

const ExpenseText = Styled.Text`
 margin-left: 4px;
 font-size: 12px;
 color: #707070;
 font-weight: normal;
`;

interface Props {
  mainTag: string;
  subTag1: string;
  subTag2: string;
  rating: number;
  location: string;
  expense: number;
}

const UploadHeader = ({
  mainTag,
  subTag1,
  subTag2,
  rating,
  location,
  expense,
}: Props) => {
  const [ratingArray, setRatingArray] = useState([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);

  const tmpRatingArr = ['empty', 'empty', 'empty', 'empty', 'empty'];

  useEffect(() => {
    if (rating % 1 === 0) {
      for (var i = 0; i < rating; i++) {
        tmpRatingArr[i] = 'full';
        if (i === rating - 1) {
          setRatingArray(tmpRatingArr);
        }
      }
    } else {
      for (var i = 0; i < rating; i++) {
        if (i === rating - 0.5) {
          tmpRatingArr[i] = 'half';
          setRatingArray(tmpRatingArr);
        } else {
          tmpRatingArr[i] = 'full';
        }
      }
    }
  }, [ratingArray]);

  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
        </LeftContainer>
        <CenterContainer>
          <MainTagText>{mainTag || '#대표 태그 입력'}</MainTagText>
          <RatingContainer>
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
        </CenterContainer>
        <RightContainer>
          <UploadButtonText>공유</UploadButtonText>
        </RightContainer>
      </HeaderContainer>
      <LocationPriceContainer>
        <LocationContainer>
          <LocationIcon source={require('~/Assets/Images/ic_map.png')} />
          <LocationText>{location || '위치 입력'}</LocationText>
        </LocationContainer>
        <ExpenseContainer>
          <ExpenseIcon source={require('~/Assets/Images/price.png')} />
          <ExpenseText>{expense || '소비 금액 입력'}</ExpenseText>
        </ExpenseContainer>
      </LocationPriceContainer>
    </Container>
  );
};

export default UploadHeader;
