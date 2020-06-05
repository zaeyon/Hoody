import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  UIManager,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Alert,
  BackHandler,
  Image,
  View,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {FlatGrid} from 'react-native-super-grid';
// import TagInput from '~/Components/TagInput';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import ReviewUploadAPI from '~/Route/ReviewUpload';
import ImageMultiplePicker from 'react-native-customized-image-picker';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #eeeeee;
  flex-direction: row;
  padding: 10px;
  height: ${hp('100%')};
`;

const StyledModalContainer = Styled.View`
  position: absolute;
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: ${wp('60%')};
  height: ${hp('30%')};
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0px;
  flex: 1;
`;

const ModalHeaderContainer = Styled.View`
 height: ${hp('5.3%')};
 width: ${wp('50%')};
 align-items: center;
 flex-direction: row;
 flex: 1.5;
`;

const ModalBodyContainer = Styled.View`
 flex: 1.7;
 width: ${wp('50%')};
 align-items: center;
`;

const ModalFooterContainer = Styled.View`
 flex: 1;
 width: 100%;
 border-top-width: 0.5px;
 justify-content: center;
 align-items: center;
`;

const ShadowInner = Styled.View`
  flex: 1; 
  background-color: #EEEEEE;
  height: ${hp('70%')};
  width: ${wp('94%')};
  flex-direction: row;
  padding: 0px;
  border-radius: 10px;
  justify-content: center;
`;

const MyHoogingText = Styled.Text`
  font-size: 18px;
  color: #000000;
  text-align: center;
  ';
`;

const UploadButton = Styled.Text`
 font-size: 19px;
 color: #338EFC;
 ';
`;

const CloseButton = Styled.Image`
 
`;

const Inner = Styled.View`
  flex-direction: column;
  height: ${hp('88.5%')};
  width: ${wp('94%')};
  border-radius: 10px;
  background-color: #FFFFFF;
  border-color: #c3c3c3;
`;

const Title = Styled.View`
 flex-direction: row;
 height: ${hp('3%')};
 padding: 0px 10px;
 margin-top: 13px;
 align-items: center;
 justify-content: space-between;
`;

const ImageRatingContainer = Styled.View`
 padding: 0px 0px;
 flex-direction: column;
 justify-content:space-between;
`;

const ImageContainer = Styled.View`
margin-top: 5px;
`;

const RatingContainer = Styled.View`
  width: ${wp('50%')};
`;

const PriceContainer = Styled.View`
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 5px;
height: ${hp('5.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const PriceCheckContainer = Styled.View`
 width: ${hp('2.5%')};
 height: ${hp('2.5%')};
 border-radius: 3px;
 border-width: 2px;
 border-color: #cccccc;
 align-items: center;
 justify-content :center;
`;

const CheckIconImage = Styled.Image`
 position: absolute;
 bottom: 0px;
 width: ${hp('2.5%')};
 height: ${hp('2.5%')};
 tint-color: #c3c3c3;
`;

const PriceInput = Styled.TextInput`
 width: 50px;
 font-size: 13px;
 
 color: #707070;
 height: 40px;
 
`;

const WonText = Styled.Text`
font-size: 13px;

color: #707070;
`;

const LocationIconImage = Styled.Image`
 width: ${hp('2.5%')};
 height: ${hp('2.5%')};
 tint-color: #cccccc;
`;

const LocationContainer = Styled.View`
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 5px;
height: ${hp('5.5%')};
align-items: center;
flex-direction: row;
`;

const TagContainer = Styled.View`
margin-top: 10px;
border-bottom-width: 0.3px;
border-color: #cccccc;
flex-direction: column;
`;

const InsertTagContainer = Styled.View`
 height: ${hp('5.3%')};
 width: ${wp('94%')};
 align-items: center;
 align-self: center;
 padding-left: 7px;
 border-top-width: 0.3px;
 border-color: #cccccc;
 flex-direction: row;
`;

const InsertedTagText = Styled.Text`
 font-size: 13px;
 
 color: #707070;
`;

const InsertedTag1 = Styled.View`
 height: ${hp('5.3%')};
 width: ${wp('94%')};
 border-top-width: 0.3px;
 border-color: #cccccc;
 padding-left: 15px;
 flex-direction: row;
 align-items: center;
`;

const InsertedTag2 = Styled.View`
height: ${hp('5.3%')};
width: ${wp('94%')};
border-top-width: 0.3px;
border-color: #cccccc;
padding-left: 15px;
flex-direction: row;
align-items: center;
`;

const InsertedTag3 = Styled.View`
 height: ${hp('5.3%')};
 width: ${wp('94%')};
 border-top-width: 0.3px;
 border-color: #cccccc;
 padding-left: 15px;
 flex-direction: row;
 align-items: center;
`;

const CommentContainer = Styled.View`
height: ${hp('25%')};
border-color: #c3c3c3;
padding: 0px 15px;
`;

const SelectedImageContainer = Styled.View`
 margin-top: 3px;
 border-radius: 7px;
 width: ${wp('28.5%')};
 height: ${wp('28.5%')};
 background-color: #FFFFFF;
 justify-content: center;
 align-items: center;
 border-width: 1px;
 border-color: #CCCCCC;
`;

const locationInput = Styled.TextInput`
 font-size: 13px;
 
 color: #707070;
`;

const ModalContainer = Styled.View`
`;

const TagInput = Styled.TextInput`
 margin-left: 5px;
 width: ${wp('43%')};
 padding: 10px;
 height: ${hp('5.5%')};
 font-size: 13px;
 
 color: #707070;
 border-radius: 8px;
 background-color: #EEEEEE;
`;

const CameraIcon = Styled.Image`
 color: #CCCCCC;
`;

const CommentInput = Styled.TextInput`

`;

const SelectedImageTouch = Styled.TouchableWithoutFeedback`
`;

const EmptyImage = Styled.Image`
  position: absolute;
  border-radius: 7px;
  width: ${wp('28.0%')};
  height: ${wp('28.0%')};
`;

const SelectedImage = Styled.Image`
  position: absolute;
  border-radius: 7px;
  width: ${wp('28.5%')};
  height: ${wp('28.5%')};
`;

const DeleteButton = Styled.Image`
 position: absolute;
 width :${wp('7%')};
 height:${wp('7%')};
 opacity: 0.9;
 right: 2px;
 top: 2px;
`;

const TagDeleteButton = Styled.Image`
 width :${wp('4%')};
 height:${wp('4%')};
 opacity: 0.1;
`;

const TagDeleteButtonContainer = Styled.View`
 height: ${wp('4%')};
 align-items: flex-end; 
 flex: 0.5;
`;

const TagItemLeftContainer = Styled.View`
flex: 1; 
flex-direction:row;
justify-content: space-between;
`;

const AddRatingOnTagText = Styled.Text`
 
 font-size: 16px;
`;

const TagListItem = Styled.View`
 flex-direction: row;
 border-top-width: 0.3px;
 border-color: #cccccc;
 padding: 8px 7px;
 justify-content: space-between;
`;

const TagBorderTop = Styled.View`
 height: 0.3px;
 width: 100%;
 background-color: #cccccc;
`;

const TagText = Styled.Text`
 
 font-size: 14px;
 color: #898989;
`;

const TagRatingContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const TagRatingImage = Styled.Image`
 width: 15px;
 height: 15px;
 tint-color: #23E5D2;
`;

const TagRatingText = Styled.Text`
 
 font-size: 14px;
 color: #707070;
 margin-right: 17px;
`;

const CheckBoxContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function Upload({route, navigation}) {
  const [imageUrl_arr, setImageUrl_arr] = useState([
    {
      filename: 'as',
      height: 1000,
      uri:
        'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
      width: 1000,
    },
  ]);
  // State를 이용하여 Modal을 제어함
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // Output을 State로 받아서 화면에 표출하거나 정보 값으로 활용
  const [tagReviseModalVisible, setTagReviseModalVisible] = useState<boolean>(
    false,
  );
  const [tag2ModalVisible, setTag2ModalVisible] = useState<boolean>(false);
  const [tag3ModalVisible, setTag3ModalVisible] = useState<boolean>(false);
  const [ratingAbled, setRatingAbled] = useState<boolean>(false);
  const [tagList, setTagList] = useState([]);
  const [tagRatingList, setTagRatingList] = useState<Array<Object>>([]);
  const [inputedTag, setInputedTag] = useState<string>();
  const [ratingChecked, setRatingChecked] = useState(false);
  const [currentRating, setCurrentRating] = useState<number>();
  const [revisingTagName, setRevisingTagName] = useState<string>();
  const [revisingTagRating, setRevisingTagRating] = useState<string>();
  const [revisingTagRatingChecked, setRevisingTagRatingChecked] = useState<
    boolean
  >();
  const [revisingTagIndex, setRevisingTagIndex] = useState<number>();
  const [reviewContent, setReviewContent] = useState<string>();
  const [currentLocation, setCurrentLocation] = useState<string>();
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState<boolean>();

  React.useEffect(() => {
    if (route.params?.placeName) {
    }
  }, [route.params?.placeName]);

  useEffect(() => {
    console.log('사진선택');
    if (route.params?.selectedImages) {
      /*
      console.log('route.params.selectedImages', route.params.selectedImages);
      var selectedImage_arr = new Array();
      for (var i = 0; i < route.params.selectedImages.length; i++) {
        selectedImage_arr[i] = route.params.selectedImages[i].uri;
        console.log('selectedImage_arr[i]', selectedImage_arr[i]);

        if (i === route.params.selectedImages.length - 1) {
          selectedImage_arr.push(
            'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
          );
          setImageUrl_arr(selectedImage_arr);
        }
      }
      selectedImage_arr = imageUrl_arr.slice(0, imageUrl_arr.length - 1);
    */
      var imageSelectButton = {
        filename: 'imageSelect',
        height: null,
        uri:
          'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
        width: null,
      };
      route.params.selectedImages.push(imageSelectButton);
      setImageUrl_arr(route.params.selectedImages);
    }
  }, [route.params?.selectedImages]);

  const openGallery = () => {
    /*
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else if (response.didCancel) {
      } else {
        var newImage_arr = new Array();
        newImage_arr = imageUrl_arr.slice(0, imageUrl_arr.length - 1);
        newImage_arr[imageUrl_arr.length] =
          'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4';
        newImage_arr[imageUrl_arr.length - 1] = response.uri;
        console.log('responsive.uri', response.uri);
        setImageUrl_arr(newImage_arr);
        var newPhoto_arr = new Array();
        newPhoto_arr = selectedPhoto;
        newPhoto_arr.push(response);
        setSelectedPhoto(newPhoto_arr);
      }
    });
    */
    var _images = imageUrl_arr;
    _images.pop();
    navigation.navigate('Gallery', {
      imagesObj: _images,
    });
  };

  const openImageMultiplePicker = () => {
    ImageMultiplePicker.openPicker({
      multiple: true,
      isCamera: true,
    }).then((images) => {
      console.log(images);
      var newImage_arr = new Array();
      newImage_arr = imageUrl_arr.slice(0, imageUrl_arr.length - 1);
      var selectedImage_arr = new Array();
      for (var i = 0; i < images.length; i++) {
        selectedImage_arr[i] = images[i].path;
        console.log('selectedImage_arr[i]', selectedImage_arr[i]);
        if (i === images.length - 1) {
          const concatedImage_arr = newImage_arr.concat(selectedImage_arr);
          concatedImage_arr[concatedImage_arr.length] =
            'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4';
          setImageUrl_arr(concatedImage_arr);
        }
      }
    });
  };

  const deleteImage = (index) => {
    if (index > -1) {
      console.log('삭제 전', imageUrl_arr);
      setImageUrl_arr((prev) => {
        console.log('prev : ', prev);
        prev.splice(index, 1);
        return prev.slice(0);
      });
    }
  };

  const shadowOpt = {
    width: wp('93%'),
    height: hp('88.5%'),
    color: '#000000',
    border: 3,
    radius: 10,
    opacity: 0.03,
    x: 0,
    y: 0,
    style: {marginVertical: 15},
  };

  const modalShadow = {
    width: wp('60%'),
    height: hp('25%'),
    color: '#000000',
    border: 7,
    radius: 10,
    opacity: 0.04,
    x: 0,
    y: 3,
    style: {marginVertical: 15},
  };

  const ratingCompleted = (rating) => {
    setCurrentRating(rating);
    console.log(rating);
  };

  const ratingRevised = (rating) => {
    setRevisingTagRating(rating);
  };

  const cancelReviewUpload = () => {
    Alert.alert(
      '후기 작성을 취소하시겠어요?',
      ' ',
      [
        {
          text: '확인',
          onPress: () => {
            var initializedImage_arr = [
              'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
            ];
            setImageUrl_arr(initializedImage_arr);
            navigation.goBack();
          },
        },
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancle',
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    const backAction = () => {
      if (modalVisible === true) {
        setModalVisible(false);
        return true;
      } else if (tagReviseModalVisible === true) {
        setTagReviseModalVisible(false);
        return true;
      } else {
        Alert.alert(
          '후기 작성을 취소하시겠어요?',
          ' ',
          [
            {
              text: '취소',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancle',
            },
            {
              text: '확인',
              onPress: () => {
                var initializedImage_arr = [
                  'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
                ];
                setImageUrl_arr(initializedImage_arr);
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [modalVisible]);

  const addTag = (tag: string, rating: number) => {
    if (tag === '' || tag == undefined) {
      Alert.alert('태그를 입력하세요.', ' ', [
        {
          text: '확인',
          onPress: () => 0,
        },
      ]);
    } else {
      setModalVisible(false);
      var tmp = tag;

      setTagList([...tagList, tmp]);
      setRatingAbled(false);
      setRatingChecked(false);
      var array1 = tagRatingList;
      if (ratingChecked === false) {
        array1.push({
          tagName: tmp,
          tagRating: null,
          ratingExistence: ratingChecked,
          tagIndex: array1.length,
        });
      } else {
        array1.push({
          tagName: tmp,
          tagRating: currentRating,
          ratingExistence: ratingChecked,
          tagIndex: array1.length,
        });
      }
      setTagRatingList(array1);
    }
  };

  const reviseTag = () => {
    if (revisingTagName === '' || revisingTagName == undefined) {
      Alert.alert('태그를 입력하세요.', '', [
        {
          text: '확인',
          onPress: () => 0,
        },
      ]);
    } else {
      setTagReviseModalVisible(false);
      var array2 = tagRatingList;
      console.log('revisingTagIndex', revisingTagIndex);
      if (revisingTagRatingChecked === false) {
        array2.splice(revisingTagIndex, 1, {
          tagName: revisingTagName,
          tagRating: null,
          ratingExistence: revisingTagRatingChecked,
          tagIndex: revisingTagIndex,
        });
      } else {
        array2.splice(revisingTagIndex, 1, {
          tagName: revisingTagName,
          tagRating: revisingTagRating,
          ratingExistence: revisingTagRatingChecked,
          tagIndex: revisingTagIndex,
        });

        setTagList(array2);
      }
    }
  };

  const setPriceCheck = () => {
    if (checkedPrice) {
      setCheckedPrice(false);
    } else {
      setCheckedPrice(true);
    }
  };

  const deleteTag = (index) => {
    var deletedArray = tagRatingList;
    deletedArray.splice(index, 1);
    // deletedArray.splice(index, 1);
    //deletedArray = tagRatingList.splice(index, 1);
    setTagRatingList(deletedArray.slice(0));
  };

  const STAR_IMAGE = require('~/Assets/Images/star_outline.png');
  const colorValue = 0xff00ff00;

  const CheckRatingEnabled = (value) => {
    setRatingChecked(value);
    setRatingAbled(value);
  };

  const addTagTextClick = () => {
    if (tagRatingList.length >= 3) {
      Alert.alert('태그는 최대 3개까지 등록할 수 있습니다.', ' ', [
        {
          text: '확인',
          onPress: () => 0,
        },
      ]);
    } else {
      setModalVisible(true);
    }
  };

  const revisingTag_func = (tagName, tagRating, tagRatingChecked, tagIndex) => {
    setRevisingTagName(tagName);
    setRevisingTagRating(tagRating);
    setRevisingTagRatingChecked(tagRatingChecked);
    setRevisingTagIndex(tagIndex);
    setTagReviseModalVisible(true);
  };

  const reviewUpload = (images) => {
    ReviewUploadAPI(images[0]);
    console.log(images[0].uri);
  };

  return (
    <Container>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        coverScreen={false}
        hideModalContentWhileAnimating={true}
        hasBackdrop={true}
        backdropColor={'#000000'}
        backdropOpacity={0.4}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ModalContainer>
          <BoxShadow setting={modalShadow}>
            <StyledModalContainer>
              <ModalHeaderContainer>
                <Text
                  style={{
                    fontSize: 24,
                    
                    color: '#C3C3C3',
                  }}>
                  #
                </Text>
                <TagInput
                  onChangeText={(text: string) =>
                    setInputedTag(text)
                  }></TagInput>
              </ModalHeaderContainer>
              <ModalBodyContainer>
                <CheckBoxContainer>
                  <CheckBox
                    value={ratingChecked}
                    disabled={false}
                    onValueChange={(value) => CheckRatingEnabled(value)}
                    tintColors={{true: '#23E5D2'}}
                  />
                  <Text style={{fontSize: 15, }}>
                    태그에 별점 주기
                  </Text>
                </CheckBoxContainer>
                <RatingContainer>
                  {ratingAbled && (
                    <Rating
                      type="custom"
                      onFinishRating={ratingCompleted}
                      style={{paddingVertical: 0, marginLeft: 3}}
                      imageSize={27}
                      fractions={1}
                      readonly={!ratingAbled}
                      startingValue={0}
                    />
                  )}
                </RatingContainer>
              </ModalBodyContainer>
              <TouchableWithoutFeedback onPress={() => addTag(inputedTag)}>
                <ModalFooterContainer>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                    }}>
                    등록하기
                  </Text>
                </ModalFooterContainer>
              </TouchableWithoutFeedback>
            </StyledModalContainer>
          </BoxShadow>
        </ModalContainer>
      </Modal>
      <BoxShadow setting={shadowOpt}>
        <ShadowInner>
          <Inner>
            <Title>
              <TouchableWithoutFeedback onPress={() => cancelReviewUpload()}>
                <CloseButton
                  style={{width: 20, height: 20}}
                  source={require('~/Assets/Images/close_gray.png')}
                />
              </TouchableWithoutFeedback>
              <MyHoogingText>나의 게시물</MyHoogingText>
              <TouchableWithoutFeedback
                onPress={() => reviewUpload(selectedPhoto)}>
                <UploadButton>공유</UploadButton>
              </TouchableWithoutFeedback>
            </Title>
            <ImageRatingContainer>
              <ImageContainer>
                <FlatGrid
                  itemDimension={wp('21%')}
                  items={imageUrl_arr}
                  // staticDimension={300}
                  // fixed
                  // spacing={20}
                  renderItem={({item, index}) => {
                    if (index == imageUrl_arr.length - 1) {
                      return (
                        <SelectedImageTouch onPress={() => openGallery()}>
                          <SelectedImageContainer>
                            <EmptyImage source={{uri: item.uri}} />
                          </SelectedImageContainer>
                        </SelectedImageTouch>
                      );
                    } else {
                      return (
                        <SelectedImageContainer>
                          <TouchableWithoutFeedback
                            onPress={() =>
                              navigation.navigate('ImagesPullScreen', {
                                imagesUrl_arr: imageUrl_arr.slice(
                                  0,
                                  imageUrl_arr.length - 1,
                                ),
                                imageIndex: index,
                              })
                            }>
                            <SelectedImage source={{uri: item.uri}} />
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            onPress={() => deleteImage(index)}>
                            <DeleteButton
                              position="absolute"
                              source={require('~/Assets/Images/delete.png')}
                            />
                          </TouchableWithoutFeedback>
                        </SelectedImageContainer>
                      );
                    }
                  }}
                />
              </ImageContainer>
              {/* <RatingContainer>
                  <Rating
                    onFinishRating={ratingCompleted}
                    style={{paddingVertical: 10}}
                    imageSize={33}
                  />
               </RatingContainer>*/}
            </ImageRatingContainer>
            <TagContainer>
              <TouchableOpacity onPress={() => addTagTextClick()}>
                <InsertTagContainer>
                  <Text
                    style={{
                      color: '#CCCCCC',
                      
                      fontSize: 19,
                    }}>
                    #
                  </Text>
                  <Text
                    style={{
                      color: '#707070',
                      
                      marginLeft: 6,
                    }}>
                    태그 추가
                  </Text>
                </InsertTagContainer>
              </TouchableOpacity>
              <FlatList
                data={tagRatingList}
                renderItem={({item, index}) => (
                  <TagListItem>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        revisingTag_func(
                          item.tagName,
                          item.tagRating,
                          item.ratingExistence,
                          item.tagIndex,
                        )
                      }>
                      <TagItemLeftContainer>
                        <TagText># {item.tagName}</TagText>
                        <TagRatingContainer>
                          {item.ratingExistence && (
                            <TagRatingImage
                              source={require('~/Assets/Images/ic_star.png')}
                            />
                          )}
                          <TagRatingText>{item.tagRating}</TagRatingText>
                        </TagRatingContainer>
                      </TagItemLeftContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => deleteTag(item.tagIndex)}>
                      <TagDeleteButton
                        source={require('~/Assets/Images/delete.png')}
                      />
                    </TouchableWithoutFeedback>
                  </TagListItem>
                )}
              />
            </TagContainer>
            <PriceContainer>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => setPriceCheck()}>
                  <PriceCheckContainer>
                    {checkedPrice && (
                      <CheckIconImage
                        source={require('~/Assets/Images/ic_check2.png')}
                      />
                    )}
                  </PriceCheckContainer>
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    color: '#707070',
                    
                    marginLeft: 7,
                  }}>
                  소비 금액
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PriceInput editable={checkedPrice} />
                <View
                  style={{
                    width: 50,
                    height: 0.5,
                    backgroundColor: '#707070',
                    position: 'absolute',
                    bottom: 13,
                  }}
                />
                <WonText>원</WonText>
              </View>
            </PriceContainer>
            <LocationContainer>
              <LocationIconImage
                source={require('~/Assets/Images/ic_location.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('LocationSearch')}>
                <Text
                  style={{
                    color: '#707070',
                    
                    marginLeft: 7,
                  }}>
                  위치 추가
                </Text>
              </TouchableOpacity>
            </LocationContainer>
            <CommentContainer>
              <CommentInput
                placeholder="comment ..."
                multiline={true}
                value={reviewContent}
                onChangeText={(text) => setReviewContent(text)}
              />
            </CommentContainer>
          </Inner>
        </ShadowInner>
      </BoxShadow>
      <Modal
        isVisible={tagReviseModalVisible}
        useNativeDriver={true}
        coverScreen={false}
        hideModalContentWhileAnimating={true}
        hasBackdrop={true}
        backdropColor={'#000000'}
        backdropOpacity={0.4}
        onBackdropPress={() => setTagReviseModalVisible(false)}
        onBackButtonPress={() => setTagReviseModalVisible(false)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ModalContainer>
          <BoxShadow setting={modalShadow}>
            <StyledModalContainer>
              <ModalHeaderContainer>
                <Text
                  style={{
                    fontSize: 24,
                    
                    color: '#C3C3C3',
                  }}>
                  #
                </Text>
                <TagInput
                  onChangeText={(text: string) => setRevisingTagName(text)}
                  value={revisingTagName}></TagInput>
              </ModalHeaderContainer>
              <ModalBodyContainer>
                <CheckBoxContainer>
                  <CheckBox
                    value={revisingTagRatingChecked}
                    disabled={false}
                    onValueChange={(value) =>
                      setRevisingTagRatingChecked(value)
                    }
                    tintColors={{true: '#23E5D2'}}
                  />
                  <Text style={{fontSize: 15, }}>
                    태그에 별점 주기
                  </Text>
                </CheckBoxContainer>
                <RatingContainer>
                  {revisingTagRatingChecked && (
                    <Rating
                      type="custom"
                      onFinishRating={ratingRevised}
                      style={{paddingVertical: 0, marginLeft: 3}}
                      fractions={10}
                      imageSize={27}
                      readonly={!revisingTagRatingChecked}
                      startingValue={revisingTagRating}
                    />
                  )}
                </RatingContainer>
              </ModalBodyContainer>
              <TouchableWithoutFeedback onPress={() => reviseTag()}>
                <ModalFooterContainer>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                    }}>
                    수정하기
                  </Text>
                </ModalFooterContainer>
              </TouchableWithoutFeedback>
            </StyledModalContainer>
          </BoxShadow>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  moveTop: {
    alignSelf: 'flex-start',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: wp('26%'),
    width: wp('26%'),
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default Upload;
