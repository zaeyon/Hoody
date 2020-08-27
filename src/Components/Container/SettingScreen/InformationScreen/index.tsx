import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/action';

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
`;

const TabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('15%')};
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
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

const VersionText = Styled.Text`
font-size: 16px;
color: #56575C;
`;

const CopyrightContainer = Styled.View`
padding-top: 10px;
padding-bottom: 10px;
align-items: center;
justify-content: center;
`;

const CopyrightText = Styled.Text`
font-size: 13px;
color: #c3c3c3;
`;



interface Props {
    navigation: any,
    route: any,
}

const InformationScreen = ({navigation, route}: Props) => {


const moveToDataPolicy = () => {
    navigation.navigate("DataPolicyScreen");
}

const moveToTermsOfUse = () => {
    navigation.navigate("TermsOfUseScreen");   
}

const moveToCookiePolicy = () => {
    navigation.navigate("CookiePolicyScreen");
}

const moveToOpenSourceLibrary = () => {
    navigation.navigate("OpenSourceLibraryScreen");
}

const moveToPrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicyScreen");
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
                <HeaderTitleText>정보</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
            <TabItemContainer>
                    <TabItemInfoContainer style={{borderBottomWidth:0}}>
                        <TabItemLabelText>버전 정보</TabItemLabelText>
                        <VersionText>1.0</VersionText>
                    </TabItemInfoContainer>
                </TabItemContainer>
                <TouchableWithoutFeedback onPress={() => moveToDataPolicy()}>
                <TabItemContainer style={{marginTop:10}}>
                    <TabItemInfoContainer>
                        <TabItemLabelText>데이터 정책</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToTermsOfUse()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>아용 약관</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToPrivacyPolicy()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>개인 정보 처리 방침</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToCookiePolicy()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>쿠키 사용 정책</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToOpenSourceLibrary()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>오픈 소스 라이브러리</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <CopyrightContainer>
                <CopyrightText>Copyright © 2020 Hoody, Inc.</CopyrightText>
                </CopyrightContainer>
            </BodyContainer>
        </Container>
        
    )
}

export default InformationScreen;



