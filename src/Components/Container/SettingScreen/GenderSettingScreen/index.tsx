import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {useDispatch} from 'react-redux';
import allActions from '~/action';

// Route
import POSTGenderUpdate from '~/Route/Profile/POSTGenderUpdate';

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
 padding: 7px 15px 13px 16px;
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
padding: 11px 16px 13px 15px;
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


const RadioTabContainer = Styled.View`
height: ${wp('15%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const RadioTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;




interface Props {
    navigation: any,
    route: any,
}

const GenderSettingScreen = ({navigation, route}: Props) => {
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>(route.params?.selectedRadioIndex);
    const [genderChange, setGenderChange] = useState<boolean>(false);
    const dispatch = useDispatch();

    var radio_props = [
        {label: '여성', value: 0 },
        {label: '남성', value: 1},
        {label: '선택안함', value: 2},
      ];

    const onPressRadioButton = (i: number) => {
        setSelectedRadioIndex(i);
        setGenderChange(true);
        console.log("selectedRadioIndex", i);
    }

    const updateGender = () => {
        var submitGender = selectedRadioIndex === 0 ? "female" : (selectedRadioIndex === 1 ? "male" : (selectedRadioIndex === 2 ? "undefined" : ""))
         POSTGenderUpdate(submitGender)
         .then(function(response) {
             console.log("성별변경 완료", response);
             navigation.navigate("AccountSettingScreen", {
                 genderUpdate: submitGender,
             })
         })
         .catch(function(error) {
             console.log("성별변경 실패", error);
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
                <HeaderTitleText>성별</HeaderTitleText>
                {genderChange && (
                <TouchableWithoutFeedback onPress={() => updateGender()}>
                <HeaderRightContainer>
                    <HeaderRegisterText>적용</HeaderRegisterText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
                )}
                {!genderChange && (
                <HeaderRightContainer>
                    <DisabledHeaderRegisterText>적용</DisabledHeaderRegisterText>
                </HeaderRightContainer>
                )}
            </HeaderBar>
            <BodyContainer>
                <DescripContainer>
                <MainDescripText>
                    성별을 선택해주세요.
                </MainDescripText>
                <SubDescripText>
                내정보의 성별은 서비스 전체에 적용되며, 맞춤형 컨텐츠 제공에 사용됩니다. 입력한 정보는 언제든 수정, 관리할 수 있습니다.
                </SubDescripText>
                </DescripContainer>
                <RadioForm>
                            {radio_props.map((obj, i) => (
                            <RadioTabContainer>
                            <RadioTabInfoContainer>
                            <RadioButton
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 250, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedRadioIndex === i}
                                onPress={() => onPressRadioButton(i)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                            </RadioTabInfoContainer>
                            </RadioTabContainer>
                             ))}
                           </RadioForm>
            </BodyContainer>
        </Container>
        
    )
}

export default GenderSettingScreen;



