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
    this.props.navigation.navigate('Search');
    this.setState({showLogo: false});
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: -hp('39%')},
      duration: 500,
      delay: 10,
    }).start();
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
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Search')}>
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

export default Home;
