import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
      position: new Animated.ValueXY({x: 0, y: hp('50%')}),
    };
  }

  componentDidMount() {
    this._fadeIn();
  }

  _fadeIn() {
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: 0},
      duration: 1000,
      //easing : Easing.bounce,
      delay: 200,
    }).start();
  }

  _getStyle() {
    return {
      width: 100,
      height: 100,
      backgroundColor: 'red',
      transform: [
        {translateX: this.state.position.x},
        {translateY: this.state.position.y},
      ],
    };
  }

  render() {
    return (
      <View>
        <Animated.View style={this._getStyle()} />
      </View>
    );
  }
}
