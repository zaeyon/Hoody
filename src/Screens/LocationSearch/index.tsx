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
  background-color: #eeeeee;
  flex-direction: row;
  padding: 10px;
  height: ${hp('100%')};
`;

const ShadowInner = Styled.View`
  flex: 1; 
  background-color: #EEEEEE;
  height: ${hp('70%')};
  width: ${wp('94%')};
  flex-direction: row;
  padding: 0px;
  border-radius: 10px;
  justify-content: center;
`;

const TitleText = Styled.Text`
  font-size: 18px;
  color: #000000;
  text-align: center;
  align-self: center;
  font-family: 'Arita4.0_B';
`;

const Inner = Styled.View`
  flex-direction: column;
  height: ${hp('88.5%')};
  width: ${wp('94%')};
  border-radius: 10px;
  background-color: #FFFFFF;
  border-color: #c3c3c3;
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
 margin: 15px 0px;
`;

const SearchButton = Styled.TouchableOpacity`
 position: absolute;
 justify-content: center;
 right: 25px;
`;

const SearchText = Styled.Text`
  font-size: 17px;
`;

const SavedLocationContainer = Styled.View`
 flex: 0.5;
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
 font-family: 'Arita4.0_B';
`;

const SavedLocationText = Styled.Text`
 font-size: 13px;
 font-family: 'Arita4.0_M';
`;

const UseSavedButton = Styled.Text`
 font-size: 14px;
 font-family: 'Arita4.0_B';
 color: #338EFC;
 
`;

const SearchInput = Styled.TextInput`
`;

const LocationListContainer = Styled.View`
 flex: 6;
 flex-direction: column;
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
 font-family: 'Arita4.0_B';
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

  const shadowOpt = {
    width: wp('93%'),
    height: hp('88.5%'),
    color: '#000000',
    border: 3,
    radius: 10,
    opacity: 0.03,
    x: 0,
    y: 0,
    style: {marginVertical: 15},
  };

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
      <BoxShadow setting={shadowOpt}>
        <ShadowInner>
          <Inner>
            <Title>
              {/*<TouchableWithoutFeedback onPress={() => cancelReviewUpload()}>
                <CloseButton
                  style={{width: 20, height: 20}}
                  source={require('~/Assets/Images/close_gray.png')}
                />
  </TouchableWithoutFeedback>*/}
              <TitleText>위치</TitleText>
              {/*<TitleRightButton> </TitleRightButton>*/}
            </Title>
            <SearchContainer>
              <InputBox
                placeholder="위치를 입력하세요."
                onChangeText={(text: string) => setLocation(text)}
                style={{
                  fontFamily: 'Arita4.0_M',
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
                <CurrentLocationText>사진에 저장된 위치</CurrentLocationText>
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
                      navigation.navigate('Upload', {
                        placeName: item.place_name,
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
        </ShadowInner>
      </BoxShadow>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: '#CCCCCC',
  },
  location: {
    fontSize: 13,
    fontFamily: 'Arita4.0_M',
  },
  address: {
    fontSize: 11,
    fontFamily: 'Arita4.0_L',
    color: '#707070',
  },
});

export default LocationSearch;
