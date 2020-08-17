import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native'

const ScrapFolderContainer = Styled.View`
 flex-direction: column;
 align-items: center;
`;

const ScrapFolderCoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const ScrapFolderNameContainer = Styled.View`
padding-top:6px;
 width: ${wp('43.7%')};
`;

const ScrapFolderNameText = Styled.Text`
 font-weight: 600;
 color: #333333;
 font-size: 17px;
`;

const WriterContainer = Styled.View`
margin-top: 2px;
width: ${wp('43.7%')};
`;

const ScrapFolderWriterNicknameText = Styled.Text`
 font-size: 14px;
 color: #56575C;
`;

interface Props {
    ScrapFolderId: number,
    navigation: any,
    coverImage: string,
    name: string,
    profileImage: string,
    profileNickname: string,
}

const ScrapFolderItem = ({coverImage, name, navigation, ScrapFolderId, profileImage, profileNickname}: Props) => {

    const moveToScrapFolderDetailScreen = () => {
        navigation.navigate("ScrapFolderDetailScreen", {
            ScrapFolderId: ScrapFolderId,
            profileImage: profileImage,
            profileNickname: profileNickname,
        });
    }

    return (
    <TouchableWithoutFeedback onPress={() => moveToScrapFolderDetailScreen()}>
        <ScrapFolderContainer>
        <ScrapFolderCoverImage
        source={{uri:coverImage}}
        />
        <ScrapFolderNameContainer>
        <ScrapFolderNameText>{name}</ScrapFolderNameText>
        </ScrapFolderNameContainer>
        <WriterContainer>
        <ScrapFolderWriterNicknameText>{profileNickname}</ScrapFolderWriterNicknameText>
        </WriterContainer>
        </ScrapFolderContainer>
        </TouchableWithoutFeedback>
    )
}

export default ScrapFolderItem;
