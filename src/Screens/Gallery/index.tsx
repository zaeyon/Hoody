import React, {Component} from 'react';
import {
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  BackHandler,
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

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      noMorePhotos: false,
      loadingMore: false,
      lastCursor: null,
    };
  }

  endReached() {
    if (!this.state.noMorePhotos) {
      this.tryPhotoLoad();
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
      first: 5,
      assetType: 'Photos',
    };

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {
        this.appendAssets(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  appendAssets(data) {
    const photos = data.edges;
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

    if (!data.page_info.has_next_page) {
      nextState.noMorePhotos = true;
    }
    this.setState(nextState);
  }

  _renderItem = ({item, index}) => {
    return (
      <PhotoItem
        style={{
          width: wp('33%'),
          height: wp('33%'),
        }}
        source={{uri: item.node.image.uri}}
      />
    );
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
          data={this.state.photos}
          numColumns={3}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={this.endReached()}
          onEndReachedThreshold={0.5}
        />
      </Container>
    );
  }
}
