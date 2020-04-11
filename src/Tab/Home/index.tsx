import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 0px 0px 50px 0px;
`;

const HoogingLogo = Styled.Image`
margin-left: 10px;
`;

const InputBoxContainer = Styled.View`
 justify-content: center;
 transform:
   {translateY: this.state.position.y}
`;

const InputBox = Styled.TextInput`
 width: ${wp('85%')};
 height: 40px;
 border-radius: 25px;
 background-color: #F7F6F6;
 justify-content: center;
 text-align: center;
 font-family: 'Arita4.0_B.otf';
 border-width: 1.5px;
 border-color: #23E5D2;
`;

const SearchIcon = Styled.Image`
 position: absolute;
 width: ${wp('4.5%')};
 height: ${wp('4.5%')};
 margin-left: 10px;
`;
type Props = {navigation};

class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.ValueXY({x: 0, y: 0}),
      showLogo: true,
    };
  }

  _moveSearchBar() {
    this.setState({showLogo: false});
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: -hp('39%')},
      duration: 500,
      delay: 10,
    }).start();
  }

  _getStyle() {
    return;
  }

  render() {
    return (
      <Container>
        {this.state.showLogo && (
          <HoogingLogo source={require('~/Assets/Images/Logo/logo.png')} />
        )}
        <Animated.View
          style={[
            {
              transform: [{translateY: this.state.position.y}],
            },
          ]}>
          <TouchableWithoutFeedback onPress={() => this._moveSearchBar()}>
            <View>
              <InputBoxContainer>
                <InputBox
                  placeholder="태그로 후기를 검색하세요."
                  clearButtonMode={'while-editing'}
                  editable={false}
                  style={{
                    fontFamily: 'Arita4.0_M',
                    fontSize: 12,
                  }}
                />
                <SearchIcon
                  source={require('~/Assets/Images/search_icon.png')}
                />
              </InputBoxContainer>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Container>
    );
  }
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
    borderWidth: 1.5,
    borderColor: '#23E5D2',
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

/*
function Home({navigation}) {
  return (
   
  );
}
*/
