import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'

type Props = {}
type State = { width: number, height: number }

// On iOS 9+ will show 'San Francisco' and 'Roboto' on Android
const fontSpecs: TSFontSpecs = {
  fontFamily : undefined,
  fontSize : 24,
  fontStyle : 'italic',
  fontWeight : 'bold',
}
const text = 'I ❤️ rnTextSize'

class TestTextWidth extends Component<Props, State> {
  state = {
    width: 0,
    height: 0,
  }

  async componentDidMount() {
    const width = Dimensions.get('window').width * 0.8
    const size = await rnTextSize.measure({
      text,             // text to measure, can include symbols
      width,            // max-width of the "virtual" container
      ...fontSpecs,     // RN font specification
    })
    this.setState({
      width: size.width,
      height: size.height
    })

    setTimeout(() => {
        console.log("sizeasdadasd", size)
    }, 1000)
  }

  // The result is reversible
  render() {
    const { width, height } = this.state
    return (
      <View style={{ padding: 12, justifyContent: 'center' }}>
        <Text style={{ width, height, ...fontSpecs }}>
          {text}
        </Text>
        <Text>테스트</Text>
      </View>
    )
  }
}

export default TestTextWidth
