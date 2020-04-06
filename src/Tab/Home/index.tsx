import React, {useEffect, Component} from 'react';
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
  ScrollView,
} from 'react-native';
import Styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';

const IC_ARR_DOWN = require('~/Assets/Images/Dropdown/ic_arr_down.png');
const IC_ARR_UP = require('~/Assets/Images/Dropdown/ic_arr_up.png');

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 justify-content: center;
 flex-direction: column;
`;

const InputBox = Styled.TextInput`
 width: 60%;
 height: 40px;
 padding-left: 5px
 padding-right: 5px
 border-radius: 20px;
 background-color: #F7F6F6;
 justify-content: center;
 text-align: center;
 font-family: 'Arita4.0_B.otf';
 border-top-width: 0.5px;
 border-bottom-width: 0.5px;
`;

function Home({navigation}) {
  const [text, setText] = React.useState('');
  var data = [['실시간 검색어', '에어팟']];

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
            style={{
              fontFamily: 'Arita4.0_M',
              fontSize: 12,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={{width: 60}}></View>
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
    borderWidth: 0.5,
  },

  ImageStyle: {
    padding: 8,
    marginLeft: 5,
    marginRight: 20,
    height: 10,
    width: 5,
    alignItems: 'center',
  },

  header: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 12,
    color: 'rgb(74,74,74)',
    marginRight: 60,
    flexWrap: 'wrap',
  },
  txt: {
    fontSize: 14,
    fontFamily: 'Arita4.0_M',
  },
});

export default Home;
