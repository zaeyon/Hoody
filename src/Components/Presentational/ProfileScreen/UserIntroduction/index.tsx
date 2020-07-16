import React from 'react';
import {
    TouchableWithoutFeedback
} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';

const Container = Styled.View`
 background-color: #707070;
`;

const UserIntroductionContainer = Styled.View`
 background-color:#ffffff;
 flex-direction: column;
 padding-top: 20px;
 padding-bottom: 10px;
 padding-left: 15px;
 padding-right: 15px;
`;

const ProfileImage = Styled.Image`
 width: ${wp('18.7%')};
 height: ${wp('18.7%')};
 border-radius: 40px;
`;

const ProfileImageContainer = Styled.View`
width: ${wp('18.7%')};
height: ${wp('18.7%')};
border-radius: 40px;
background-color: #E2B1C7;
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

const ProfileDescripText = Styled.Text`
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
margin-top: 2px;
font-size: 15px;
color: #8E8E8E;
`;

const UserInfoCountText = Styled.Text`
margin-left: 3px;
font-weight: bold;
font-size: 15px;
color: #8E8E8E;
`;


interface Props {
    moveToFollowListScreen: (requestedType: string) => void,
    profileImage: string,
    nickname: string,
    description: string,
    feedCount: number,
    followerCount: number,
    followingCount: number,
}

const UserIntroduction = ({moveToFollowListScreen, profileImage, nickname, description, feedCount, followerCount, followingCount}: Props) => {
    
    return (
        <Container>
            <UserIntroductionContainer>
                <ProfileImageContainer>
                    <ProfileImage
                    source={{uri:profileImage}}/>
                </ProfileImageContainer>
                <ProfileNicknameText>{nickname}</ProfileNicknameText>
                <ProfileDescripText>{description}</ProfileDescripText>
                <ProfileUserInfoContainer>
                    <UserFeedContainer>
                        <UserInfoLabelText>게시물</UserInfoLabelText>
                        <UserInfoCountText>{feedCount}</UserInfoCountText>
                    </UserFeedContainer>
                    <TouchableWithoutFeedback onPress={() => moveToFollowListScreen("followers")}>
                    <UserFollowerContainer>
                        <UserInfoLabelText>팔로워</UserInfoLabelText>
                        <UserInfoCountText>{followerCount}</UserInfoCountText>
                    </UserFollowerContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => moveToFollowListScreen("followings")}>
                    <UserFollowingContainer>
                        <UserInfoLabelText>팔로잉</UserInfoLabelText>
                        <UserInfoCountText>{followingCount}</UserInfoCountText>
                    </UserFollowingContainer>
                    </TouchableWithoutFeedback>
                </ProfileUserInfoContainer>
            </UserIntroductionContainer>
        </Container>
    )
}

export default UserIntroduction