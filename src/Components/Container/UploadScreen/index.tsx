import React, {useEffect, useState, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard, Alert, View, SegmentedControlIOSComponent, Platform, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import UploadHeader from '~/Components/Presentational/UploadScreen/UploadHeader';
import { BaseRouter } from '@react-navigation/native';
import PostUpload from '~/Route/Post/Upload';
import ProductItem from '~/Components/Presentational/UploadScreen/ProductItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const BottomBar = Styled.View`
width: ${wp('100%')};
height: ${hp('7.5%')};
padding: 10px;
flex-direction: row;
align-items: center;
border-top-width: 0.3px;
border-color: #c3c3c3;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('10%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 border-color: #c3c3c3;
`;


const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('10%')};
flex: 1;
align-items: center;
margin-top: 40px;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
height: ${hp('10%')};
flex: 7;
margin-top: 10px;
`;

const RightContainer = Styled.View`
align-items: center;
background-color: #ffffff;
height: ${hp('10%')};
margin-top: 40px;
flex: 1;
`;

const MainTagText = Styled.Text`
 font-size: 16px;
 margin-left: 6px;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
 margin-left: -2px;
 width: 25px;
 height: 25px;
`;

const HalfRatingStarImage = Styled.Image`
 margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 5px;
 flex-direction: row;
 justify-content: center;
 margin-bottom: 12px;
`;

const LocationContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const LocationIcon = Styled.Image`
 width: 15px;
 height: 14px;
 tint-color: #707070;
`;

const LocationText = Styled.Text`
 font-size: 12px;
 margin-left: 4px;
 color: #707070;
`;

const ExpenseContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const ExpenseIcon = Styled.Image`
margin-left: 10px;
 width: 16px;
 height: 15px;
 tint-color: #707070;
`;

const ExpenseText = Styled.Text`
 margin-left: 4px;
 font-size: 12px;
 color: #707070;
 font-weight: normal;
`;


const BodyContainer = Styled.View`
margin-top: 5px;
border-color: #eeeeee;
`;

const FooterContainer = Styled.View`
position: absolute;
bottom: 0;
background-color: #ffffff;
`;

const DescriptionInput = Styled.TextInput`
font-size: 13px;
`;

const DescriptionInputContainer = Styled.View`
padding: 5px 15px 15px 15px;
`;

const CameraButton = Styled.Image`
 margin-left: 15px;
 width: ${wp('8%')};
 height:${wp('6.2%')};
 tint-color: #707070;
`;

const LocationButton = Styled.Image`
margin-left: 30px;
 width: ${wp('6.5%')};
 height:${wp('6.5%')};
 tint-color: #707070;
`;

const LinkButton = Styled.Image`
margin-left: 30px;
 width: ${wp('6.0%')};
 height:${wp('6.0%')};
 tint-color: #707070;
`;

const TextParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #ffffff;
`;

const LastTextParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-bottom-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #ffffff;
`;

const DescriptionText = Styled.Text`
 font-size: 12px;
`;

const ImageParagraphContainer = Styled.View`

 border-top-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;

const LastImageParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-bottom-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;

const InsertedImage = Styled.Image`
 width: ${wp('25%')};
 height: ${wp('25%')};
`;

const ParagraphIcon = Styled.Image`
 width: 25px;
 height: 25px;
 margin-left: 15px;
 tint-color: #707070;
`;

const ParagraphIconContainer = Styled.View`
flex: 0.4;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-right: 10px;
`;

const ParagraphContentContainer = Styled.View`
padding: 15px;
justify-content: center;
flex: 2.5;
`;

const EmptyContentContainer = Styled.View`
height: 100px;
`;



const AddProductContainer = Styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px 20px 20px 20px;
width:${wp('100%')};
`;

const AddProductInputContainer = Styled.View`
width:${wp('100%')};
flex-direction: row;
justify-content: center;
align-items: center;
`;


const LinkButton2 = Styled.Image`
 width: ${wp('5.0%')};
 height:${wp('5.0%')};
 tint-color: #707070;
`;

const AddProductInput = Styled.TextInput`
margin-left: 5px;
font-size: 15px;
text-align: left;
width: ${wp('70%')};
padding-bottom: 5px;
padding-left: 5px;
border-bottom-width: 0.3px;
border-color: #c3c3c3;
`;

const AddProductSearchText = Styled.Text`
margin-left: 5px;
font-size: 16px;
color: #338EFC;
`;

interface Props {
  navigation:any,
  route:any
}

const UploadScreen = ({navigation, route}:Props) => {
  const [mainTag, setMainTag] = useState();
  const [rating, setRating] = useState(0);
  const [subTag1, setSubTag1] = useState();
  const [subTag2, setSubTag2] = useState();
  const [expanse, setExpanse] = useState();
  const [location, setLocation] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [selected, setSelected] = useState(false);
  const [addImageArray, setAddImageArray] = useState<Array<string>>([]);
  const [certifiedLocation, setCertifiedLocation] = useState<boolean>(false);
  const [dump, setDump] = useState<boolean>(false);
  const [sequence, setSequence] = useState<string>();
  const [productArray, setProductArray] = useState<Array>([]);
  const [resultProduct, setResultProduct] = useState<Object>();

  const [desArray, setDesArray] = useState<Array<string>>([]);
  const [mediaArray, setMediaArray] = useState([]);

  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [changeDescription, setChangeDescription] = useState(false);
  const [changingDes, setChangingDes] = useState('');
  const [changingIndex, setChangingIndex] = useState<number>();
  const [paragraphHeight, setParagraphHeight] = useState<number>(0);
  const [heightArray, setHeightArray] = useState<Array<number>>([]);
  const [addParagraph, setAddParagraph] = useState(true);
  const [eachHeight, setEachHeight] = useState(0);
  const [paragraphData, setParagraphData] = useState([]);
  const [noParagraphData, setNoParagraphData] = useState(true);
  const [addDescription, setAddDescription] = useState(true);
  const [changingPara, setChangingPara] = useState(true);
 const [ratingArray, setRatingArray] = useState(['empty', 'empty', 'empty', 'empty', 'empty']);
  const tmpRatingArr = ['empty', 'empty', 'empty', 'empty', 'empty'];
  const [imageUrl_arr, setImageUrl_arr] = useState([
    {
      filename: 'as',
      height: 1000,
      uri:
        'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
      width: 1000,
    },
  ]);

  
  useEffect(() => {
    if (rating % 1 === 0) {
      for (var i = 0; i < rating; i++) {
        tmpRatingArr[i] = 'full';
        if (i === rating - 1) {
          setRatingArray(tmpRatingArr);
        }
      }
    } else {
      for (var i = 0; i < rating; i++) {
        if (i === rating - 0.5) {
          tmpRatingArr[i] = 'half';
          setRatingArray(tmpRatingArr);
        } else {
          tmpRatingArr[i] = 'full';
        }
      }
    }
  }, [ratingArray]);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    console.log('키보드 높이', e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  useEffect(() => {
    if(route.params?.mainTag) {
      setMainTag(route.params.mainTag);
      console.log("mainTagzz", mainTag);
    }
    if(route.params?.rating) {
      console.log("별점 등록", route.params.rating)
      const addRating = route.params.rating;
      setRating(addRating);
      //setRatingArray(route.params.ratingArray);
      //console.log("route.params?.ratingArray", route.params.ratingArray);
      //setSelected(!selected);
    }
    if(route.params?.subTag1) {
      setSubTag1(route.params.subTag1);
    }
    if(route.params?.subTag2) {
      setSubTag2(route.params.subTag2);
    }
    if(route.params?.expanse) {
      setExpanse(route.params.expanse);
    }
    if(route.params?.location) {
      setLocation(route.params.location);
    }
    if(route.params?.longitude) {
      setLongitude(route.params.longitude);
    }
    if(route.params?.latitude) {
      setLatitude(route.params.latitude);
    }
  }, [route.params?.mainTag, route.params?.rating, route.params?.subTag1, route.params?.subTag2, route.params?.expanse, route.params?.location, route.params?.longitude, route.params?.latitude]);

  useEffect(() => {
    console.log('사진 선택');
    if(route.params?.selectedImages) {
      console.log("route.params.selectedImages", route.params.selectedImages);
      
      addImages(route.params.selectedImages);

    }
  }, [route.params?.selectedImages])


  const changeParagraph = (data) => {
    console.log('changed paragraph', data);
    setParagraphData(data);
  };

  const clickToParagraphContent = (des, index) => {
    setChangingPara(true)
    setChangeDescription(true);
    setChangingDes(des);
    setChangingIndex(index);
  };

  const clickToEmptyContent = () => {
    setChangingPara(true);
    setChangingDes("");
    setAddDescription(true);
    setAddProduct(false);
  }

  const endChangeDes = (text) => {
    console.log("text", text);
    let changedData = paragraphData;
    changedData[changingIndex].description = text;
    setParagraphData(changedData);
    setChangingDes(text);
    setChangeDescription(false);
    setChangingIndex(null);

  }

  const addDes = (text) => {
    if(text == "") 
    {
      setHeightArray([]);
      setAddDescription(true);
    } else {
    let preParaData = paragraphData;
    let preDesArray = desArray;
    preDesArray.push(text);
    preParaData.push({
      index: paragraphData.length + 1,
      type: 'description',
      description: text
    })
    setDesArray(preDesArray);
    console.log("desArray", "desArray");
    setHeightArray([]);
    setAddParagraph(true);
    setParagraphData(preParaData);
    setNoParagraphData(false);
    setAddDescription(false);
    }
  }

  const addImages = (imageArray) => {
    console.log("imageArray", imageArray);
    let preParaData = paragraphData;
    let preMediaArray = mediaArray;
  
    for(var i = 0; i < imageArray.length; i++) {
      preParaData.push({
        index: paragraphData.length + 1,
        type: 'image',
        url: imageArray[i].uri,
      })
      preMediaArray.push(imageArray[i]);
      if(i === imageArray.length - 1) {
        setParagraphData(preParaData);
        console.log("preParaData", preParaData);
        setMediaArray(preMediaArray);
        console.log("mediaArray", mediaArray);
      }
    }
    setHeightArray([]);
    setAddParagraph(true);
    setNoParagraphData(false);
    setAddDescription(false);
  }

  async function sumParagraphHeight() {
    const sum = await heightArray.reduce((a, b ) => a + b);
    console.log("sum11", sum);
  }

  const openGallery = () => {
    navigation.navigate('Gallery')
    //navigation.navigate("GalleryTest");
  };

  const searchLocation = () => {
    navigation.navigate('LocationSearch');
  }


  const uploadCancel = () => {
    Alert.alert(
      '후기 작성을 취소하시겠어요?',
      ' ',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: '취소',
          onPress: () => 0,
          style: 'cancle',
        }
      ],
      {cancelable: false},
    );
  };

  const uploadFinish = () => {
    console.log("업로드할 paragraphData", paragraphData);
    console.log("업로드할 desArray", desArray);
    console.log("업로드할 mediaArray", mediaArray);
    var tmpSequence = "";
   for(var i = 0; i < paragraphData.length; i++) {
     if(paragraphData[i].type === "description") tmpSequence = tmpSequence + "D";
     else if(paragraphData[i].type === "image") tmpSequence = tmpSequence + "M";
     else if(paragraphData[i].type === "video") tmpSequence = tmpSequence + "M";
     
     if(i === paragraphData.length -1) {
       console.log("tmpSequence", tmpSequence);

       setTimeout(function() {
         console.log("sequence", tmpSequence);
         var description = "";
         for(var i = 0; i < desArray.length; i++)
         { 
           if(i == desArray.length -1) {
           description = description + '"' + desArray[i] + '"';
             description = "[" + description + "]"
             console.log("description", description);
            PostUpload(description, mediaArray, mainTag, subTag1, subTag2, rating, location, longitude, latitude, certifiedLocation, dump, tmpSequence, products)
            .then(function(response) {
              if(response.status === 201) {
                console.log("response.status", response.status);
                navigation.navigate("Feed")
              }
            })
           } else {
            description = description + '"' + desArray[i] + '"' + ",";
           }
         }
       }, 1000)
     }
   }
  //  PostUpload()
  }

  const ratingRenderItem = ({item, index}) => {
    if (item === 'full') {
      return (
        <RatingStarImage
          source={require('~/Assets/Images/star-24px.png')}
        />
      );
    } else if (item === 'half') {
      return (
        <HalfRatingStarImage
          source={require('~/Assets/Images/half-star-24px.png')}
        />
      );
    } else if (item === 'empty') {
      return (
        <RatingStarImage
          source={require('~/Assets/Images/emptyStar-24px.png')}
        />
      );
    }
    
  }

  const renderItem = ({item, index, drag, isActive}) => {
    if (index != paragraphData.length - 1) {
      if (item.type === 'description') {
      return (
        <TextParagraphContainer
          style={isActive && styles.shadow}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            itemHeight = layout.height;
            /*
            let tmpArray = heightArray;
            tmpArray.push(layout.height);
            setHeightArray(tmpArray);

            console.log("height Array333", heightArray);
            if(heightArray.length === paragraphData.length) {
              if(addParagraph)
              {
              const sum = heightArray.reduce((a, b ) => a + b);
              setParagraphHeight(sum);
              setAddParagraph(false);
              }
            }
            */
          }}>
          <TouchableWithoutFeedback
            onPress={() => clickToParagraphContent(item.description, index)}>
            <ParagraphContentContainer>
              <DescriptionText>{item.description}</DescriptionText>
            </ParagraphContentContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
            <ParagraphIconContainer>
              <ParagraphIcon
                source={require('~/Assets/Images/ic_paragraph.png')}
              />
            </ParagraphIconContainer>
          </TouchableWithoutFeedback>
        </TextParagraphContainer>
      );
    } else if (item.type === 'image') {
      console.log("image 삽입", item.url)
      return (
        <ImageParagraphContainer
          style={isActive && styles.shadow}
          /*onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            let tmpArray = heightArray;
            tmpArray.push(layout.height);
            setHeightArray(tmpArray);
            console.log("height Array444", heightArray);
            if(heightArray.length === paragraphData.length) {
              if(addParagraph){
              const sum = heightArray.reduce((a, b ) => a + b);
              setParagraphHeight(sum);
              setAddParagraph(false);
              }
            }

          }}*/>
          <ParagraphContentContainer>
            <InsertedImage source={{uri: item.url}} />
          </ParagraphContentContainer>
          <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
            <ParagraphIconContainer>
              <ParagraphIcon
                source={require('~/Assets/Images/ic_paragraph.png')}
              />
            </ParagraphIconContainer>
          </TouchableWithoutFeedback>
        </ImageParagraphContainer>
      );
    }
  } else if(index === paragraphData.length -1) {
      if (item.type === 'description') {
        return (
          <LastTextParagraphContainer
            style={isActive && styles.shadow}
            /*onLayout={(event) => {
              const layout = event.nativeEvent.layout;
            let tmpArray = heightArray;
            tmpArray.push(layout.height);
            setHeightArray(tmpArray);

            console.log("height Array111", heightArray);
    
            if(heightArray.length === paragraphData.length) {
              if(addParagraph) {
              const sum = heightArray.reduce((a, b ) => a + b);
              setParagraphHeight(sum);
              setAddParagraph(false);
              }
            }
            }}*/>
            <TouchableWithoutFeedback
              onPress={() => clickToParagraphContent(item.description, index)}>
              <ParagraphContentContainer>
                <DescriptionText>{item.description}</DescriptionText>
              </ParagraphContentContainer>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
              <ParagraphIconContainer>
                <ParagraphIcon
                  source={require('~/Assets/Images/ic_paragraph.png')}
                />
              </ParagraphIconContainer>
            </TouchableWithoutFeedback>
          </LastTextParagraphContainer>
        );
      } else if (item.type === 'image') {
      console.log("마지막 image 삽입", item.url)
        return (
          <LastImageParagraphContainer
            style={isActive && styles.shadow}
            /*onLayout={(event) => {
              
              console.log("마지막 이미지")
              const layout = event.nativeEvent.layout;
            let tmpArray = heightArray;
            tmpArray.push(layout.height);
            setHeightArray(tmpArray);

            console.log("height Array222", heightArray);

            console.log("heightArray", heightArray);
            console.log("paragraphData", paragraphData);
            console.log("tmpArray", tmpArray);
            if(heightArray.length === paragraphData.length) {

              if(addParagraph){
              console.log("addParagraph", "gkgkgk");
              const sum = heightArray.reduce((a, b ) => a + b);
              setParagraphHeight(sum);
              setAddParagraph(false);
              }
            }
            }}
            */>
            <TouchableWithoutFeedback onPress={() => 0}>
              <ParagraphContentContainer>
                <InsertedImage source={{uri: item.url}} />
              </ParagraphContentContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
              <ParagraphIconContainer>
                <ParagraphIcon
                  source={require('~/Assets/Images/ic_paragraph.png')}
                />
              </ParagraphIconContainer>
            </TouchableWithoutFeedback>
          </LastImageParagraphContainer>
        );
      }
    }
}
  const addProductTrue = () => {
    return (
      <AddProductContainer>
        <LinkButton2 source={require('~/Assets/Images/ic_link.png')} />
        <AddProductInput
        placeholder={"URL을 작성해주세요."}
        />
        <AddProductSearchText>검색</AddProductSearchText>
      </AddProductContainer>
    )
  }

  const clickAddProduct = () => {
    setAddProduct(true);
    setAddDescription(false);
    setChangeDescription(false);
  }

  const searchProduct = () => {
    // Product Search API 코드 추가해야됌 
    // 아래코드는 테스트용
    const resultProduct1 = {
      productImage: "https://t1.daumcdn.net/cfile/tistory/995BB63A5BDF9C0F0B",
      productName: "Macbook Pro",
      productDescription: "애플 맥북 프로",
      shopIcon: "aa",
      shopName: "애플스토어"
    }

    setResultProduct(resultProduct1);
  }


  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => uploadCancel()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo")}>
          <CenterContainer>
          <MainTagText>{mainTag || '#대표 태그 입력'}</MainTagText>
          {rating === 0 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
            {rating === 0.5 && (
          <RatingContainer>
              <HalfRatingStarImage
              source={require('~/Assets/Images/half-star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
         {rating === 1 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
          {rating === 1.5 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<HalfRatingStarImage
              source={require('~/Assets/Images/half-star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
              {rating === 2 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
            {rating === 2.5 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <HalfRatingStarImage
              source={require('~/Assets/Images/half-star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
            {rating === 3 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )} 
            {rating === 3.5 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <HalfRatingStarImage
              source={require('~/Assets/Images/half-star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
             {rating === 4 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/emptyStar-24px.png')}/>
          </RatingContainer>
            )}
             {rating === 4.5 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <HalfRatingStarImage
              source={require('~/Assets/Images/half-star-24px.png')}/>
          </RatingContainer>
            )}
             {rating === 5 && (
          <RatingContainer>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>

<RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
              <RatingStarImage
              source={require('~/Assets/Images/star-24px.png')}/>
          </RatingContainer>
            )}    
      <LocationPriceContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo")}>
        <LocationContainer>
          <LocationIcon source={require('~/Assets/Images/ic_map.png')} />
          <LocationText>{location || "위치 입력"}</LocationText>
        </LocationContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('UploadAdditionInfo')}>
        <ExpenseContainer>
          <ExpenseIcon source={require('~/Assets/Images/price.png')} />
          <ExpenseText>{expanse || "소비 금액 입력"}</ExpenseText>
        </ExpenseContainer>
        </TouchableWithoutFeedback>
      </LocationPriceContainer>      
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
          {addDescription && (
              <TouchableWithoutFeedback onPress = {() => addDes(changingDes)}>
              <ButtonText>완료</ButtonText>
              </TouchableWithoutFeedback>
          )}
          {changeDescription && (
              <TouchableWithoutFeedback onPress = {() => endChangeDes(changingDes)}>
              <ButtonText>완료</ButtonText>
              </TouchableWithoutFeedback>
          )}
          {!addDescription && !changeDescription && (
          <TouchableWithoutFeedback onPress={() => uploadFinish()}>
          <ButtonText>공유</ButtonText>
          </TouchableWithoutFeedback>
          )} 
        </RightContainer>
      </HeaderContainer>
      <HeaderBorder/>
      
      <ScrollView style={{backgroundColor:"#ffffff"}}>
        {addDescription && (
          <DescriptionInputContainer>
          <DescriptionInput
            style={{fontSize:13, height:500}}
            placeholder="후기를 작성해주세요."
            autoFocus={true}
            multiline={true}
            onChangeText={(text: string) => setChangingDes(text)}
            value={changingDes}
            onEndEditing={(text) => addDes(text.nativeEvent.text)}
          />
        </DescriptionInputContainer>
        )}
        {changeDescription && (
          <DescriptionInputContainer>
            <DescriptionInput
              style={{fontSize:13, height:500}}
              placeholder="후기를 작성해주세요."
              autoFocus={true}
              multiline={true}
              onChangeText={(text: string) => setChangingDes(text)}
              value={changingDes}
              onEndEditing={(text) => endChangeDes(text.nativeEvent.text)}
            />
          </DescriptionInputContainer>
        )}
        {addProduct && (
      <AddProductContainer>
        <AddProductInputContainer>
      <LinkButton2 source={require('~/Assets/Images/ic_link.png')} />
      <AddProductInput
      placeholder={"URL을 작성해주세요."}
      autoFocus={true}
      />
      <AddProductSearchText>검색</AddProductSearchText>
      </AddProductInputContainer>
      {resultProduct && (
        <ProductItem
        productImage={resultProduct.productImage}
        productName={resultProduct.productName}
        productDescription={resultProduct.productDescription}
        shopIcon={"aa"}
        shopName={resultProduct.shopName}/>
      )}
    </AddProductContainer>
        )}
        {!changeDescription && !addDescription && (
          <DraggableFlatList
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            console.log("DraggableFlatList", layout.height)
            setParagraphHeight(layout.height);
            }}
            style={{flex: 0}}
            data={paragraphData}
            extraData={paragraphData}
            renderItem={renderItem}
            onDragEnd={({data}) => changeParagraph(data)}
            keyExtractor={(item, index) => `draggable-item-${item.index}`}
          />
        )}
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => clickToEmptyContent()}>
      <EmptyContentContainer style={{flex:100}}>
      </EmptyContentContainer>
      </TouchableWithoutFeedback>
      <FooterContainer style={{marginBottom: keyboardHeight}}>
        <BottomBar>
          <TouchableWithoutFeedback onPress={() => openGallery()}>
       <CameraButton source={require('~/Assets/Images/ic_camera.png')} />
       </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => searchLocation()}>
          <LocationButton source={require('~/Assets/Images/ic_map.png')} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => clickAddProduct()}>
          <LinkButton source={require('~/Assets/Images/ic_link.png')} />
          </TouchableWithoutFeedback>
        </BottomBar>
      </FooterContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: { 
    
     },
})

export default UploadScreen;
