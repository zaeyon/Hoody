import React, {useEffect, useState, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Keyboard, View, SegmentedControlIOSComponent, Platform, StyleSheet} from 'react-native';
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
padding: 15px;
background-color: #ffffff;
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
padding: 15px;
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
  const [paragraphData, setParagraphData] = useState([
    {
      index: 1,
      type: 'description',
      description: '문단나누기 테스트 글글글',
    },
    {
      index: 2,
      type: 'image',
      url: 'https://pbs.twimg.com/media/EA9UJBjU4AAdkCm?format=jpg&name=small',
    },
    {
      index: 3,
      type: 'description',
      description: '문단나누기 테스트 글2',
    },
    {
      index: 4,
      type: 'description',
      description: '문단나누기 테스트 글3',
    },
  ]);


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
    console.log("sss",index);
    setChangeDescription(true);
    setChangingDes(des);
    setChangingIndex(index);
  };

  const endChangeDes = (text) => {
    console.log("text", text);
    let changedData = paragraphData;
    changedData[changingIndex].description = text;

    setParagraphData(changedData);
    setChangingDes(text);
    setChangeDescription(false);
  }

  const setParaHeight = () => {
  }

  async function sumParagraphHeight() {
    const sum = await heightArray.reduce((a, b ) => a + b);
    console.log("sum11", sum);
  }

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
        <UploadHeader navigation={navigation}/>
      </HeaderContainer>
      <BodyContainer
      style={{height: paragraphHeight, backgroundColor:"#000000"}}> 
        {changeDescription && (
          <DescriptionInputContainer>
            <DescriptionInput
              style={{fontSize:13}}
              placeholder="후기를 작성해주세요."
              autoFocus={true}
              onChangeText={(text: string) => setChangingDes(text)}
              value={changingDes}
              onEndEditing={(text) => endChangeDes(text.nativeEvent.text)}
            />
          </DescriptionInputContainer>
        )}
        {!changeDescription && (
          <DraggableFlatList
            data={paragraphData}
            renderItem={renderItem}
            onDragEnd={({data}) => changeParagraph(data)}
            keyExtractor={(item, index) => `draggable-item-${item.index}`}
          />
        )}
        </BodyContainer>
        
      <EmptyContentContainer>

      </EmptyContentContainer>
      <FooterContainer style={{marginBottom: keyboardHeight}}>
        <BottomBar>
          <CameraButton source={require('~/Assets/Images/ic_camera.png')} />
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
