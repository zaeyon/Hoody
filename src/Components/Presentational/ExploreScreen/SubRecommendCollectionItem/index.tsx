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
 width: ${wp('28.8%')};
 height: ${wp('28.8%')};
 border-radius: 10px;
`;

const CollectionInfoContainer = Styled.View`
padding-top:6px;
 width: ${wp('28.8%')};
`;

const CollectionNameText = Styled.Text`
 font-weight: 600;
 color: #1D1E1F;
 font-size: 15px;
`;

const CollectionWriterText = Styled.Text`
 margin-top: 3px;
 font-size: 14px;
 color: #56575C;
`;

interface Props {
    collectionId: number,
    navigation: any,
    coverImage: string,
    name: string,
    nickname: string,
}

const SubRecommendCollectionItem = ({collectionId, coverImage, name, nickname, navigation}: Props) => {

    const moveToCollectionDetailScreen = () => {
        navigation.navigate("CollectionDetailScreen", {
            collectionId: collectionId,
        });
    }
    
    return (
    <TouchableWithoutFeedback onPress={() => moveToCollectionDetailScreen()}>
        <CollectionContainer>
        <CollectionCoverImage
        source={{uri:coverImage ? coverImage : ""}}
        />
        <CollectionInfoContainer>
        <CollectionNameText>{name}</CollectionNameText>
        <CollectionWriterText>{nickname}</CollectionWriterText>
        </CollectionInfoContainer>
        </CollectionContainer>
        </TouchableWithoutFeedback>
    )
}

export default SubRecommendCollectionItem;
