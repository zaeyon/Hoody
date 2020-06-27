import React, {Component} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  Animated,
  FlatList,
  View,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TagInfoItem from '~/Components/TagInfoItem';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchResult from '~/Components/SearchResult';
import SearchAutoComplete from '~/Components/Presentational/SearchScreen/SearchAutoCompleteItem';

const Container = Styled.SafeAreaView`
 background-color: #FFFFFF;
 align-items: center;
 flex-direction: column;
 justify-content: center;
 padding: 0px 0px 0px 0px;
 position: relative;
`;

const HoogingLogo = Styled.Image`
margin-left: 10px;
`;

const InputBoxContainer = Styled.View`
 flex:1
 position: relative;
 justify-content: center;
 transform:
   {translateY: this.state.position.y}
`;

const InputBox = Styled.TextInput`
 width: ${wp('85%')};
 height: ${hp('6.5%')};
 border-radius: 25px;
 background-color: #FFFFFF;
 justify-content: center;
 text-align: center;
 align-self: center;
 border-width: 1.5px;
 border-color: #23E5D2;
`;

const SearchIcon = Styled.Image`
flex:1;
 position: absolute;
 width: ${wp('4.5%')};
 height: ${wp('4.5%')};
 margin-left: 10px;
`;

const TagInputContainer = Styled.View`
 position: absolute;
 height: ${wp('10%')};
 border-radius: 5px;
 flex-direction: row;
 left: ${wp('4.3%')};
 align-items: center;
 justify-content: flex-start;
 `;

const TagTextInput = Styled.TextInput`
 margin-left: 8px;
 
 font-size: 13px;
 color: #999999;
 width: ${wp('30%')};
 height: ${wp('10%')};
`;

const TagText = Styled.Text`
 color: #707070;
 font-size: 13px;
 
`;

const HashText = Styled.Text`
 position: absolute;
 left: 0px;
 
 font-size: 15px;
 color: #999999;
`;

const InputedTagContainer = Styled.View`
 height: ${wp('7%')};
 border-radius: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 margin-right: 5px;
 padding-left: 8px;
 padding-right: 8px;
 background-color: #ECE9EC;
`;

const SearchTextContainer = Styled.View`
 width: ${wp('13%')};
 height: 40px;
 position: absolute;
 right: 5px;
 align-items: center;
 justify-content: center;
`;

const SearchText = Styled.Text`
 
 font-size: 13px;
 color: #000000;
`;

const InsertTagContainer = Styled.View`
 margin-left: 5px;
 flex-direction: row;
 align-items:center;
 justify-content: center;
`;

const TagDeleteButton = Styled.Image`
 width :${wp('2.5%')};
 height:${wp('2.5%')};
 opacity: 1;
 tint-color: #999999;
`;

const TagDeleteContainer = Styled.View`
 justify-content: center;
 align-items: flex-end;
 margin-left: 0px;
 width: ${wp('5%')};
 height: ${wp('4%')};
`;

const TagSearchResultContainer = Styled.View`
top: ${hp('10%')};
bottom: 0px;
position: absolute;
background-color: #ffffff;
width: 100%;
`;

const TagAutoCompleteContainer = Styled.View`
top: ${hp('10%')};
bottom: 0px;
position: absolute;
background-color: #ffffff;
width: ${wp('100%')};
`;

type Props = {navigation};

interface State {
  inputedTag_arr: Array<string>;
  inputedTag: string;
}

class Search extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.ValueXY({x: 0, y: 0}),
      showLogo: true,
      inputedTag_arr: [],
      inputedTag: null,
      inputingTag: null,
      searchedTag_arr: [],
      initalTag_arr: [],
      afterTag_arr: [],
      searchInput: false,
      searchResult_popular_arr: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOQIknR9cXIueb8RIJccEvZ3o8OZhOrCKxmOJQkqCsaab3CnrX&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRh28mNQsB8JSm0UzQrdLfMfoKH-xgfOD07yBAxcsPTQXIEmh6N&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzykKVDf4uLOTMQuQ_tbKCqwZUllOn_lpe1CRA5MF5lDxZGbI3&usqp=CAU',
        'https://img.insight.co.kr/static/2019/10/11/700/3m3g34c219o3r94hpyh4.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs2MAK0heKtNzCdUWV0grmgbzrs5HEpoy3B8V_gwV5eXUyZFU9&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOQIknR9cXIueb8RIJccEvZ3o8OZhOrCKxmOJQkqCsaab3CnrX&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRh28mNQsB8JSm0UzQrdLfMfoKH-xgfOD07yBAxcsPTQXIEmh6N&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzykKVDf4uLOTMQuQ_tbKCqwZUllOn_lpe1CRA5MF5lDxZGbI3&usqp=CAU',
        'https://img.insight.co.kr/static/2019/10/11/700/3m3g34c219o3r94hpyh4.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs2MAK0heKtNzCdUWV0grmgbzrs5HEpoy3B8V_gwV5eXUyZFU9&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOQIknR9cXIueb8RIJccEvZ3o8OZhOrCKxmOJQkqCsaab3CnrX&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRh28mNQsB8JSm0UzQrdLfMfoKH-xgfOD07yBAxcsPTQXIEmh6N&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzykKVDf4uLOTMQuQ_tbKCqwZUllOn_lpe1CRA5MF5lDxZGbI3&usqp=CAU',
        'https://img.insight.co.kr/static/2019/10/11/700/3m3g34c219o3r94hpyh4.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs2MAK0heKtNzCdUWV0grmgbzrs5HEpoy3B8V_gwV5eXUyZFU9&usqp=CAU',
      ],
      searchResult_latest_arr: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWVPhC9j1zL3dWUecVri4SjTVHCWe_AKtKsihfIPj3eGKFT2Iu&usqp=CAU',
        'https://img.danawa.com/prod_img/500000/982/971/img/7971982_1.jpg?shrink=500:500&_v=20190521141641',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDuUXFqLldPV5PrXoiLZ_gJlOOXH53puGNvtzvg6aPZIzKDByZ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQCzqJXkTudbgrXR0ChdXsKGia9xQA1bDXxWdmTO8m5OIzJkKa&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTInjJfDl2d8W3jd7QROuglx8RUdl-cLPY-5wIFi7rihHZKyovE&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7NfeiPqbHbPmnCro0LmoBCC2ipH_Hqy36ndTlR99njJKN4zet&usqp=CAU',
      ],
    };
  }

  _keyboardDidHide = () => {
    this.props.navigation.navigate('Home');
  };

  componentDidMount() {
    this._moveSearchBar();
  }

  componentWillUnmount() {}

  _moveSearchBar() {
    this.props.navigation.navigate('Search');
    this.setState({showLogo: false});
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: -hp('43%')},
      duration: 350,
      delay: 10,
    }).start();
  }

  _submitTag(text) {
    const newTag = text.nativeEvent.text;
    var newTag_arr = this.state.inputedTag_arr;
    newTag_arr.push(newTag);
    console.log('inputedTag_arr', this.state.inputedTag_arr);
    if (this.state.searchedTag_arr[0]) {
      console.log('태그 검색후');
      this.setState({
        afterTag_arr: newTag_arr,
        inputingTag: '',
      });
    } else {
      console.log('태그 검색전');
      this.setState({
        inputedTag_arr: newTag_arr,
        inputingTag: '',
      });
    }
  }

  _deleteTag(index) {
    let deletedTag_arr = this.state.inputedTag_arr;
    let deletedTag_arr2 = this.state.initalTag_arr;
    deletedTag_arr.splice(index, 1);
    this.setState({
      inputedTag_arr: deletedTag_arr,
    });
    console.log('this.searchedTag_arr', this.state.searchedTag_arr);
  }

  _searchTag() {
    console.log('onPress searchButton');
    const searchTag_arr = this.state.inputedTag_arr.slice(0);
    this.setState({
      searchedTag_arr: searchTag_arr,
    });
  }

  updateSize = (width) => {
    this.setState({
      width,
    });
  };

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
          <InputBoxContainer>
            <InputBox editable={false} />
            <TagInputContainer>
              <FlatList
                data={this.state.inputedTag_arr}
                horizontal={true}
                renderItem={({item, index}) => (
                  <InputedTagContainer>
                    <TagText>#{item}</TagText>
                    <TouchableWithoutFeedback
                      onPress={() => this._deleteTag(index)}>
                      <TagDeleteContainer>
                        <TagDeleteButton
                          source={require('~/Assets/Images/delete_empty.png')}
                        />
                      </TagDeleteContainer>
                    </TouchableWithoutFeedback>
                  </InputedTagContainer>
                )}
              />
              <InsertTagContainer>
                <HashText>#</HashText>
                <TagTextInput
                  placeholder="태그 입력"
                  value={this.state.inputingTag}
                  onChangeText={(text: string) =>
                    this.setState({
                      inputingTag: text,
                      searchInput: true,
                    })
                  }
                  autoFocus={true}
                  onSubmitEditing={(text: string) => this._submitTag(text)}
                />
              </InsertTagContainer>
            </TagInputContainer>
            <SearchTextContainer>
              <TouchableWithoutFeedback onPress={() => this._searchTag()}>
                <SearchText>검색</SearchText>
              </TouchableWithoutFeedback>
            </SearchTextContainer>
          </InputBoxContainer>
        </Animated.View>
        {/*
        {this.state.searchInput && (
          <TagAutoCompleteContainer>
            <SearchAutoComplete></SearchAutoComplete>
          </TagAutoCompleteContainer>
        )}
        {this.state.searchedTag_arr[0] && (
          <TagSearchResultContainer>
            <SearchResult
              searchedTag_arr={this.state.searchedTag_arr}
              searchData_popular={this.state.searchResult_popular_arr}
              searchData_latest={this.state.searchResult_latest_arr}
            />
          </TagSearchResultContainer>
        )}
        */}
      </Container>
    );
  }
}
export default Search;
