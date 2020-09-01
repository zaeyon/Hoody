import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/action';
import {setAutoLoginUser} from '~/AsyncStorage/User';

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


interface Props {
    navigation: any,
    route: any,
}

const AccountSettingScreen = ({navigation, route}: Props) => {
    
  function formatIndicationDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + "년 " + month + "월 " + day + "일";
  }

    const [profileInfo, setProfileInfo] = useState<object>(route.params?.profileInfo);
    const [birthdateIndication, setBirthdateIndication] = useState<string>(formatIndicationDate(route.params?.profileInfo.birthdate));
    const [profileUpdate, setProfileUpdate] = useState<boolean>(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.currentUser);


    

    useEffect(() => {
    console.log("AccountSettingScreen route.params?.profileInfo", route.params?.profileInfo);
    }, [route.params?.profileInfo])

    useEffect(() => {

        if(route.params?.birthdateUpdate) {
        var preProfileInfo = profileInfo;
        preProfileInfo.birthdate = route.params?.birthdateUpdate;

        setProfileInfo(preProfileInfo);
        setBirthdateIndication(formatIndicationDate(route.params?.birthdateUpdate));
        setProfileUpdate(!profileUpdate);
        }
        
    }, [route.params?.birthdateUpdate])

    useEffect(() => {
        if(route.params?.genderUpdate) {

            console.log("성별변경!", route.params?.genderUpdate);
            
            var preProfileInfo = profileInfo;
            preProfileInfo.gender = route.params?.genderUpdate;

            setProfileInfo(preProfileInfo);
            setProfileUpdate(!profileUpdate);
        }
    }, [route.params?.genderUpdate])


    const moveToBirthdateSetting = () => {
        navigation.navigate("BirthdateSettingScreen", {
            birthdateIndication: birthdateIndication,
            birthdate: profileInfo.birthdate,
        });
    }

    const moveToGenderSetting = () => {
        navigation.navigate("GenderSettingScreen", {
            gender: profileInfo.gender,
            selectedRadioIndex: profileInfo.gender === "male" ? 1 : (profileInfo.gender === "female" ? 0 : 2)
        });
    }

    const moveToConfirmPassword = () => {
        navigation.navigate("ConfirmPasswordScreen", {
            email: profileInfo.email,
        });
    }

    const logout = () => {
        Alert.alert(
            '로그아웃 하시겠습니까?', 
            ' ', 
            [
            {
                text: '확인',
                onPress: () => {
                   GETLogout()
                   .then(function(response) {
                   console.log("logout response", response);
                   dispatch(allActions.userActions.logOut())
                   setAutoLoginUser("","","","", "logout");
                })
                .catch(function(error) {
                console.log("logout error", error);
                })
            }
            },
            {
                text: '취소',
                onPress: () => 0,
                style: 'cancel',
            }
        ],      
      );
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
                <HeaderTitleText>계정 및 보안</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <ItemTitleContainer>
                    <ItemTitleText>계정 및 개인정보</ItemTitleText>
                </ItemTitleContainer>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>이메일</TabItemLabelText>
                        <TabItemContentText>{profileInfo.email}</TabItemContentText>
                    </TabItemInfoContainer>
                </TabItemContainer>
                <TouchableWithoutFeedback onPress={() => moveToBirthdateSetting()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>생일</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemContentText>{birthdateIndication}</TabItemContentText>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToGenderSetting()}>
                <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>성별</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemContentText>{profileInfo.gender === "male" ? "남성" : (profileInfo.gender === "female" ? "여성" : "선택안함")}</TabItemContentText>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                </TabItemContainer>
                </TouchableWithoutFeedback>
                <ItemTitleContainer
                style={{marginTop: 10}}>
                    <ItemTitleText>보안</ItemTitleText>
                    </ItemTitleContainer>
                    <TouchableWithoutFeedback onPress={() => moveToConfirmPassword()}>
                    <TabItemContainer>
                    <TabItemInfoContainer>
                        <TabItemLabelText>비밀번호 설정</TabItemLabelText>
                        <TabItemRightContainer>
                        <TabItemDisclosureIcon
                        source={require('~/Assets/Images/Setting/ic_disclosure.png')}/>
                        </TabItemRightContainer>
                    </TabItemInfoContainer>
                    </TabItemContainer>
                    </TouchableWithoutFeedback>
                    <TabItemContainer>
                        <TouchableWithoutFeedback onPress={() => logout()}>
                        <TabToggleContainer>
                            <TabToggleText>
                                로그아웃
                            </TabToggleText>
                        </TabToggleContainer>
                        </TouchableWithoutFeedback>
                        </TabItemContainer>
                        <TabItemContainer>
                        <TabToggleContainer>
                            <TabToggleText>
                                회원탈퇴
                            </TabToggleText>
                        </TabToggleContainer>
                        </TabItemContainer>
            </BodyContainer>
        </Container>
        
    )
}

export default AccountSettingScreen;



