import React from 'react';
import Styled from 'styled-components/native';

const NotificationContainer = Styled.View`
  flex-direction: row;
  padding: 8px 16px;
  align-items: center;
`;

const ProfileImage = Styled.Image`
  border-radius: 40px;
`;

const LabelName = Styled.Text`
  font-weight: bold;
`;

const Message = Styled.Text`
  flex: 1;
  padding: 0 16px;
`;

const PostImage = Styled.Image``;

interface Props {
  profileImage: string;
  id: string;
  message: string;
  postImage: string;
}

const AlarmItem = ({profileImage, id, message, postImage}: Props) => {
  return (
    <NotificationContainer>
      <ProfileImage
        source={{
          uri: profileImage,
        }}
        style={{width: 50, height: 50}}
      />
      <Message numberOfLines={2}>
        <LabelName>{id}</LabelName>
        {message}
      </Message>
      <PostImage
        source={{
          uri: postImage,
        }}
        style={{width: 50, height: 50}}
      />
    </NotificationContainer>
  );
};

export default AlarmItem;
