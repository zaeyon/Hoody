import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${hp('9%')};
 flex-direction: row;
 flex: 1;
`;

const ProfileImageContainer = Styled.View`
 flex: 1;
 height: ${hp('9%')};
 align-items: center;
 justify-content: center;
 `;

 const ProfileImage = Styled.Image`
  width: ${wp('11%')};
  height: ${wp('11%')};
  border-radius: 100px;
 `;

const NicknameContainer = Styled.View`
flex: 5;
height: ${hp('9%')};
align-items: flex-start;
justify-content: center;
`;

const NicknameText = Styled.Text`
 font-size: 15px;
 font-weight: bold;
`;
interface Props {
    nickname: string,
    profileImage: string,
}

const LikeItem = ({nickname, profileImage}: Props) => {
    return (
        <Container>
            <ProfileImageContainer>
            <ProfileImage
            source={{uri:profileImage}}/>
            </ProfileImageContainer>
            <NicknameContainer>
            <NicknameText>{nickname}</NicknameText>    
            </NicknameContainer>
        </Container>
    )
}

export default LikeItem;