import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 background-color: #707070;
`;

const UserIntroductionContainer = Styled.View`
 background-color:#ffffff;
 flex-direction: column;
 padding-top: 20px;
 padding-bottom: 25px;
 padding-left: 16px;
 padding-right: 16px;
`;

const ProfileImage = Styled.Image`
 width: ${wp('18.7%')};
 height: ${wp('18.7%')};
 border-radius: 40px;
`;

const NoProfileImage = Styled.View`
width: ${wp('18.7%')};
height: ${wp('18.7%')};
border-radius: 40px;
background-color: #E2B1C7;
`;

const ProfileNicknameText = Styled.Text`
margin-top: 21px;
font-weight: 600;
font-size: 20px;
color: #000000;
`;

const ProfileBriefIntroText = Styled.Text`
margin-top: 9px;
font-size: 16px;
color: #000000;
`;

const ProfileUserInfoContainer = Styled.View`
margin-top: 20px;
flex-direction: row;
`;

const UserFeedContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const UserFollowerContainer = Styled.View`
margin-left: 11px;
flex-direction: row;
align-items: center;
`;

const UserFollowingContainer = Styled.View`
margin-left: 11px;
flex-direction: row;
align-items: center;
`;

const UserInfoLabelText = Styled.Text`
font-size: 15px;
color: #8E8E8E;
`;

const UserInfoCountText = Styled.Text`
margin-left: 3px;
font-weight: bold;
font-size: 15px;
color: #8E8E8E;
`;

const UserIntroduction = () => {
    
    return (
        <Container>
            <UserIntroductionContainer>
                <NoProfileImage></NoProfileImage>
                <ProfileNicknameText>먹보돼지나야나</ProfileNicknameText>
                <ProfileBriefIntroText>고등학생 예림이의 용돈 FLEX 라이프</ProfileBriefIntroText>
                <ProfileUserInfoContainer>
                    <UserFeedContainer>
                        <UserInfoLabelText>게시물</UserInfoLabelText>
                        <UserInfoCountText>544</UserInfoCountText>
                    </UserFeedContainer>
                    <UserFollowerContainer>
                        <UserInfoLabelText>팔로우</UserInfoLabelText>
                        <UserInfoCountText>45</UserInfoCountText>
                    </UserFollowerContainer>
                    <UserFollowingContainer>
                        <UserInfoLabelText>팔로잉</UserInfoLabelText>
                        <UserInfoCountText>354</UserInfoCountText>
                    </UserFollowingContainer>
                </ProfileUserInfoContainer>
            </UserIntroductionContainer>
        </Container>
    )
}

export default UserIntroduction