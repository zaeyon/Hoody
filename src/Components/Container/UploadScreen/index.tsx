import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import UploadHeader from '~/Components/Presentational/UploadScreen/UploadHeader';

const Container = Styled.View`
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
flex: 1;
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

const UploadScreen = ({navigation}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [changeDescription, setChangeDescription] = useState(false);
  const [changingDes, setChangingDes] = useState('');
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

  const clickToParagraphContent = (des) => {
    setChangeDescription(true);
    setChangingDes(des);
  };

  const renderItem = ({item, index, drag, isActive}) => {
    if (index === paragraphData.length - 1) {
      if (item.type === 'description') {
        return (
          <LastTextParagraphContainer
            style={isActive && {elevation: 4}}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              console.log('height', layout.height);
            }}>
            <TouchableWithoutFeedback
              onPress={() => clickToParagraphContent(item.description)}>
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
            style={isActive && {elevation: 4}}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              console.log('height222', layout.height);
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
    } else if (item.type === 'description') {
      return (
        <TextParagraphContainer
          style={isActive && {elevation: 4}}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            console.log('height', layout.height);
          }}>
          <TouchableWithoutFeedback
            onPress={() => clickToParagraphContent(item.description)}>
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
          style={isActive && {elevation: 4}}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            console.log('height222', layout.height);
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
  };

  return (
    <Container>
      <HeaderContainer>
        <UploadHeader />
      </HeaderContainer>
      <BodyContainer>
        {changeDescription && (
          <DescriptionInputContainer>
            <DescriptionInput
              placeholder="후기를 작성해주세요."
              autoFocus={true}
              onChangeText={(text: string) => setChangingDes(text)}
              value={changingDes}
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

export default UploadScreen;
