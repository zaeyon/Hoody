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
 padding-top: 15px;
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

const AlarmItem = ({}) => {
    return (
        <Container>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri:'https://v.miraeassetdaewoo.com/resources/img/common/personal/ico_person_default.jpg'}}
                />
            </ProfileImageContainer>
            <AlarmInfoContainer>
                <NicknameText>사용자1
                    <AlarmDescripText>
                        님이 회원님의 게시물에 댓글을 남겼습니다.
                    </AlarmDescripText>
                </NicknameText>
                <AlarmDateText>
                    3시간 전
                </AlarmDateText>
            </AlarmInfoContainer>

        </Container>
    )
}

export default AlarmItem;