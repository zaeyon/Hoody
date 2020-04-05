import React from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import SubImageList from '~/Components/FeedItem/SubImageList';
import TagList from '~/Components/FeedItem/TagList';
const Container = Styled.View`
 padding: 8px 0px;
`;

const MainImage = Styled.Image`
 border-radius: 5px;
`;

const ProfileImage = Styled.Image`
  border-radius: 60px;
  border-width: 0.5px;
  border-color: #D3D3D3;
`;

const UserName = Styled.Text`
  font-weight: bold;
  margin-left: 8px;
`;

const ProfileContainer = Styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rating = Styled.Text`
  font-weight: bold;
  padding: 0px 60px;
  margin: 5px;
  font-size: 22px;
   
`;

const FeedHeader = Styled.View`
 flex-direction: row;
 padding: 8px 16px;
`;

const HeaderRight = Styled.View`
 width: 100%;
 flex-direction: column;
 margin: 0px 10px;
`;

const ProfileRating = Styled.View`
 width: 100%;
 flex-direction: row;
`;

const FeedBody = Styled.View`
 flex-direction: column;
`;

const Description = Styled.Text`
 padding: 3px 14px;
`;

const FeedDivider = Styled.View`
 width: 95%;
 height: 0.5;
 background-color: #C3C3C3;
 margin: 7px 0px;
 align-items: center;
 justify-content: center;
`;

const DividerContainer = Styled.View`
  width: 100%;
  height: 0.5;
  background-color: #FFFFFF;
  align-items: center;
`;

interface Props {
  mainImage?: string;
  id?: number;
  name: string;
  photo: string;
  description: string;
  images?: Array<string>;
  rating?: string;
  tag?: Array<string>;
}

const FeedItem = ({
  mainImage,
  id,
  name,
  photo,
  description,
  images,
  rating,
  tag,
  navigation,
}: Props) => {
  return (
    <Container>
      <FeedHeader>
        <MainImage
          source={{
            uri: mainImage,
          }}
          style={{width: 112, height: 112}}
        />
        <HeaderRight>
          <ProfileRating>
            <ProfileContainer>
              <ProfileImage
                source={{
                  uri: photo,
                }}
                style={{width: 32, height: 32}}
              />
              <UserName>{name}</UserName>
            </ProfileContainer>
            <Rating>{rating}</Rating>
          </ProfileRating>
          <SubImageList></SubImageList>
        </HeaderRight>
      </FeedHeader>
      <FeedBody>
        <TagList tags={[{tag: '#에어팟'}, {tag: '#을지로'}]}></TagList>
        <Description>{description}</Description>
      </FeedBody>
      <DividerContainer>
        <FeedDivider />
      </DividerContainer>
    </Container>
  );
};

export default FeedItem;
