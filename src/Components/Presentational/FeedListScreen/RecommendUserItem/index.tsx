import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, StyleSheet, FlatList} from 'react-native';

import {POSTFollowUser, DELETEUnfollowUser} from '~/Route/User/Follow';

const Container = Styled.View`
 width: ${wp('69%')};
 height: ${wp('95.5%')};
 background-color: #ffffff;
 border-radius: 20px;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const UserProfileInfo = Styled.View`
flex-direction: column;
align-items: center;
`;

const UserProfileImage = Styled.Image`
width: ${wp('25.6%')};
height: ${wp('25.6%')};
border-radius: 100px;
background-color: #ECECEE;
`;

const UserNicknameText = Styled.Text`
margin-top: 17px;
font-weight: bold;
font-size: 20px;
color: #1D1E1F;
`;

const RemoveIcon = Styled.Image`
width: ${wp('4%')};
height: ${wp('4%')};
position: absolute;
top: 18;
right: 18;
`;

const UserDescripText = Styled.Text`
margin-top: 4px;
font-size: 16px;
color: #56575C;
`;

const UserFeedListContainer = Styled.View`
margin-top: 28px;
flex-direction: row;
background-color: #ffffff;
`;

const FeedThumbnailImage = Styled.Image`
background-color: #ECECEE;
 width: ${wp('21%')};
 height: ${wp('21%')};
`;

const FollowButton = Styled.View`
margin-top: 18px;
width: ${wp('24%')};
height: ${wp('8.5%')};
border-radius: 8px;
background-color: #267DFF;
align-items: center;
justify-content: center;
`;

const FollowText = Styled.Text`
font-weight: 500;
font-size: 15px;
color: #FFFFFF;
`;

const FollowingButton = Styled.View`
margin-top: 18px;
width: ${wp('24%')};
height: ${wp('8.5%')};
border-radius: 8px;
background-color: #ffffff;
border-width: 1px;
border-color: #267DFF;
align-items: center;
justify-content: center;

`;

const FollowingText = Styled.Text`
font-weight: 500;
font-size: 15px;
color: #267DFF;
`;

interface Props {
    userId: string,
    profileImage: string,
    nickname: string,
    description: string,
    thumbnailList: Array<any>,
    postList: Array<any>,
    followed: boolean, 
}



const RecommendUserItem = ({userId, profileImage, nickname, description, postList, followed}: Props) => {
    const [userFollowed, setUserFollowed] = useState<boolean>(followed);
    console.log("RecommendUserItem postList", postList[1].mediaFiles)

    const followUser = () => {
        setUserFollowed(true);
        POSTFollowUser(userId)
        .then(function(response) {
            console.log("팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("팔로우 실패", error);
        })
    }

    const unFollowUser = () => {
        setUserFollowed(false);
        DELETEUnfollowUser(userId)
        .then(function(response) {
            console.log("언팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("언팔로우 실패", error);
        })
    }

    return (
        <Container style={styles.iosShadow}>
            <UserProfileInfo>
                <UserProfileImage
                source={{uri:profileImage}}/>
                <UserNicknameText>{nickname}</UserNicknameText>
                <UserDescripText>{description ? description : ""}</UserDescripText>
                <UserFeedListContainer>
                {postList[0] && (
                <FeedThumbnailImage
                source={{uri:postList[0].mediaFiles[0] ? postList[0].mediaFiles[0].thumbnailImg : ""}}/>
                )}
                {postList[1] && (
                <FeedThumbnailImage
                style={{marginLeft:3}}
                source={{uri:postList[1].mediaFiles[0] ? postList[1].mediaFiles[0].thumbnailImg : ""}}/>
                )}
                {postList[2] && (
                <FeedThumbnailImage
                style={{marginLeft:3}}
                source={{uri:postList[2].mediaFiles[0] ? postList[2].mediaFiles[0].thumbnailImg : ""}}/>
                )}
                </UserFeedListContainer>
            </UserProfileInfo>
            {userFollowed && (
            <TouchableWithoutFeedback onPress={() => unFollowUser()}>
            <FollowingButton>
                <FollowingText>팔로잉</FollowingText>
            </FollowingButton>
            </TouchableWithoutFeedback>
            )}
            {!userFollowed && (
            <TouchableWithoutFeedback onPress={() => followUser()}>
            <FollowButton>
                <FollowText>팔로우</FollowText>
            </FollowButton>
            </TouchableWithoutFeedback>
            )}
            <RemoveIcon
                source={require('~/Assets/Images/ic_recordRemove.png')}/>
        </Container>
    )
}

const styles = StyleSheet.create({

    iosShadow : {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 7,
      }
})

export default RecommendUserItem;
