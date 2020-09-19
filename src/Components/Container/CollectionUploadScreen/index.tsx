import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Switch, Keyboard, KeyboardAvoidingView, StyleSheet, Platform, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #f3f3f3;
 align-items: center;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#FAFAFA;
 border-bottom-width: 1px;
 border-color: #F1F1F1;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButtonContainer = Styled.View`
padding: 12.5px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #333333;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const DisabledHeaderNextText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const AbledHeaderNextText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #3384FF;
`;

const CoverContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 justify-content: center;
 align-items: center;
`;

const CoverImageContainer = Styled.View`
 margin-top: 20px;
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 background-color: #EFEFEF;
 border-radius: 10px;
 justify-content: center;
 align-items: center;
`;

const CoverImage = Styled.Image`
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 border-radius: 10px;
`;

const EmptyCoverIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const SelectCoverContainer = Styled.View`
 padding-top: 12px;
 padding-bottom: 15px;
 background-color: #ffffff;
`;

const SelectCoverText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #3384FF;
`;

const TitleInputContainer = Styled.View`
 width: ${wp('100%')}
 padding: 16px 16px 20px 16px;
 border-bottom-width: 0.6px;
 border-color: #f1f1f1;
 background-color: #ffffff;
`;

const TitleText = Styled.Text`
 font-size: 17px;
 color: #333333;
 font-weight: 600;
`;

const TitleInput = Styled.TextInput`
 margin-top: 9px;
 font-size: 17px;
`;

const DescripInputContainer = Styled.View`
 background-color: #ffffff;
 width: ${wp('100%')};
 padding: 16px 16px 23px 16px;
`;

const DescripText = Styled.Text`
font-size: 17px;
color: #333333;
font-weight: 600;
`;

const DescripInput = Styled.TextInput`
 margin-top: 9px;
 height: 130px;
 font-size: 17px;
 padding-bottom: 10px;
`;

const PrivateSettingContainer = Styled.View`
 margin-top: 10px;
 width: ${wp('100%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding: 17px 16px 17px 16px;
 background-color: #ffffff;
 border-bottom-width: 0.6px;
 border-color: #eeeeee;
`;

const PrivateSettingText = Styled.Text`
 font-size: 17px;
 color: #333333;
`;

const IncludeLocationContainer = Styled.View`
width: ${wp('100%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 17px 16px 17px 16px;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #eeeeee;
`;

const IncludeLocationText = Styled.Text`
font-size: 16px;
color: #333333;
`;

interface Props {
    navigation: any,
    route: any,
}

const CollectionUploadScreen = ({navigation, route}: Props) => {
    const [enabledPrivate, setEnabledPrivate] = useState<boolean>(false);
    const [enabledIncludeLocation, setEnabledIncludeLocation] = useState<boolean>(false);
    const [collectionTitleText, setCollectionTitleText] = useState<string>("");
    const [collectionDescripText, setCollectionDescripText] = useState<string>("");
    const [collectionCoverImage, setCollectionCoverImage] = useState<object>();

    useEffect(() => {
        if(route.params?.selectedCoverImage) {
            setCollectionCoverImage(route.params.selectedCoverImage);
        }
    }, [route.params?.selectedCoverImage])

    const togglePrivate = () => {
        setEnabledPrivate(!enabledPrivate);
    }

    const toggleIncludeLocation = () => {
        setEnabledIncludeLocation(!enabledIncludeLocation);
    }

    const onChangeTitle = (text: string) => {
        setCollectionTitleText(text);
    }

    const onChangeDescrip = (text: string) => {
        setCollectionDescripText(text);
    }

    const moveToAddFeedScreen = () => {
        navigation.navigate("AddCollectionFeedScreen", {
            coverImage: collectionCoverImage,
            title: collectionTitleText,
            description: collectionDescripText,
            private: enabledPrivate,
            includeLocation: enabledIncludeLocation,
            triggerType: "collectionUpload"
        })
    }

    const moveToGallery = () => {
        navigation.navigate("Gallery_JustOne", {
            requestType: "collectionUpload"
        })
    }
    
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                <HeaderCancelText>취소</HeaderCancelText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>새 컬렉션</HeaderTitleText>
                {collectionTitleText !== "" && collectionDescripText !== "" && collectionCoverImage && (
                <TouchableWithoutFeedback onPress={() => moveToAddFeedScreen()}>
                    <HeaderRightContainer>
                       <AbledHeaderNextText>다음</AbledHeaderNextText>
                    </HeaderRightContainer>
                </TouchableWithoutFeedback>
                )}
                {(collectionTitleText === "" || collectionDescripText === "" || !collectionCoverImage) && (
                    <HeaderRightContainer>
                    <DisabledHeaderNextText>다음</DisabledHeaderNextText>
                    </HeaderRightContainer>
                )}
            </HeaderBar>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}>
            <View>
            <CoverContainer>
            <TouchableWithoutFeedback onPress={() => moveToGallery()}>
            <CoverImageContainer>
                {collectionCoverImage && (
                    <CoverImage
                    source={{uri:collectionCoverImage.uri}}/>
                )}
                {!collectionCoverImage && (
            <EmptyCoverIcon
            source={require('~/Assets/Images/ic_emptyImage.png')}/>
                )}
            </CoverImageContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => moveToGallery()}>
            <SelectCoverContainer>
                <SelectCoverText>커버 설정</SelectCoverText>
            </SelectCoverContainer>
            </TouchableWithoutFeedback>
            </CoverContainer>
            <TitleInputContainer>
                <TitleText>이름</TitleText>
                <TitleInput
                autoCapitalize={"none"}
                placeholder={"컬렉션 이름을 적어주세요."}
                autoFocus={false}
                value={collectionTitleText}
                onChangeText={(text:string) => onChangeTitle(text)}
                />
            </TitleInputContainer>
            <DescripInputContainer>
                <DescripText>소개</DescripText>
                <DescripInput
                autoCapitalize={"none"}
                multiline={true}
                placeholder={"컬렉션에 대한 설명을 적어주세요."}
                autoFocus={false}
                onChangeText={(text:string) => onChangeDescrip(text)}
                />
            </DescripInputContainer>
            <PrivateSettingContainer>
                <PrivateSettingText>비공개 컬렉션</PrivateSettingText>
                <Switch
                value={enabledPrivate}
                onValueChange={togglePrivate}
                />
            </PrivateSettingContainer>
            <IncludeLocationContainer>
                <IncludeLocationText>위치 정보 포함</IncludeLocationText>
                <Switch
                value={enabledIncludeLocation}
                onValueChange={toggleIncludeLocation}/>
            </IncludeLocationContainer>
            </View>
            </KeyboardAwareScrollView>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default CollectionUploadScreen;