import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ImagePicker from 'react-native-image-picker';

const Container = Styled.View`
 border-radius: 7px;
 width: ${wp('26%')};
 height: ${wp('26%')};
 background-color: #FFFFFF;
 justify-content: center;
 align-items: center;
 border-width: 1px;
 border-color: #CCCCCC;
`;

const CameraIcon = Styled.Image`
 color: #CCCCCC;
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

const UploadImageItem = ({onPress}: Props) => {
  const [imageUrl, setImageUrl] = useState('');

  const openGallery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      } else {
        setImageUrl(response.uri);
      }
    });
  };

  return (
    <SelectedImageTouch onPress={() => openGallery()}>
      <Container>
        <CameraIcon
          style={{width: 25, height: 25}}
          source={require('~/Assets/Images/camera.png')}
          tintColor="#C3C#C#"
        />
        <SelectedImage source={{uri: imageUrl}} />
      </Container>
    </SelectedImageTouch>
  );
};

export default UploadImageItem;
