import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';

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


interface Props {
    navigation: any,
    route: any,
}

const BirthdateSettingScreen = ({navigation, route}: Props) => {
    const dispatch = useDispatch();

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
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
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
                    <BirthdateInputContainer>
                        <BirthdateText>2020년 12월 31일</BirthdateText>
                    </BirthdateInputContainer>
                </BirthdateContainer>
            </BodyContainer>
        </Container>
        
    )
}

export default BirthdateSettingScreen;



