import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  FlatListNew,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';

const Container = Styled.View`
  background-color: #FFFFFF;
`;

const PhotoItem = Styled.Image`
  width: wp('33%');
  height: wp('33%');
  margin-right: 2px;
  margin-bottom: 2px;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8%')};
 background-color: #FFFFFF;
 border-bottom-width: 0.5px;
 border-color: #c3c3c3;
 justify-content: space-between;
 align-items: center;
 flex-direction: row;
 padding-left: 13px;
 padding-right: 13px;
`;

const HeaderTitleText = Styled.Text`
 font-size: 15px;
 font-family: 'Arita4.0_SB';
`;

const CloseButton = Styled.Image`
 width: ${wp('4%')};
 height: ${wp('4%')};
 tint-color: #707070;
`;

const FinishButton = Styled.Image`
 width: ${wp('5.5%')};
 height: ${wp('4%')};
 tint-color: #707070;
`;

const ImageSelectButton = Styled.View`
 width: ${wp('5.5%')};
 height: ${wp('5.5%')};
 border-radius: 100;
 background-color: transparent;
 border-width: 2.5px;
 border-color: #F5F5F5;
`;

const ImageUnselectButton = Styled.View`
 position: absolute;
 width: ${wp('5.5%')};
 height: ${wp('5.5%')};
 border-radius: 100;
 background-color: #23E5D2;
 border-width: 2.5px;
 border-color: #23E5D2;
`;

const SelectButtonContainer = Styled.View`
 width: ${wp('7%')};
 height: ${wp('7%')};
 right: 3.5px;
 top: 1px;
 position: absolute;
 background-color: transparent;
 align-items: center;
 justify-content: center;
`;

interface State {
  photos: any;
  noMorePhotos: boolean;
  loadingMore: boolean;
  lastCursor: any;
  selectedCount: number;
  selectedImage_arr: Array<string>;
}

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        {
          node: {
            image: {
              uri: '',
            },
          },
          selected: false,
        },
      ],
      noMorePhotos: false,
      loadingMore: false,
      lastCursor: null,
      selectedCount: 0,
      selectedIndex_arr: [],
    };
  }

  endReached() {
    if (!this.state.noMorePhotos) {
      if (this.state.loadingMore) {
        return;
      } else {
        this.tryPhotoLoad();
      }
    }
  }

  tryPhotoLoad() {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => {
        this.loadPhotos();
      });
    }
  }

  loadPhotos() {
    const fetchParams = {
      first: 10,
      assetType: 'Photos',
      after: '0',
    };

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
      console.log('fetchParams.after', fetchParams.after);
    }
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {
        console.log(
          'data.page_info.start_cursorasdasd',
          data.page_info.start_cursor,
        );
        console.log(
          '@@data.page_info.end_cursorasdasd',
          data.page_info.end_cursor,
        );
        this.appendAssets(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  appendAssets(data) {
    var photos = data.edges;
    const nextState = {
      loadingMore: false,
      noMorePhotos: false,
    };

    if (photos.length > 0) {
      let olderPhotos = this.state.photos;

      if (olderPhotos.indexOf(photos[0]) == -1) {
        nextState.lastCursor = data.page_info.end_cursor;
        nextState.photos = olderPhotos.concat(photos);
        nextState.selectedImage = nextState.photos[0].node.image.uri;
      }
    }

    console.log('data.page_info_next_page ', data.page_info.has_next_page);

    console.log('data.page_info.end_cursor : ', data.page_info.end_cursor);

    if (!data.page_info.has_next_page) {
      console.log(
        'data.page_info_next_page : false',
        data.page_info.has_next_page,
      );
      nextState.noMorePhotos = true;
    }
    this.setState(nextState);
  }

  _selectImage = (item, index) => {
    if (item.selected === true) {
      item.selected = false;
      let newPhoto_arr = this.state.photos;
      newPhoto_arr.splice(index, 1, item);
      this.setState({
        photos: newPhoto_arr,
      });
    } else {
      item.selected = true;
      let newPhoto_arr = this.state.photos;
      newPhoto_arr.splice(index, 1, item);
      this.setState({
        photos: newPhoto_arr,
      });
    }
  };

  _renderItem = ({item, index}) => {
    if (index === 0) {
      return (
        <View
          style={{
            width: wp('33%'),
            height: wp('33%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Camera</Text>
        </View>
      );
    } else {
      return (
        <View>
          <PhotoItem
            style={{
              width: wp('33%'),
              height: wp('33%'),
            }}
            source={{uri: item.node.image.uri}}
          />
          <TouchableWithoutFeedback
            onPress={() => this._selectImage(item, index)}>
            <SelectButtonContainer>
              <ImageSelectButton />

              {item.selected && <ImageUnselectButton />}
            </SelectButtonContainer>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  };

  backAction = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentDidMount() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      }
    }

    /*
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    })
      .then((res) => {
        this.setState({data: res.edges});
      })
      .catch((error) => {
        console.log(error);
      });
      */

    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  render() {
    return (
      <Container>
        <HeaderContainer>
          <CloseButton source={require('~/Assets/Images/close_gray.png')} />
          <HeaderTitleText>최근 항목</HeaderTitleText>
          <FinishButton source={require('~/Assets/Images/check.png')} />
        </HeaderContainer>
        <FlatList
          style={{
            width: wp('100%'),
            height: hp('100%'),
          }}
          data={this.state.photos}
          numColumns={3}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={this.endReached()}
          onEndReachedThreshold={1}
        />
      </Container>
    );
  }
}
