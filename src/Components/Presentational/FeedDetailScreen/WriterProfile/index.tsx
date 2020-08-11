import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GETAgeGroupPopularTag from '~/Route/Curation/GETAgeGroupPopularTag';

const Container = Styled.View`
 padding-top: 16px;
 padding-bottom: 16px;
 align-items: center;
`;

const WriterProfileImage = Styled.Image`
  width: ${wp('12.26%')};
  height: ${wp('12.26%')};
  border-radius: 100px;
`;

const WriterNicknameText = Styled.Text`
 margin-top: 14px;
 font-weight: 600;
 font-size: 18px;
 color: #1D1E1F;
`;

const WriterDescripText = Styled.Text`
 margin-top: 5px;
 font-size: 15px;
 color: #56575C;
`;

const FollowButton = Styled.View`
 margin-top: 16px;
 width: ${wp('24%')}
 height: ${wp('8.52%')};
 border-radius: 8px;
 background-color: #277DFF;
 justify-content: center;
 align-items: center;
 border-width: 1px;
 border-color: #277DFF;
`;

const FollowText = Styled.Text`
font-size: 15px;
font-weight: 500;
color: #FFFFFF;
`;

const FollowingButton = Styled.View`
margin-top: 16px;
width: ${wp('24%')}
height: ${wp('8.52%')};
border-radius: 8px;
background-color: #ffffff;
justify-content: center;
align-items: center;
border-width: 1px;
border-color: #77A7F1;
`;

const FollowingText = Styled.Text`
 font-size: 15px;
 font-weight: 500;
 color: #77A7F1;
`;

interface Props {
    profileImageUri: string,
    nickname: string,
    description: string,
    followed: boolean,
}

const WriterProfile = ({profileImageUri, nickname, description, followed}: Props) => {
    return (
        <Container>
            <WriterProfileImage
            source={{uri:profileImageUri}}/>
            <WriterNicknameText>{nickname}</WriterNicknameText>
            <WriterDescripText>{description}</WriterDescripText>
            {followed && (
                <FollowingButton>
                    <FollowingText>팔로잉</FollowingText>
                </FollowingButton>
            )}
            {!followed && (
                <FollowButton>
                    <FollowText>팔로우</FollowText>
                </FollowButton>
            )}
        </Container>
    )
}

export default WriterProfile;