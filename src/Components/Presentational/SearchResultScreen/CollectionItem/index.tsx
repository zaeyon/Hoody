import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native'

const CollectionContainer = Styled.View`
 flex-direction: column;
 align-items: center;
`;

const CollectionCoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const CollectionNameContainer = Styled.View`
padding-top:6px;
 width: ${wp('43.7%')};
`;

const CollectionNameText = Styled.Text`
 font-weight: 600;
 color: #333333;
 font-size: 17px;
`;

const WriterContainer = Styled.View`
margin-top: 2px;
width: ${wp('43.7%')};
`;

const CollectionWriterNicknameText = Styled.Text`
 font-size: 14px;
 color: #56575C;
`;

interface Props {
    collectionId: number,
    navigation: any,
    coverImage: string,
    name: string,
    profileImage: string,
    profileNickname: string,
}

const CollectionItem = ({coverImage, name, navigation, collectionId, profileImage, profileNickname}: Props) => {

    const moveToCollectionDetailScreen = () => {
        navigation.navigate("CollectionStack", {
            screen: "CollectionDetailScreen",
            params: {
                collectionId: collectionId,
                profileImage: profileImage,
                profileNickname: profileNickname,
            }
        });
    }


    return (
    <TouchableWithoutFeedback onPress={() => moveToCollectionDetailScreen()}>
        <CollectionContainer>
        <CollectionCoverImage
        source={{uri:coverImage}}
        />
        <CollectionNameContainer>
        <CollectionNameText>{name}</CollectionNameText>
        </CollectionNameContainer>
        <WriterContainer>
        <CollectionWriterNicknameText>{profileNickname}</CollectionWriterNicknameText>
        </WriterContainer>
        </CollectionContainer>
        </TouchableWithoutFeedback>
    )
}

export default CollectionItem;
