import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {POSTFollowUser, DELETEUnfollowUser} from '~/Route/User/Follow';

const FollowItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('22%')};
 background-color: #ffffff;
 flex-direction: row;
 border-bottom-width: 0.6px;
 border-color: #eeeeee;
 align-items: center;
`;

const ProfileImageContainer = Styled.View`
padding-left: 16px;
justify-content: center;
`;

const UserProfileContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const ProfileImage = Styled.Image`
 border-radius: 100px;
 width: ${wp('13.3%')};
 height: ${wp('13.3%')};
 border-width: 0.5px;
 border-color: #f4f4f7;
`;

const IntroductionContainer = Styled.View`
padding-left: 10px;
padding-right: 10px;
`;

const IntroTopContainer = Styled.View`
padding-left: 10px;
padding-right: 16px;
flex-direction: row;
background-color: #ffffff;
justify-content: space-between;
align-items: center;
`;

const NicknameText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #1D1E1F;
 `;

const FeedCountText = Styled.Text`
 margin-top: 3px;
 font-size: 14px;
 color: #cccccc;
`;

const NicknameInfoContainer = Styled.View`
flex-direction: column;
width: ${wp('56%')};
background-color: #ffffff;
`;

const FollowButtonContainer = Styled.View`
`;

const FollowButton = Styled.View`
 width: ${wp('17%')};
 height: ${wp('8.5%')};
 background-color: #267DFF;
 border-radius: 8px;
 border-width: 1px;
 border-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const FollowText = Styled.Text`
 font-size: 14px;
 color: #ffffff;
 font-weight: 500;
`;

const FollowingButton = Styled.View`
 width: ${wp('17%')};
 height: ${wp('8.5%')};
 background-color: #ffffff;
 border-radius: 8px;
 border-width: 1px;
 border-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const FollowingText = Styled.Text`
font-size: 14px;
 color: #267DFF;
 font-weight: 500;
`;

const DescripContainer = Styled.View`
`;

const DescripText = Styled.Text`
 font-size: 14px;
 color: #50555C;
`;

interface Props {
    navigation: any,
    userId: string,
    profileImageUri: string,
    nickname: string,
    feedCount: number,
    description: string,
    followState: boolean,
}

const FollowItem = ({navigation,userId, profileImageUri, nickname, feedCount, description, followState}: Props) => {
    console.log("feedCount", feedCount);
    const [currentUserFollow, setCurrentUserFollow] = useState<boolean>(followState);
    const currentUser = useSelector((state: any) => state.currentUser);

    const moveToUserProfile = () => {
        if(currentUser.user?.nickname === nickname) {
            navigation.navigate("Profile")
        } else {
            navigation.navigate("AnotherUserProfileStack", {
              screen: "AnotherUserProfileScreen",
              params: {requestedUserNickname: nickname}
            });
        }
    }


    const followUser = () => {
        setCurrentUserFollow(true);
        POSTFollowUser(userId)
        .then(function(response) {
            console.log("팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("팔로우 실패", error);
        })
    }

    const unfollowUser = () => {
        setCurrentUserFollow(false);
        DELETEUnfollowUser(userId)
        .then(function(response) {
            console.log("언팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("언팔로우 실패", error);
        })
    }

    

    return (
        <FollowItemContainer>
            <TouchableWithoutFeedback  onPress={() => moveToUserProfile()}>
            <UserProfileContainer>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri:profileImageUri}}/>
            </ProfileImageContainer>
            <IntroductionContainer>
                <NicknameInfoContainer>
                <NicknameText>{nickname}</NicknameText>
                {/*
                <FeedCountText>{feedCount ? "게시물 "+feedCount+"개" : ""}</FeedCountText>
                */}
                <DescripContainer>
                    <DescripText>{description}</DescripText>
                </DescripContainer>
                </NicknameInfoContainer>
                </IntroductionContainer>
                </UserProfileContainer>
                </TouchableWithoutFeedback>
                <FollowButtonContainer>
                    {currentUserFollow === false && (
                        <TouchableWithoutFeedback onPress={() => followUser()}>
                        <FollowButton>
                            <FollowText>팔로우</FollowText>
                        </FollowButton>
                        </TouchableWithoutFeedback>
                    )}
                    {currentUserFollow === true && (
                        <TouchableWithoutFeedback onPress={() => unfollowUser()}>
                        <FollowingButton>
                            <FollowingText>팔로잉</FollowingText>
                        </FollowingButton>
                        </TouchableWithoutFeedback>
                    )}
                </FollowButtonContainer>
        </FollowItemContainer>
    )
}

export default FollowItem;

