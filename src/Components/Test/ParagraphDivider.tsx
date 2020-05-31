import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  Text,
  FlatList,
  Animated,
  View,
  PanResponder,
  UIManager,
  findNodeHandle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 
`;

const TextParagraphContainer = Styled.View`
 padding: 15px;
 border-bottom-width: 0.3px;
 border-color: #c3c3c3;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DescriptionText = Styled.Text`
`;

const ImageParagraphContainer = Styled.View`
 padding: 15px;
 border-bottom-width: 0.3px;
 border-color: #c3c3c3;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
`;

const InsertedImage = Styled.Image`
 width: ${wp('20%')};
 height: ${wp('20%')};
`;

const ParagraphIcon = Styled.Image`
 width: 20px;
 height: 20px;
`;

const ParagraphDivider = ({navigation, route}: Props) => {
  const [descriptionPara, setDescriptionPara] = useState();
  const [paragraph, setParagraph] = useState([
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
  ]);
  const pan = useRef(new Animated.ValueXY()).current;
  const handle = findNodeHandle();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  useEffect(() => {
    if (route.params?.description) {
      console.log('route.params?.description', route.params?.description);
      setDescriptionPara(route.params.description);
    }
  }, [route.params?.description]);
  return (
    <Container>
      <FlatList
        data={paragraph}
        renderItem={({item, index}) => {
          if (item.type === 'description') {
            return (
              <Animated.View
                style={{transform: [{translateY: pan.y}]}}
                {...panResponder.panHandlers}>
                <TextParagraphContainer>
                  <DescriptionText>{item.description}</DescriptionText>
                  <ParagraphIcon
                    source={require('~/Assets/Images/check.png')}
                  />
                </TextParagraphContainer>
              </Animated.View>
            );
          } else if (item.type === 'image') {
            return (
              <ImageParagraphContainer>
                <InsertedImage source={{uri: item.url}} />
                <ParagraphIcon source={require('~/Assets/Images/check.png')} />
              </ImageParagraphContainer>
            );
          }
        }}
      />
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ParagraphInput', {
            inputedDescription: descriptionPara,
          })
        }>
        <Container>
          {descriptionPara && (
            <TextParagraphContainer>
              <Text>{descriptionPara}</Text>
            </TextParagraphContainer>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default ParagraphDivider;
