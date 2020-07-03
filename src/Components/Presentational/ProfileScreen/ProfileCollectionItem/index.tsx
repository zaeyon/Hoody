import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CollectionContainer = Styled.View`
 flex: 1;
 flex-direction: column;
`;

const CollectionCoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const CollectionNameText = Styled.Text`
 font-weight: 600;
 color: #333333;
 font-size: 15px;
`;

interface Props {
    navigation: any,
    coverImage: string,
    name: string
}

const ProfileCollectionItem = ({coverImage, name}: Props) => {
    return (
        <CollectionContainer>
        <CollectionCoverImage
        source={{uri:coverImage}}
        />
        <CollectionNameText>{name}</CollectionNameText>
        </CollectionContainer>
    )
}

export default ProfileCollectionItem;
