import React from 'react';
import {TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 flex-direction: row;
 align-items: center;
`;

const ProfileImageContainer = Styled.View`
 padding-top: 10px;
 padding-left: 15px;
 padding-bottom: 8px;
`;

const ProfileImage = Styled.Image`
 width: ${wp('12%')};
 height: ${wp('12%')};
 border-radius: 40px;
`;

const AlarmInfoContainer = Styled.View`
 width: ${wp('83%')}
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
    notifyId: number,
    senderProfileImage: string,
    senderNickname: string,
    message: string,
    type: string,
    sentDate: string,
    postId: string,
    senderId: string,
    openNotifyModal: (notifyId:number) => void,
}

const AlarmItem = ({navigation, notifyId, senderProfileImage, senderNickname, message, type, sentDate, postId, senderId, openNotifyModal}: Props) => {

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
      params: {requestedUserNickname: senderNickname},
      request: "Alarm",
    });
  }

  const moveToFeedComment = () => {
    navigation.navigate("FeedStack", {
        screen: "CommentListScreen",
        params: {
        postId: postId,
        request: "Alarm",
       }
    })
  }

  const moveToFeedLike = () => {
    navigation.navigate("FeedStack", {
        screen: 'LikeListScreen',
        params: {
        postId: postId,
        request: "Alarm",
       }
    })
  }

  const onLongPressNotify = () => {
      console.log("onLongPressNotify")
      openNotifyModal(notifyId);
  }
    
    return (
        <Container>
            <TouchableOpacity onPress={() => moveToSenderProfile()}>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri: senderProfileImage}}
                />
            </ProfileImageContainer>
            </TouchableOpacity>
            {type === "Comment" && (
            <TouchableOpacity onPress={() => moveToFeedComment()} onLongPress={() => onLongPressNotify()}>
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님의 게시글에 댓글을 남겼습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            </TouchableOpacity>
            )}
            {type === "Like" && (
            <TouchableOpacity onPress={() => moveToFeedLike()} onLongPress={() => onLongPressNotify()}>
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님의 게시글에 좋아요를 남겼습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            </TouchableOpacity>
            )}
            {type === "Follow" && (
            <TouchableOpacity onPress={() => moveToSenderProfile()} onLongPress={() => onLongPressNotify()}>
                <AlarmInfoContainer>
                    <NicknameText>{senderNickname}
                    <AlarmDescripText>{"님이 회원님을 팔로우 했습니다."}</AlarmDescripText>
                    </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}</AlarmDateText>
                </AlarmInfoContainer>
            </TouchableOpacity>
            )}
        </Container>
    )
}

export default AlarmItem;