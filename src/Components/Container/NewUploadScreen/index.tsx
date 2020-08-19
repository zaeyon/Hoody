import React, {useEffect, useState, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, ScrollView, View, FlatList, TouchableWithoutFeedback, Alert, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AboveKeyboard from 'react-native-above-keyboard';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionSheet from 'react-native-actionsheet'
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

// Local Components
import {Rating} from '~/Components/Presentational/UploadScreen/Rating';
import ProductItem from '~/Components/Presentational/UploadScreen/ProductItem';

// Route
import PostUpload from '~/Route/Post/Upload';
import POSTProductUrl from '~/Route/Post/POSTProductUrl';
import GETSearchAutoComplete from '~/Route/Search/GETSearchAutoComplete';

const ratingImage = require('~/Assets/Images/ic_star4.png');

const actionSheetRef = createRef();


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderTagPlaceholderContainer = Styled.View`
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderBarCover = Styled.View`
position: absolute;
width: ${wp('100%')};
height: ${hp('100%')};
background-color: #000000;
opacity: 0.25;
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
 padding-bottom: 8px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const TempoSaveText = Styled.Text`
 font-size: 17px;
 color: #267DFF;
`;

const FinishContainer = Styled.View`
 margin-left: 15px;
 border-radius: 20px;
 background-color: #3384ff;
 padding: 6px 12px 7px 12px;
`;


const DisabledFinishContainer = Styled.View`
 margin-left: 15px;
 border-radius: 20px;
 background-color: #3384ff;
 padding: 6px 12px 7px 12px;
 opacity: 0.3;
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
 margin-right: 5px;
`;



const SubTagText = Styled.Text`
color: #cccccc;
font-size: 24px;
font-weight: bold;
flex-shrink: 1;
margin-right: 5px;
`;


const TagListContainer = Styled.View`
 flex-direction: row;
 padding : 10px 15px 0px 15px;
 background-color: #ffffff;
`;

const MainTagProcessContainer = Styled.View`
margin-top: 5px;
padding: 0px 15px 0px 15px;
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
font-weight: 500;
font-size: 18px;
color: #8e8e8e;
`;

const RatingContainer = Styled.View`
 margin-left: 5px;
 flex-direction: row;
`;

const AdditionInfoContainer = Styled.View`
`;

const AdditionInfoBottomBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.8px;
 border-color: #f1f1f1;
`;

const ContentContainer = Styled.View`
 width:${wp('100%')};
 padding-bottom: 10px;
`;

const MetaInfoContainer = Styled.View`
 width: ${wp('100%')};
 margin-top: 7px;
 padding: 0px 15px 10px 15px;
 flex-direction: column;
 border-bottom-width: 0.8px;
 border-color: #f1f1f1;
`;

const RatingExpenseContainer = Styled.View`
width:${wp('92%')};
flex-direction: row;
`;

const LocationSpendDateContainer = Styled.View`
padding-top: 5px;
flex-direction: row;
align-items: center;
`;

const ConsumptionDateContainer = Styled.View`
padding-bottom: 0px;
`;


const AdditionInfoContainerCover = Styled.View`
position: absolute;
width: ${wp('100%')};
height: ${hp('13%')};
flex: 1;
background-color: #000000;
opacity: 0.25;
`;

const InputedRatingContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
`;

const InputedRatingText = Styled.Text`
 font-size: 15px;
 font-weight: 500;
 color: #56575C;
 margin-top: 2px;
`;

const RatingInner = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const LocationInner = Styled.View`
flex-direction: row;
align-items: center;
`;

const ExpenseInner = Styled.View`
flex-direction: row;
align-items: center;
padding-right: 20px;
`;

const InputedRatingImage = Styled.Text`
`;

const InputedLocationContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const InputedLocationIcon = Styled.Image`
 width: ${wp('6%')};
 height: ${wp('6%')};
`;

const InputedLocationText = Styled.Text`
font-size: 15px;
color: #8E9199;
`;

const InputedExpenseContainer = Styled.View`
 margin-left: 15px;
 flex-direction: row;
 flex-shrink: 1;
`;

const InputedExpenseIcon = Styled.Image`
 width: ${wp('6%')};
 height: ${wp('6%')};
 tint-color: #56575C;

`;

const InputedExpenseText = Styled.Text`
font-size: 15px;
font-weight: 500;
color: #56575C;
 flex-shrink: 1;
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
 margin-left: ${wp('4.5%')};
 width: ${wp('91%')};
 height: 44px;
 background-color: #FAFAFA;
 border-radius: 22px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding-left: 20px;
 padding-right: 20px;
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

const BottomMenuSettingIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #65A2FF;
`;


const BottomMenuLocationIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const BottomMenuExpenseIcon = Styled.Image`
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
 border-color: #eeeeee;
 padding: 10px 15px 150px 15px;
`;

const NewDescripInput = Styled.TextInput`
 font-size: 17px;
 color: #4b4b4b;
 padding-bottom: 10px;
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
flex-direction: row;
justify-content: space-between;
`;

const ProductParagraphContainer = Styled.View`
width: ${wp('100%')};
flex-direction: row;
justify-content: space-between;
`;

const ImageParagraphContainer = Styled.View`
width: ${wp('100%')};
flex-direction: row;
justify-content: space-between;
`;

const ParagraphImage = Styled.Image`
width: ${wp('87%')};
height: ${wp('87%')};
`;



const ParagraphContainer = Styled.View`
border-bottom-width: 0.2px;
border-top-width: 0.2px;
border-color: #eeeeee;
`;


const ParagraphBottomBorder = Styled.View`
 border-bottom-width: 0.3px;
 border-color: #eeeeee;
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
padding-right: 5px;
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

const ExpenseInputContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')}
 height: ${hp('5.4%')};
 bottom: 0px;
 background-color: #EFEFEF;
`;

const ExpenseInputKeyboardContainer = Styled.View`
 flex-direction: row;
 position: absolute;
 bottom: 0px;
 background-color: #EFEFEF;
 width: ${wp('100%')}
 height: ${hp('7.4%')};
 justify-content: space-around;
 align-items: center;
 padding-left: 8px;
 padding-right: 9px;
`;

const ExpenseInput = Styled.TextInput`
 width: ${wp('78.5%')};
 height: ${hp('5%')};
 background-color: #ffffff;
 border-radius: 5px;
 font-size: 24px;
 font-weight: 600;
`;

const MoneyContainer = Styled.View`

`;

const MoneyText = Styled.Text`
color: #3384FF;
font-size: 24px;
font-weight: 600;
position: absolute;
left: 0;
margin-left: 15px;
`;

const ExpenseInputTextContainer = Styled.View`
 align-items: center;
 justify-content: center;
`;

const ExpenseInputWonContainer = Styled.View`
align-items: center;
justify-content: center;
`;

const ExpenseInputText = Styled.Text`
font-size: 20px;
font-weight: 600;
color: #7e7e7e;
`;

const WonText = Styled.Text`
position: absolute;
right: 10;
font-size: 20px;
color: #cccccc;
`;

const DescripModalContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 padding: 20px 15px 20px 15px;
`;

const DescripPlaceholder = Styled.Text`
 color: #cccccc;
 font-size: 17px;
`;


const DescripInput = Styled.TextInput`
 font-size: 17px;
 color: #4b4b4b;
 padding-bottom: 10px;
`;

const DescripModalBottomBarContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('5.7%')};
 background-color: #FAFAFA;
 position: absolute;
 bottom: 0px;
`;

const DescripModalBottomBar = Styled.View`
width: ${wp('100%')};
height: ${hp('5.3%')};
background-color: #FAFAFA;
flex-direction: row;
justify-content: space-between;
`;

const RemoveDescripIcon = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const RemoveDescripContainer = Styled.View`
align-items: center;
justify-content: center;
padding-left: 12px;
padding-right: 12px;
`;

const FinishDescripContainer = Styled.View`
align-items: center;
justify-content: center;
padding-right: 12px;
padding-left: 12px;

`;

const DisabledFinishDescripText = Styled.Text`
 color: #cccccc;
 font-size: 17px;
`;

const AbledFinishDescripText = Styled.Text`
color: #3384FF;
 font-size: 17px;
`;

const CancelModifyDescripText = Styled.Text`
 color: #707070;
 font-size: 17px;
`;

const CancelModifyDescripContainer = Styled.View`
 justify-content: center;
 align-items: center;
`;

const ConsumptionDatePickerContainer = Styled.View`
 width: ${wp('100%')};
 background-color:#ffffff;
 position: absolute;
 bottom: 0;
`;

const ConsumptionDatePickerHeaderBar = Styled.View`
width: ${wp('100%')};
height: ${hp('5.3%')};
background-color: #FAFAFA;
flex-direction: row;
justify-content: space-between;
`;

const DatePickerHeaderBarRightContainer = Styled.View`
 flex-direction: row;
`;


const FinishDatePickerText = Styled.Text`
color: #3384FF;
 font-size: 17px;
`;

const FinishDatePickerContainer = Styled.View`
justify-content: center;
align-items: center;
padding-right: 12px;
`;

const RemoveDatePickerContainer = Styled.View`
 justify-content: center;
 align-items: center;
 margin-right: 10px;
`;

const CancelDatePickerContainer = Styled.View`
justify-content: center;
align-items: center;
padding-left: 12px;
`;


const CancelDatePickerText = Styled.Text`
font-size: 17px;
color: #cccccc;
`;

const RemoveDatePickerText = Styled.Text`
font-size: 17px;
color: #E90000;
`;

const ConsumptionDateText = Styled.Text`
font-size: 15px;
color: #8E9199;
`;


const RatingStarImage = Styled.Image`
 width: ${wp('4.3%')};
 height: ${wp('4.3%')};
`;

const SettingModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('56.5%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
`;

const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 10px;
 align-items: center;
`;

const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;

const SettingModalTitleContainer = Styled.View`
 width: ${wp('100%')};
 padding-top: 14px;
 padding-bottom: 14px;
 align-items: center;
`;

const SettingModalTitleText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #1D1E1F; 
`;

const RadioTabContainer = Styled.View`
height: ${wp('15%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const RadioTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
padding-top: 15px;
justify-content: space-between;
border-top-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const RadioButtonContainer = Styled.View`
position: absolute;
top: 18px;
right: 0;
`;


const bottomActionOptions = [
    '취소',
    <Text style={{color: 'red'}}>삭제</Text>
]


interface Props {
    navigation: any,
    route: any,
}

const NewUploadScreen = ({navigation, route}: Props) => {
    
const convertDateFormat = (date: any) => {
    var tmpDate = new Date(date),
    month = '' + (tmpDate.getMonth() + 1),
    day = '' + (tmpDate.getDate()),
    year = tmpDate.getFullYear();

    if(month.length < 2) month = '0' + month;
    if(day.length < 2) day = '0' + day;

    return [year, month, day].join('. ');

}

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
    const [MetaContainerHeight, setMetaContainerHeight] = useState<number>(0);
    const [visibleBottomMenuBar, setVisibleBottomMenuBar] = useState<boolean>(true);
    const [registerProductBool, setRegisterProductBool] = useState<boolean>(false);


    // 후기 설정 관련 state
    const [certifiedLocation, setCertifiedLocation] = useState<boolean>(false);
    const [openState, setOpenState] = useState<boolean>(true);
    const [temporarySave, setTemporarySave] = useState<boolean>(false);

    //후기 정보 관련 state
    const [rating, setRating] = useState<string>();
    const [inputingRating, setInputingRating] = useState<string>("??");
    const [incompleteMainTag, setIncompleteMainTag] = useState<string>();
    const [mainTag, setMainTag] = useState<string>();
    const [subTag1, setSubTag1] = useState<string>();
    const [subTag2, setSubTag2] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [longitude, setLongitude] = useState<number>();
    const [latitude, setLatitude] = useState<number>();
    const [expense, setExpense] = useState<string>();
    const [tagList, setTagList] = useState<Array<string>>();
    const [allTagText, setAllTagText] = useState<string>();
    const [product, setProduct] = useState<object>();
    const [mediaArray, setMediaArray] = useState<Array<object>>([]);

    const [mainTagExis, setMainTagExis] = useState<boolean>(false);
    const [subTag1Exis, setSubTag1Exis] = useState<boolean>(false);
    const [subTag2Exis, setSubTag2Exis] = useState<boolean>(false);



    // toggle input expense
    const [visibleExpenseInput, setVisibleExpenseInput] = useState<boolean>(false);
    const [inputingExpenseText, setInputingExpenseText] = useState<string>();
    const [moneyText, setMoneyText] = useState();
    const [completePrice, setCompletePrice] = useState();

    // toggle Consumption date picker
    const [visibleConsumptionDatePicker, setVisibleConsumptionDatePicker] = useState<boolean>(false);
    const [consumptionDate, setConsumptionDate] = useState(new Date());
    const [consumptionDateStr, setConsumptionDateStr] = useState<string>(convertDateFormat(new Date()));
    
    // Paragraph 관련 state
    const [paragraphData, setParagraphData] = useState<Array<object>>([]);
    const [inputingNewDescripBool, setInputingNewDescripBool] = useState<boolean>(false);
    const [paragraphHeight, setParagraphHeight] = useState<number>(0);
    const [modifingDescripIndex, setModifingDescripIndex] = useState<number>(-1);

    // Inputing Descript Paragraph Modal
    const [visibleDescripModal, setVisibleDescripModal] = useState<boolean>(false);
    const [descripModalInputText, setDescripModalInputText] = useState<string>(null);
    const [paragraphChange, setParagraphChange] = useState<boolean>(false);

    // Setting
    const [visibleSettingModal, setVisibleSettingModal] = useState<boolean>(false);
    const [selectedOpenRadioIndex, setSelectedOpenRadioIndex] = useState<number>(0);

    // useRef
    const newDescripInput = useRef(null);
    const scrollViewRef = useRef(null);
    const draggableFlatListRef = useRef(null);
    const expenseInput = useRef(null);

    const [AdditionInfoContainerHeight, setAdditionInfoContainerHeight] = useState<number>();

     var focusingNewDescripInput = false;
     var inputingNewDescripText = "";
     var selectingParagraphIndex : number;


    var radio_props = [
        {label: '전체공개', value: 0 },
        {label: '비공개', value: 1},
      ];

     useEffect(() => {
         if(route.params?.selectedImages) {
             console.log("route.params?.selecteddddd", route.params.selectedImages)
             var tmpParagraphData = paragraphData;

             for(var i = 0; i < route.params.selectedImages.length; i++) {
                 const newImagePara = {
                    index: tmpParagraphData.length,  
                    type: 'image',
                    uri: route.params.selectedImages[i].uri,
                    image: route.params.selectedImages[i],
                 }

                 tmpParagraphData.push(newImagePara);
             }

             setTimeout(() => {
                 setParagraphData(tmpParagraphData);
                 setParagraphChange(!paragraphChange)
             }, 100)
         }
     }, [route.params?.selectedImages])


     useEffect(() => {
         if(route.params?.removeLocation) {
             setLocation(null)
         }
     }, [route.params?.removeLocation])


     useEffect(() => {
         if(route.params?.product) {
             console.log("product", route.params.product)
             var tmpParagraphData = paragraphData;
             var newProductPara = {
                index: paragraphData.length,
                type: "product",
                product: route.params.product,
                description: route.params.product.description,
                favicon: route.params.product.favicon,
                image: route.params.product.image,
                site: route.params.product.site,
                title: route.params.product.title,
                url: route.params.product.url,
                }

                setRegisterProductBool(!registerProductBool);
                tmpParagraphData.push(newProductPara);
                setParagraphData(tmpParagraphData);
           }
     }, [route.params?.product])
 

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
 console.log("입력된 태그 변경!!")
        if(route.params?.mainTag && !route.params?.subTag1 && !route.params?.subTag2) {

            setMainTagExis(true);
            setSubTag1Exis(false);
            setSubTag2Exis(false);

            if(route.params?.mainTag !== mainTag) {
                console.log("메인태그만존재")
                setMainTagProcess(true);
                setMainTag(route.params.mainTag);
                setIncompleteMainTag(route.params.mainTag)
                setMainTagWidth(route.params.mainTagWidth);
                setAllTagText(route.params.mainTag);
                setSubTag1(undefined)
                setSubTag2(undefined)
            } else {
                console.log("메인태그 일치")
                setMainTag(route.params.mainTag);
                setSubTag1(undefined)
                setSubTag2(undefined)
            }
        } else if(route.params?.mainTag && route.params?.subTag1 && !route.params?.subTag2) { 
            
            setMainTagExis(true);
            setSubTag1Exis(true);
            setSubTag2Exis(false);

            console.log("메인태그 존재22", route.params.mainTag);
            console.log("서브태그1 존재", route.params.subTag1);

            setSubTag1(route.params.subTag1)
            setSubTag1Width(route.params.subTag1Width);
            setIncompleteMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            if(route.params?.mainTag !== mainTag) {
                setMainTagProcess(true);
                setIncompleteMainTag(route.params.mainTag)
                setMainTag(route.params.mainTag);
            }
            setMainTag(route.params.mainTag);
            setAllTagText(route.params.mainTag + " " + route.params.subTag1);
            setSubTag2(undefined)
        } else if(route.params?.mainTag && route.params?.subTag1 && route.params?.subTag2) {

            console.log("서브태그2 존재", route.params?.subTag2);
        
            setMainTagExis(true);
            setSubTag1Exis(true);
            setSubTag2Exis(true);

            setSubTag1(route.params.subTag1)
            setSubTag1Width(route.params.subTag1Width);
            setIncompleteMainTag(route.params.mainTag);
            setMainTagWidth(route.params.mainTagWidth);
            setSubTag2(route.params.subTag2);
            setsubTag2Width(route.params.subTag2Width);
            if(route.params?.mainTag !== mainTag) {
                setMainTag(route.params.mainTag);
                setMainTagProcess(true);
                setIncompleteMainTag(route.params.mainTag)
            }
            setMainTag(route.params.mainTag);
            setAllTagText(route.params.mainTag + " " + route.params.subTag1 + " " + route.params.subTag2);
            
        }
    }, [route.params?.mainTag, route.params?.subTag1, route.params?.subTag2])

    useEffect(() => {
        console.log("scrollToEnd paragraphChange");
        if(draggableFlatListRef.current !== null) {
        console.log("scrollToEnd");
        }

    }, [paragraphData])

    
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return ():void => {
            Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
        }
    }, [])

    function onKeyboardDidShow(e: KeyboardEvent): void {
        console.log("onKeyboardDidHide visibleExpenseInput11", visibleExpenseInput)

        if(expenseInput.current !== null) {
            console.log("expenseInput.current.isFocused()", expenseInput.current.isFocused())
        }
    }

    function onKeyboardDidHide(): void {
        console.log("onKeyboardDIdhide");
        console.log("onKeyboardDidHide visibleExpenseInput22", visibleExpenseInput);


        if(expenseInput.current !== null) {
            console.log("expenseInput.current.isFocused()", expenseInput.current.isFocused())
            if(expenseInput.current.isFocused() === false) {
                setVisibleExpenseInput(false);
                setVisibleBottomMenuBar(true)
            }
        }

       
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
            '게시글 작성을 취소하시겠어요?',
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
        GETSearchAutoComplete(query, "tag")
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
        setInputingRating("??");
    }

    const ratingMovling = (rating) => {
        console.log("rating changed", rating)
        if(rating === 0) 
        {
            setInputingRating(rating);
        } else {
            setInputingRating(rating);
        }
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
    if(!mainTag) {
    navigation.navigate("TagSearchScreen",{
        requestType: 'upload'
    })
    } else if(mainTag && !subTag1 && !subTag2) {
        console.log("메인태그길이는뭘까여", mainTagWidth);
        navigation.navigate("TagSearchScreen", {
            mainTag: mainTag,
            mainTagWidth: mainTagWidth,
            requestType: 'upload',
        })
    } else if(mainTag && subTag1 && !subTag2) {
        navigation.navigate("TagSearchScreen", {
            mainTag: mainTag,
            mainTagWidth: mainTagWidth,
            subTag1: subTag1,
            subTag1Width: subTag1Width,
            requestType: 'upload',
        })
    } else if(mainTag && subTag1 && subTag2) {
        navigation.navigate("TagSearchScreen", {
            mainTag: mainTag,
            mainTagWidth: mainTagWidth,
            subTag1: subTag1,
            subTag1Width: subTag1Width,
            subTag2: subTag2,
            subTag2Width: subTag2Width,
            requestType: 'upload',
        })
    }
}

const showDescripModal = () => {
    setVisibleDescripModal(true)
    
    /*
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
    */
}

const onFocusNewDescripInput = (nativeEvent: any) => {
    console.log("onFocusDescripInput nativeEvent", nativeEvent.nativeEvent)
    // setFocusingNewDescripInput(true);
    focusingNewDescripInput = true;
}

const onFocusExpenseInput = () => {
    console.log("visibleExpenseInput", visibleExpenseInput)
}

const onChangeNewDescripInput = (text: string) => {
    // setInputingNewDescripText(text);
    inputingNewDescripText = text;
}


const onChangeDescripModalInput = (text: string) => {
    if(text === "") {
        setDescripModalInputText(null)
    } else {
        setDescripModalInputText(text);
    }

}

const onChangeExpenseInput = (text: string) => {
    if(text === "") {
        setInputingExpenseText(null);
        setMoneyText(null);
    } else {
    text = Number(text);
    var money = text.toLocaleString();
    console.log("money", money);
    console.log("text", text);
    setMoneyText(money);
    setInputingExpenseText(text);
    setExpense(text);
    }
}

const onChangeConsumptionDatePicker = (event, date) => {
    console.log("comsumption date picker date", date)
    setConsumptionDate(date);
}

const changeParagraphOrder = (data: any) => {
    console.log("changed paragraph", data);
    setParagraphData(data);
}

const addConsumptionDate = () => {
    var tmpDate = convertDateFormat(consumptionDate)
    console.log('tmpDate', tmpDate);
    setConsumptionDateStr(tmpDate);
    setVisibleConsumptionDatePicker(false)
    setVisibleBottomMenuBar(true);
}

const clickParagraphContent = (item, index) => {
    setVisibleDescripModal(true);
    console.log("clickParagraphContent item", item.description);
    console.log("clickParagraphContent index", index);
    setDescripModalInputText(item.description);
    setModifingDescripIndex(index);
}

const onEnableScroll = (value: boolean) => {
    setEnableScrollViewScroll(value)
}

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> {children}
    </TouchableWithoutFeedback>
);

const moveGallery = () => {
    navigation.navigate("Gallery", {
        requestType: "upload",
    });
}

const moveLocationSearch = () => {
    navigation.navigate("LocationSearch", {
        inputedLocation: location,
        requestType: "upload",
    })
}

const moveProductUrlSearch = () => {
    navigation.navigate("ProductUrlSearchScreen", {
        requestType: "upload",
    })
}

const toggleInputExpense = () => {
    console.log("toggleInputExpense")
    console.log("inputingExpenseInput", inputingExpenseText)
    console.log("typeof", typeof(inputingExpenseText))
    setVisibleExpenseInput(!visibleExpenseInput)
    setVisibleBottomMenuBar(false);
}

const toggleConsumptionDatePicker = () => {
    console.log("toggleConsumptionDatePicker")
    setVisibleConsumptionDatePicker(!visibleConsumptionDatePicker);
    setVisibleBottomMenuBar(false);
    setVisibleExpenseInput(false);
    setVisibleDescripModal(false);
}

const touchBackground = () => {
    if(visibleExpenseInput) {
    setVisibleExpenseInput(false)
    setVisibleBottomMenuBar(true)
    Keyboard.dismiss();
    }
}

const addExpense = () => {
    setCompletePrice(moneyText);
    setVisibleExpenseInput(false);
    setVisibleBottomMenuBar(true);
    //setInputingExpenseText(null);
    console.log("inputingExpenseText", inputingExpenseText)
    expenseInput.current.blur();
}

const finishModifyParagraph = () => {

    if(descripModalInputText !== null)
    {
    var spaceRemovedText = descripModalInputText.replace(/ /g,"")
    var tmpParagraphData = paragraphData;

    if(spaceRemovedText !== "") {
        if(modifingDescripIndex !== -1) {
        console.log("finishModifyParagraoh index", modifingDescripIndex);
        tmpParagraphData[modifingDescripIndex].description = descripModalInputText;
        setParagraphData(tmpParagraphData);
        setModifingDescripIndex(-1);
        } else {
        var newDescripPara = {
            index: paragraphData.length,
            type: "description",
            description: descripModalInputText
            }
            tmpParagraphData.push(newDescripPara);
            setParagraphData(tmpParagraphData);
            }
        setVisibleDescripModal(false);
        setDescripModalInputText(null);
    } else {
        setVisibleDescripModal(false);
        setDescripModalInputText(null);    
    }
    } else {
        setVisibleDescripModal(false);
        setDescripModalInputText(null);
    }
}

const removeDescripParagraph = () => {
    if(modifingDescripIndex !== -1) {
        var tmpParagraphData = paragraphData;
        tmpParagraphData.splice(modifingDescripIndex, 1);
        setParagraphData(tmpParagraphData);
    setVisibleDescripModal(false);
    setDescripModalInputText(null);
    setModifingDescripIndex(-1)
    } else {
        setDescripModalInputText(null);
        setVisibleDescripModal(false);
    }

}

const cancleModifyDescrip = () => {
    setDescripModalInputText(null);
    setVisibleDescripModal(false);
    setModifingDescripIndex(-1);
}

const modifyRating = () => {
    setMainTagProcess(true);
}

const removeConsumptionDate = () => {
    setConsumptionDateStr(null);
    setVisibleConsumptionDatePicker(false);
    setVisibleBottomMenuBar(true)
}

const showBottomActionSheet = (index) => {
    console.log("showBottomActionSheet index", index);
    selectingParagraphIndex = index;
    actionSheetRef.current.show()
}

const removeParagraphIndex = (index) => {
    if(index === 1) {
        console.log("selectingParagraphIndex", selectingParagraphIndex);
        var tmpParagraphData = paragraphData;
        tmpParagraphData.splice(selectingParagraphIndex, 1);

        setParagraphData(tmpParagraphData);
        setParagraphChange(!paragraphChange)
    }
}

const openSettingModal = () => {
    setVisibleSettingModal(true);
}

const onPressRadioButton = (i: number, obj: object) => {
    setSelectedOpenRadioIndex(i);
    console.log("selectedRadioIndex", i);
    if(i === 0) {
        setOpenState(true)
    } else if(i === 1) {
        setOpenState(false);
    }
}

const moveToTemporarySave = () => {
    navigation.navigate("TemporarySaveBoxScreen");
}


const clickToUploadFinish = () => {
  console.log("업로드할 paragraphData", paragraphData);
  var sequence = "";
  var descriptionStr = "";
  var mediaFileArray = new Array();
  var productArray = new Array();
  var descriptionArray = new Array();
  var JSONstringify_productArray;
  var JSONstirngify_descriptionArray;
  var transmitSpendDate = "";

  var tmpDate = new Date(consumptionDate),
  month = '' + (tmpDate.getMonth() + 1),
  day = '' + (tmpDate.getDate()),
  year = tmpDate.getFullYear();
  if(month.length < 2) month = '0' + month;
  if(day.length < 2) day = '0' + day;

  transmitSpendDate = year + "-" + month + "-" + day;

  for(var i = 0; i < paragraphData.length; i++) {
      if(paragraphData[i].type === 'description') {
          sequence = sequence + "D";
          descriptionArray.push(paragraphData[i].description);
      } else if(paragraphData[i].type === 'image') {
          sequence = sequence + "M";
          mediaFileArray.push(paragraphData[i].image);
      } else if(paragraphData[i].type === 'product') {
          sequence = sequence + "P";
          productArray.push(paragraphData[i].product);
      } 
  }

  setTimeout(() => {
      descriptionStr = "[" + descriptionStr + "]";
      console.log("descriptionStr", descriptionStr);
      console.log("sequence", sequence);
      console.log("mediaFileArray", mediaFileArray);
      console.log("productArray", productArray);
      console.log("productArray.toString()", productArray.toString());
      var productArrayStr = productArray.toString();
      console.log("productArrayStr", productArrayStr);
      console.log("JSON.stringify(productArray)", JSON.stringify(productArray));

      JSONstirngify_descriptionArray = JSON.stringify(descriptionArray);
      JSONstringify_productArray = JSON.stringify(productArray);

      console.log("JSONstringify_descriptionArray", JSONstirngify_descriptionArray);
      console.log("JSONstringify_productoArray", JSONstringify_productArray);

      PostUpload(JSONstirngify_descriptionArray, mediaFileArray, mainTag, subTag1, subTag2, rating, expense,location, longitude, latitude, certifiedLocation, temporarySave, sequence, JSONstringify_productArray, transmitSpendDate, openState, subTag1Exis, subTag2Exis)
      .then(function(response) {
          if(response.status === 201) {
              console.log("후기 업로드 성공", response);
              navigation.goBack();
          }
      })
      .catch(function(error) {
          console.log("후기 업로드 실패", error);
      });
  }, 100)
}



const renderDraggableItem = ({item, index, drag, isActive}: any) => {
    if(item.type === 'description') {
        console.log("renderDraggableItem index", index);
        console.log("renderDraggableItem paragraphData.length", paragraphData.length-1);
        return (
            <ParagraphContainer>
            <DescripParagraphContainer>
                <TouchableWithoutFeedback onPress={() => clickParagraphContent(item, index)}>
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
            </ParagraphContainer>
        )
    } else if(item.type === 'product') {
        return (
            <ParagraphContainer>
                <ProductParagraphContainer>
                    <TouchableWithoutFeedback onPress={() => showBottomActionSheet(index)}>
                    <ParagraphContentContainer>
                        <ProductItem
                        productImage={item.image}
                        productName={item.title}
                        productDescription={item.description}
                        shopIcon={item.favicon}
                        shopName={item.site}/>
                    </ParagraphContentContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
                    <ParagraphIconContainer>
                        <ParagraphIcon
                        source={require('~/Assets/Images/ic_paragraph.png')}/>
                    </ParagraphIconContainer>
                </TouchableWithoutFeedback>
                </ProductParagraphContainer>
            </ParagraphContainer>
        )
    } else if(item.type === 'image') {
        return (
            <ParagraphContainer>
                <ImageParagraphContainer>
                    <TouchableWithoutFeedback onPress={() => showBottomActionSheet(index)}>
                        <ParagraphContentContainer>
                            <ParagraphImage
                            source={{uri:item.uri}}/>
                        </ParagraphContentContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
                    <ParagraphIconContainer>
                        <ParagraphIcon
                        source={require('~/Assets/Images/ic_paragraph.png')}/>
                    </ParagraphIconContainer>
                </TouchableWithoutFeedback>
                </ImageParagraphContainer>
            </ParagraphContainer>
        )
    }
}

const renderAddNewDescripInput = () => {
    return (
        <TouchableWithoutFeedback onPress={() => showDescripModal()}>
        <AddDescripContainer>
        {/*
        <NewDescripInput
        ref={newDescripInput}
        placeholder={!paragraphData[0] ? "나의 소비에 이야기를 담아주세요" : ""}
        multiline={true}
        onFocus={(nativeEvent) => onFocusNewDescripInput(nativeEvent)}
        onChangeText={(text:string) => onChangeNewDescripInput(text)}
        editable={false}
        />*/}
        <DescripPlaceholder>나의 소비에 이야기를 담아주세요</DescripPlaceholder>
    </AddDescripContainer>
    </TouchableWithoutFeedback>
    )

    //return footer;
}

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => uploadCancel()}>
                <HeaderLeftContainer>
                    <CancelText>취소</CancelText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderRightContainer>
                    <TouchableWithoutFeedback onPress={() => moveToTemporarySave()}>
                    <TempoSaveText>임시 보관함</TempoSaveText>
                    </TouchableWithoutFeedback>
                        {!mainTag && (
                    <DisabledFinishContainer>
                       <FinishText>완료</FinishText>
                   </DisabledFinishContainer>
                        )}
                        {mainTag && (
                            <TouchableWithoutFeedback onPress={() => clickToUploadFinish()}>
                            <FinishContainer>
                                <FinishText>완료</FinishText>
                            </FinishContainer>
                            </TouchableWithoutFeedback>
                        )}
                </HeaderRightContainer>
            </HeaderBar>
            {visibleDescripModal && (
<HeaderBarCover>     
</HeaderBarCover>
            )}
            <BodyContainer>
                <AdditionInfoContainer
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    setMetaContainerHeight(layout.height);
                }}> 
                <TouchableWithoutFeedback onPress={() => moveTagSearch()}>
                <TagListContainer>
                {!incompleteMainTag && (
                    <TagInputPlaceholder>
                    {"#태그를 입력해주세요."}
                </TagInputPlaceholder>
                )}
                {incompleteMainTag && !mainTag && (
                    <MainTagText>
                        {"#" + incompleteMainTag}
                        { subTag1 && (
                            <SubTagText>{" #" + subTag1}</SubTagText>
                        )}
                        {subTag2 && (
                            <SubTagText>{' #' + subTag2}</SubTagText>
                        )}
                        </MainTagText>
                )}    
                 {mainTag && (
                    <MainTagText>
                        {"#" + mainTag}
                        { subTag1 && (
                            <SubTagText>{" #" + subTag1}</SubTagText>
                        )}
                        { !subTag1 && (
                            <SubTagText style={{
                                opacity:0.3
                            }}>{" #태그추가"}</SubTagText>

                        )}
                        {subTag2 && (
                            <SubTagText>{' #' + subTag2}</SubTagText>
                        )}
                        {subTag1 && !subTag2 && (
                            <SubTagText style={{
                                opacity:0.3
                            }}>{" #태그추가"}</SubTagText>

                        )}
                        </MainTagText>
                 )}  
                </TagListContainer>
                </TouchableWithoutFeedback>
                
                {mainTagProcess && (
                    <MainTagProcessContainer>
                        <RatingInductionText>{"#" + incompleteMainTag  + "은(는) 몇 점인가요?"}</RatingInductionText>
                        <RatingInputContainer>
                            <TouchableWithoutFeedback onPress={() => setMainTagProcess(false)}>
                            <RatingTextContainer>
                                <Text style={{fontWeight:"bold", color: '#8e8e8e', fontSize: 18}}>{inputingRating+"점"}</Text>
                            
                            {/*!rating && (
                                <Text style={{fontWeight:"bold", color: '#cccccc', fontSize: 18}}>{"??점"}</Text>
                            )*/}
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
                    <RatingExpenseContainer>
                    <TouchableWithoutFeedback onPress={() => modifyRating()}>
                    <InputedRatingContainer>
                    <RatingInner>
                    <RatingStarImage
                    source={require('~/Assets/Images/ic_newStar.png')}/>
                    <InputedRatingText style={{marginLeft: 3}}
                    >{rating+"점"}</InputedRatingText>
                        </RatingInner>
                    </InputedRatingContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toggleInputExpense()}>
                    <InputedExpenseContainer>
                    <ExpenseInner>
                    <InputedExpenseIcon
                    source={require('~/Assets/Images/ic_expense_outline.png')}/>
                    <InputedExpenseText>{completePrice ? completePrice + "원" : "소비금액"}</InputedExpenseText>
                    </ExpenseInner>
                    </InputedExpenseContainer>
                    </TouchableWithoutFeedback>
                    </RatingExpenseContainer>
                    <LocationSpendDateContainer>        
                    <TouchableWithoutFeedback onPress={() => moveLocationSearch()}>
                    <InputedLocationContainer>
                    <LocationInner>
                    <InputedLocationText>
                    {location || "위치"}</InputedLocationText>
                    </LocationInner>
                    </InputedLocationContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toggleConsumptionDatePicker()}>
                    <ConsumptionDateContainer>
                    <ConsumptionDateText>{" · 소비날짜 " + consumptionDateStr}</ConsumptionDateText>
                </ConsumptionDateContainer>
                </TouchableWithoutFeedback>
                </LocationSpendDateContainer>
                    </MetaInfoContainer>
                )}
                </AdditionInfoContainer>
                {visibleDescripModal && (
                <AdditionInfoContainerCover style={{height: MetaContainerHeight}}>
                </AdditionInfoContainerCover>
                )}
                {mainTag && !mainTagProcess && !visibleDescripModal && (
                    <KeyboardAwareScrollView
                    scrollEnabled={enableScrollViewScroll}
                    ref={scrollViewRef}
                    >
                <ContentContainer>
                        <DraggableFlatList
                        showsVerticalScrollIndicator={false}
                        style={{width:wp('100%'), height:(hp('100%')-(hp('6.5%') + MetaContainerHeight))}}
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
                {visibleDescripModal && (
                <DescripModalContainer>
                    <DescripInput
                    multiline={true}
                    autoFocus={true}
                    onChangeText={(text: string) => onChangeDescripModalInput(text)}
                    autoCapitalize={false}
                    value={descripModalInputText}
                    />
                </DescripModalContainer>
                
                )}
            </BodyContainer>
            {mainTag && !mainTagProcess && visibleBottomMenuBar && !visibleDescripModal && (
                <BottomMenuBarContainer>
                <AboveKeyboard>
                <BottomMenuBar>
                <TouchableWithoutFeedback onPress={() => moveGallery()}>
                <BottomMenuIconContainer>
                    <BottomMenuAlbumIcon
                    source={require('~/Assets/Images/ic_bottomMenu_album.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => moveLocationSearch()}>
                    <BottomMenuIconContainer>
                    <BottomMenuLocationIcon
                    source={require('~/Assets/Images/ic_bottomMenu_location.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toggleInputExpense()}>
                    <BottomMenuIconContainer>
                    <BottomMenuExpenseIcon
                    source={require('~/Assets/Images/ic_bottomMenu_expense.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toggleConsumptionDatePicker()}>
                    <BottomMenuIconContainer>
                    <BottomMenuCalendarIcon
                    source={require('~/Assets/Images/ic_bottomMenu_calendar.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => moveProductUrlSearch()}>
                    <BottomMenuIconContainer>
                    <BottomMenuUrlIcon
                    source={require('~/Assets/Images/ic_bottomMenu_url.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => openSettingModal()}>
                    <BottomMenuIconContainer>
                    <BottomMenuSettingIcon
                    source={require('~/Assets/Images/ic_bottomMenu_setting.png')}/>
                    </BottomMenuIconContainer>
                    </TouchableWithoutFeedback>
                </BottomMenuBar>
                </AboveKeyboard>
                </BottomMenuBarContainer>
            )}
           
            {(visibleExpenseInput === true) && !visibleBottomMenuBar && (
                <ExpenseInputContainer>
                    <AboveKeyboard>
                    <ExpenseInputKeyboardContainer>
                    <ExpenseInputWonContainer>
                    <ExpenseInput
                    ref={expenseInput}
                    style={{paddingLeft:20, color:'#ffffff'}}
                    keyboardType={"number-pad"}
                    placeholder={ !moneyText ? "소비금액(원)" : ""}
                    caretHidden={true}
                    placeholderTextColor="#CCCCCC"
                    onChangeText={(text:string) => onChangeExpenseInput(text)}
                    value={inputingExpenseText}
                    onFocus={() => onFocusExpenseInput()}
                    autoFocus={true}/>
                    <MoneyText>{moneyText ? moneyText+"원" : ""}</MoneyText>
                    </ExpenseInputWonContainer>
                    <TouchableWithoutFeedback onPress={() => addExpense()}>
                    <ExpenseInputTextContainer>
                        <ExpenseInputText>확인</ExpenseInputText>
                    </ExpenseInputTextContainer>
                    </TouchableWithoutFeedback>
                    </ExpenseInputKeyboardContainer>
                    </AboveKeyboard>
                </ExpenseInputContainer>
            )}
            {visibleDescripModal && (
                <DescripModalBottomBarContainer>
                    <AboveKeyboard>
                        <DescripModalBottomBar>
                            <View style={{flexDirection: "row"}}>
                                {/*
                            <TouchableWithoutFeedback onPress={() => cancleModifyDescrip()}>
                                <CancelModifyDescripContainer>
                                    <CancelModifyDescripText>취소</CancelModifyDescripText>
                                </CancelModifyDescripContainer>
                            </TouchableWithoutFeedback>
                                */}
                            <TouchableWithoutFeedback onPress={() => removeDescripParagraph()}>
                        <RemoveDescripContainer>
                            <RemoveDescripIcon
                            source={require('~/Assets/Images/ic_removeDescrip.png')}/>   
                        </RemoveDescripContainer>
                        </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback onPress={() => finishModifyParagraph()}>
                        <FinishDescripContainer>
                        <AbledFinishDescripText>완료</AbledFinishDescripText>
                        </FinishDescripContainer>
                        </TouchableWithoutFeedback>
                            
                            {/*descripModalInputText === null && (
                                <FinishDescripContainer>
                                <DisabledFinishDescripText>완료</DisabledFinishDescripText>
                                </FinishDescripContainer>
                            )*/}
                        </DescripModalBottomBar>
                    </AboveKeyboard>
                </DescripModalBottomBarContainer>
            )}
            {visibleConsumptionDatePicker && (
                <ConsumptionDatePickerContainer>
                <ConsumptionDatePickerHeaderBar>
                    <TouchableWithoutFeedback onPress={() => setVisibleConsumptionDatePicker(false)}>
                    <CancelDatePickerContainer>
                    <CancelDatePickerText>취소</CancelDatePickerText>
                    </CancelDatePickerContainer>
                    </TouchableWithoutFeedback>
                    <DatePickerHeaderBarRightContainer>
                    <TouchableWithoutFeedback onPress={() => removeConsumptionDate()}>
                    <RemoveDatePickerContainer>
                        <RemoveDatePickerText>삭제</RemoveDatePickerText>
                    </RemoveDatePickerContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => addConsumptionDate()}>
                    <FinishDatePickerContainer>
                    <FinishDatePickerText>등록</FinishDatePickerText>
                    </FinishDatePickerContainer>
                    </TouchableWithoutFeedback>
                    </DatePickerHeaderBarRightContainer>
                </ConsumptionDatePickerHeaderBar>
                <DateTimePicker
                locale={'ko_KR.UTF-8'}
                style={{flex:1}}
                testID="dateTimePicker"
                value={consumptionDate}
                onChange={(event,date) => onChangeConsumptionDatePicker(event,date)}
                mode={'date'}
                display="default"
                is24Hour={true}
                maximumDate={new Date(2050, 12, 31)}
              />
                </ConsumptionDatePickerContainer>
            )}
            <ActionSheet
            ref={actionSheetRef}
            options={['취소', '삭제']}
            cancelButtonIndex={0}
            destructiveButtonIndex={1}
            onPress={(index) => removeParagraphIndex(index)}/>
             <Modal
      onBackdropPress={() => setVisibleSettingModal(false)}
      isVisible={visibleSettingModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleSettingModal(false)}
      swipeDirection={['down']}
      style={styles.modal}>
        <SettingModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <SettingModalTitleContainer>
            <SettingModalTitleText>공개 범위</SettingModalTitleText>
        </SettingModalTitleContainer>
        <RadioForm>
                            {radio_props.map((obj, i) => (
                            <TouchableWithoutFeedback onPress={() => onPressRadioButton(i, obj)}>
                            <RadioTabContainer>
                            <RadioTabInfoContainer>
                            <RadioButton
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i, obj)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 230, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonContainer>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedOpenRadioIndex === i}
                                onPress={() => onPressRadioButton(i, obj)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedOpenRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                                </RadioButtonContainer>
                            </RadioTabInfoContainer>
                            </RadioTabContainer>
                            </TouchableWithoutFeedback>
                             ))}
                           </RadioForm>
        </SettingModalContainer>
      </Modal>
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

    modal: {
        justifyContent:'flex-end',
        margin: 0,
    }
})

export default NewUploadScreen;