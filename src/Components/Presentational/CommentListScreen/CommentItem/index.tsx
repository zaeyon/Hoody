import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native';

import ReplyItem from '~/Components/Presentational/CommentListScreen/ReplyItem';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 margin-bottom: 2px;
`;

const ProfileImageContainer = Styled.View`
padding: 10px;
 align-items: center;
 justify-content: center;
`;

const NicknameContentContainer = Styled.View`
padding-top: 5px;
padding-bottom: 0px;
padding-right: 10px;
justify-content: center;
`;

const BodyContainer = Styled.View`
 flex-direction: row;
`;

const FooterContainer = Styled.View`
 position: absolute;
 bottom: -5px;
 right: 3px;
 padding-right: 10px;
 flex-direction: row;
 justify-content: flex-end;
`;

const ProfileImage = Styled.Image`
 width: ${wp('8.3%')};
 height: ${wp('8.3%')};
 border-radius: 100px;
`;

const NicknameText = Styled.Text`
 font-size: 13px;
 font-weight: bold;
`;

const CommentText = Styled.Text`
 margin-top: 3px;
 font-size: 13px;
`;

const CreateAtText = Styled.Text`
 font-size: 12px;
 color: #9b9b9b;
 margin-right: 10px;
`;

const ReplyText = Styled.Text`
 font-size: 12px;
 color: #9b9b9b;
`;

const ReplyContainer = Styled.View`
`;



interface Props {
    commentId: number,
    profileImage: string,
    nickname: string,
    comment: string,
    createAt: string,
    replys: Array<Object>,
    setTarget: (target:string) => void,
}

const CommentItem = ({profileImage, nickname, comment, createAt, replys, setTarget, commentId}: Props) => {

    function getDateFormat(date) {
        var year = date.getFullYear();
        var month = (1+ date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '/' + month + '/' + day;
    }

    const renderReplyItem = ({item, index}) => {
    var date = new Date(item.createdAt);
    date = getDateFormat(date);   
    
    return (
        <ReplyItem
        profileImage={item.user.profileImg}
        nickname={item.user.nickname}
        comment={item.description}
        createAt={date.toString()}/>
    )
    }

    return (
        <Container>
            <BodyContainer>
                <ProfileImageContainer>
                <ProfileImage
                 source={{uri:profileImage}}/>
                 </ProfileImageContainer>
                <NicknameContentContainer>
    <NicknameText>{nickname}</NicknameText>   
    <CommentText>{comment}</CommentText>
                </NicknameContentContainer>
            </BodyContainer>
            <FooterContainer>
    <CreateAtText>{createAt}</CreateAtText>
    <TouchableWithoutFeedback onPress={() => setTarget(nickname, commentId)}>
    <ReplyText>{"답글 달기"}</ReplyText>
    </TouchableWithoutFeedback>
            </FooterContainer>
        </Container>
    )
}

export default CommentItem;




