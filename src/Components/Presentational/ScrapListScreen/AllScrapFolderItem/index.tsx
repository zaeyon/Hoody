import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import allActions from '~/action';
import {useSelector, useDispatch} from 'react-redux';

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


interface Props {
    navigation: any,
    coverImage: string,
    name: string,
}

const AllScrapFolderItem = ({coverImage, name, navigation}: Props) => {
    return (
    <TouchableWithoutFeedback onPress={() => 0}>
        <ScrapFolderContainer>
        <ScrapFolderCoverImage
        source={{uri:coverImage}}
        />
        <ScrapFolderNameContainer>
        <ScrapFolderNameText>모든 스크랩</ScrapFolderNameText>
        </ScrapFolderNameContainer>
        </ScrapFolderContainer>
        </TouchableWithoutFeedback>
    )
}

export default AllScrapFolderItem;
