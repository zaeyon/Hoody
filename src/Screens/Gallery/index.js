import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraRoll from '@react-native-community/cameraroll';
import Styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-material-dropdown';
import Row from './Row';
import ImageItem from './ImageItem';
const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
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

// helper functions
const arrayObjectIndexOf = (array, property, value) =>
  array.map((o) => o[property]).indexOf(value);

const nEveryRow = (data, n) => {
  const result = [];
  let temp = [];

  for (let i = 0; i < data.length; ++i) {
    if (i > 0 && i % n === 0) {
      result.push(temp);
      temp = [];
    }
    temp.push(data[i]);
  }

  if (temp.length > 0) {
    while (temp.length !== n) {
      temp.push(null);
    }
    result.push(temp);
  }

  return result;
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      selected: this.props.selected,
      lastCursor: null,
      initialLoading: true,
      loadingMore: false,
      noMore: false,
      data: [],
      albumName: [{}],
      albumTitleCount: [],
      selectedAlbum: '모두 보기',
    };

    this.renderFooterSpinner = this.renderFooterSpinner.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  _backAction = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    const params = {
      assetType: 'All',
    };
    CameraRoll.getAlbums(params).then((data) => {
      const titleCount = data.map((x) => x.title + '(' + x.count + ')');
      var dataTitle = data.map(function (obj) {
        var albumObj = {};
        albumObj.value = obj.title;
        console.log('albumObj', albumObj);
        return albumObj;
      });

      dataTitle.unshift({value: '모두 보기'});

      this.setState({
        albumName: dataTitle,
      });
      console.log('22 albumName', this.state.albumName);
      console.log("this.state.selected mount", this.state.selected);
    });
  }

  UNSAFE_componentWillMount() {
    this.setState({
      selected: []
    })
    this.fetch();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._backAction,
    );
  }

  componentWillUnmount() {
    const backHandler = BackHandler.removeEventListener(
      'hardwareBackPress',
      this._backAction,
    );

    this.setState({
      selected: []
    })
  }
  /*

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
    });
  }
  /*

  componentDidUpdate(prevState) {
    console.log('componentDidUpdate 실행');
    if (this.state.selectedAlbum !== prevState.selectedAlbum) {
      this.fetch();
    }
  }
  */

  changeSelectedAlbum(data) {
    this.setState({
      selectedAlbum: data,
    });

    console.log('selectedAlbum', this.state.selectedAlbum);
  }

  onEndReached() {
    if (!this.state.noMore) {
      this.fetch();
    }
  }

  appendImages(data) {
    const assets = data.edges;
    const newState = {
      loadingMore: false,
      initialLoading: false,
    };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = this.state.images.concat(assets);
      newState.data = nEveryRow(newState.images, this.props.imagesPerRow);
    }

    this.setState(newState);
  }

  fetch() {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => {
        this.doFetch();
      });
    }
  }

  doFetch() {
    let {groupTypes, assetType} = this.props;
    let groupName;
    let fetchParams;
    if (this.state.selectedAlbum === '모두 보기') {
      fetchParams = {
        first: 100,
        groupTypes,
        assetType,
      };
    } else {
      groupName = this.state.selectedAlbum;
      fetchParams = {
        first: 100,
        groupTypes,
        groupName,
        assetType,
      };
    }
    console.log('groupNamezzzzz', groupName);

    groupTypes = 'Album';
    console.log('groupTypes', groupTypes);

    /*
    if (Platform.OS === 'android') {
      // not supported in android
      //delete fetchParams.groupTypes;
    }
    */

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams).then(
      (data) => this.appendImages(data),
      (e) => console.log(e),
    );
  }

  selectImage(image) {
    const {maximum, imagesPerRow, callback, selectSingleItem} = this.props;
    const {selected} = this.state;

    const index = arrayObjectIndexOf(selected, 'uri', image.uri);

    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length);
      }
      if (selected.length < maximum) {
        selected.push(image);
      }
    }

    console.log('selected: ', selected);

    this.setState({
      selected,
      data: nEveryRow(this.state.images, imagesPerRow),
    });

    callback(selected, image);
  }

  _pressFinish() {
    console.log('사진선택완료');
    console.log('사진선택 this.state.selected', this.state.selected);
    var _selectedImages = this.state.selected.slice(0);

    if(this.props.route.params?.requestType === "upload") {
      this.props.navigation.navigate('UploadScreen', {
        selectedImages: _selectedImages,
      });
    } else if(this.props.route.params?.requestType === "edit") {
      this.props.navigation.navigate('FeedEditScreen', {
        selectedImages: _selectedImages,
      });
    }


    this.setState({
      selected: [],
    })

    console.log("this.state.image pressFinish", this.state.images)
    console.log("this.state.selected", this.state.selected);
  }

  renderImage(item) {
    const {selected} = this.state;
    const {
      imageMargin,
      selectedMarker,
      imagesPerRow,
      containerWidth,
    } = this.props;

    const {uri} = item.node.image;
    const isSelected = arrayObjectIndexOf(selected, 'uri', uri) >= 0;

    console.log("선택한 이미지", this.state.selected);

    console.log("renderImage");

    return (
      <ImageItem
        key={uri}
        item={item}
        selected={isSelected}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={this.selectImage}
        selectedImages={selected}
      />
    );
  }

  renderRow(item) {
    // item is an array of objects
    const isSelected = item.map((imageItem) => {
      if (!imageItem) return false;
      const {uri} = imageItem.node.image;
      return arrayObjectIndexOf(this.state.selected, 'uri', uri) >= 0;
    });

    console.log("renderRow selected", this.state.selected);

    return (
      <Row
        rowData={item}
        isSelected={isSelected}
        selectImage={this.selectImage}
        imagesPerRow={this.props.imagesPerRow}
        containerWidth={this.props.containerWidth}
        imageMargin={this.props.imageMargin}
        selectedMarker={this.props.selectedMarker}
        selectedImages={this.state.selected}
      />
    );
  }

  renderFooterSpinner() {
    if (!this.state.noMore) {
      return <ActivityIndicator style={styles.spinner} />;
    }
    return null;
  }

  render() {
    const {
      initialNumToRender,
      imageMargin,
      backgroundColor,
      emptyText,
      emptyTextStyle,
      loader,
    } = this.props;

    console.log('this.state.albumName', this.state.albumName);

    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, {backgroundColor}]}>
          {loader || <ActivityIndicator />}
        </View>
      );
    }

    const flatListOrEmptyText =
      this.state.data.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          ListFooterComponent={this.renderFooterSpinner}
          initialNumToRender={initialNumToRender}
          onEndReached={this.onEndReached}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={(item) => item[0].node.image.uri}
          data={this.state.data}
          extraData={this.state.selected}
        />
      ) : (
        <Text style={[{textAlign: 'center'}, emptyTextStyle]}>{emptyText}</Text>
      );

    return (
      <Container>
        <HeaderContainer>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <CloseButton source={require('~/Assets/Images/close_gray.png')} />
          </TouchableWithoutFeedback>
          <Dropdown
            containerStyle={{width: 130, height: hp('13%'), marginTop: 20}}
            data={this.state.albumName}
            animationDureation={0}
            rippleOpacity={0}
            dropdownPosition={-5}
            shadeOpacity={0}
            value={'모두 보기'}
            inputContainerStyle={{borderBottomWidth: 0}}
            fontSize={18}
            onChangeText={(value) => this.changeSelectedAlbum(value)}
          />
          <TouchableWithoutFeedback onPress={() => this._pressFinish()}>
            <FinishButton source={require('~/Assets/Images/check.png')} />
          </TouchableWithoutFeedback>
        </HeaderContainer>
        {flatListOrEmptyText}
      </Container>
    );
  }
}

Gallery.propTypes = {
  initialNumToRender: PropTypes.number,
  groupTypes: PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos',
  ]),
  maximum: PropTypes.number,
  assetType: PropTypes.oneOf(['Photos', 'Videos', 'All']),
  selectSingleItem: PropTypes.bool,
  imagesPerRow: PropTypes.number,
  imageMargin: PropTypes.number,
  containerWidth: PropTypes.number,
  callback: PropTypes.func,
  selected: PropTypes.array,
  selectedMarker: PropTypes.element,
  backgroundColor: PropTypes.string,
  emptyText: PropTypes.string,
  emptyTextStyle: Text.propTypes.style,
  loader: PropTypes.node,
};

Gallery.defaultProps = {
  initialNumToRender: 5,
  groupTypes: 'SavedPhotos',
  maximum: 15,
  imagesPerRow: 3,
  imageMargin: 5,
  selectSingleItem: false,
  assetType: 'Photos',
  backgroundColor: 'white',
  selected: [],
  callback(selectedImages, currentImage) {
    console.log('currentImage: ', currentImage);
    console.log('selectedImages: ', selectedImages);
  },
  emptyText: 'No photos.',
};

export default Gallery;
