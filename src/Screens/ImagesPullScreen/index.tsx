import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {BackHandler} from 'react-native';
import Swiper from 'react-native-swipe-image';
import {SliderBox} from '~/Components/SliderBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
 justify-content: center;
`;

const PullImage = Styled.Image`
flex: 1;
`;

const ImagePullScreen = ({route, navigation}) => {
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
  const {imagesUrl_arr} = route.params;
  const {imageIndex} = route.params;
  //  const newUrl_arr = imagesUrl_arr.slice(0, imagesUrl_arr.length - 1);
  //  console.log('newUrl_arr : ', newUrl_arr);
  console.log('imageIndex');

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Container>
      {/*     <PullImage
        resizeMode="contain"
        source={{
          uri: 'https://www.paxetv.com/news/photo/201911/82404_54450_5212.jpg',
        }}
    />*/}
      <SliderBox
        images={imagesUrl_arr}
        disableOnPress={true}
        resizeMode="contain"
        sliderBoxHeight={hp('100%')}
        imageIndex={imageIndex}
        dotColor="#23E5D2"
        inactiveDotColor="#cccccc"
      />
    </Container>
  );
};

export default ImagePullScreen;
