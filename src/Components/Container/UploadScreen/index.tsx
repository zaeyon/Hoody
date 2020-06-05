import React, {useEffect, useState, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard, View, SegmentedControlIOSComponent, Platform, StyleSheet, Text} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import UploadHeader from '~/Components/Presentational/UploadScreen/UploadHeader';

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
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 border-bottom-width: 0.3px;
 border-color: #c3c3c3;
 padding: 10px 20px 0px 20px;
`;


const LeftContainer = Styled.View`
`;

const CenterContainer = Styled.View`
justify-content: center;
margin-left: 7px;
`;

const RightContainer = Styled.View`
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
 margin-top: 12px;
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
padding: 15px;
justify-content: center;
align-items: center;
`;

const ParagraphContentContainer = Styled.View`
padding: 15px;
justify-content: center;
flex: 2.5;
`;

const EmptyContentContainer = Styled.View`
height: 100px;
`;

const UploadScreen = ({navigation}) => {
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
  const [rating, setRating] = useState(0);
 const [ratingArray, setRatingArray] = useState(
 ['empty', 'empty', 'empty', 'empty', 'empty']);
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
    let preParaData = paragraphData;
    preParaData.push({
      index: paragraphData.length + 1,
      type: 'description',
      description: text
    })
    setHeightArray([]);
    setAddParagraph(true);
    setParagraphData(preParaData);
    setNoParagraphData(false);
    setAddDescription(false);

  }

  async function sumParagraphHeight() {
    const sum = await heightArray.reduce((a, b ) => a + b);
    console.log("sum11", sum);
  }

  const openGallery = () => {
    var _images = imageUrl_arr;
    _images.pop();
    navigation.navigate('Gallery', {
      imagesObj: _images,
    });
  };


  const renderItem = ({item, index, drag, isActive}) => {
    if (index != paragraphData.length - 1) {
      if (item.type === 'description') {
      return (
        <TextParagraphContainer
          style={isActive && styles.shadow}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
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
      return (
        <ImageParagraphContainer
          style={isActive && styles.shadow}
          onLayout={(event) => {
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

          }}>
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
            onLayout={(event) => {
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
          </LastTextParagraphContainer>
        );
      } else if (item.type === 'image') {
        return (
          <LastImageParagraphContainer
            style={isActive && styles.shadow}
            onLayout={(event) => {
              console.log("마지막 이미지")
              const layout = event.nativeEvent.layout;
            let tmpArray = heightArray;
            tmpArray.push(layout.height);
            setHeightArray(tmpArray);

            console.log("height Array222", heightArray);
            if(heightArray.length === paragraphData.length) {
              if(addParagraph){
              const sum = heightArray.reduce((a, b ) => a + b);
              setParagraphHeight(sum);
              setAddParagraph(false);
              }
            }
            }}>
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

  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo")}>
          <CenterContainer>
          <MainTagText>{'#대표 태그 입력'}</MainTagText>
          <RatingContainer>
            <FlatList
              horizontal={true}
              data={ratingArray}
              renderItem={({item, index}) => {
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
              }}
            />
          </RatingContainer>
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
          <ButtonText>공유</ButtonText>
          )} 
        </RightContainer>
      </HeaderContainer>
      <LocationPriceContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("UploadAdditionInfo")}>
        <LocationContainer>
          <LocationIcon source={require('~/Assets/Images/ic_map.png')} />
          <LocationText>위치 입력</LocationText>
        </LocationContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('UploadAdditionInfo')}>
        <ExpenseContainer>
          <ExpenseIcon source={require('~/Assets/Images/price.png')} />
          <ExpenseText>소비 금액 입력</ExpenseText>
        </ExpenseContainer>
        </TouchableWithoutFeedback>
      </LocationPriceContainer>
      
      <BodyContainer
      style={{height: paragraphHeight, backgroundColor:"#ffffff"}}> 
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
        {!changeDescription && !addDescription && (
          <DraggableFlatList
            data={paragraphData}
            renderItem={renderItem}
            onDragEnd={({data}) => changeParagraph(data)}
            keyExtractor={(item, index) => `draggable-item-${item.index}`}
          />
        )}
        </BodyContainer>
        <TouchableWithoutFeedback onPress={() => clickToEmptyContent()}>
      <EmptyContentContainer>
      </EmptyContentContainer>
      </TouchableWithoutFeedback>
      <FooterContainer style={{marginBottom: keyboardHeight}}>
        <BottomBar>
          <TouchableWithoutFeedback onPress={() => openGallery()}>
       <CameraButton source={require('~/Assets/Images/ic_camera.png')} />
       </TouchableWithoutFeedback>
          <LocationButton source={require('~/Assets/Images/ic_map.png')} />
          <LinkButton source={require('~/Assets/Images/ic_link.png')} />
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
