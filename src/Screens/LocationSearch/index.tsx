import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  padding: 10px;
  height: ${hp('100%')};
  justify-content: center;
  background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 10px 20px 0px 20px;
`;


const LeftContainer = Styled.View`
`;

const CenterContainer = Styled.View`
justify-content: center;
margin-left: 7px;
`;

const RightContainer = Styled.View`
`;

const HeaderTitleText = Styled.Text`
 font-size: 16px;
 margin-left: 6px;
`;


const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const Inner = Styled.View`
  flex-direction: column;
  height: ${hp('88.5%')};
  width: ${wp('100%')};
  border-radius: 10px;
  border-color: #c3c3c3;
  justify-content: center;
  align-items: center;
`;

const Title = Styled.View`
 flex-direction: row;
 height: ${hp('3%')};
 padding: 0px 10px;
 margin-top: 13px;
 align-items: center;
 justify-content: center;
`;

const InputBox = Styled.TextInput`
 width: ${wp('87%')};
 height: 35px;
 border-radius: 25px;
 background-color: #FFFFFF;
 justify-content: center;
 padding-left: 15px;
 border-width: 1.0px;
 border-color: #23E5D2;
`;

const SearchContainer = Styled.View`
 top:0;
 align-self: stretch;
 right:0;
 left: 0;
 flex: 0.5;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 margin: 4px 0px;
`;

const SearchButton = Styled.TouchableOpacity`
 position: absolute;
 justify-content: center;
 right: 42px;
`;

const SearchText = Styled.Text`
  font-size: 17px;
`;

const SavedLocationContainer = Styled.View`
  width: ${wp('95%')};
 flex: 0.4;
 padding: 10px 15px 7px 15px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.4px;
 border-color: #cccccc;
`;

const SavedLeftContainer = Styled.View`
 flex-direction: column;
`;

const SavedRightContainer = Styled.View`
 justify-content: center;

`;

const CurrentLocationText = Styled.Text`
 font-size: 11px;
 ';
`;

const SavedLocationText = Styled.Text`
 font-size: 13px;
 
`;

const UseSavedButton = Styled.Text`
 font-size: 14px;
 ';
 color: #338EFC;
 
`;

const SearchInput = Styled.TextInput`
`;

const LocationListContainer = Styled.View`
 flex: 6;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const TitleRightButton = Styled.Text`
 font-size: 19px;
 color: #338EFC;
 ';
`;

const CloseButton = Styled.Image`
`;

const SearchIcon = Styled.Image`
 width: ${wp('4.5%')};
 height: ${wp('4.5%')};
 margin-left: 10px;
`;

const LocationItemCon = Styled.View`
 height: 0.3px;
 width: ${wp('94%')};
 background-color: #cccccc;
`;

const LocationItem = ({location, address}) => {
  return (
    <>
      <View style={styles.item}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </>
  );
};

const LocationSearch = ({navigation}) => {
  const [location, setLocation] = useState();
  const [searchResult_arr, setSearchResult_arr] = useState([]);
  const API_KEY = 'd824d5c645bfeafcb06f24db24be7238';

  
  const SearchLocation = (location) => {
    fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${location}`,
      {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        // 받은 json으로 기능 구현
        console.log(json);
        console.log(
          'json.documents[0].place_name',
          json.documents[0].place_name,
        );
        console.log('json.documents.length : ', json.documents.length);

        var searchedResult_arr = new Array();
        for (var i = 0; i < json.documents.length; i++) {
          var search_obj = Object();
          search_obj.place_name = json.documents[i].place_name;
          search_obj.address = json.documents[i].address_name;
          search_obj.index = i;
          searchedResult_arr.push(search_obj);
          console.log('search_obj.place_name', search_obj.place_name);
          console.log(
            'json.documents[i].place_name',
            json.documents[i].place_name,
          );

          if (i === json.documents.length - 1) {
            setSearchResult_arr(searchedResult_arr);
          }
        }
      });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText>게시물 정보</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText>완료</ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
          <Inner>
            <SearchContainer>
              <InputBox
                placeholder="위치를 입력하세요."
                onChangeText={(text: string) => setLocation(text)}
                style={{
                  fontSize: 12,
                }}
              />
              <SearchButton onPress={() => SearchLocation(location)}>
                <SearchIcon
                  source={require('~/Assets/Images/search_icon.png')}
                />
              </SearchButton>
            </SearchContainer>
            <SavedLocationContainer>
              <SavedLeftContainer>
                <CurrentLocationText>현재 위치</CurrentLocationText>
                <SavedLocationText>
                  을지로 3가역 사랑방 칼국수
                </SavedLocationText>
              </SavedLeftContainer>
              <SavedRightContainer>
                <UseSavedButton>사용</UseSavedButton>
              </SavedRightContainer>
            </SavedLocationContainer>
            <LocationListContainer>
              <FlatList
                data={searchResult_arr}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('UploadAdditionInfo', {
                        location: item.place_name,
                      });
                    }}>
                    <View>
                      <LocationItem
                        location={item.place_name}
                        address={item.address}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item) => item.index}
              />
            </LocationListContainer>
          </Inner>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: wp('95%'),
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: '#CCCCCC',
  },
  location: {
    fontSize: 13,
  },
  address: {
    fontSize: 11,
    
    color: '#707070',
  },
});

export default LocationSearch;
