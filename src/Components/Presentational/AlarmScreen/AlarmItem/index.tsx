import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 flex-direction: row;
 flex: 1;
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
 font-weight: 600;
 font-size: 16px;
 color: #333333;
`;

const AlarmDescripText = Styled.Text`
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
    senderProfileImage: string,
    senderNickname: string,
    message: string,
    type: string,
    sentDate: string,
}

const AlarmItem = ({senderProfileImage, senderNickname, message, type, sentDate}: Props) => {

    const formatSentDate = (date: any) => {
        var tmpDate = new Date(date),
        month = '' + (tmpDate.getMonth() + 1),
        day = '' + tmpDate.getDate(),
        year = tmpDate.getFullYear();

        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;

        return year + "년 " + month + "월 " + day + "일";
    }
    
    return (
        <Container>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri: senderProfileImage}}
                />
            </ProfileImageContainer>
            <AlarmInfoContainer>
                <NicknameText>{senderNickname}
                        {type === "Comment" && (
                            <AlarmDescripText>
                            님이 회원님의 게시물에 댓글을 남겼습니다.
                            </AlarmDescripText>
                        )}
                        {type === "Like" && (
                            <AlarmDescripText>
                            님이 회원님의 게시물에 좋아요를 남겼습니다.
                            </AlarmDescripText>
                        )}
                </NicknameText>
                <AlarmDateText>{formatSentDate(sentDate)}                </AlarmDateText>
            </AlarmInfoContainer>

        </Container>
    )
}

export default AlarmItem;