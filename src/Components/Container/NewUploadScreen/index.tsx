import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, ScrollView, View, FlatList, TouchableWithoutFeedback, Alert, StyleSheet, TextInput} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { CommonActions } from '@react-navigation/native';

import SlidingUpPanel from '~/Components/Presentational/UploadScreen/TagSearchSlidingUp';
import LatelySearchItem from '~/Components/Presentational/TagSearch/LatelySearchItem';
import GetAutoComplete from '~/Route/Search/GetAutoComplete';
import {Rating} from '~/Components/Presentational/UploadScreen/Rating';

const ratingImage = require('~/Assets/Images/ic_star4.png');


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderTagPlaceholderContainer = Styled.View`
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
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
 padding: 7px 12px 7px 12px;
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
 fles-shrink: 1;
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
        reviewNum: '3'
    },
    {
        name:'리뷰테스트2',
        reviewNum: '333'
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

const TagListContainer = Styled.View`
 flex-direction: row;
`;

const MainTagProcessContainer = Styled.View`
margin-top: 15px;
`;

const RatingInductionText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #8e8e8e;
`;

const RatingInputContainer = Styled.View`
margin-top: 10px;
flex-direction: row;
align-items: center;
`;

const RatingTextContainer = Styled.View`
 flex-direction: row;
 width: 50px;
`;

const NoRatingText = Styled.Text`
font-weight: bold;
font-size: 18px;
color: #cccccc;
`;

const RatingText = Styled.Text`
font-weight: bold;
font-size: 18px;
color: #8e8e8e;
`;

const RatingContainer = Styled.View`
 margin-left: 5px;
 flex-direction: row;
`;

const AdditionInfoContainer = Styled.View`
`;

const ContentContainer = Styled.View`
 margin-top: 15px;
 background-color:#ffffff;
 width:${wp('100%')};
 height: ${hp('50%')};
`;

const MetaInfoContainer = Styled.View`
 margin-top: 12px;
 flex-direction: row;
 align-items: center;
`;

const InputedRatingContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const InputedRatingText = Styled.Text`
 font-size: ${wp('4%')};
 font-weight: 600;
 color: #8E8E8E;
 margin-top: 2px;
`;

const InputedRatingImage = Styled.Text`
`;

const InputedLocationContainer = Styled.View`
 margin-left: 15px;
 flex-direction: row;
 align-items: center;
`;

const InputedLocationIcon = Styled.Image`
 width: ${wp('6%')};
 height: ${wp('6%')};
`;

const InputedLocationText = Styled.Text`
font-size: ${wp('4%')};
 font-weight: 600;
 color: #8E8E8E;
`;

const InputedExpanseContainer = Styled.View`
 margin-left: 15px;
 flex-direction: row;
 align-items: center;
`;

const InputedExpanseIcon = Styled.Image`
 width: ${wp('6%')};
 height: ${wp('6%')};
`;

const InputedExpanseText = Styled.Text`
font-size: ${wp('4%')};
 font-weight: 600;
 color: #8E8E8E;
`;

const ContentPlaceholderText = Styled.Text`
 font-size: 20px;
 color: #cccccc;
`;

const SubTagPlaceholderText = Styled.Text`
 font-size: 20px;
 color: #EFEFEF;
 font-weight: bold;
`;

const BottomMenuBarContainer = Styled.View`
 width: ${wp('100%')};
 align-items: center;
 position: absolute;
 bottom: 0px
 padding-bottom: 20px;
`;

const BottomMenuBar = Styled.View`
 width: ${wp('75%')};
 height: 44px;
 background-color: #FAFAFA;
 border-radius: 22px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding-left: 15px;
 padding-right: 23px;
`;

const BottomMenuTIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const BottomMenuDivider = Styled.View`
 width: 1.5px;
 height: 22px;
 background-color: #cccccc;
`;

const BottomMenuUrlIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const BottomMenuLocationIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const BottomMenuExpanseIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const BottomMenuCalendarIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const BottomMenuAlbumIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

interface Props {
    navigation: any,
    route: any,
}

const NewUploadScreen = ({navigation, route}: Props) => {
    const [slidingUpHeight, setSlidingUpHeight] = useState(0);
    const [onFocusTagInput, setOnFocusTagInput] = useState(true);
    const [hideSlidingUp, setHideSlidingUp] = useState<boolean>(false);
    const [selectTagBool, setSelectTagBool] = useState<boolean>(false);
    const [selectingTagType, setSelectingTagType] = useState<string>("main");
    const [selectTagName, setSelectTagName] = useState<string>("");
    const [visiblePanel, setVisiblePanel] = useState<boolean>(false);
    const [firstTagResult, setFirstTagResult] = useState([]);
    const [mainTagProcess, setMainTagProcess] = useState<boolean>();
    const [mainTagInserted, setMainTagInserted] = useState<boolean>(false);
    const [showPanel, setShowPanel] = useState<boolean>(false);
   
    //후기 정보 state
    const [rating, setRating] = useState<string>();
    const [incompleteMainTag, setIncompleteMainTag] = useState<string>();
    const [mainTag, setMainTag] = useState<string>();
    const [subTag1, setSubTag1] = useState<string>();
    const [subTag2, setSubTag2] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [expanse, setExpanse] = useState<string>();

    useEffect(() => {
        //console.log("route.params.selectTagName", route.params.selectTagName)
        if(route.params?.selectTagName) {
            console.log("route.params?.selectTag", route.params.selectTagName)
            if(route.params.selectTagType === "main") { 
            setIncompleteMainTag(route.params.selectTagName)
            setMainTagProcess(true)
        }
        }
    }, [route.params?.selectTagName])

    /*
    useEffect(() => {
       navigation.dispatch(state => {
           const routes = state.routes.filter(r => r.name !== 'TagSearchScreen');

           return CommonActions.reset({
               ...state,
               routes,
               index: routes.length - 1,
           });
       }) 
    },[])

    */
    const uploadCancel = () => {
        Alert.alert(
            '후기 작성을 취소하시겠어요?',
            ' ',
            [
                {
                    text: '확인',
                    onPress: () => {
                        navigation.goBack()
                    },
                },
                {
                    text: '취소',
                    onPress: () => 0,
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );
    };
    
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
        setVisiblePanel(false)
        setSelectTagName(item.name)
     }

    const changeVisiblePanel = (type: boolean) => {
        setVisiblePanel(type)
        setShowPanel(true)
    }

    const ratingCompleted = (rating) => {
        console.log("rating", rating);
        setRating(rating);
        setMainTagProcess(false);
        setMainTagInserted(true);
        setMainTag(incompleteMainTag);
    }

    const ratingMovling = (rating) => {
        setRating(rating);
    }


    const selectTag = (type:string, name:string) => {
        console.log("선택된 태그 타입", type);
        console.log("선택된 태그 이름", name);
        setSelectingTagType(type);
        if(type === "main" && name !== mainTag) {
            setMainTag(name);
            setMainTagProcess(true);
        }
        //setSelectTagBool(false);
        //setVisiblePanel(false);
    }

    const s

    /*
    const clickInputedTag = (name: string, type: string) => {
        navigation.navigate("TagSearchScreen", {
            selectedTagName: name,
            selectedTagType: type,
        })
    }

    */

const TagAutoCompleteItem = ({item, index}) => {
    return (
    <TouchableWithoutFeedback onPress={() => selectTagAutoComplete(item)}>
    <Container>
        <TagContainer>
        <TagNameText>{"#" + item.name}</TagNameText>
        <TagReviewCount>{item.reviewNum + "개"}</TagReviewCount>
        </TagContainer>
    </Container>
    </TouchableWithoutFeedback>
    )
}

const moveTagSearch = (tagType: string, inputedTagName: string) => {
    navigation.navigate("TagSearchScreen", {
        tagType: tagType,
    })
}


    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => uploadCancel()}>
                <HeaderLeftContainer>
                    <CancleText>취소</CancleText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderRightContainer>
                    <TempoSaveText>임시저장</TempoSaveText>
                    <FinishContainer>
                        <FinishText>완료</FinishText>
                    </FinishContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <AdditionInfoContainer> 
                <TagListContainer>
                {!incompleteMainTag && (
                    <TouchableWithoutFeedback onPress={() => moveTagSearch("main")}>
                    <TagInputPlaceholder>
                    {"#태그를 입력해주세요."}
                </TagInputPlaceholder>
                </TouchableWithoutFeedback>
                )}
                {incompleteMainTag && (
                    <TouchableWithoutFeedback onPress={() => moveTagSearch("main", incompleteMainTag)}>
                    <MainTagText>{"#" + incompleteMainTag}</MainTagText>
                    </TouchableWithoutFeedback>
                )}  
                {mainTag && !subTag1 && (
                    <TouchableWithoutFeedback onPress={() => 0}>
                        <SubTagPlaceholderText>{"#태그추가"}</SubTagPlaceholderText>
                    </TouchableWithoutFeedback>
                )}    
                </TagListContainer>
                
                {mainTagProcess && (
                    <MainTagProcessContainer>
                        <RatingInductionText>{"#" + incompleteMainTag  + "은(는) 몇 점인가요?"}</RatingInductionText>
                        <RatingInputContainer>
                            <TouchableWithoutFeedback onPress={() => setMainTagProcess(false)}>
                            <RatingTextContainer>
                            {rating && (
                                <Text style={{fontWeight:"bold", color: '#8e8e8e', fontSize: 18}}>{rating+"점"}</Text>
                            )}
                            {!rating && (
                                <Text style={{fontWeight:"bold", color: '#cccccc', fontSize: 18}}>{"??점"}</Text>
                            )}
                             </RatingTextContainer>
                             </TouchableWithoutFeedback>
                            <RatingContainer>
                            <Rating
                            type="custom"
                            onFinishRating={ratingCompleted}
                            ratingImage={ratingImage}
                            imageSize={wp('11%')}
                            fractions={2}
                            startingValue={0}
                            setRatingInMove={ratingMovling}
                            />
                            </RatingContainer>
                        </RatingInputContainer>
                    </MainTagProcessContainer>
                )} 
                {/*mainTagInserted && !mainTagProcess && */(
                    <MetaInfoContainer>
                    <InputedRatingContainer>
                    <InputedRatingText>{rating+"점"}</InputedRatingText>
                      <Rating
                      style={{marginLeft: 5}}
                            type="custom"
                            ratingImage={ratingImage}
                            imageSize={wp('5%')}
                            startingValue={rating}
                            readonly={true}
                            />
                    </InputedRatingContainer>
                    <InputedLocationContainer>
                    <InputedLocationIcon
                    source={require('~/Assets/Images/ic_location_outline.png')}/>
                    <InputedLocationText>
                    {location || "위치"}</InputedLocationText>
                    </InputedLocationContainer>
                    <InputedExpanseContainer>
                    <InputedExpanseIcon
                    source={require('~/Assets/Images/ic_expanse_outline.png')}/>
                    <InputedExpanseText>{expanse || "소비금액"}</InputedExpanseText>
                    </InputedExpanseContainer>
                    </MetaInfoContainer>
                )}
                </AdditionInfoContainer>
                {mainTag && (
                <ScrollView style={{backgroundColor:"#ffffff", width:wp('100%')}}>
                <ContentContainer>
                </ContentContainer>
                </ScrollView>
                )}

            </BodyContainer>
            <BottomMenuBarContainer>
                <BottomMenuBar>
                    <BottomMenuTIcon
                    source={require('~/Assets/Images/ic_t.png')}/>
                    <BottomMenuDivider/>
                    <BottomMenuUrlIcon
                    source={require('~/Assets/Images/ic_bottomMenu_url.png')}/>
                    <BottomMenuLocationIcon
                    source={require('~/Assets/Images/ic_bottomMenu_location.png')}/>
                    <BottomMenuExpanseIcon
                    source={require('~/Assets/Images/ic_bottomMenu_expanse.png')}/>
                    <BottomMenuCalendarIcon
                    source={require('~/Assets/Images/ic_bottomMenu_calendar.png')}/>
                    <BottomMenuAlbumIcon
                    source={require('~/Assets/Images/ic_bottomMenu_album.png')}/>
                </BottomMenuBar>
            </BottomMenuBarContainer>
            </Container>
    )
}

const styles = StyleSheet.create({
    invisibleMainTagProcess : {
        width: 0,
        height: 0,
    }
})

export default NewUploadScreen;