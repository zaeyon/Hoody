import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, TextInput ,Keyboard, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native'
import GetAutoComplete from '~/Route/Search/GetAutoComplete';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 20px 20px 15px 20px;
 align-items: center;
 justify-content: center;
`;

const CancleText = Styled.Text`
 font-size: ${wp('4.5%')};
 color: #cccccc;
`;

const HeaderRightContainer = Styled.View`
 padding-right: 20px;
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


const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 10px 20px 0px 20px;
`;

const TagContainer = Styled.View`
width: ${wp('90%')};
justify-content: center;
align-items: center;
padding-bottom: 10px;
`;

const TagInputContainer = Styled.View`
flex-direction: row;
padding-top:10px;
`;

const InputedTagListContainer = Styled.View`
width: ${wp('90%')};
padding-top: 2px;
padding-bottom: 0px;
flex-direction: row;
`;

const HashTagInputContainer = Styled.View`
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
font-size: 23px;
font-weight: bold;
width: ${wp('90%')};
color: #3384FF;
`;

const SubTagInput = Styled.TextInput`
font-size: 23px
font-weight: bold;
width: ${wp('90%')};
color: #cccccc;
`;

const MainHashText = Styled.Text`
 margin-top: 4px;
 font-size: 23px;
 color: #3384FF;
 font-weight: bold;
 opacity: 0.4;
`;

const SubHashText = Styled.Text`
 margin-top: 4px;
 font-size: 23px;
 color: #CCCCCC;
 font-weight: bold;
 opacity: 0.7;
`;

const MainTagText = Styled.Text`
color: #3384FF;
font-size: 23px;
font-weight: bold;
flex-direction: row;
flex-wrap: wrap;
`;

const GetWidthTagText = Styled.Text`
color: #ffffff;
font-size: 23px;
font-weight: bold;
background-color:#ffffff;

`;

const SubTagText = Styled.Text`
color: #cccccc;
font-size: 23px;
font-weight: bold;
flex-directionL row;
flex-wrap: wrap;
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
 height: 5px;
 background-color: #F3F3F3;
`;

const TagResultContainer = Styled.View`
padding: 15px; 15px 15px 15px;
border-color: #c3c3c3;
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
 font-size: ${wp('4.5%')};
 color: #cccccc;
`;

const AbledNextText = Styled.Text`
 font-size: ${wp('4.5%')};
 color: #cccccc;
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
    const [tagAutoCompleteArray, setTagAutoCompleteArray] = useState([]);
    const [inputMainTag, setInputMainTag] = useState<string>();
    const [inputSubTag1, setInputSubTag1] = useState<string>();
    const [inputSubTag2, setInputSubTag2] = useState<string>();
    const [firstTagResult, setFirstTagResult] = useState([]);
    const [tagType, setTagType] = useState();
    const [tagList, setTagList] = useState<Array<string>>([]);

    const [mainTagExis, setMainTagExis] = useState<boolean>(false);
    const [subTag1Exis, setSubTag1Exis] = useState<boolean>(false);
    const [subTag2Exis, setSubTag2Exis] = useState<boolean>(false);
    const [lastLineWidth, setLastLineWidth] = useState<number>();

    const [inputingMainTag, setInputingMainTag] = useState<boolean>(true);
    const [inputingSubTag1, setInputingSubTag1] = useState<boolean>(false);
    const [inputingSubTag2, setInputingSubTag2] = useState<boolean>(false);

    const [inputingMainTagText, setInputingMainTagText] = useState<string>();
    const [inputingSubTag1Text, setInputingSubTag1Text] = useState<string>();
    const [inputingSubTag2Text, setInputingSubTag2Text] = useState<string>();

    const [mainTagWidth, setMainTagWidth] = useState<number>();
    const [subTag1Width, setSubTag1Width] = useState<number>();
    const [subTag2Width, setSubTag2Width] = useState<number>();

    

    const useMainTagComponentSize = () => {
        const [mainTagSize, setMainTagSize] = useState(null);
      
        const onMainTagLayout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          setMainTagSize({ width, height });
        }, []);

        console.log("mainTagSize", mainTagSize);

        return [mainTagSize, onMainTagLayout];
      };


    const useSubTag1ComponentSize = () => {
        const [subTag1Size, setSubTag1Size] = useState(null);
      
        const onSubTag1Layout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          setSubTag1Size({ width, height });
        }, []);

        console.log("subTag1Size", subTag1Size);

        return [subTag1Size, onSubTag1Layout];
      };

    const useSubTag2ComponentSize = () => {
        const [subTag2Size, setSubTag2Size] = useState(null);
      
        const onSubTag2Layout = useCallback(event => {
          const { width, height } = event.nativeEvent.layout;
          setSubTag2Size({ width, height });
        }, []);

        console.log("subTag2Size", subTag2Size);

        return [subTag2Size, onSubTag2Layout];
      };  
 
 
    const [mainTagSize, onMainTagLayout] = useMainTagComponentSize();
    const [subTag1Size, onSubTag1Layout] = useSubTag1ComponentSize();
    const [subTag2Size, onSubTag2Layout] = useSubTag2ComponentSize();
;

   // const [subTag1Size, subTag1OnLayout] = useTagComponentSize();
   // const [subTag2Size, subTag2OnLayout] = useTagComponentSize();
    
    useEffect(() => {
        if(route.params?.tagType) {
            setTagType(route.params.tagType)
            console.log("태그타입", route.params.tagType);
        }
    }, [route.params?.tagType])

    const selectTag = (item) => {
        console.log("item", item);
        navigation.navigate("UploadScreen", {
            selectTagName: item.name,
            selectTagType: tagType
        })
    }

    const changeMainTagInput = (query) => {

        setInputingMainTagText(query);
        
        if(query.search(/\s/) != -1) {

            console.log("공백 존재")
            query.trim();
            setInputMainTag(query)
            setMainTagExis(true);
            setInputingMainTag(false);
            setInputingSubTag1(true)
            var tmpTagList = tagList;
            tmpTagList[0] = query;
            setTagList(tmpTagList);

            console.log("메인태그 길이", mainTagSize.width)
            setMainTagWidth(mainTagSize.width);
            
        } else {
        GetAutoComplete(query, "tag")
        .then(function(response) {
            console.log("태그 자동완성", response.result[0])
            setFirstTagResult(response.result[0]);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
        }
    
    }


    const changeSubTag1Input = (query) => {

        setInputingSubTag1Text(query);

        console.log("inputingSubTag1", inputingSubTag1);

        if(query.search(/\s/) != -1) {
            query.trim();
            console.log("공백 존재")
            setInputSubTag1(query)
            setSubTag1Exis(true)
            setInputingSubTag1(false)
            setInputingSubTag2(true)
            var tmpTagList = tagList;
            tmpTagList[1] = query;
            setTagList(tmpTagList);

            console.log("서브태그 길이", subTag1Size.width)
            setSubTag1Width(subTag1Size.width);
        
        } else {
        GetAutoComplete(query, "tag")
        .then(function(response) {
            console.log("태그 자동완성", response.result[0])
            setFirstTagResult(response.result[0]);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
        }   
    }

    const changeSubTag2Input = (query) => {

        setInputingSubTag2Text(query);

        if(query.search(/\s/) != -1) {
            query.trim();
            console.log("공백 존재")
        
            setInputSubTag2(query)
            setSubTag2Exis(true)
            setInputingSubTag2(false)
            var tmpTagList = tagList;
            tmpTagList[2] = query;
            setTagList(tmpTagList);

            console.log("서브태그2 길이", subTag2Size.width);
            setSubTag2Width(subTag2Size.width);
        
        } else {
        GetAutoComplete(query, "tag")
        .then(function(response) {
            console.log("태그 자동완성", response.result[0])
            setFirstTagResult(response.result[0]);
        })
        .catch(function(error) {
            console.log("태그 자동완성 실패", error);
        })
        }  
    }

    const submitTagInput = (name: string, type: string) => {
        if(type === "main") setInputMainTag(name)
    }

    const renderInputedTagItem = ({item, index}) => {
        if(index === 0) {
            return (
                <MainTagText>{"#" + item}</MainTagText>
            )
        } else {
            return (
                <SubTagText>{"#" + item}</SubTagText>
                
            )
        }
    }

    return (
    <Container>
              <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <CancleText>취소</CancleText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderRightContainer>
                    <DisabledNextText>다음</DisabledNextText>
                </HeaderRightContainer>
            </HeaderBar>
        <TagContainer>
            <TagInputContainer>
            {inputingMainTag && !inputingSubTag1 && !inputingSubTag2 && (
            <HashTagInputContainer
            >
                <MainHashText>#</MainHashText>
                <MainTagInput
                multiline={true}
                autoCapitalize={false}
                placeholder={"메인태그를 입력해주세요"}
                placeholderTextColor={"#3384FF60"}
                value={inputMainTag}
                onChangeText={(text:string) => changeMainTagInput(text)}
                />
            </HashTagInputContainer>
            )}
            {inputingSubTag1 && !inputingMainTag && !inputingSubTag2 && (
            <HashTagInputContainer>
                <SubHashText>#</SubHashText>
                <SubTagInput
                multiline={true}
                autoCapitalize={false}
                placeholder={"서브태그 입력"}
                value={inputSubTag1}
                onChangeText={(text:string) => changeSubTag1Input(text)}
                />
            </HashTagInputContainer>
            )}
            {inputingSubTag2 && !inputingMainTag && !inputingSubTag1 && (
            <HashTagInputContainer>
                <SubHashText>#</SubHashText>
                <SubTagInput
                multiline={true}
                autoCapitalize={false}
                placeholder={"서브태그 입력"}
                value={inputSubTag2}
                onChangeText={(text:string) => changeSubTag2Input(text)}/>
            </HashTagInputContainer>

            )}
            </TagInputContainer>
            <InputedTagListContainer>
            {inputMainTag && !inputSubTag1 && !inputSubTag2 && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && !inputSubTag2 && (mainTagWidth + subTag1Width < wp('87%')) && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && !inputSubTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && (mainTagWidth + subTag1Width + subTag2Width < wp('87%')) && (
                <InputedTagRowContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </InputedTagRowContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (subTag1Width + subTag2Width < wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <InputedTagRowContainer>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </InputedTagRowContainer>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && (mainTagWidth + subTag1Width > wp('87%')) && (subTag1Width + subTag2Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </InputedTagColumnContainer>
            )}
            {inputMainTag && inputSubTag1 && inputSubTag2 && (mainTagWidth + subTag1Width < wp('87%')) && (subTag1Width + subTag2Width > wp('87%')) && (
                <InputedTagColumnContainer>
                <InputedTagRowContainer>
                <MainTagText>{"#" + inputMainTag}</MainTagText>
                <SubTagText>{"#" + inputSubTag1}</SubTagText>
                </InputedTagRowContainer>
                <SubTagText>{"#" + inputSubTag2}</SubTagText>
                </InputedTagColumnContainer>
            )}
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
        <TagResultContainer>
            <FlatList
            keyboardShouldPersistTaps="handled"
            data={RESULT_DATA_TEST}
            renderItem={({item, index}) => {
            return (
            <TouchableWithoutFeedback onPress={() => selectTag(item)}>
            <TagResultItemContainer>
            <TagNameText>{'#' + item.name}</TagNameText>
            <TagReviewNum>{item.reviewNum + "개"}</TagReviewNum>
            </TagResultItemContainer>
            </TouchableWithoutFeedback>
            )
            }}/>
        </TagResultContainer>
        
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
