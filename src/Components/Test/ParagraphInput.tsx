import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {BackHandler} from 'react-native';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 padding: 15px;
`;

const DescriptionTextInput = Styled.TextInput`
`;

const ParagraphInput = ({navigation, route}: Props) => {
  const [inputedDescription, setInputedDescription] = useState('');

  useEffect(() => {
    const backAction = () => {
      console.log('ParagraphInput backaction 호출', inputedDescription);
      navigation.navigate('ParagraphDivider', {
        description: inputedDescription,
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [inputedDescription]);

  useEffect(() => {
    if (route.params?.inputedDescription) {
      setInputedDescription(route.params.inputedDescription);
    }
  }, [route.params?.inputedDescription]);

  const changeDescrip = (text) => {
    console.log('바뀐 text', text);
    setInputedDescription(text);
    console.log('setInputedDescription', inputedDescription);
  };

  return (
    <Container>
      <DescriptionTextInput
        multiline={true}
        autoFocus={true}
        onChangeText={(text: string) => changeDescrip(text)}
        value={inputedDescription}
      />
    </Container>
  );
};

export default ParagraphInput;
