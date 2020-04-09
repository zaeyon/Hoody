import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Platform,
  FlatList,
  View,
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import {Rating} from 'react-native-ratings';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import UploadImageItem from '~/Components/UploadImageItem';
import {FlatGrid} from 'react-native-super-grid';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Container = Styled.SafeAreaView`
  flex: 1;
  height: 100%;
  background-color: #eeeeee;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
`;

const ShadowInner = Styled.View`
  flex: 1; 
  height: 90%;
  background-color: #FFFFFF;
  flex-direction: row;
  padding: 10px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

const MyHoogingText = Styled.Text`
  font-size: 18px;
  color: #000000;
  text-align: center;
  font-family: 'Arita4.0_M';
`;

const UploadButton = Styled.Text`
 font-size: 19px;
 color: #001BD8;
 font-family: 'Arita4.0_M';
`;

const CloseButton = Styled.Image`
 
`;

const Inner = Styled.View`
  flex-direction: column;
  width: 100%;
  border-width: 0px;
  border-radius: 5px;
  background-color: #FFFFFF;
  border-color: #c3c3c3;
  
`;

const Title = Styled.View`
 flex-direction: row;
 height: 40px;
 padding: 8px;
 align-items: center;
 justify-content: space-between;
`;

const ImageRatingContainer = Styled.View`
 padding: 0px 0px;
 flex-direction: column;
 border-bottom-width: 0.3px;
 border-color: #cccccc;
 justify-content:space-between;
`;

const ImageContainer = Styled.View`
margin-top: 15px;
`;

const RatingContainer = Styled.View`
margin-top: 20px;
`;

const RocationContainer = Styled.View`
flex: 0.45;
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 15px;
`;

const TagContainer = Styled.View`
flex: 0.45;
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 15px;
`;

const CommentContainer = Styled.View`
flex: 3.5;
border-bottom-width: 0.4px;
border-color: #c3c3c3;
padding: 0px 15px;
`;

const GalleryContainer = Styled.TouchableOpacity`
 height: 100%;
 flex: 3;
`;

const SelectedImageContainer = Styled.View`
 border-radius: 7px;
 width: ${wp('26%')};
 height: ${wp('26%')};
 background-color: #FFFFFF;
 justify-content: center;
 align-items: center;
 border-width: 1px;
 border-color: #CCCCCC;
`;

const RocationInput = Styled.TextInput`
 font-size: 13px;
 font-family: 'Arita4.0_M';
`;

const TagInput = Styled.TextInput`
 font-size: 13px;
 font-family: 'Arita4.0_M';
`;

const CameraIcon = Styled.Image`
 color: #CCCCCC;
`;

const CommentInput = Styled.TextInput`
font-family: 'Arita4.0_M';
`;

const SelectedImageTouch = Styled.TouchableWithoutFeedback`
`;

const SelectedImage = Styled.Image`

position: absolute;
  border-radius: 7px;
  width: ${wp('26%')};
  height: ${wp('26%')};
`;

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function Upload({navigation}) {
  const items = [{name: 'TURQUOISE', code: '#1abc9c'}];

  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl_arr, setImageUrl_arr] = useState(['']);
  const itemss = [
    'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
    'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    'https://www.iconsdb.com/icons/preview/gray/slr-camera-xxl.png',
  ];

  const openGallery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        setImageUrl(response.uri);
      }
    });
  };

  const shadowOpt = {
    width: wp('93%'),
    height: hp('100%'),
    color: '#000000',
    border: 3,
    radius: 10,
    opacity: 0.03,
    x: 0,
    y: 0,
    style: {marginVertical: 15},
  };

  const ratingCompleted = (rating) => {
    console.log(`Rating is: + ${rating}`);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text onPress={() => 1} title="공유" />,
    });
  }, [navigation]);

  return (
    <Container>
      <BoxShadow setting={shadowOpt}>
        <ShadowInner>
          <Inner>
            <Title>
              <CloseButton
                style={{width: 20, height: 20}}
                source={require('~/Assets/Images/close_gray.png')}
              />
              <MyHoogingText>나의 후깅</MyHoogingText>
              <UploadButton>공유</UploadButton>
            </Title>
            <ImageRatingContainer>
              <ImageContainer>
                <FlatGrid
                  itemDimension={wp('20%')}
                  items={itemss}
                  // staticDimension={300}
                  // fixed
                  // spacing={20}
                  renderItem={({item, index}) => (
                    <SelectedImageTouch onPress={() => openGallery()}>
                      <SelectedImageContainer>
                        <SelectedImage source={{uri: item}} />
                      </SelectedImageContainer>
                    </SelectedImageTouch>
                  )}
                />
              </ImageContainer>
              <RatingContainer>
                <Rating
                  onFinishRating={ratingCompleted}
                  style={{paddingVertical: 10}}
                  imageSize={33}
                />
              </RatingContainer>
            </ImageRatingContainer>
            <RocationContainer>
              <TouchableOpacity
                onPress={() => navigation.navigate('LocationSearch')}>
                <RocationInput placeholder="위치 추가" editable={false} />
              </TouchableOpacity>
            </RocationContainer>
            <TagContainer>
              <TagInput placeholder="태그" />
            </TagContainer>
            <CommentContainer>
              <CommentInput placeholder="comment ..." />
            </CommentContainer>
          </Inner>
        </ShadowInner>
      </BoxShadow>
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

/*
<SelectedImageTouch onPress={() => openGallery()}>
<SelectedImageContainer>
  <CameraIcon
    style={{width: 25, height: 25}}
    source={require('~/Assets/Images/camera.png')}
    tintColor="#C3C3C3"
  />
  <SelectedImage source={{uri: imageUrl}} />
</SelectedImageContainer>
</SelectedImageTouch>
*/
