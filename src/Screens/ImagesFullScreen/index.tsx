import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {BackHandler, TouchableWithoutFeedback} from 'react-native';
import Swiper from 'react-native-swipe-image';
import {SliderBox} from '~/Components/SliderBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #000000;
 justify-content: center;
 align-items: center;
`;

const PullImage = Styled.Image`
flex: 1;
`;

const HeaderCancelContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('11.7%')};
 padding-top: 35px
 padding-left: 16px;
 padding-bottom: 14px;
 padding-right: 16px;
 flex-direction: row;
 align-items: center;
 position: absolute;
 top: 0;
 left: 0;
`;

const HeaderCancelIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #ffffff;
`;

interface Props {
  navigation: any,
  route: any,
}


const ImagePullScreen = ({route, navigation}: Props) => {
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
      <SliderBox
        images={imagesUrl_arr}
        disableOnPress={true}
        resizeMode="contain"
        sliderBoxHeight={hp('100%')}
        imageIndex={imageIndex}
        dotColor="#267DFF"
        inactiveDotColor="#cccccc"
      />
<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
<HeaderCancelContainer>
        <HeaderCancelIcon
        source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
      </HeaderCancelContainer>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default ImagePullScreen;
