import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Alert, Keyboard} from 'react-native';
import {Rating} from '~/Components/Presentational/UploadScreen/Rating';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const ratingImage = require('~/Assets/Images/ic_star4.png');

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
align-items: center;
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
 font-size: 20px;
 margin-left: 6px;
`;

const RatingContainer = Styled.View`
margin-top: 10px;
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
 margin-left: -2px;
 width: 25px;
 height: 25px;
`;

const HalfRatingStarImage = Styled.Image`
 margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const LabelText = Styled.Text`
font-size: 15px;
color:#000000;
`;

const MainTagContainer = Styled.View`
 margin-top: 50px;
 width: ${wp('80%')};
 height: 70px;
 flex-direction: column;
`;

const SubTagContainer = Styled.View`
margin-top: 20px;
 width: ${wp('80%')};
 flex-direction: column;
`;

const SubTagItemContainer = Styled.View`
 width: ${wp('80%')};
 height: 45px;
 flex-direction :column;
 `;

const ExpenseContainer = Styled.View`
 margin-top: 20px;
 width: ${wp('80%')};
 height: 70px;
 flex-direction: column;
`;

const LocationContainer = Styled.View`
 margin-top: 20px;
 width: ${wp('80%')};
 height: 70px;
 flex-direction: column;
`;

const MapViewContainer = Styled.View`
`;

const SubTagAddContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const IconInputContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 width: ${wp('75.5%')};
 height: ${hp('5%')};
`;

const InputContainer = Styled.View`
`;

const InputWonContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const HashImage = Styled.Image`
 width: ${wp('4.5%')};
 height: ${hp('3.4%')};
`;

const ExpenseImage = Styled.Image`
 width: ${wp('4.7%')};
 height: ${hp('2%')};
`;

const SearchImage = Styled.Image`
 width: ${wp('5%')};
 height: ${hp('2.3%')};
`;


const InputText = Styled.TextInput`
 font-size: 20px;
 width: ${wp('75.5%')};
 height: ${hp('5%')};
 padding-right: 27px;
`;



const MainTagText = Styled.Text`
 font-size: 20px;
 padding-left: 5px;
`;

const SubTagText = Styled.Text`
 font-size: 20px;
 padding-left: 5px;
`;

const LocationText = Styled.Text`
 font-size: 20px;
 padding-left: 5px;
`;

const InputBottomBorder = Styled.View`
 position: absolute;
 bottom: 6px;
 width: ${wp('80%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const BottomArrowIcon = Styled.Image`
margin-left: 5px;
 width: ${wp("3%")};
 height: ${hp('1%')};
`;


const WonText = Styled.Text`
right: 5px;
position: absolute;
 font-size: 20px;
 padding-left: 5px;
`;


const UploadAdditionInfo = ({navigation, route}: Props) => {
  const [mainTag, setMainTag] = useState<string>("");
  const [rating, setRating] = useState<number>();
  const [subTag1, setSubTag1] = useState<string>("");
  const [subTag2, setSubTag2] = useState<string>("");
  const [expanse, setExpanse] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationLong, setLocationLong] = useState<number>();
  const [locationLat, setLocationLat] = useState<number>();
  const [LatLng, setLatLng] = useState<LatLng>()
  const [ratingArray, setRatingArray] = useState(
    ['empty', 'empty', 'empty', 'empty', 'empty']);

  const tmpRatingArr = ['empty', 'empty', 'empty', 'empty', 'empty'];
    
    const ratingCompleted = (rating) => {
        console.log("rating", rating);
        setRating(rating);

        if (rating % 1 === 0) {
          for (var i = 0; i < rating; i++) {
            tmpRatingArr[i] = 'full';
            if (i === rating - 1) {
              setRatingArray(tmpRatingArr);
            }
          }
        } else {
          for (var i = 0; i < rating; i++) {
            if (i === rating - 0.5) {
              tmpRatingArr[i] = 'half';
              setRatingArray(tmpRatingArr);
            } else {
              tmpRatingArr[i] = 'full';
            }
          }
        }
  
    }

    useEffect(() => {
      if(route.params?.location) {
        setLocation(route.params.location);
        setLocationLong(route.params.longitude);
        setLocationLat(route.params.latitude);
        setLatLng({
          latitude: route.params.latitude,
          longitude: route.params.longitude,
        })
      }
    }, [route.params?.location]);

    useEffect(() => {
      if(route.params?.tagType) {
        if(route.params.tagType === "main") {
          console.log("메인태그 수정");
          setMainTag(route.params.selectTag);       
        } else if(route.params.tagType === "sub1") {
          console.log("서브태그1 수정");
          setSubTag1(route.params.selectTag);
        } else if(route.params.tagType === "sub2") {
          console.log("서브태그2 수정");
          setSubTag2(route.params.selectTag);
        }
      }
    }, [route.params?.tagType, route.params?.selectTag])

    const addSubTag = () => {
      if(subTag1 === "") {
        navigation.navigate("TagAutoComplete", {
          tagType: "sub1"
        })
      } else if(subTag2 === "") {
        navigation.navigate("TagAutoComplete", {
          tagType: "sub2"
        })
      } else {
        Alert.alert(
          '태그는 3개까지 등록할 수 있습니다.', '', [
          {
            text: '확인',
            onPress: () => 0,
          },
          ])
      }  
    }

    const clickFinish = () => {
      console.log("ratingArrayzzzz", ratingArray);

      navigation.navigate('UploadScreen', {
        mainTag: mainTag,
        rating: rating,
        subTag1: subTag1,
        subTag2: subTag2,
        expanse: expanse,
        location: location,
        longitude: locationLong,
        latitude: locationLat,
        ratingArray: ratingArray
      })

    }



    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <TouchableWithoutFeedback onPress = {() => clickFinish()}>
              <ButtonText>완료</ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
            <MainTagContainer>
                <LabelText>대표 태그</LabelText>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("TagAutoComplete", {
                  tagType: "main"
                })}>
                <IconInputContainer>
                <HashImage
                source={require('~/Assets/Images/ic_sharp.png')}/>
                <MainTagText>{mainTag}</MainTagText>

                <InputBottomBorder/>
                </IconInputContainer>
                </TouchableWithoutFeedback>
            </MainTagContainer>
            <RatingContainer>
              <Rating
              type="custom"
              onFinishRating={ratingCompleted}
              ratingImage={ratingImage}
              imageSize={45}
              fractions={2}
              startingValue={0.5}/>
            </RatingContainer>
            <SubTagContainer>
              <TouchableWithoutFeedback onPress={() => addSubTag()}>
                <SubTagAddContainer>
                <LabelText>태그 추가</LabelText>
                <BottomArrowIcon
                source={require('~/Assets/Images/ic_bottomArrow.png')}/>
                </SubTagAddContainer>
                </TouchableWithoutFeedback>
    {subTag1 != "" && (
        <SubTagItemContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("TagAutoComplete", {
          tagType: "sub1"
        })}>
        <IconInputContainer>
        <HashImage
        source={require('~/Assets/Images/ic_sharp.png')}/>
        <SubTagText>{subTag1}</SubTagText>
        <InputBottomBorder/>
        </IconInputContainer>
        </TouchableWithoutFeedback>
    </SubTagItemContainer>
    )}
    {subTag2 != "" && (
      <SubTagItemContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("TagAutoComplete", {
          tagType: "sub2"
        })}>
          <IconInputContainer>
            <HashImage
            source={require('~/Assets/Images/ic_sharp.png')}/>
            <SubTagText>{subTag2}</SubTagText>
            <InputBottomBorder/>
          </IconInputContainer>
        </TouchableWithoutFeedback>
      </SubTagItemContainer>
    )}  
            </SubTagContainer>
            <ExpenseContainer>
                <LabelText>소비 금액</LabelText>
                <IconInputContainer>
                <ExpenseImage
                source={require('~/Assets/Images/ic_expense.png')}/>
                <InputContainer>
                <InputWonContainer>
                <InputText
                textAlign="right"
                keyboardType="number-pad"
                value={expanse}
                onChangeText={(text: string) => {
                  setExpanse(text)
                }}
                />
                <WonText>원</WonText>
                </InputWonContainer>
                </InputContainer>

                <InputBottomBorder/>
                </IconInputContainer>
            </ExpenseContainer>

            <LocationContainer>
                <LabelText>위치</LabelText>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("LocationSearch")}>
                <IconInputContainer>
                <SearchImage
                source={require('~/Assets/Images/ic_search.png')}/>
                <LocationText>{location}</LocationText>
                <InputBottomBorder/>
                </IconInputContainer>
                </TouchableWithoutFeedback>
            </LocationContainer>
            {location != "" && (
            <MapViewContainer>
              <MapView
              style={{width: wp('80%'), height: 200}}
              provider={PROVIDER_GOOGLE}
              scrollEnabled={false}
              region={{
                latitude: LatLng.latitude,
                longitude: LatLng.longitude,
                latitudeDelta: 0.0020,
                longitudeDelta: 0.0021,
              }}>
                <Marker
                coordinate={LatLng}/>
              </MapView>
            </MapViewContainer>
            )}
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default UploadAdditionInfo;
