import React from 'react';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Styled from 'styled-components/native';

const Container = Styled.View`
 flex: 1;
`;
const Gallery2 = () => {
  return (
    <Container>
      <CameraRollPicker callback={this.getSelectedImages} />
    </Container>
  );
};

export default Gallery2;
