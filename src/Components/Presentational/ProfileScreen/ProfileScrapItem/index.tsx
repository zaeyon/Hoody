import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native'

const ScrapItemContainer = Styled.View`
 flex-direction: column;
 align-items: center;
`;

const ScrapCoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const ScrapNameContainer = Styled.View`
padding-top:6px;
 width: ${wp('43.7%')};
`;

const ScrapNameText = Styled.Text`
 font-weight: 600;
 color: #333333;
 font-size: 17px;
`;

interface Props {
    navigation: any,
    coverImage: string,
    name: string
}

const ProfileScrapItem = ({coverImage, name, navigation}: Props) => {
    return (
        <ScrapItemContainer>
        <ScrapCoverImage
        source={{uri:coverImage}}
        />
        <ScrapNameContainer>
        <ScrapNameText>{name}</ScrapNameText>
        </ScrapNameContainer>
        </ScrapItemContainer>
    )
}

export default ProfileScrapItem;
