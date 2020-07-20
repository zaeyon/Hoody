import React, {useState, useEffect} from 'react';
import {
    TouchableWithoutFeedback
} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';

import {POSTFollowUser, DELETEUnfollowUser} from '~/Route/User/Follow';

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
background-color: #ffffff;
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

const FollowButton = Styled.View`
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

const FooterContainer = Styled.View`
 flex-direction: row;
 justify-content: space-between;
`;


interface Props {
    moveToFollowListScreen: (requestedType: string) => void,
    followed: boolean,
    followUserProp: () => void,
    unfollowUserProp: () => void,
    profileImage: string,
    nickname: string,
    description: string,
    feedCount: number,
    followerCount: number,
    followingCount: number,
    currentUserProfileBool: boolean,
    userId: string,
}

const UserIntroduction = ({moveToFollowListScreen, profileImage, nickname, description, feedCount, followerCount, followingCount, currentUserProfileBool, userId, followed, followUserProp, unfollowUserProp}: Props) => {
    const [userFollowed, setUserFollowed] = useState<boolean>(false);

    useEffect(() => {
        if(followed) {
            console.log("팔로우한유저", followed)
            setUserFollowed(true)
        } else {
            setUserFollowed(false)
        }
    }, [])

    const followUser = () => {
        followUserProp();
        POSTFollowUser(userId)
        .then(function(response) {
            console.log("팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("팔로우 실패", error);
        })
    }

    const unfollowUser = () => {
        unfollowUserProp();
        DELETEUnfollowUser(userId)
        .then(function(response) {
            console.log("언팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("언팔로우 실패", error);
        })
    }
    
    return (
        <Container>
            <UserIntroductionContainer>
                <ProfileImageContainer>
                    <ProfileImage
                    source={{uri:profileImage}}/>
                </ProfileImageContainer>
                <ProfileNicknameText>{nickname}</ProfileNicknameText>
                <ProfileDescripText>{description}</ProfileDescripText>
                <FooterContainer>
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
                    {followed && !currentUserProfileBool && (
                    <TouchableWithoutFeedback onPress={() => unfollowUser()}>
                    <FollowingButton>
                        <FollowingText>팔로잉</FollowingText>
                    </FollowingButton>
                    </TouchableWithoutFeedback>
                    )}
                    {!followed && !currentUserProfileBool &&  (
                    <TouchableWithoutFeedback onPress={() => followUser()}>
                        <FollowButton>
                         <FollowText>팔로우</FollowText>
                        </FollowButton>
                    </TouchableWithoutFeedback>
                    )}
                </FooterContainer>
            </UserIntroductionContainer>
        </Container>
    )
}

export default UserIntroduction