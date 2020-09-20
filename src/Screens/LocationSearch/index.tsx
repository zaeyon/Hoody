import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BaseRouter } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;


const HeaderCancelText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const MyProfileSettingButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;


const HeaderFinishText = Styled.Text`
font-size: 17px;
 font-weight: 500;
 color: #3384FF;
`;

const MyProfileReportContainer = Styled.View`
 width: ${wp('24%')};
 height: ${wp('9.6')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
`;

const MyProfileReportImage = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const MyProfileReportText = Styled.Text`
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;

const MyProfileReviewMapContainer = Styled.View`
width: ${wp('24%')};
 height: ${wp('9.6')};
 background-color: #FAFAFA;
 border-radius: 22px;
 border-width: 0.6px;
 border-color: #EFEFEF;
`;


const MyProfileReviewMapImage = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;


const MyProfileReviewMapText = Styled.Text`
 color: #505866;
 font-weight: 600;
 font-size: 15px;
`;



const HeaderTitle = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #333333;
`;


const SearchResultContainer = Styled.View`
  flex-direction: column;
  width: ${wp('100%')};
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

const SearchInputContainer = Styled.View`
justify-content: center;
align-items: center;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('91%')};
 height: 36px;
 border-radius: 40px;
 background-color: #F3F3F3;
 padding-left: ${wp('10%')};
 font-size: 18px;
 color: #000000;
`;

const SearchContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
 padding-top: 5px;
 padding-bottom: 5px;
`;

const SearchText = Styled.Text`
  font-size: 17px;
`;

const MyLocationContainer = Styled.View`
width: ${wp('100%')};
 padding: 17px 10px 3px 14px;
 flex-direction: row;
 align-items: center;
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

const MyLocationText = Styled.Text`
 font-size: 16px;
 color: #3384FF;
 margin-left: 3px;
`;

const InputedLocationContainer = Styled.View`
padding: 3px 15px 10px 15px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const InputedLocationIcon = Styled.Image`
width: ${wp('5%')};
height: ${wp('5%')};
`;

const InputedLocationLeftContainer = Styled.View`
 flex-direction:row;
`;

const InputedLocationRightContainer = Styled.View`
`;

const RemoveInputedLocationText = Styled.Text`
font-size: 16px;
color: #E90000;
`;


const InputedLocationText = Styled.Text`
 font-size: 16px;
 color: #707070;
`;

const UseSavedButton = Styled.Text`
 font-size: 14px;
 ';
 color: #338EFC;
 
`;


const LocationListContainer = Styled.View`
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


const SearchIconContainer = Styled.View`
 position: absolute;
 justify-content: center;
 left: 10px;
`;


const SearchIcon = Styled.Image`
 width: ${wp('6.0%')};
 height: ${wp('6.0%')};
`;

const LoadingContainer = Styled.View`
margin-left: 20px;
`;

const LocationItemCon = Styled.View`
 height: 0.3px;
 width: ${wp('94%')};
 background-color: #cccccc;
`;

const MyLocationIcon = Styled.Image`
 width: ${wp('5%')};
 height: ${wp('5%')};
`;

interface Props {
  navigation: any,
  route: any,
}


const LocationSearch = ({navigation, route}: Props) => {
  const [location, setLocation] = useState();
  const [searchResult_arr, setSearchResult_arr] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState<any>({
    name:""
  });
  const [registeredLocation, setRegisteredLocation] = useState<string>();
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const API_KEY = 'd824d5c645bfeafcb06f24db24be7238';

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

  useEffect(() => {
    
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }

    var hasLocationPermission = true;

    if (hasLocationPermission) {
       console.log("사용자 현재 위치 불러오기")
       Geolocation.getCurrentPosition(
          (position) => {
            console.log("업로드 화면 현재 위치", position);
            //setCurrentLocation(position.coords);
            fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${API_KEY}`,
                },
              },
            )
            .then((response) => response.json())
            .then((json) => {
              setLoadingLocation(false);
              console.log("현재 사용자의 행정구역정보", json);
              setCurrentUserLocation({
                  name:json.documents[0].address.address_name,
                  latitude:position.coords.latitude,
                  longitude:position.coords.longitude,
              })
            })
          },
          (error) => {
            setCurrentUserLocation(false)
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [])

  useEffect(() => {
    if(route.params?.inputedLocation) {
      setRegisteredLocation(route.params?.inputedLocation)
      setLocation(route.params.inputedLocation)
    }
    
  }, [route.params?.inputedLocation])


  
  const SearchLocation = (location: any) => {
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
          search_obj.x = json.documents[i].x;
          search_obj.y = json.documents[i].y;
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

  const changeSearchInput = (text: string) => {
    SearchLocation(text)
    setLocation(text)
  }

  const clickLocationItem = (item: object) => {
    if(route.params?.requestType === "upload") {
      navigation.navigate("UploadScreen", {
        location: item.place_name,
        longitude: item.x,
        latitude: item.y,
      })
    } else if(route.params?.requestType === "edit") {
      navigation.navigate("FeedEditScreen", {
        location: item.place_name,
        longitude: item.x,
        latitude: item.y,
      })
    }
  }

  const removeRegisteredLocation = () => {
    if(route.params?.requestType === "upload") {
      navigation.navigate('UploadScreen', {
        removeLocation: true
      })
    } else if(route.params?.requestType === "edit") {
      navigation.navigate("FeedEditScreen", {
        removeLocation: true
      })
    }
  }

  const clickToCurrentLocation = () => {
    if(route.params?.requestType === "upload") {
      navigation.navigate("UploadScreen", {
        location:  currentUserLocation.name,
        longitude: currentUserLocation.longitude,
        latitude: currentUserLocation.latitude,
      })
    } else if(route.params?.requestType === "edit") {
      navigation.navigate("FeedEditScreen", {
        location:  currentUserLocation.name,
        longitude: currentUserLocation.longitude,
        latitude: currentUserLocation.latitude,
      })
    }
  }

  
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


  return (
    <Container>
       <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <HeaderCancelText>취소</HeaderCancelText>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitle>위치</HeaderTitle>
                <HeaderRightContainer>
                        <HeaderFinishText>확인</HeaderFinishText>
                </HeaderRightContainer>
            </HeaderBar>
            <SearchContainer>
              <SearchInputContainer>
              <SearchInput
                placeholder="위치"
                onChangeText={(text: string) => changeSearchInput(text)}
                placeholderTextColor="#979797"
                value={location}
              />
              <SearchIconContainer>
                <SearchIcon
                  source={require('~/Assets/Images/ic_search.png')}
                />
                </SearchIconContainer>
                </SearchInputContainer>
            </SearchContainer>
            <TouchableWithoutFeedback onPress={() => clickToCurrentLocation()}>
            <MyLocationContainer>
              <MyLocationIcon
              source={require('~/Assets/Images/ic_myLocation.png')}/>
                <MyLocationText>
                  {"내 위치 : "}
                </MyLocationText>
                {loadingLocation && (
                  <LoadingContainer>
                  <ActivityIndicator/>
                  </LoadingContainer>
                )}
                {!loadingLocation && (
                  <MyLocationText>{currentUserLocation.name}</MyLocationText>
                )}
            </MyLocationContainer>
            </TouchableWithoutFeedback>
            {registeredLocation && (
                          <InputedLocationContainer>
                          <InputedLocationLeftContainer>
                          <InputedLocationIcon
                          source={require('~/Assets/Images/ic_location.png')}/>
                          <InputedLocationText>{"등록된 위치 : " + registeredLocation}</InputedLocationText>
                          </InputedLocationLeftContainer>
                          <TouchableWithoutFeedback onPress={() => removeRegisteredLocation()}>
                          <InputedLocationRightContainer>
                          <RemoveInputedLocationText>삭제</RemoveInputedLocationText>
                          </InputedLocationRightContainer>
                          </TouchableWithoutFeedback>
                          
                          </InputedLocationContainer>
            )}
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}>
            <SearchResultContainer>
            <LocationListContainer>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                data={searchResult_arr}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => clickLocationItem(item)}>
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
          </SearchResultContainer>
          </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: wp('100%'),
    paddingLeft:14,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.3,
    borderColor: '#CCCCCC',
  },
  location: {
    fontSize: 15,
  },
  address: {
    fontSize: 14,
    color: '#707070',
  },
});

export default LocationSearch;
