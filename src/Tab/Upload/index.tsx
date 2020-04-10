import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  UIManager,
  TouchableWithoutFeedback,
  LayoutAnimation,
  StyleSheet,
  Platform,
  FlatList,
  View,
  ScrollView,
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
  background-color: #eeeeee;
  flex-direction: row;
  padding: 10px;
  height: ${hp('100%')};

`;

const ShadowInner = Styled.View`
  flex: 1; 
  background-color: #EEEEEE;
  height: ${hp('85%')};
  width: ${wp('94%')};
  flex-direction: row;
  padding: 0px;
  border-radius: 7px;
  justify-content: center;
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
  height: ${hp('85%')};
  width: ${wp('94%')};
  border-radius: 5px;
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

const RocationContainer = Styled.View`
margin-top: 10px;
border-top-width: 0.3px;
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 15px;
height: ${hp('5.5%')};
`;

const TagContainer = Styled.View`
height: ${hp('5.5%')};
border-bottom-width: 0.3px;
border-color: #cccccc;
padding: 0px 15px;
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

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function Upload({navigation}) {
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl_arr, setImageUrl_arr] = useState([
    'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4',
  ]);

  var deleted_arr;

  const openGallery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        var newImage_arr = new Array();
        newImage_arr = imageUrl_arr.slice(0, imageUrl_arr.length - 1);
        newImage_arr[imageUrl_arr.length] =
          'https://firebasestorage.googleapis.com/v0/b/hooging-f33b0.appspot.com/o/zz.png?alt=media&token=eb26a783-c54b-4205-bab6-5357e103aef4';
        newImage_arr[imageUrl_arr.length - 1] = response.uri;
        setImageUrl_arr(newImage_arr);
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

    deleted_arr = imageUrl_arr;
  }, [navigation, imageUrl_arr]);

  useEffect(() => {
    return setImageUrl_arr(imageUrl_arr);
  });

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
                            <EmptyImage source={{uri: item}} />
                          </SelectedImageContainer>
                        </SelectedImageTouch>
                      );
                    } else {
                      return (
                        <SelectedImageContainer>
                          <SelectedImage source={{uri: item}} />
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
