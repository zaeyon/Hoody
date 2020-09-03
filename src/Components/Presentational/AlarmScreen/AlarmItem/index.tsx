import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 flex-direction: row;
`;

const ProfileImageContainer = Styled.View`
 padding-top: 23px;
 padding-left: 15px;
 padding-bottom: 8px;
`;

const ProfileImage = Styled.Image`
 width: ${wp('12%')};
 height: ${wp('12%')};
 border-radius: 40px;
`;

const AlarmInfoContainer = Styled.View`
 padding-left: 15px;
 padding-top: 18px;
 padding-bottom: 15px;
 padding-right: 15px;

 flex-shrink: 1;
`;

const NicknameText = Styled.Text`
 font-weight: bold;
 font-size: 16px;
 color: #333333;
`;

const AlarmDescripText = Styled.Text`
font-weight: 500;
 font-size: 16px;
 color: #333333;
 flex-shrink: 1;
`;

const AlarmDateText = Styled.Text`
 margin-top: 3px;
 font-size: 15px;
 color: #8e8e8e;
`;

interface Props {
    navigation: any,
    senderProfileImage: string,
    senderNickname: string,
    message: string,
    type: string,
    sentDate: string,
    postId: string,
    senderId: string,
}

const AlarmItem = ({navigation, senderProfileImage, senderNickname, message, type, sentDate, postId, senderId}: Props) => {

    const formatSentDate = (date: any) => {
        var tmpDate = new Date(date),
        month = '' + (tmpDate.getMonth() + 1),
        day = '' + tmpDate.getDate(),
        year = tmpDate.getFullYear();

        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;

        return year + "년 " + month + "월 " + day + "일";
    }


  const moveToSenderProfile = () => {
    navigation.navigate("AnotherUserProfileStack", {
      screen: 'AnotherUserProfileScreen',
      params: {requestedUserNickname: senderNickname}
    });
  }

  const moveToFeedComment = () => {
    navigation.navigate("FeedStack", {
        screen: "CommentListScreen",
        params: {
        feedId: postId,
        request: "Alarm",
       }
    })
  }

  const moveToFeedLike = () => {
    navigation.navigate("FeedStack", {
        screen: 'LikeListScreen',
        params: {
        feedId: postId,
        request: "Alarm",
       }
    })
  }
    
    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => moveToSenderProfile()}>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri: senderProfileImage}}
                />
            </ProfileImageContainer>
            </TouchableWithoutFeedback>
            {type === "Comment" && (
            <TouchableWithoutFeedback onPress={() => moveToFeedComment()}>
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님의 게시글에 댓글을 남겼습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            </TouchableWithoutFeedback>
            )}
            {type === "Like" && (
            <TouchableWithoutFeedback onPress={() => moveToFeedLike()}>
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님의 게시글에 좋아요를 남겼습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            </TouchableWithoutFeedback>
            )}
            {type === "Follow" && (
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님을 팔로우 했습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            )}
        </Container>
    )
}

export default AlarmItem;