import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import {Keyboard} from 'react-native';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
  align-items: center;
`;

const InputBox = Styled.TextInput`
 width: 80%;
 height: 40px;
 padding-left: 16px
 padding-right: 16px
 border-radius: 20px;
 background-color: #F7F6F6;
 margin-top: 10px; 
`;

const Search = ({navigation}) => {
  const [value, onChangeText] = React.useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    //cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => {
    navigation.navigate('Home');
  };

  return (
    <Container>
      <InputBox
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholder="태그로 후기를 검색하세요."
        clearButtonMode={'while-editing'}
        autoFocus={true}
      />
    </Container>
  );
};

export default Search;
