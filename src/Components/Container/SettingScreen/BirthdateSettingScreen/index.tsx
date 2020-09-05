import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import DateTimePicker from '@react-native-community/datetimepicker';

// Route
import POSTBirthdateUpdate from '~/Route/Profile/POSTBirthdateUpdate';

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
 background-color:#ffffff;

 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 12.5px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 12.5px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderRegisterText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #267DFF;
`;

const DisabledHeaderRegisterText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #C6C7CC;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;


const DescripContainer = Styled.View`
padding-top: 20px;
padding-bottom: 20px;
padding-left: 16px;
padding-right: 16px;
`;

const MainDescripText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SubDescripText = Styled.Text`
margin-top: 8px;
font-size: 14px;
color: #8E9199;
`;

const BirthdateContainer = Styled.View`
padding-top: 10px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
`;

const BirthdateLabelText = Styled.Text`
font-size: 16px;
font-weight: 600;
color: #333333;
`;

const BirthdateInputContainer = Styled.View`
margin-top: 10px;
width: ${wp('91.4%')};
height: ${wp('12.1%')};
border-radius: 10px;
justify-content: center;
padding-left: 12px;
background-color: #F7F7F7;
`;

const BirthdateText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #1D1E1F;
`;

const BirthdateModalContainer = Styled.View`
width: ${wp('100%')};
position: absolute;
bottom: ${hp('8.5%')};
`;

const ModalHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')};
 height: ${wp('11.2%')};
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 padding-left: 16px;
`;

const ModalFinishContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-right: 16px
`;

const ModalFinishText = Styled.Text`
 font-size: 16px;
 color: #267DFF;
`;


interface Props {
    navigation: any,
    route: any,
}

const BirthdateSettingScreen = ({navigation, route}: Props) => {
    const dispatch = useDispatch();
    const [birthdate, setBirthdate] = useState<Date>(new Date(route.params?.birthdate));
    const [visibleBirthdatePicker, setVisibleBirthdatePicker] = useState<boolean>(false);
    const [birthdateIndication, setBirthdateIndication] = useState<string>(route.params?.birthdateIndication);
    const [submitBirthdate, setSubmitBirthdate] = useState<string>();
    const [birthdateChange, setBirthdateChange] = useState<boolean>(false);

    console.log("birthDate", birthdate);

    function formatIndicationDate(date: any) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return year + "년 " + month + "월 " + day + "일";
      }
       
      function formatDate(date: any) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return year + "/" + month + "/" + day;
      }

  const applyBirthdate = () => {
    console.log("birthdate", birthdate);
    console.log("new Date(route.params?.birthdate)", new Date(route.params?.birthdate));
    
    if(formatDate(birthdate) !== formatDate(route.params?.birthdate)) {
        setBirthdateChange(true);
    }

    setBirthdateIndication(formatIndicationDate(birthdate));
    setVisibleBirthdatePicker(false);
    setSubmitBirthdate(formatDate(birthdate));
  }

  const onChangeBirthdatePicker = (event, date) => {
    setBirthdate(date)
  }

  const updateBirthdate = () => {
      POSTBirthdateUpdate(submitBirthdate)
      .then(function(response) {
          console.log("response", response);
          navigation.navigate("AccountSettingScreen", {
              birthdateUpdate: birthdate,
          })
      })
      .catch(function(error) {
          console.log("error", error)
      })
  }



    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackButtonContainer>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>생일</HeaderTitleText>
                {birthdateChange && (
                <TouchableWithoutFeedback onPress={() => updateBirthdate()}>
                <HeaderRightContainer>
                    <HeaderRegisterText>적용</HeaderRegisterText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
                )}
                {!birthdateChange && (
                <HeaderRightContainer>
                    <DisabledHeaderRegisterText>적용</DisabledHeaderRegisterText>
                </HeaderRightContainer>
                )}
            </HeaderBar>
            <BodyContainer>
                <DescripContainer>
                <MainDescripText>
                    생일을 알려주세요.
                </MainDescripText>
                <SubDescripText>
                내정보의 생일은 서비스 전체에 적용되며, 맞춤형 컨텐츠 제공에 사용됩니다. 입력한 정보는 언제든 수정, 관리할 수 있습니다.
                </SubDescripText>
                </DescripContainer>
                <BirthdateContainer>
                    <BirthdateLabelText>생년월일</BirthdateLabelText>
                    <TouchableWithoutFeedback onPress={() => setVisibleBirthdatePicker(true)}>
                    <BirthdateInputContainer>
                        <BirthdateText>{birthdateIndication}</BirthdateText>
                    </BirthdateInputContainer>
                    </TouchableWithoutFeedback>
                </BirthdateContainer>
            </BodyContainer>
            {visibleBirthdatePicker && (
        <BirthdateModalContainer>
          <ModalHeaderContainer>
            <TouchableWithoutFeedback onPress={() => applyBirthdate()}>
            <ModalFinishContainer>
              <ModalFinishText>완료</ModalFinishText>
            </ModalFinishContainer>
            </TouchableWithoutFeedback>
          </ModalHeaderContainer>
          <DateTimePicker
                locale={'ko_KR.UTF-8'}
                style={{flex:1}}
                testID="birthdatePicker"
                value={birthdate}
                onChange={(event,date) => onChangeBirthdatePicker(event,date)}
                mode={'date'}
                display="default"
                is24Hour={true}
                maximumDate={new Date()}
              />
        </BirthdateModalContainer>
      )}
        </Container>
        
    )
}

export default BirthdateSettingScreen;



