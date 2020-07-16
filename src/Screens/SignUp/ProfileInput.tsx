import React, {useState, useLayoutEffect, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  keyboardEvent,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

import SignUp from '~/Route/Auth/SignUp';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const NextText = Styled.Text`
 font-size: 17px;
 color: #000000;
 margin-right: 13px;
`;

const TextInputLabelText = Styled.Text`
position: absolute;
font-size:14px;
color: #707070;
align-self: flex-start;
`;

const InputContainer = Styled.View`
 width: ${wp('85%')};
 height: ${hp('70%')};
 align-items: center;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('85%')};
 margin-bottom: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('85%')};
height: 50px;
font-size: 16px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('85%')};
height: 0.5px;
background-color: #c3c3c3;
`;

const Header = Styled.View`
width: ${wp('100%')};
height: ${hp('6%')};
border-color: #707070;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-right: 15px;
padding-left: 15px;
`;

const HeaderTitle = Styled.Text`
font-size: 20px;
margin-top: 5px;
`;

const CloseButton = Styled.Image`
 width: ${wp('6.5%')};
 height: ${wp('6.5%')};
 tint-color: #000000;
`;

const FinishButtonContainer = Styled.View`
 justify-content:flex-end;
 background-color:#000000;
`;

const UnabledFinishButton = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8.8%')};
 position: absolute;
 bottom: 0;
 background-color: #cccccc;
 justify-content: center;
 align-items: center;
`;

const FinishButton = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8.8%')};
 position: absolute;
 bottom: 0;
 background-color: #23E5D2;
 justify-content: center;
 align-items: center;
`;

const FinishText = Styled.Text`
font-size: 20px;
color: #ffffff;
`;

const ProfileImage = Styled.Image`
 width: ${wp('25%')};
 height: ${wp('25%')};
 border-radius: 100;
`;

const UnvalidInputText = Styled.Text`
 font-size: 14px;
 position: absolute;
 bottom: -15px;
 color: #FF0000;
`;

const BirthDateGenderContainer = Styled.View`
 width: ${wp('85%')};
 flex-direction: row;
 justify-content: space-between;
 align-items: stretch;
`;

const BirthDateContainer = Styled.View`
flex-direction: column;
`;

const BirthDateBox = Styled.View`
border-radius: 4px;
border-width: 0.5px;
border-color: #c3c3c3;
padding: 5px;
`;

const BirthDateText = Styled.Text`
font-size: 18px;
color: #000000;
`;

const GenderContainer = Styled.View`
 flex-direction: column;
`;

const GenderButtonContainer = Styled.View`
 flex-direction: row;
`;

const LabelText = Styled.Text`
font-size: 15px;
color:#9E9E9E;
`;

const GenderButton = Styled.View`
 width: 55px;
 height: 35px;
 margin-right: 6px;
 border-radius: 4px;
 justify-content: center;
 align-items: center;
 border-width: 0.5px;
 border-color: #c3c3c3;
`;

const SelectedGenderButton = Styled.View`
 width: 55px;
 height: 35px;
 margin-right: 6px;
 border-radius: 4px;
 justify-content: center;
 position: absolute;
 align-items: center;
 border-width: 0.5px;
 border-color: #c3c3c3;
 background-color: #23e5d2;
`;

const SelectedGenderText = Styled.Text`
font-size: 18px;
color: #ffffff;
`;

const UnselectedGenderText = Styled.Text`
font-size: 18px;
color: #000000;
`;

const ProfileInput = ({navigation, route}) => {
  let submitingEmail = route.params!.email || route.params!.socialEmail;
  let submitingPassword: string;
  let submitingSocialId: string;
  let submitingProvider: string;
  let submitingNickname: string;
  let submitingBirthDate: string;
  let submitingGender: string;

  let socialNickname = '';
  let socialGender = '';

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [profileImage, setProfileImage] = useState(
    'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
  );
  const [inputedNickname, setInputedNickname] = useState('');
  const [date, setDate] = useState(new Date(1998 - 1 - 3));
  const [dateStr, setDateStr] = useState('선택');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [inputedGender, setInputedGender] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMale, setSelectedMale] = useState(false);
  const [selectedFemale, setSelectedFemale] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedColor2, setSelectedColor2] = useState('#ffffff');

  const [validNickname, setValidNickname] = useState(true);
  const [confirmedNickname, setConfirmedNickname] = useState(false);
  const [confirmedBirthDate, setConfirmedBirthDate] = useState(false);
  const [confirmedGender, setConfirmedGender] = useState(false);

  const [socialId, setSocialId] = useState('');
  const [provider, setProvider] = useState('local');

  if (route.params!.password) {
    submitingPassword = route.params!.password;
  } else {
    console.log('소셜 로그인함');
    submitingPassword = null;
    if (route.params!.socialNickname) {
      socialNickname = route.params!.socialNickname;
      //setConfirmedNickname(true);
    }
    socialGender = route.params!.socialGender;
    console.log(route.params.socialGender);
  }

  const selectMale = () => {
    setSelectedFemale(false);
    setSelectedColor2('#ffffff');
    setSelectedColor('#23e5d2');
    setSelectedMale(true);
    setConfirmedGender(true);
    setInputedGender('male');
  };

  const selectFemale = () => {
    setSelectedMale(false);
    setSelectedColor('#ffffff');
    setSelectedColor2('#23e5d2');
    setSelectedFemale(true);
    setConfirmedGender(true);
    setInputedGender('female');
  };

  useEffect(() => {
    if (
      route.params!.socialGender === 'MALE' ||
      route.params!.socialGender === 'Male' ||
      route.params!.socialGender === 'male'
    ) {
      console.log('이미 남자');
      selectMale();
    } else if (
      route.params!.socialGender === 'FEMALE' ||
      route.params!.socialGender === 'Female' ||
      route.params!.socialGender === 'female'
    ) {
      selectFemale();
    }
    if (route.params!.socialNickname) {
      submitingNickname = route.params.socialNickname;
      setInputedNickname(route.params.socialNickname);
      setConfirmedNickname(true);
    }
    if (route.params!.socialId) {
      console.log('소셜로그인', route.params.socialId);
      setSocialId(route.params!.socialId);
    }
    if (route.params!.socialProvider) {
      setProvider(route.params.socialProvider);
    }
  }, []);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
    console.log('키보드 높이', e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  function checkNickname(nickname) {
    console.log('입력된 nickname', nickname);
    var strArray = nickname.split('');
    if (strArray.length >= 2 && strArray.length <= 12) {
      setConfirmedNickname(true);
      setValidNickname(true);
    } else {
      setValidNickname(false);
    }
    submitingNickname = nickname;
  }

  function changingNickname(nickname) {
    setValidNickname(true);
    setConfirmedNickname(false);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    let BirthDate = formatDate(selectedDate || date);
    console.log('BirthDate', BirthDate);
    setDate(currentDate);
    setDateStr(BirthDate.toString());
    setConfirmedBirthDate(true);
    submitingBirthDate = BirthDate.toString();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const signUp = () => {
    
    submitingNickname = inputedNickname;
    submitingSocialId = socialId;
    submitingBirthDate = dateStr;
    submitingProvider = provider;
    submitingGender = inputedGender;
    console.log('가입요청 email', submitingEmail);
    console.log('가입요청 password', submitingPassword);
    console.log('가입요청 nickname', submitingNickname);
    console.log('가입요청 birthDate', submitingBirthDate);
    console.log('가입요청 gender', submitingGender);
    console.log('가입요청 socialId', submitingSocialId);
    console.log('가입요청 provider', submitingProvider);

    SignUp(submitingEmail, submitingPassword, submitingNickname, submitingBirthDate, submitingGender, submitingSocialId, submitingProvider)
    .then(function(response) {
      if(response.status === 201) {
      console.log("회원가입 성공", response)
      dispatch(
        allActions.userActions.setUser({
          email: submitingEmail,
          password: submitingPassword,
          birthDate: Date.parse(submitingBirthDate),
          gender: submitingGender,
          socialId: submitingSocialId,
          provider: submitingProvider,
          profileImage: response.data.user.profileImg,
          nickname: response.data.user.nickname,
          followers: response.data.user.Followers,
          followings: response.data.user.Followings,
          userId: response.data.user.id,
        }),
      );
      }
    })
    .catch(function(error) {
      console.log("회원가입 실패", error);
    })


    /*
    return new Promise(function (resolve, reject) {
      axios
        .post(url, form, {
          //withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json; charset=utf-8' 
          },
        })
        .then(function (response) {
          console.log('response : ', response);
          resolve(response.data);
          if (response.status === 201) {
            console.log('회원가입 성공');
            dispatch(
              allActions.userActions.setUser({
                email: submitingEmail,
                password: submitingPassword,
                nickname: submitingNickname,
                birthDate: Date.parse(submitingBirthDate),
                gender: submitingGender,
                socialId: submitingSocialId,
                provider: submitingProvider,
              }),
            );
          } else if(response.status === 400) {
            console.log("response", response);
          }
        })
        .catch(function (response) {
          console.log("response", response);
        });
    });
    */
  

  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  useEffect(() => {
    if (route.params?.profileImage) {
      console.log('프로필사진선택 : ', route.params.profileImage);
      setProfileImage(route.params.profileImage);
    }
  }, [route.params?.profileImage]);

  return (
    <Container>
      <Header>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <CloseButton source={require('~/Assets/Images/ic_back.png')} />
        </TouchableWithoutFeedback>
        <HeaderTitle>회원가입</HeaderTitle>
        <CloseButton
          style={{tintColor: '#ffffff'}}
          source={require('~/Assets/Images/ic_back.png')}
        />
      </Header>
      <InputContainer style={{marginTop: 60}}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Gallery_ProfileImage')}>
          <ProfileImage source={{uri: profileImage}} />
        </TouchableWithoutFeedback>
        <LabelInputContainer>
          <Input
            placeholder="닉네임"
            onChangeText={(text: string) => setInputedNickname(text)}
            onSubmitEditing={(text) => checkNickname(text.nativeEvent.text)}
            onEndEditing={(text) => checkNickname(text.nativeEvent.text)}
            value={inputedNickname}
          />
          <InputBottomLine />
          {!validNickname && <UnvalidInputText>2~12자</UnvalidInputText>}
        </LabelInputContainer>
        <BirthDateGenderContainer>
          <BirthDateContainer>
            <LabelText>생년월일</LabelText>
            <TouchableWithoutFeedback onPress={() => showDatepicker()}>
              <BirthDateBox>
                <BirthDateText>{dateStr}</BirthDateText>
              </BirthDateBox>
            </TouchableWithoutFeedback>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                maximumDate={new Date(2020, 5, 25)}
              />
            )}
          </BirthDateContainer>
          <GenderContainer>
            <LabelText>성별</LabelText>
            <GenderButtonContainer>
              <TouchableWithoutFeedback onPress={() => selectMale()}>
                <GenderButton style={{backgroundColor: selectedColor}}>
                  <UnselectedGenderText>남성</UnselectedGenderText>
                </GenderButton>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => selectFemale()}>
                <GenderButton style={{backgroundColor: selectedColor2}}>
                  <UnselectedGenderText>여성</UnselectedGenderText>
                </GenderButton>
              </TouchableWithoutFeedback>
            </GenderButtonContainer>
          </GenderContainer>
        </BirthDateGenderContainer>
      </InputContainer>
      {confirmedNickname && confirmedBirthDate && confirmedGender && (
        <TouchableWithoutFeedback onPress={() => signUp()}>
          <FinishButton style={{marginBottom: keyboardHeight}}>
            <FinishText>완료</FinishText>
          </FinishButton>
        </TouchableWithoutFeedback>
      )}
      {(!confirmedNickname || !confirmedBirthDate || !confirmedGender) && (
        <UnabledFinishButton style={{marginBottom: keyboardHeight}}>
          <FinishText>완료</FinishText>
        </UnabledFinishButton>
      )}
    </Container>
  );
};

export default ProfileInput;
