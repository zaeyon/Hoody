import React from 'react';
import Styled from 'styled-components/native';
import CameraRollPicker from 'react-native-camera-roll-picker';

const Container = Styled.View`
flex: 1;
`;

const GalleryTest = () => {
    return <Container>
        <CameraRollPicker style={{flex:1}}>

        </CameraRollPicker>
    </Container>
}

export default GalleryTest;
