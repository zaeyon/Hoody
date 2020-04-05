import React from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex-direction: column;
  padding: 15px
  height: 53%;
  background-color: #FFFFFF;
`;

const ProfileImageContainer = Styled.View`
  padding: 16px;
`;

const Header = Styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Body = Styled.View`
  flex-direction: column;
  padding: 0px 20px;
`;

const ProfileImage = Styled.Image`
  border-radius: 100px;
  border-width: 0.3px;
  border-color: #c3c3c3;
  width: 20%;
`;

const ProfileContent = Styled.View`
  flex-direction: column;
  flex: 1;
  padding: 16px;
  justify-content: space-around;
`;

const LabelContainer = Styled.View`
  flex-direction: row;
`;

const ProfileItem = Styled.View`
  flex: 1;
  align-items: center;
`;

const LabelCount = Styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const LabelTitle = Styled.Text`
 font-weight: 300;
`;

const LabelName = Styled.Text`
font-weight: bold;
`;

const LabelTags = Styled.Text`
`;

const LabelDescription = Styled.Text`
 line-height: 20px;
`;

interface Props {
  image: string;
  posts: number;
  follower: number;
  following: number;
  IP: number;
  name: string;
  tags: string;
}

const ProfileHeader = ({
  image,
  posts,
  follower,
  following,
  IP,
  name,
  tags,
}: Props) => {
  return (
    <Container>
      <Header>
        <ProfileImageContainer>
          <ProfileImage
            source={{uri: image}}
            style={{width: 100, height: 100}}
          />
        </ProfileImageContainer>
        <ProfileItem>
          <LabelCount>{posts}</LabelCount>
          <LabelTitle>후기 수</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{follower}</LabelCount>
          <LabelTitle>팔로워</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{following}</LabelCount>
          <LabelTitle>팔로잉</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{IP}</LabelCount>
          <LabelTitle>IP</LabelTitle>
        </ProfileItem>
      </Header>
      <Body>
        <LabelName>{name}</LabelName>
        <LabelDescription numberOfLines={5}>{tags}</LabelDescription>
      </Body>
    </Container>
  );
};

export default ProfileHeader;
