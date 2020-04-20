import * as React from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';
import Navigator from '~/Navigator';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '~/reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert('카메라 권한을 허용해주세요.');
    }
  } catch (err) {
    console.warn(err);
  }
}

function App() {
  requestCameraPermission();
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;

/*
class App extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      validCloseWindow: false,
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  requestCameraPermission();

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  handleBackButton = () => {
    if (!this.props.navigation.canGoBack()) {
      if (this.state.validCloseWindow) return false;
      this.state.validCloseWindow = true;
      setTimeout(() => {
        this.state.validCloseWindow = false;
      }, 3000);
      ToastAndroid.show('Press Again To Exit !', ToastAndroid.SHORT);
      return true;
    }
  };

  //rest of component code
  render() {
    return <Navigator />;
  }
}

export default App;
*/
