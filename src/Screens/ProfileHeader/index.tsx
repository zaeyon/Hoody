import React from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hpm,
} from 'react-native-responsive-screen';

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
  align-items: center;
`;

const Body = Styled.View`
  flex-direction: row;
  padding: 0px 10px;
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
font-family: 'Arita4.0_SB';
font-size: 15px;
margin-top: 15px;
`;

const LabelTitle = Styled.Text`
  font-family: 'Arita4.0_L';
  color: #707070;
  font-size: 13px;
  margin-top: 10px;
`;

const UserName = Styled.Text`
font-family: 'Roboto-Regular';
font-size: 17px;
`;

const UserTags = Styled.Text`
font-family: 'Arita4.0_L';
`;

const HeaderRight = Styled.View`
margin-left: 5px;
`;

const Tags = Styled.Text`
font-family:'Arita4.0_L';
font-size: 13px;
color: #707070;
margin-top: 1px;
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
            style={{width: wp('16%'), height: wp('16%')}}
          />
        </ProfileImageContainer>
        <HeaderRight>
          <UserName>{name}</UserName>
          <Tags numberOfLines={5}>{tags}</Tags>
        </HeaderRight>
      </Header>
      <Body>
        <ProfileItem>
          <LabelCount>{posts}</LabelCount>
          <LabelTitle>후기 갯수</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{following}</LabelCount>
          <LabelTitle>팔로잉</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{follower}</LabelCount>
          <LabelTitle>팔로워</LabelTitle>
        </ProfileItem>
        <ProfileItem>
          <LabelCount>{IP}</LabelCount>
          <LabelTitle>포인트</LabelTitle>
        </ProfileItem>
      </Body>
    </Container>
  );
};

export default ProfileHeader;
