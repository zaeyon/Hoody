import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, ScrollView, View, FlatList, TouchableWithoutFeedback, Alert, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AboveKeyboard from 'react-native-above-keyboard';

// Local Components
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
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const CancleText = Styled.Text`
 font-size: 17px;
 color: #cccccc;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
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
 flex-shrink: 1;
`;



const SubTagText = Styled.Text`
color: #cccccc;
font-size: 24px;
font-weight: bold;
flex-shrink: 1;
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
 padding : 15px 15px 5px 15px;
`;

const ContentContainer = Styled.View`
 margin-top: 15px;
 width:${wp('100%')};
 padding-bottom: 10px;
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
 font-size: 24px;
 color: #eeeeee;
 font-weight: bold;
 margin-left: 6px;
`;

const BottomMenuBarContainer = Styled.View`
 background-color: #707070;
 justify-content: flex-end;
 position: absolute;
 bottom: 15;
`;


const BottomMenuBar = Styled.View`
 margin-left: ${wp('7.5%')};
 width: ${wp('85%')};
 height: 44px;
 background-color: #FAFAFA;
 border-radius: 22px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
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

const AddDescripContainer = Styled.View`
 padding: 10px 15px 70px 15px;
`;

const NewDescripInput = Styled.TextInput`
 font-size: 17px;
 color: #4b4b4b;
 padding-bottom: 200px;
`;

const BottomMenuTextContainer = Styled.View`
 width: ${wp('16%')};
 height: 44px;
 justify-content: center;
 align-items: center;
`;

const BottomMenuIconContainer = Styled.View`
 width: ${wp('13.8%')};
 height: 44px;
 justify-content: center;
 align-items: center;
`;

const DescripParagraphContainer = Styled.View`
width: ${wp('100%')};
border-top-width: 0.2px;
border-color: #eeeeee;
flex-direction: row;
justify-content: space-between;
`;

const ScrollEnabledContainer = Styled.View`
 width: ${wp('10%')};
 background-color: #707070;
`;


const ParagraphContentContainer = Styled.View`
padding: 15px;
justify-content: center;
flex: 6;
background-color:#ffffff;
`;

const DescripParaText = Styled.Text`
 font-size: 17px;
 color: #4B4B4B;
`;


const ParagraphIconContainer = Styled.View`
flex: 1;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-right: 10px;
`;


const ParagraphIcon = Styled.Image`
 width: ${wp('7%')};
 height: ${wp('7%')};
 margin-left: 15px;
 tint-color: #707070;
`;

const InputedTagRowContainer = Styled.View`
 flex-direction: row;
`;

const InputedTagColumnContainer = Styled.View`
 flex-direction: column;
`;


const TEST_DATA = ["1", "2"]






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
    const [mainTagProcess, setMainTagProcess] = useState<boolean>(false);
    const [mainTagInserted, setMainTagInserted] = useState<boolean>(false);
    const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true)
    const [mainTagWidth, setMainTagWidth] = useState<number>();
    const [subTag1Width, setSubTag1Width] = useState<number>();
    const [subTag2Width, setsubTag2Width] = useState<number>();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

   
    //후기 정보 관련 state
    const [rating, setRating] = useState<string>();
    const [incompleteMainTag, setIncompleteMainTag] = useState<string>();
    const [mainTag, setMainTag] = useState<string>();
    const [subTag1, setSubTag1] = useState<string>();
    const [subTag2, setSubTag2] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [longitude, setLongitude] = useState<number>();
    const [latitude, setLatitude] = useState<number>();
    const [expanse, setExpanse] = useState<string>();
    const [tagList, setTagList] = useState<Array<string>>();
    


    // Paragraph 관련 state
    const [paragraphData, setParagraphData] = useState<Array<object>>([]);
    const [inputingNewDescripBool, setInputingNewDescripBool] = useState<boolean>(false);
    const [paragraphHeight, setParagraphHeight] = useState<number>(0);

    // useRef
    const newDescripInput = useRef(null);
    const scrollViewRef = useRef(null);
    const draggableFlatListRef = useRef(null);

     var focusingNewDescripInput = false;
     var inputingNewDescripText = "";


    useEffect(() => {
        if(route.params?.location) {
            console.log("route.params.location", route.params.location);
            console.log("route.params.longitude", route.params.longitude);
            console.log("route.params.latitude", route.params.latitude);
            
            setLocation(route.params.location);
            setLongitude(route.params.longitude);
            setLatitude(route.params.latitude);
        }
    }, [route.params?.location])

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

    useEffect(() => {
        if(route.params?.mainTag && !route.params?.subTag1) {
            if(route.params?.mainTag !== mainTag) {
                setMainTagProcess(true);
                setIncompleteMainTag(route.params.mainTag)
            }
        } else if(route.params?.subTag1 && !route.params?.subTag2) { 

            setSubTag1(route.params.subTag1)
            setSubTag1Width(route.params.subTag1Width);
            setIncompleteMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            if(route.params?.mainTag !== mainTag) {
                setMainTagProcess(true);
            }
        } else if(route.params?.subTag2) {

            setSubTag1(route.params.subTag1)
            setSubTag1Width(route.params.subTag1Width);
            setIncompleteMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            setSubTag2(route.params.subTag2);
            setsubTag2Width(route.params.subTag2Width);
            if(route.params?.mainTag !== mainTag) {
                setMainTagProcess(true);
            }
            
        }
    }, [route.params?.mainTag, route.params?.subTag1, route.params?.subTag2])

    useEffect(() => {
        console.log("scrollToEnd paragraphChange");
        if(draggableFlatListRef.current !== null) {
        console.log("scrollToEnd");
        }

    }, [paragraphData])

    /*
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    }, [paragraphData])
    
    */
    
    useEffect(() => {
        
        console.log("paragraphData", paragraphData)

    }, [paragraphData])

    function onKeyboardDidShow(e: KeyboardEvent): void {
        setKeyboardHeight(e.endCoordinates.height);
        //keyboardHeight = e.endCoordinates.height;
    }

    function onKeyboardDidHide(): void {
       setKeyboardHeight(0);
      //keyboardHeight = 0;
    }

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

    /*
    const clickInputedTag = (name: string, type: string) => {
        navigation.navigate("TagSearchScreen", {
            selectedTagName: name,
            selectedTagType: type,
        })
    }

    */

const moveTagSearch = (tagType: string, inputedTagName: string) => {
    navigation.navigate("TagSearchScreen", {
        tagType: tagType,
    })
}

const clickLocationIcon = () => {
    if(focusingNewDescripInput) {
        addNewDescripParagraph()
    }
    navigation.navigate("LocationSearch")
}

const addNewDescripParagraph = () => {

     console.log("not state inputingNewDescripText", inputingNewDescripText)

    var tmpParagraphData = paragraphData;
        var newDescripPara = {
            index: paragraphData.length,
            type: "description",
            description: inputingNewDescripText
        }
        tmpParagraphData.push(newDescripPara);
        setParagraphData(tmpParagraphData);

         focusingNewDescripInput = false;
         inputingNewDescripText = "";
        // setFocusingNewDescripInput(false);
        // setInputingNewDescripText("");
         setInputingNewDescripBool(!inputingNewDescripBool)
         newDescripInput.current.blur();
        
        // draggableFlatListRef.current.scrollToEnd();
        // scrollViewRef.current.scrollTo();
}

const onFocusNewDescripInput = (nativeEvent: any) => {
    console.log("onFocusDescripInput nativeEvent", nativeEvent.nativeEvent)
    // setFocusingNewDescripInput(true);
    focusingNewDescripInput = true;
}

const onChangeNewDescripInput = (text: string) => {
    // setInputingNewDescripText(text);
    inputingNewDescripText = text;
}

const changeParagraphOrder = (data: any) => {
    console.log("changed paragraph", data);
    setParagraphData(data);
}

const clickParagraphContent = () => {
    console.log("clickParagraphContent");
}

const onEnableScroll = (value: boolean) => {
    setEnableScrollViewScroll(value)
}


const renderDraggableItem = ({item, index, drag, isActive}) => {
    if(item.type === 'description') {
        return (
            <DescripParagraphContainer style={isActive && styles.shadow}>
                <TouchableWithoutFeedback onPress={() => clickParagraphContent()}>
                <ParagraphContentContainer>
                    <DescripParaText>{item.description}</DescripParaText>
                </ParagraphContentContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
                    <ParagraphIconContainer>
                        <ParagraphIcon
                        source={require('~/Assets/Images/ic_paragraph.png')}/>
                    </ParagraphIconContainer>
                </TouchableWithoutFeedback>
            </DescripParagraphContainer>
        )
    }
}

const renderAddNewDescripInput = () => {
    var footer =  (
        <AddDescripContainer>
        <NewDescripInput
        ref={newDescripInput}
        placeholder={!paragraphData[0] ? "나의 소비에 이야기를 담아주세요" : ""}
        multiline={true}
        onFocus={(nativeEvent) => onFocusNewDescripInput(nativeEvent)}
        onChangeText={(text:string) => onChangeNewDescripInput(text)}
        />
    </AddDescripContainer>
    )

    return footer;
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
                {incompleteMainTag && !mainTag && (
                    <TouchableWithoutFeedback onPress={() => moveTagSearch("main", incompleteMainTag)}>
                    <MainTagText>{"#" + incompleteMainTag}</MainTagText>
                    </TouchableWithoutFeedback>
                )}    
            {mainTag && !subTag1 && !subTag2 && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                </InputedTagRowContainer>
            )}
            {mainTag && subTag1 && !subTag2 && (mainTagWidth + subTag1Width < wp('87%')) && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <SubTagText>{"#" + subTag1}</SubTagText>
                </InputedTagRowContainer>
            )}
            {mainTag && subTag1 && !subTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <SubTagText>{"#" + subTag1}</SubTagText>
                </InputedTagColumnContainer>
            )}
            {mainTag && subTag1 && subTag2 && (mainTagWidth + subTag1Width + subTag2Width < wp('87%')) && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <SubTagText>{"#" + subTag1}</SubTagText>
                <SubTagText>{"#" + subTag2}</SubTagText>
                </InputedTagRowContainer>
            )}
            {mainTag && subTag1 && subTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (subTag1Width + subTag2Width < wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <InputedTagRowContainer>
                <SubTagText>{"#" + subTag1}</SubTagText>
                <SubTagText>{"#" + subTag2}</SubTagText>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            {mainTag && subTag1 && subTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (subTag1Width + subTag2Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <SubTagText>{"#" + subTag1}</SubTagText>
                <SubTagText>{"#" + subTag2}</SubTagText>
                </InputedTagColumnContainer>
            )}
            {mainTag && subTag1 && subTag2 && (mainTagWidth + subTag1Width < wp('87%')) && (mainTagWidth + subTag1Width + subTag2Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <MainTagText>{"#" + mainTag}</MainTagText>
                <SubTagText>{"#" + subTag1}</SubTagText>
                </InputedTagRowContainer>
                <SubTagText>{"#" + subTag2}</SubTagText>
                </InputedTagColumnContainer>
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
                {mainTagInserted && !mainTagProcess && (
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
                {mainTag && !mainTagProcess && (
                    <KeyboardAwareScrollView
                    scrollEnabled={enableScrollViewScroll}
                    ref={scrollViewRef}
                    >
                <ContentContainer>
                        <DraggableFlatList
                        style={{width:wp('100%'), height:hp('100%')}}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setParagraphHeight(layout.height);
                        }}
                        data={paragraphData}
                        extraData={paragraphData}
                        renderItem={renderDraggableItem}
                        onDragEnd={({data}) => changeParagraphOrder(data)}
                        keyExtractor={(item,index) => `draggable-item-${item.index}`}
                        nestedScrollEnabled={true}
                        onTouchStart={() => onEnableScroll(false)}
                        onMomentumScrollEnd={() => onEnableScroll(true)}
                        ListFooterComponent={renderAddNewDescripInput}
                        /> 
                </ContentContainer>
                </KeyboardAwareScrollView>
                )}
            </BodyContainer>
            {mainTag && !mainTagProcess && (
                <BottomMenuBarContainer>
                <AboveKeyboard>
                <BottomMenuBar>
                    <BottomMenuTextContainer>
                    <BottomMenuTIcon
                    source={require('~/Assets/Images/ic_t.png')}/>
                    </BottomMenuTextContainer>
                    <BottomMenuDivider/>
                    <BottomMenuIconContainer>
                    <BottomMenuUrlIcon
                    source={require('~/Assets/Images/ic_bottomMenu_url.png')}/>
                    </BottomMenuIconContainer>
                    <TouchableWithoutFeedback onPress={() => clickLocationIcon()}>
                    <BottomMenuIconContainer>
                    <BottomMenuLocationIcon
                    source={require('~/Assets/Images/ic_bottomMenu_location.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <BottomMenuIconContainer>
                    <BottomMenuExpanseIcon
                    source={require('~/Assets/Images/ic_bottomMenu_expanse.png')}/>
                    </BottomMenuIconContainer>
                    <BottomMenuIconContainer>
                    <BottomMenuCalendarIcon
                    source={require('~/Assets/Images/ic_bottomMenu_calendar.png')}/>
                    </BottomMenuIconContainer>
                    <BottomMenuIconContainer>
                    <BottomMenuAlbumIcon
                    source={require('~/Assets/Images/ic_bottomMenu_album.png')}/>
                    </BottomMenuIconContainer>
                </BottomMenuBar>
                </AboveKeyboard>
                </BottomMenuBarContainer>
            )}
            </Container>
    )
}

const styles = StyleSheet.create({
    invisibleMainTagProcess : {
        width: 0,
        height: 0,
    },

    shadow: {

    },
})

export default NewUploadScreen;