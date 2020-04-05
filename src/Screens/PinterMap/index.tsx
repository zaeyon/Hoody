import React from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Container = Styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
`;

const PinterMap = ({navigation}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default PinterMap;
