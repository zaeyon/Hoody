import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, TextInput ,Keyboard, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native'
import AboveKeyboard from 'react-native-above-keyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isIphoneX} from 'react-native-iphone-x-helper'; 

// Route
import GETTagAutoComplete from '~/Route/Search/GETTagAutoComplete';

const Container = Styled.SafeAreaView`
  flex:1;
  background-color: #ffffff;
  align-items: center;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding-top: 7px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 13px;
 align-items: center;
 justify-content: center;
`;

const CancelText = Styled.Text`
 font-size: 17px;
 color: #C6C7CC;
 `;

const HeaderRightContainer = Styled.View`
padding-top: 7px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 13px;
 align-items: center;
 justify-content: center;
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


const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 10px 20px 0px 20px;
`;

const HeaderNextText = Styled.Text`
 
`;

const TagContainer = Styled.View`
width: ${wp('100%')};
padding : 6px 15px 0px 15px;
justify-content: center;
padding-bottom: 10px;
`;

const TagInputContainer = Styled.View`
flex-direction: row;
`;

const InputedTagListContainer = Styled.View`
width: ${wp('100%')};
padding-top: 10px;
padding-bottom: 20px;
flex-direction: row;
`;

const HashTagInputContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
flex-shrink: 1;
width: ${wp('90%')};
`;

const TWInputContainer = Styled.View`
flex-direction: row;
flex-shrink: 1;
background-color:#ffffff;
`;

const MainTagInput = Styled.TextInput`
font-size: 24px;
font-weight: bold;
width: ${wp('90%')};
color: #267DFF;
`;

const SubTagInput = Styled.TextInput`
font-size: 24px
font-weight: bold;
width: ${wp('90%')};
color: #cccccc;
`;

const MainHashText = Styled.Text`
 margin-top: 4px;
 font-size: 24px;
 color: #267DFF;
 font-weight: bold;
`;

const SubHashText = Styled.Text`
 margin-top: 4px;
 font-size: 24px;
 color: #CCCCCC;
 font-weight: bold;
`;

const MainTagText = Styled.Text`
margin-right: 8px;
color: #267DFF;
font-size: 20px;
font-weight: bold;
flex-direction: row;
flex-wrap: wrap;

`;


const SubTagText = Styled.Text`
color: #cccccc;
font-size: 20px;
font-weight: bold;
flex-direction: row;
`;

const EmptyRemainderContainer = Styled.View`
background-color: #ffffff;
`;

const TagInputFinishText = Styled.Text`
color: #cccccc60;
font-size: 24px;
font-weight: bold;
`;;

const MainTagBackground = Styled.View`
margin-top: 10px;
 padding: 9px 10px 9px 16px;
 background-color: #FCFCFE;
 border-width: 1px;
 border-color: #EFEFEF;
 border-radius: 22px;
 margin-right: 8px;
`;

const SubTagBackground = Styled.View`
flex-shrink: 1;
flex-direction: row;
margin-top: 10px;
margin-right: 8px;
background-color: #FCFCFE;
border-width: 1px;
border-color: #EFEFEF;
border-radius: 22px;
align-items: center;
`;

const SubTagNameContainer = Styled.View`
 align-items: center;
 justify-content: center;
 padding: 9px 0px 9px 16px;
`;

const TagRemoveContainer = Styled.View`
 justify-content: center;
 padding: 9px 10px 9px 10px
`;

const TagRemoveIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;

const GetWidthTagText = Styled.Text`
color: #ffffff;
font-size: 24px;
font-weight: bold;
background-color:#ffffff;

`;


const InputBottomBorder = Styled.View`
 position: absolute;
 bottom: 6px;
 width: ${wp('75.5%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const DivideBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.6px;
 background-color: #ececee;
`;

const TagResultContainer = Styled.View`
flex:1;

padding: 0px; 15px 15px 15px;
border-color: #ececee;

`;

const TagResultItemContainer = Styled.View`
width: ${wp('90%')};
padding: 10px 0px 10px 0px;
 flex-direction: column;
 justify-content: space-between;
 border-color: #c3c3c3;
`;


const TagNameText = Styled.Text`
font-size: 16px;
font-weight: 500;

`;

const TagReviewNum = Styled.Text`
font-size: 15px;
color: #b9b9b9;
`;

const UseTagButtonText = Styled.Text`
font-size: 14px;
color: #4090FC;
`;

const DisabledNextText = Styled.Text`
font-size: 17px;
 color: #267DFF;
 opacity: 0.4;
`;

const AbledNextText = Styled.Text`
font-size: 17px;
 color: #267DFF;
`;

const MaxTagCountText = Styled.Text`
 font-size: 14px;
 color: #cccccc;
`;

const TagItemContainer = Styled.View`
 flex-direction: row;
 align-items: flex-end;
`;

const SubTagInputContainer = Styled.View`
 flex-direction: row;
 position: absolute;
`;

const GetTextWidthContainer = Styled.View`
 width: 1000px;
`;

const InputedSubTagContainer = Styled.View`
 position: absolute;
 bottom: 0;
`;

const InputedTagRowContainer = Styled.View`
 flex-direction: row;
`;
const InputedTagColumnContainer = Styled.View`
 flex-direction: column;
`;

const NoAutoCompletedTagResultContainer = Styled.View`
 background-color:#c3c3c3;
`;

const MaximumTagCountText = Styled.Text`
 font-size: 13px;
 color: #c6c7cc;
 position: absolute;
 bottom: 0;
 right: 30;
`;

const WriteButtonContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('10%')};
 padding-left: ${wp('31.7%')};
 position: absolute;
 bottom: ${isIphoneX() ? 23 : 16}
`;

const WriteButtonText = Styled.Text`
color: #FFFFFF;
font-weight: bold;
font-size: 18px;
`;

const DisabledWriteButtonText = Styled.Text`
color: #8E9199;
font-weight: bold;
font-size: 18px;
`;

const DisabledWriteButton = Styled.View`
 width: ${wp('36.5%')};
 height: ${wp('10.1%')};
 background-color: #ECECEE;
 border-radius: 100px;
 align-items: center;
 justify-content: center;
`;

const AbledWriteButton = Styled.View`
width: ${wp('36.5%')};
height: ${wp('10.1%')};
background-color: #267DFF;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const RESULT_DATA_TEST = [
    {
        name: '리뷰테스트1',
        reviewNum: 11,
    },
    {
        name: '리뷰테스트3',
        reviewNum: 21,
    }
]

const TagSearchScreen = ({navigation, route}: Props) => {
    const [inputMainTag, setInputMainTag] = useState<string>();
    const [inputSubTag1, setInputSubTag1] = useState<string>();
    const [inputSubTag2, setInputSubTag2] = useState<string>();
    const [firstTagResult, setFirstTagResult] = useState([]);
    const [tagList, setTagList] = useState<Array<string>>([]);
    const [tagAutoCompletedList, setTagAutoCompletedList] = useState<Array<object>>([]);

    const [mainTagExis, setMainTagExis] = useState<boolean>(false);
    const [subTag1Exis, setSubTag1Exis] = useState<boolean>(false);
    const [subTag2Exis, setSubTag2Exis] = useState<boolean>(false);
    const [lastLineWidth, setLastLineWidth] = useState<number>();

    const [inputingMainTag, setInputingMainTag] = useState<boolean>(true);
    const [inputingSubTag1, setInputingSubTag1] = useState<boolean>(false);
    const [inputingSubTag2, setInputingSubTag2] = useState<boolean>(false);

    const [inputingMainTagText, setInputingMainTagText] = useState<string>("");
    const [inputingSubTag1Text, setInputingSubTag1Text] = useState<string>();
    const [inputingSubTag2Text, setInputingSubTag2Text] = useState<string>();

    const [mainTagWidth, setMainTagWidth] = useState<number>(0);
    const [subTag1Width, setSubTag1Width] = useState<number>(0);
    const [subTag2Width, setSubTag2Width] = useState<number>(0);
    const [tagSort, setTagSort] = useState<string>();

    const [modifingTagBool, setModifingTagBool] = useState<boolean>(false);
    const [modifingTagText, setModifingTagText] = useState<string>();

    const [changingInputedTag, setChangingInputedTag] = useState<boolean>(false);

    const [inputingMainTagText2, setInputingMainTagText2] = useState<string>("");
    const [inputingSubTag1Text2, setInputingSubTag1Text2] = useState<string>("");
    const [inputingSubTag2Text2, setInputingSubTag2Text2] = useState<string>("");

    useEffect(() => {
        setChangingInputedTag(!changingInputedTag)
    }, [])

    useEffect(() => {
        if(route.params?.mainTag && !route.params?.subTag1 && !route.params.subTag2) {
            console.log("메인태그 존재")
            console.log("메인태그 길이", route.params.mainTagWidth);
            setInputMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            setInputingMainTag(false);
            setInputingSubTag1(true);
        } else if(route.params?.mainTag && route.params?.subTag1 && !route.params.subTag2) {
            console.log("서브태그1 존재")
            setInputMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            setInputSubTag1(route.params.subTag1);
            setSubTag1Width(route.params.subTag1Width);
            setInputingMainTag(false);
            setInputingSubTag1(false);
            setInputingSubTag2(true);
        } else if(route.params?.mainTag && route.params?.subTag1 && route.params.subTag2) {
            console.log("메인태그 존재", route.params.mainTag);
            console.log("서브태그1 존재", route.params.subTag1);
            console.log("서브태그2 존재", route.params.subTag2);

            console.log("메인태그 길이", route.params.mainTagWidth);

            setInputMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            setInputSubTag1(route.params.subTag1);
            setSubTag1Width(route.params.subTag1Width);
            setInputSubTag2(route.params.subTag2);
            setSubTag2Width(route.params.subTag2Width);
            setInputingMainTag(false);
            setInputingSubTag1(false);
            setInputingSubTag2(false);
        }
    }, [route.params?.mainTag, route.params?.subTag1, route.params?.subTag2])

    
    const useMainTagComponentSize = () => {
        const [mainTagSize, setMainTagSize] = useState(null);
      
        const onMainTagLayout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          console.log("mainTagSize", width);
          setMainTagSize({ width, height });
        }, []);

        return [mainTagSize, onMainTagLayout];
      };


    const useSubTag1ComponentSize = () => {
        const [subTag1Size, setSubTag1Size] = useState(null);
      
        const onSubTag1Layout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          setSubTag1Size({ width, height });
        }, []);

        return [subTag1Size, onSubTag1Layout];
      };

    const useSubTag2ComponentSize = () => {
        const [subTag2Size, setSubTag2Size] = useState(null);
      
        const onSubTag2Layout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          setSubTag2Size({ width, height });
        }, []);

        return [subTag2Size, onSubTag2Layout];
      };  
 
 
    const [mainTagSize, onMainTagLayout] = useMainTagComponentSize();
    const [subTag1Size, onSubTag1Layout] = useSubTag1ComponentSize();
    const [subTag2Size, onSubTag2Layout] = useSubTag2ComponentSize();
;

   // const [subTag1Size, subTag1OnLayout] = useTagComponentSize();
   // const [subTag2Size, subTag2OnLayout] = useTagComponentSize();
  

    const selectTag = (item: any) => {
        if(inputingMainTag) {
        console.log("item", item);
        setInputingMainTagText(item.name);
        setInputMainTag(item.name);
        setMainTagExis(true);
        setInputingMainTag(false);
        if(!inputSubTag1) {
            setInputingSubTag1(true)
        }
        var tmpTagList = tagList;
        tmpTagList[0] = item.name;
        setTagList(tmpTagList);
        setMainTagWidth(mainTagSize.width);
        setTagAutoCompletedList([]);
        setInputingMainTagText2("")

        } else if(inputingSubTag1) {
        setInputingSubTag1Text(item.name);
        setInputSubTag1(item.name)
        setSubTag1Exis(true)
        setInputingSubTag1(false)
        if(!inputSubTag2) {
            setInputingSubTag2(true)
        }
        var tmpTagList = tagList;
        tmpTagList[1] = item.name;
        setTagList(tmpTagList);
        setSubTag1Width(subTag1Size.width);
        setTagAutoCompletedList([])
        setInputingSubTag1Text2("");
        } else if(inputingSubTag2) {
        setInputingSubTag2Text(item.name);
        setInputSubTag2(item.name)
        setSubTag2Exis(true)
        setInputingSubTag2(false)
        var tmpTagList = tagList;
        tmpTagList[2] = item.name;
        setTagList(tmpTagList);
        setSubTag2Width(subTag2Size.width);
        setTagAutoCompletedList([])
        setInputingSubTag2Text2("");
        }
    }

    const changeMainTagInput = (query: any) => {
        if(query === " ") {
         setInputingMainTagText("");
   
        } else {
            var tmpTag = query.trim();
        setInputingMainTagText(tmpTag);
        setInputingMainTagText2(tmpTag);
        if(query === "") {
            console.log("입력된 검색어 없음");
            setTagAutoCompletedList([]);

            return;
        } else {
          if(query.search(/\s/) != -1) {
            var tag = query.trim();
            /*
            console.log("공백 존재")
            console.log("query", query)       
            setInputMainTag(tag)
            setMainTagExis(true);
            setInputingMainTag(false);
            if(!inputSubTag1) {
            console.log("서브태그 입력하기")
            setInputingSubTag1(true)
            }
            if(!inputSubTag2 && inputSubTag1) {
            setInputingSubTag2(true)
            }
            var tmpTagList = tagList;
            tmpTagList[0] = tag;
            setTagList(tmpTagList);

            console.log("메인태그 길이", mainTagSize.width)
            setMainTagWidth(mainTagSize.width);
            */
        } else {
        console.log("태그자동완성 tmpTag", tmpTag);
        GETTagAutoComplete(tmpTag)
        .then(function(response) {
            console.log("메인태그 자동완성", response)
            setTagAutoCompletedList(response);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
       }
      }
     }
   }


    const changeSubTag1Input = (query) => {

        if(query === " ") {
            setInputingSubTag1Text("");

        } else {
            
            var tmpTag = query.trim();
            setInputingSubTag1Text(tmpTag);
            setInputingSubTag1Text2(tmpTag);
    
            console.log("inputingSubTag1", inputingSubTag1);
    
            if(query.search(/\s/) != -1) {
                var tag = query.trim();
                /*
                console.log("공백 존재")
                setInputSubTag1(tag)
                setSubTag1Exis(true)
                setInputingSubTag1(false)
                if(!inputSubTag2) {
                    setInputingSubTag2(true)
                }
                var tmpTagList = tagList;
                tmpTagList[1] = tag;
                setTagList(tmpTagList);
    
                console.log("서브태그 길이", subTag1Size.width)
                setSubTag1Width(subTag1Size.width);
    
                console.log("메인태그 길이!!!", mainTagWidth);
                //console.log("서브태그1 길이", subTag1Width);
                */
            
            } else {
            if(tmpTag != "") {
                console.log("태그자동완성 tmpTag", tmpTag);
                GETTagAutoComplete(tmpTag)
                .then(function(response) {
                    console.log("서브태그1 자동완성", response)
                    setTagAutoCompletedList(response);
                })
                .catch(function(error) {
                    console.log("태그 자동완성 실패", error);
                })
                } else if(tmpTag === "") {
                    console.log("입력된거 없음")
                    setTagAutoCompletedList([]);
                }
            }   
        }
    }

    const changeSubTag2Input = (query: any) => {

        if(query === " ") {
            setInputingSubTag2Text("")
            
        } else {
            var tmpTag = query.trim();
            setInputingSubTag2Text(tmpTag);
            setInputingSubTag2Text2(tmpTag);
            if(query.search(/\s/) != -1) {
                var tag = query.trim()
                console.log("공백 존재")
                /*
            
                setInputSubTag2(tag)
                setSubTag2Exis(true)
                setInputingSubTag2(false)
                var tmpTagList = tagList;
                tmpTagList[2] = tag;
                setTagList(tmpTagList);
    
                console.log("서브태그2 길이", subTag2Size.width);
                setSubTag2Width(subTag2Size.width);
                */
            
            } else {
                if(tmpTag != "") {
                    console.log("태그자동완성 tmpTag", tmpTag);
                    GETTagAutoComplete(tmpTag)
                    .then(function(response) {
                        console.log("서브태그2 자동완성", response)
                        setTagAutoCompletedList(response);
                    })
                    .catch(function(error) {
                        console.log("태그 자동완성 실패", error);
                    })
                    } else if(tmpTag === "") {
                        setTagAutoCompletedList([]);
                }
            }  
        }
    }

    // 화살표함수는 현재환경을 따르게할때 유용
    const moveUpload = () => {
        if(inputMainTag && !inputSubTag1 && !inputSubTag2) {
        console.log("!changingInputedTag", changingInputedTag)

        if(route.params?.requestType === 'upload') {
            console.log("메인태그만 존재")
            navigation.navigate('UploadScreen', {
              mainTag: inputMainTag,
              mainTagWidth: mainTagWidth,
              subTag1: null,
              subTag2: null,
              tagChange: true,
        })
        } else if(route.params?.requestType === 'edit') {
            navigation.navigate('FeedEditScreen', {
                mainTag: inputMainTag,
              mainTagWidth: mainTagWidth,
              subTag1: null,
              subTag2: null,
              tagChange: true,
            })
        }
        } else if (inputMainTag && inputSubTag1 && !inputSubTag2) {
            if(route.params?.requestType === 'upload') {
                navigation.navigate('UploadScreen', {
                    mainTag: inputMainTag,
                    mainTagWidth: mainTagWidth,
                    subTag1: inputSubTag1,
                    subTag1Width: subTag1Width,
                    subTag2: null,
                    tagChange: true,
                })
            } else if(route.params?.requestType === 'edit') {
                navigation.navigate('FeedEditScreen', {
                    mainTag: inputMainTag,
                    mainTagWidth: mainTagWidth,
                    subTag1: inputSubTag1,
                    subTag1Width: subTag1Width,
                    subTag2: null,
                    tagChange: true,
                })
            }
        } else if (inputMainTag && inputSubTag1 && inputSubTag2) {
            if(route.params?.requestType === 'upload') {
                navigation.navigate('UploadScreen', {
                    mainTag: inputMainTag,
                    mainTagWidth: mainTagWidth,
                    subTag1: inputSubTag1,
                    subTag1Width: subTag1Width,
                    subTag2: inputSubTag2,
                    subTag2Width: subTag2Width,
                    tagChange: true,
                })
            } else if(route.params?.requestType === 'edit') {
                navigation.navigate('FeedEditScreen', {
                    mainTag: inputMainTag,
                    mainTagWidth: mainTagWidth,
                    subTag1: inputSubTag1,
                    subTag1Width: subTag1Width,
                    subTag2: inputSubTag2,
                    subTag2Width: subTag2Width,
                    tagChange: true,
                })
            }
        }
    }

    const removeTag = (tagType: string) => {
        if(tagType === 'subTag1') {
          if(inputSubTag2) {
          const tmpSubTag2 = inputSubTag2;
          const tmpSubTag2Width = subTag2Width;
          setInputSubTag1(tmpSubTag2);
          setSubTag1Width(tmpSubTag2Width)
          setInputSubTag2(null);
          setInputingMainTag(false);
          setInputingSubTag1(false);
          setInputingSubTag2(true);
          setInputingSubTag2Text(null)
        } else {
          setInputSubTag1(null);
          setInputingMainTag(false);
          setInputingSubTag1(true);
          setInputingSubTag2(false);
          setInputingSubTag1Text(null)
        } 
        } else if(tagType === 'subTag2') {
            setInputSubTag2(null);
            setInputingMainTag(false);
            setInputingSubTag1(false);
            setInputingSubTag2(true);
            setInputingSubTag2Text(null)
        }
    }

    const modifyTag = (tagType: string) => {
        if(tagType === 'mainTag') {
            setInputingMainTag(true);
            setInputingSubTag1(false);
            setInputingSubTag2(false);
            setInputingMainTag(inputMainTag)
        } else if(tagType === 'subTag1') {
            setInputingMainTag(false);
            setInputingSubTag1(true);
            setInputingSubTag2(false);
            setInputingSubTag1Text(inputSubTag1)
        } else if(tagType === 'subTag2') {
            setInputingMainTag(false);
            setInputingSubTag1(false);
            setInputingSubTag2(true);
            setInputingSubTag2(inputSubTag2)
        }
    }

    const onSubmitMainTagInput = (event: any) => {
        const tag = event.nativeEvent.text.trim();

        if(tag !== "") {
            setInputMainTag(tag)
            setMainTagExis(true);
            setInputingMainTag(false);
            if(!inputSubTag1) {
                setInputingSubTag1(true)
            }
            if(!inputSubTag2 && inputSubTag1) {
                setInputingSubTag2(true)
            }
            
            var tmpTagList = tagList;
            tmpTagList[0] = tag;
            setTagList(tmpTagList);
            setMainTagWidth(mainTagSize.width);
            setInputingMainTagText2("");
        }
    }

    const onSubmitSubTag1Input = (event: any) => {
        const tag = event.nativeEvent.text.trim();

        if(tag !== "") {
            setInputSubTag1(tag)
            setSubTag1Exis(true)
            setInputingSubTag1(false)
            if(!inputSubTag2) {
                setInputingSubTag2(true)
            }
    
            var tmpTagList = tagList;
            tmpTagList[1] = tag;
            setTagList(tmpTagList);
            setSubTag1Width(subTag1Size.width);
            setInputingSubTag1Text2("");
        }
    }

    const onSubmitSubTag2Input = (event: any) => {
        const tag = event.nativeEvent.text.trim();

        if(tag !== "") {
        setInputSubTag2(tag)
        setSubTag2Exis(true)
        setInputingSubTag2(false)

        var tmpTagList = tagList;
        tmpTagList[2] = tag;
        setTagList(tmpTagList);
        setSubTag2Width(subTag2Size.width);
        setInputingSubTag2Text2("");
        }
    }

    const registerTag = () => {
        if(inputingMainTag) {
            setInputMainTag(inputingMainTagText2)
            setMainTagExis(true);
            setInputingMainTag(false);
            if(!inputSubTag1) {
            setInputingSubTag1(true)
            }
            if(!inputSubTag2 && inputSubTag1) {
            setInputingSubTag2(true)
            }
            var tmpTagList = tagList;
            tmpTagList[0] = inputingMainTagText2;
            setTagList(tmpTagList);
            setMainTagWidth(mainTagSize.width);
            setInputingMainTagText2("");
        } else if(inputingSubTag1) {
            setInputSubTag1(inputingSubTag1Text2)
            setSubTag1Exis(true)
            setInputingSubTag1(false)
            if(!inputSubTag2) {
                setInputingSubTag2(true)
            }
            var tmpTagList = tagList;
            tmpTagList[1] = inputingSubTag1Text2;
            setTagList(tmpTagList);
            setSubTag1Width(subTag1Size.width);
            setInputingSubTag1Text2("")
        } else if(inputingSubTag2) {
            setInputSubTag2(inputingSubTag2Text2)
            setSubTag2Exis(true)
            setInputingSubTag2(false)
            var tmpTagList = tagList;
            tmpTagList[2] = inputingSubTag2Text2;
            setTagList(tmpTagList);
            setSubTag2Width(subTag2Size.width);
            setInputingSubTag2Text2("")
        }
    }

    const renderAutoCompletedTagItem = ({item , index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => selectTag(item)}>
            <TagResultItemContainer>
            <TagNameText
            >{'#' + item.name}</TagNameText>
            <TagReviewNum>{item.reviewNum + "개"}</TagReviewNum>
            </TagResultItemContainer>
            </TouchableWithoutFeedback>
        )
    }

    return (
    <Container>
              <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <CancelText>취소</CancelText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderRightContainer>
                    {/*
                    {!inputMainTag && (
                        <DisabledNextText>다음</DisabledNextText>
                    )}
                    {inputMainTag && (
                        <TouchableWithoutFeedback onPress={() => moveUpload()}>
                        <AbledNextText>다음</AbledNextText>
                        </TouchableWithoutFeedback>
                    )}
                    */}
                    {(inputingMainTagText2?.trim() === "" && inputingSubTag1Text2?.trim() === "" && inputingSubTag2Text2?.trim() === "") && (
                        <DisabledNextText>등록</DisabledNextText>
                    )}
                    {(inputingMainTagText2?.trim() !== "" || inputingSubTag1Text2.trim() !== "" || inputingSubTag2Text2.trim() !== "") && (
                        <TouchableWithoutFeedback onPress={() => registerTag()}>
                        <AbledNextText>등록</AbledNextText>
                        </TouchableWithoutFeedback>
                    )}
                </HeaderRightContainer>
            </HeaderBar>
        <TagContainer>
            <TagInputContainer>
            {inputingMainTag && !inputingSubTag1 && !inputingSubTag2 && (
            <HashTagInputContainer
            >
                <MainHashText>#</MainHashText>
                <MainTagInput
                multiline={false}
                autoCapitalize={"none"}
                placeholder={"메인태그를 입력해주세요"}
                placeholderTextColor={"#267DFF60"}
                value={inputingMainTagText}
                autoFocus={true}
                onChangeText={(text: string) => changeMainTagInput(text)}
                onSubmitEditing={(event: any) => onSubmitMainTagInput(event)}
                />
            </HashTagInputContainer>
            )}
            {inputingSubTag1 && !inputingMainTag && !inputingSubTag2 && (
            <HashTagInputContainer>
                <SubHashText>#</SubHashText>
                <SubTagInput
                multiline={false}
                autoCapitalize={"none"}
                placeholder={"서브태그 입력"}
                placeholderTextColor={"#C6C7CC60"}
                value={inputingSubTag1Text}
                onChangeText={(text:string) => changeSubTag1Input(text)}
                onSubmitEditing={(event: any) => onSubmitSubTag1Input(event)}
                />
            </HashTagInputContainer>
            )}
            {inputingSubTag2 && !inputingMainTag && !inputingSubTag1 && (
            <HashTagInputContainer>
                <SubHashText>#</SubHashText>
                <SubTagInput
                multiline={false}
                autoCapitalize={"none"}
                placeholder={"서브태그 입력"}
                placeholderTextColor={"#C6C7CC60"}
                value={inputingSubTag2Text}
                onChangeText={(text:string) => changeSubTag2Input(text)}
                onSubmitEditing={(event: any) => onSubmitSubTag2Input(event)}/>
            </HashTagInputContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && !inputingMainTag && !inputingSubTag1 && !inputingSubTag2 && (
                <HashTagInputContainer style={{marginTop:5}}>
                    <TagInputFinishText>태그를 모두 입력하셨습니다.</TagInputFinishText>
                </HashTagInputContainer>
            )}
            </TagInputContainer>
            <InputedTagListContainer>
            {inputMainTag && !inputSubTag1 && !inputSubTag2 && (
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && !inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) < wp('87%')) && (
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && !inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) > wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                <InputedTagRowContainer>
                 <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) + (subTag2Width+(32 + wp('4.5%'))) < wp('87%')) && (
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag2")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag2")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%')))  > wp('87%')) && ((subTag1Width+(32 + wp('4.5%'))) + (subTag2Width+(32 + wp('4.5%'))) < wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag2")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag2")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) > wp('87%')) && ((subTag1Width+(32 + wp('4.5%'))) + (subTag2Width+(32 + wp('4.5%'))) > wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}>
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag2")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag2")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) < wp('87%')) && ((mainTagWidth+40) + (subTag1Width+(32 + wp('4.5%'))) + (subTag2Width+(32 + wp('4.5%'))) > wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <TouchableWithoutFeedback onPress={() => modifyTag("mainTag")}> 
                <MainTagBackground>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </MainTagBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => modifyTag("subTag1")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag1")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                </InputedTagRowContainer>
                <InputedTagRowContainer>
               <TouchableWithoutFeedback onPress={() => modifyTag("subTag2")}>
                <SubTagBackground>
                <SubTagNameContainer>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </SubTagNameContainer>
                <TouchableWithoutFeedback onPress={() => removeTag("subTag2")}>
                <TagRemoveContainer>
                <TagRemoveIcon
                source={require('~/Assets/Images/ic_tagRemove.png')}/>
                </TagRemoveContainer>
                </TouchableWithoutFeedback>
                </SubTagBackground>
                </TouchableWithoutFeedback>
                <EmptyRemainderContainer>
                </EmptyRemainderContainer>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            <MaximumTagCountText>태그 최대 3개</MaximumTagCountText>
            </InputedTagListContainer>
        </TagContainer>

        <View style={{position:'absolute', bottom:0}}>
        <View>
        <GetTextWidthContainer>
        </GetTextWidthContainer>
        <TWInputContainer>
        <GetWidthTagText
        onLayout={onMainTagLayout}
              >{"#" + inputingMainTagText}</GetWidthTagText>
        </TWInputContainer>
        </View>
        <View>
        <GetTextWidthContainer>
        </GetTextWidthContainer>
        <TWInputContainer>
        <GetWidthTagText
        onLayout={onSubTag1Layout}
              >{"#" + inputingSubTag1Text}</GetWidthTagText>
        </TWInputContainer>
        </View>
        <View>
        <GetTextWidthContainer>
        </GetTextWidthContainer>
        <TWInputContainer>
        <GetWidthTagText
        onLayout={onSubTag2Layout}
              >{"#" + inputingSubTag2Text}</GetWidthTagText>
        </TWInputContainer>
        </View>
        </View>
        <DivideBorder/>
        {tagAutoCompletedList !== null && (
        <TagResultContainer>
        <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <FlatList
        style={{backgroundColor:'#ffffff', marginTop:10}}
        keyboardShouldPersistTaps="handled"
        data={tagAutoCompletedList?tagAutoCompletedList:[]}
        renderItem={renderAutoCompletedTagItem}/>
        </KeyboardAwareScrollView>
    </TagResultContainer>
        )} 
        {inputMainTag && (
        <WriteButtonContainer>
                <AboveKeyboard>
                <TouchableWithoutFeedback onPress={() => moveUpload()}>
                <AbledWriteButton>
                    <WriteButtonText>글 쓰러가기</WriteButtonText>
                </AbledWriteButton>
                </TouchableWithoutFeedback>
                </AboveKeyboard>
        </WriteButtonContainer>
        )}
        {/*
        {!inputMainTag && (
        <WriteButtonContainer>
                <AboveKeyboard>
                <DisabledWriteButton>
                    <DisabledWriteButtonText>글 쓰러가기</DisabledWriteButtonText>
                </DisabledWriteButton>
                </AboveKeyboard>
        </WriteButtonContainer>
        )}
        */}
    </Container>
    );
}

export default TagSearchScreen;

/*
<View style={{position: "absolute", bottom: 0}}>
<GetTextWidthContainer>
</GetTextWidthContainer>
<TWInputContainer>
<GetWidthMainTagText
        onLayout={(nativeEvent) => {
            console.log("get mainTag width", nativeEvent.nativeEvent)
            if(nativeEvent.nativeEvent.layout.width > wp('90%'))
            {
                console.log("wp(91%)", wp('91%'));
                var lastLineWidth = nativeEvent.nativeEvent.layout.width - wp('90%');
                console.log("lastLineWidth", lastLineWidth)
                setTimeout(() => {
                    setLastLineWidth(lastLineWidth+ 15)
                }, 50)
                
            } else {
                setLastLineWidth(nativeEvent.nativeEvent.layout.width)
            }
             }}
        >{"#" + inputMainTag}</GetWidthMainTagText>
        </TWInputContainer>
        </View>
*/

/*
<TagInputContainer>      
{!inputMainTag && (
<InputContainer>
<MainHashText>#</MainHashText>
<MainTagInput
multiline={true}
allowFontScaling={true}
autoCapitalize={false}
placeholder={"태그를 입력해주세요"}
placeholderTextColor="#3384FF60"
autoFocus={true}
onChangeText={(text: string) => changeMainTagInput(text)}
/>
</InputContainer>
)}
{inputMainTag && !inputSubTag1 && (
    <InputContainer>
   <MainTagText
    onLayout={(nativeEvent) => {
        console.log("nativeEvent.nativeEvent", nativeEvent.nativeEvent)
        setLastLineWidth(nativeEvent.nativeEvent.layout.width)
    }}
    >{"#" + inputMainTag}</MainTagText>
    <SubTagInputContainer>
<SubHashText>#</SubHashText>
    <SubTag1Input
    multiline={true}
    allowFontScaling={true}
    autoCapitalize={false}
    placeholder={"태그추가"}
    value={"   " + inputSubTag1}
    placeholderTextColor="#cccccc90"
    onChangeText={(text: string) => changeSubTag1Input(text)}
    />
    </SubTagInputContainer>
    </InputContainer>
)}
{inputMainTag && inputSubTag1 && !inputSubTag2 && (
    <InputContainer>
    <MainTagText>{'#' + inputMainTag}</MainTagText>
    </InputContainer>
)}

</TagInputContainer>
*/
