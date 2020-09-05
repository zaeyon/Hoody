import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

// Route
import POSTReport from '~/Route/Declare/POSTReport';

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
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderDeclareText = Styled.Text`
position: absolute;
right: 15;
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

const DescripContainer = Styled.View`
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
align-items: center;
justify-content: center;
background-color: #FFFFFF;
`;

const DescripText = Styled.Text`
color: #898A8D;
font-size: 13px;
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
padding-top: 15px;
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

interface Props {
    navigation: any,
    route: any,
}

const CommentDeclareScreen = ({navigation, route}: Props) => {
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>(0);
    const [selectedReason, setSelectedReason] = useState<string>("광고성/영리목적");
    const dispatch = useDispatch();

    var radio_props = [
        {label: '광고성/영리목적', value: 0 },
        {label: '욕설/인신공격', value: 1},
        {label: '불법정보', value: 2},
        {label: '개인정보 노출', value: 3},
        {label: '음란성/선정성', value: 4},
        {label: '같은내용 도배', value: 5},
        {label: '권리침해', value: 6},
      ];


    const onPressRadioButton = (i: number, obj: object) => {
        setSelectedRadioIndex(i);
        setSelectedReason(obj.label);
        console.log("selectedRadioIndex", i);
    }

    const declareFeed = () => {
        console.log("selectedReaseon", selectedReason);

        POSTReport("comment", route.params?.commentId, selectedReason)
        .then(function(response) {
            console.log("댓글 신고 성공", response)
            navigation.goBack();
             Alert.alert("신고가 완료되었습니다.",'', [
                 {
                     text: '확인',
                     onPress: () => 0,
                 }
             ])
        })
        .catch(function(error) {
            console.log("댓글 신고 실패", error);
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
                <HeaderTitleText>댓글 신고</HeaderTitleText>
                <TouchableWithoutFeedback onPress={() => declareFeed()}>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                    <HeaderDeclareText>신고</HeaderDeclareText>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <BodyContainer>
                <DescripContainer>
                    <DescripText>불법적인 내용이거나, 서비스 이용목적에 부합하지 않는 댓글을 신고해 주세요. 신고하신 댓글은 운영정책에 따라 처리되며, 허위 신고시 이용에 제한을 받을 수 있습니다.</DescripText>
                </DescripContainer>
                <RadioForm>
                            {radio_props.map((obj, i) => (
                            <TouchableWithoutFeedback onPress={() => onPressRadioButton(i, obj)}>
                            <RadioTabContainer>
                            <RadioTabInfoContainer>
                            <RadioButton
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i, obj)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 230, backgroundColor:'#ffffff'}}/>
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
            </BodyContainer>
        </Container>
        
    )
}

export default CommentDeclareScreen;



