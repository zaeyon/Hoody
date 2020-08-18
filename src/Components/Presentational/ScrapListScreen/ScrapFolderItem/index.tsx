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

const ScrapFolderCoverContainer = Styled.View`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const OneFeedScrapCoverContainer = Styled.View`
`;

const TwoFeedScrapCoverContainer = Styled.View`
 flex-direction: row;
`;

const ThreeFeedScrapCoverContainer = Styled.View`
 flex-direction: column;
`;

const ThreeFeedScrapCoverTopContainer = Styled.View`
 flex-direction: row;
`;

const ManyFeedScrapCoverContainer = Styled.View`
 flex-direction: column;
`;

const ManyFeedScrapCoverTopContainer = Styled.View`
 flex-direction: row;
`;

const ManyFeedScrapCoverBottomContainer = Styled.View`
 flex-direction: row;
`;

const TowFeedScrapLeftCoverImage = Styled.Image`
 width: ${wp('21.6%')};
 height: ${wp('43.7%')};
 border-top-left-radius: 10px;
 border-bottom-left-radius: 10px;
`;

const TowFeedScrapRightCoverImage = Styled.Image`
margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('43.7%')};
 border-top-right-radius: 10px;
 border-bottom-right-radius: 10px;
`;


const TowFeedScrapLeftEmptyImage = Styled.View`
 width: ${wp('21.6%')};
 height: ${wp('43.7%')};
background-color: #EFEFEF;
 border-top-left-radius: 10px;
 border-bottom-left-radius: 10px;
`;

const TowFeedScrapRightEmptyImage = Styled.View`
 margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('43.7%')};
background-color: #EFEFEF;
 border-top-right-radius: 10px;
 border-bottom-right-radius: 10px;
`;


const ThreeFeedScrapFirstCoverImage = Styled.Image`
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-left-radius: 10px;
`;

const ThreeFeedScrapFirstEmptyImage = Styled.View`
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-left-radius: 10px;
background-color: #EFEFEF;
`;

const ThreeFeedScrapSecondCoverImage = Styled.Image`
margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-right-radius: 10px;
`;

const ThreeFeedScrapSecondEmptyImage = Styled.View`

margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-right-radius: 10px;
 background-color: #EFEFEF;
`;

const ThreeFeedScrapThirdCoverImage = Styled.Image`
 margin-top: 2px;
 width: ${wp('43.7%')};
 height: ${wp('21.6%')};
 border-bottom-right-radius: 10px;
 border-bottom-left-radius: 10px;
`;

const ThreeFeedScrapThirdEmptyImage = Styled.View`
margin-top: 2px;
 width: ${wp('43.7%')};
 height: ${wp('21.6%')};
 border-bottom-right-radius: 10px;
 border-bottom-left-radius: 10px;
 background-color: #EFEFEF;
`;


const ManyFeedScrapFirstCoverImage = Styled.Image`
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-left-radius: 10px;
`;

const ManyFeedScrapFirstEmptyImage = Styled.View`
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-left-radius: 10px;
background-color: #EFEFEF;
`;

const ManyFeedScrapSecondCoverImage = Styled.Image`
 margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-right-radius: 10px;
`;

const ManyFeedScrapSecondEmptyImage = Styled.View`
margin-left: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-top-right-radius: 10px;
background-color: #EFEFEF;
`;

const ManyFeedScrapThirdCoverImage = Styled.Image`
 margin-top: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-bottom-left-radius: 10px;
`;

const ManyFeedScrapThirdEmptyImage = Styled.View`
margin-top: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-bottom-left-radius: 10px;
background-color: #EFEFEF;
`;

const ManyFeedScrapFourthCoverImage = Styled.Image`
margin-left: 2px;
margin-top: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-bottom-right-radius: 10px;
`;

const ManyFeedScrapFourthEmptyImage = Styled.View`
margin-left: 2px;
margin-top: 2px;
 width: ${wp('21.6%')};
 height: ${wp('21.6%')};
 border-bottom-right-radius: 10px;
background-color: #EFEFEF;
`;

const ScrapFolderCoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const NoScrapFolderCoverImage = Styled.View`
width: ${wp('43.7%')};
height: ${wp('43.7%')};
background-color: #EFEFEF;
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
    folderId: number,
    folderName: string,
    defaultFolder: boolean,
    defaultFolderId: number,
    navigation: any,
    feedImages: Array<object>,
    name: string,
}

const ScrapFolderItem = ({folderId, folderName, defaultFolder, defaultFolderId, feedImages, name, navigation}: Props) => {
    
    console.log("feedImages", feedImages);

    const moveToScrapFolderFeedList = () => {
        navigation.navigate("ScrapFolderFeedListScreen", {
            folderId: folderId,
            folderName: defaultFolder ? "모든 스크랩" : folderName, 
            defaultFolder: defaultFolder,
            defaultFolderId: defaultFolderId,
        });
    }

    return (
    <TouchableWithoutFeedback onPress={() => moveToScrapFolderFeedList()}>
        <ScrapFolderContainer>
        <ScrapFolderCoverContainer>
        {feedImages.length == 1 && (
        <OneFeedScrapCoverContainer>
            {feedImages[0].mediaFiles[0] && (
                <ScrapFolderCoverImage
                source={{uri:feedImages[0].mediaFiles[0].url}}/>
            )}
            {!feedImages[0].mediaFiles[0] && (
                <NoScrapFolderCoverImage/>
            )}
        </OneFeedScrapCoverContainer>
        )}
        {feedImages.length == 2 && (
        <TwoFeedScrapCoverContainer>
            {feedImages[0].mediaFiles[0] && (
               <TowFeedScrapLeftCoverImage
               source={{uri:feedImages[0].mediaFiles[0].url}}/>   
            )}
            {!feedImages[0].mediaFiles[0] && (
                <TowFeedScrapLeftEmptyImage/>
            )}
            {feedImages[1].mediaFiles[0] && (
               <TowFeedScrapRightCoverImage
               source={{uri:feedImages[1].mediaFiles[0].url}}/>   
            )}
            {!feedImages[1].mediaFiles[0] && (
                <TowFeedScrapRightEmptyImage/>
            )}
        </TwoFeedScrapCoverContainer>
        )}
        {feedImages.length == 3 && (
        <ThreeFeedScrapCoverContainer>
            <ThreeFeedScrapCoverTopContainer>
            {feedImages[0].mediaFiles[0] && (
               <ThreeFeedScrapFirstCoverImage
               source={{uri:feedImages[0].mediaFiles[0].url}}/>   
            )}
            {!feedImages[0].mediaFiles[0] && (
                <ThreeFeedScrapFirstEmptyImage/>
            )}
            {feedImages[1].mediaFiles[0] && (
               <ThreeFeedScrapSecondCoverImage
               source={{uri:feedImages[1].mediaFiles[0].url}}/>   
            )}
            {!feedImages[1].mediaFiles[0] && (
                <ThreeFeedScrapSecondEmptyImage/>
            )}
            </ThreeFeedScrapCoverTopContainer>
            {feedImages[2].mediaFiles[0] && (
                <ThreeFeedScrapThirdCoverImage
                source={{uri:feedImages[2].mediaFiles[0].url}}/>
            )}
            {!feedImages[2].mediaFiles[0] && (
                <ThreeFeedScrapThirdEmptyImage/>
            )}
        </ThreeFeedScrapCoverContainer>
        )}
        {feedImages.length > 3 && (
        <ManyFeedScrapCoverContainer>
            <ManyFeedScrapCoverTopContainer>
            {feedImages[0].mediaFiles[0] && (
               <ManyFeedScrapFirstCoverImage
               source={{uri:feedImages[0].mediaFiles[0].url}}/>   
            )}
            {!feedImages[0].mediaFiles[0] && (
                <ManyFeedScrapFirstEmptyImage/>
            )}
            {feedImages[1].mediaFiles[0] && (
               <ManyFeedScrapSecondCoverImage
               source={{uri:feedImages[1].mediaFiles[0].url}}/>   
            )}
            {!feedImages[1].mediaFiles[0] && (
                <ManyFeedScrapSecondEmptyImage/>
            )}
            </ManyFeedScrapCoverTopContainer>
            <ManyFeedScrapCoverBottomContainer>
            {feedImages[2].mediaFiles[0] && (
                <ManyFeedScrapThirdCoverImage
                source={{uri:feedImages[2].mediaFiles[0].url}}/>
            )}
            {!feedImages[2].mediaFiles[0] && (
                <ManyFeedScrapThirdEmptyImage/>
            )}
            {feedImages[3].mediaFiles[0] && (
                <ManyFeedScrapFourthCoverImage
                source={{uri:feedImages[3].mediaFiles[0].url}}/>
            )}
            {!feedImages[3].mediaFiles[0] && (
                <ManyFeedScrapFourthEmptyImage/>
            )}
            </ManyFeedScrapCoverBottomContainer>
        </ManyFeedScrapCoverContainer>
        )}
        <ScrapFolderCoverImage
        source={{uri:"coverImage"}}/>
        </ScrapFolderCoverContainer>
        <ScrapFolderNameContainer>
        <ScrapFolderNameText>{defaultFolder ? "모든 스크랩" : folderName }</ScrapFolderNameText>
        </ScrapFolderNameContainer>
        </ScrapFolderContainer>
        </TouchableWithoutFeedback>
    )
}

export default ScrapFolderItem;
