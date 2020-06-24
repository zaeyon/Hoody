import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, ScrollView, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import SlidingUpPanel from '~/Components/Presentational/UploadScreen/TagSearchSlidingUp';

import LatelySearchItem from '~/Components/Presentational/TagSearch/LatelySearchItem';

import GetAutoComplete from '~/Route/Search/GetAutoComplete';


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderTagPlaceholderContainer = Styled.View`
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 flex-direction: row;
 background-color: #ffffff;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 20px 20px 15px 20px;
 align-items: center;
 justify-content: center;
`;

const CancleText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const HeaderRightContainer = Styled.View`
padding: 20px 20px 15px 20px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const TempoSaveText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const FinishContainer = Styled.View`
 margin-left: 15px;
 border-radius: 20px;
 background-color: #3384ff;
 padding: 9px 17px 9px 17px;
`;

const FinishText = Styled.Text`
 font-size: 17px
 font-weight: 600;
 color: #ffffff;
`;

const BodyContainer = Styled.View`
 padding: 0px 15px 10px 15px;
 width: ${wp('100%')};
 background-color:#ffffff;
`;

const TagInputPlaceholder = Styled.Text`
 font-weight: bold;
 font-size: 24px;
 color: #3384FF;
`;


const MainTagText = Styled.Text`
 font-weight: bold;
 font-size: 24px;
 color: #3384FF;
`;

const SlidingUpContainer = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const SlidingUpHeaderContainer = Styled.View`
 width: ${wp('100%')};
 padding-top: 8px;
 padding-bottom: 8px;
 align-items: center;
`;

const SlidingUpContentContainer = Styled.View`
flex:1;
background-color: #ffffff;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
align-items: center;
`;

const SlidingUpIcon = Styled.View`
 background-color: #c4c4c4;
 width: ${wp('13%')};
 height: 5px;
 border-radius: 5px;
`;

const PanelTagInputContainer = Styled.View`
 margin-top: 3px;
 width:${wp('100%')};
 height: 58px;
 background-color: #ffffff;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const HashText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #3384FF;
`;

const TagInput = Styled.TextInput`
 margin-left: 10px;
 width: ${wp('85%')};
 height: 36px;
 background-color: #F3F3F3;
 border-radius: 40px;
 padding-left: 15px;
 font-size: 17px;
`;

const TagAutoCompleteContainer = Styled.View`
 width: ${wp('100%')};
`;

const TAG_AUTO_COMPLETE_DATA = [
    {
        name:'리뷰테스트',
        count: '3'
    },
    {
        name:'리뷰테스트2',
        count: '333'
    }
]

const TagItemContainer = Styled.View`
 width: ${wp('100%')};
 height: 50px;
 flex-direction: row;
`;

const TagNameText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #333333;
`;

const TagReviewCount = Styled.Text`
 font-size: 15px;
 color: #b9b9b9;
`;

const TagContainer = Styled.View`
padding: 10px 20px 10px 20px;
`;





const NewUploadScreen = () => {
    const [slidingUpHeight, setSlidingUpHeight] = useState(0);
    const [onFocusTagInput, setOnFocusTagInput] = useState(true);
    const [hideSlidingUp, setHideSlidingUp] = useState<boolean>(false);
    const [selectTagBool, setSelectTagBool] = useState<boolean>(false);
    const [mainTag, setMainTag] = useState<string>();
    const [selectingTagType, setSelectingTagType] = useState<string>("main");
    const [selectTagName, setSelectTagName] = useState<string>("");
    
    const hideSlidingUpPanel = () => {
        console.log("슬라이딩 패널 상단바 터치")
        setHideSlidingUp(true)
    }

    const slidingUpPanelShadow = {
        width: wp('100%'),
        height: hp('0.7%'),
        color: '#000000',
        border: 15,
        radius: 0,
        opacity: 0.03,
        x:0,
        y:7,
        style: {marginVertical: 0},
    };

    const changeTagInput = (query) => {
        GetAutoComplete(query, "tag")
        .then(function(response) {
            console.log("태그 자동완성", response.result[0])
            setFirstTagResult(response.result[0]);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
    }

    const selectTagAutoComplete = (item) => {
        setSelectTagBool(true)
        setSelectTagName(item.name)
     }

    const selectTag = (type:string, name:string) => {
        console.log("선택된 태그 타입", type);
        console.log("선택된 태그 이름", name);
        setSelectingTagType(type);
        if(type === "main") {
            setMainTag(name);
        }
    }

const TagAutoCompleteItem = ({item, index}) => {
    return (
    <TouchableWithoutFeedback onPress={() => selectTagAutoComplete(item)}>
    <Container>
        <TagContainer>
        <TagNameText>{"#" + item.name}</TagNameText>
        <TagReviewCount>{item.count + "개"}</TagReviewCount>
        </TagContainer>
    </Container>
    </TouchableWithoutFeedback>
    )
}


    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <CancleText>취소</CancleText>
                </HeaderLeftContainer>
                <HeaderRightContainer>
                    <TempoSaveText>임시저장</TempoSaveText>
                    <FinishContainer>
                        <FinishText>완료</FinishText>
                    </FinishContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <ScrollView style={{backgroundColor: "#ffffff", height: hp('100%')}}>
            <BodyContainer>
                {mainTag && (
                    <MainTagText>{"#"+mainTag}</MainTagText>
                )}
                {!mainTag && (
                    <TagInputPlaceholder
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    console.log("layout.height", layout.height);
                    setSlidingUpHeight(hp('100%') - (layout.height+52));
                }}>
                    {"#태그를 입력해주세요."}
                </TagInputPlaceholder>
                )}
            </BodyContainer>
            </ScrollView>
            <SlidingUpContainer>
            <SlidingUpPanel
            visibleHeightVar={slidingUpHeight}
            allowDragging={true}
            hideSliding={hideSlidingUp}
            selectTag={selectTag}
            selectingTagType={selectingTagType}
            selectTagBool={selectTagBool}
            selectTagName={selectTagName}
            >
                <BoxShadow setting={slidingUpPanelShadow}/>
                <SlidingUpContentContainer>
                    <TouchableWithoutFeedback onPress={() => hideSlidingUpPanel()}>
                    <SlidingUpHeaderContainer>
                    <SlidingUpIcon/>
                    </SlidingUpHeaderContainer>
                    </TouchableWithoutFeedback>
                    <PanelTagInputContainer>
                        <HashText>#</HashText>
                        <TagInput
                        placeholder={"태그를 입력해주세요."}
                        autoFocus={true}
                        onChangeText={(text:string) => changeTagInput}
                        />
                    </PanelTagInputContainer>
                    <TagAutoCompleteContainer>
                        <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={TAG_AUTO_COMPLETE_DATA}
                        renderItem={TagAutoCompleteItem}/>
                    </TagAutoCompleteContainer>
                </SlidingUpContentContainer>
            </SlidingUpPanel>
            </SlidingUpContainer>
            </Container>
    )
}

export default NewUploadScreen;