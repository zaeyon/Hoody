import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

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

interface Props {
    profileImage: string,
    nickname: string,
    comment: string,
    createAt: string,
}

const CommentItem = ({profileImage, nickname, comment, createAt}: Props) => {
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
    <ReplyText>{"답글 달기"}</ReplyText>
            </FooterContainer>
        </Container>
    )
}

export default CommentItem;




