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

interface Props {
    navigation: any,
    coverImage: string,
    name: string
}

const ProfileCollectionItem = ({coverImage, name, navigation}: Props) => {
    return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("CollectionDetailScreen")}>
        <CollectionContainer>
        <CollectionCoverImage
        source={{uri:coverImage}}
        />
        <CollectionNameContainer>
        <CollectionNameText>{name}</CollectionNameText>
        </CollectionNameContainer>
        </CollectionContainer>
        </TouchableWithoutFeedback>
    )
}

export default ProfileCollectionItem;
