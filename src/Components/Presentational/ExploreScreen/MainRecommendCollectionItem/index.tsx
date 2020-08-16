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

const CollectionInfoContainer = Styled.View`
padding-top:6px;
 width: ${wp('43.7%')};
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
    navigation: any,
    coverImage: string,
    name: string,
    nickname: string,
    collectionId: number,
}

const MainRecommendCollectionItem = ({collectionId, coverImage, name, nickname, navigation}: Props) => {
    console.log("메인 컬렉션 이미지", coverImage)

    const moveToCollectionDetailScreen = () => {
        navigation.navigate("CollectionStack", {
            screen: "CollectionDetailScreen",
            params: {
                collectionId: collectionId,
            }
        });
    }
    
    return (
    <TouchableWithoutFeedback onPress={() => moveToCollectionDetailScreen()}>
        <CollectionContainer>
        <CollectionCoverImage
        source={{uri:coverImage}}
        />
        <CollectionInfoContainer>
        <CollectionNameText>{name}</CollectionNameText>
        <CollectionWriterText>{nickname}</CollectionWriterText>
        </CollectionInfoContainer>
        </CollectionContainer>
        </TouchableWithoutFeedback>
    )
}

export default MainRecommendCollectionItem;
