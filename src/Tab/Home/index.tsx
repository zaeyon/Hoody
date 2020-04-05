import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import Styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 justify-content: center;
`;

const InputBox = Styled.TextInput`
 width: 60%;
 height: 40px;
 padding-left: 16px
 padding-right: 16px
 border-radius: 20px;
 background-color: #F7F6F6;
 justify-content: center;
 text-align: center;
`;

function Home({navigation}) {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <View style={styles.SectionStyle}>
          <Image
            source={require('~/Assets/Images/search_icon.png')}
            style={styles.ImageStyle}
          />
          <InputBox
            placeholder="태그로 후기를 검색하세요."
            clearButtonMode={'while-editing'}
            editable={false}
          />
        </View>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-around',
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F6F6',
    height: 40,
    borderRadius: 20,
    margin: 10,
  },

  ImageStyle: {
    padding: 8,
    marginLeft: 20,
    height: 10,
    width: 5,
    alignItems: 'center',
  },
});

export default Home;
