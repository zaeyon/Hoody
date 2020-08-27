import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, Keyboard} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/action';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 


// Route
import GETLogout from '~/Route/Auth/GETLogout';

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
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderReportContainer = Styled.View`
 position: absolute;
 right: 16px;
`;

const HeaderReportText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #FF3B30;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #e5e5e570;
`;

const ItemTitleContainer = Styled.View`
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
`;

const ItemTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const TabItemContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('15%')};
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const TabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('15%')};
justify-content: space-between;
`;

const TabItemLabelText = Styled.Text`
 font-size: 16px;
 color: #1D1E1F;
`;

const TabItemContentText = Styled.Text`
 font-size: 16px;
 color: #333333;
`;

const TabItemRightContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const TabItemDisclosureIcon = Styled.Image`
 margin-left: 5px;
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;


const TabToggleContainer = Styled.View`
height: ${wp('15%')};
align-items: center;
justify-content: center;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const TabToggleText = Styled.Text`
color: #267DFF;
font-size: 16px;
`;

const RadioModalContainer = Styled.View`
 flex: 1;
 background-color:#ffffff;
`;
 

const RadioTabContainer = Styled.View`
height: ${wp('14%')};
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
padding-top: 11px;
justify-content: space-between;
border-top-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const RadioButtonContainer = Styled.View`
position: absolute;
top: 18px;
right: 0;
`;

const ReportDescripContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
 padding-top: 20px;
 padding-bottom: 20px;
 padding-left: 16px;
 padding-right: 16px;
`;

const ReportDescripInput = Styled.TextInput`
flex: 1;
font-size: 17px;
color: #56575C;
`;


interface Props {
    navigation: any,
    route: any,
}

const ReportProblemScreen = ({navigation, route}: Props) => {
    const [visibleRadioModal, setVisibleRadioModal] = useState<boolean>(false);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>();
    const [reportType, setReportType] = useState<string>();
    const [reportDescrip, setReportDescrip] = useState<string>();
  


    var radio_props = [
        {label: '개인 및 계정 문제', value: 0 },
        {label: '스팸 또는 악용 사례', value: 1},
        {label: '기능이 작동하지 않음', value: 2},
        {label: '기타', value: 3}
      ];

    const toggleReportTypeRadio = () => {
        if(visibleRadioModal) {
            if(selectedRadioIndex === 0) {
                setReportType("개인 및 계정 문제")
            } else if(selectedRadioIndex === 1) {
                setReportType("스팸 또는 악용 사례")
            } else if(selectedRadioIndex === 2) {
                setReportType("기능이 작동하지 않음")
            } else if(selectedRadioIndex === 3) {
                setReportType("기타")
            }
            
        }
        setVisibleRadioModal(!visibleRadioModal);

    }

    const onPressRadioButton = (i: number, obj: object) => {
        setSelectedRadioIndex(i);
        setVisibleRadioModal(false);

        if(i === 0) {
            setReportType("개인 및 계정 문제")
        } else if(i === 1) {
            setReportType("스팸 또는 악용 사례")
        } else if(i === 2) {
            setReportType("기능이 작동하지 않음")
        } else if(i === 3) {
            setReportType("기타")
        }
        
    }

    const onChangeReportDescrip = (text: string) => {
        setReportDescrip(text);
    } 

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                <HeaderTitleText>문제 신고</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderReportContainer>
                        <HeaderReportText>신고하기</HeaderReportText>
                    </HeaderReportContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}>
            <BodyContainer>
            <TouchableWithoutFeedback onPress={() => toggleReportTypeRadio()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText style={reportType ? {color: '#000000'} : {color: '#C6C7CC'}}>{reportType ? reportType : "신고 유형 선택하기"}</TabItemLabelText>
                        <TabItemRightContainer>
                            {visibleRadioModal && (
                                <TabItemDisclosureIcon
                                source={require('~/Assets/Images/Setting/ic_dropdown_fold.png')}/>
                            )}
                            {!visibleRadioModal && (
                                <TabItemDisclosureIcon
                                source={require('~/Assets/Images/Setting/ic_dropdown.png')}/>
                            )}
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                {visibleRadioModal && (
                    <RadioModalContainer>
                        <RadioForm>
                            {radio_props.map((obj, i) => (
                            <TouchableWithoutFeedback onPress={() => onPressRadioButton(i, obj)}>
                            <RadioTabContainer style={i === radio_props.length-1 && {borderBottomWidth: 0.6, borderColor:'#ECECEE'}}>
                            <RadioTabInfoContainer style={i === 0 && {borderTopWidth:0}}>
                            <RadioButton
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i, obj)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 150, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonContainer>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedRadioIndex === i}
                                onPress={() => onPressRadioButton(i, obj)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                                </RadioButtonContainer>
                            </RadioTabInfoContainer>
                            </RadioTabContainer>
                            </TouchableWithoutFeedback>
                             ))}
                        </RadioForm>
                    </RadioModalContainer>
                )}
                {!visibleRadioModal && (
                <ReportDescripContainer>
                    <ReportDescripInput
                    multiline={true}
                    onChangeText={(text:string) => onChangeReportDescrip(text)}
                    value={reportDescrip}
                    />
                </ReportDescripContainer>
                )}
            </BodyContainer>
            </KeyboardAwareScrollView>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default ReportProblemScreen;



