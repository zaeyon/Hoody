import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
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

const HeaderCancelContainer = Styled.View`
padding: 7px 16px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-size: 17px;
 color: #C6C7CC;
`;

const BackButtonContainer = Styled.View`
 padding: 7px 16px 13px 16px;
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

const HeaderFinishContainer = Styled.View`
padding: 7px 16px 13px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderFinishText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #267DFF;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #e5e5e570;
`;

const ProfileImageContainer = Styled.View`
 background-color: #ffffff;
 padding-top: 18px;
 padding-bottom: 24px;
 flex-direction: column;
 align-items: center;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const ProfileImageBackground = Styled.View`
background-color: #f6f6f6;
width: ${wp('30.4%')};
height: ${wp('30.4%')};
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('30.4%')};
height: ${wp('30.4%')};
border-radius: 100px;
`;

const EmptyProfileImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const ProfileImageChangeText = Styled.Text`
margin-top: 16px;
font-weight: 500;
font-size: 17px;
color: #3384FF;
`;

const ProfileNicknameContainer = Styled.View`
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: #FFFFFF;

border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const ProfileNicknameLabelText = Styled.Text`
color: #1D1E1F;
font-size: 17px;
font-weight: 600;
`;

const ProfileNicknameInput = Styled.TextInput`
font-size: 17px;
color: #1D1E1F;
background-color: #ffffff;
align-items: center;
width: ${wp('73%')};
`;

const ProfileDescripContainer = Styled.View`
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;


const ProfileDescripLabelText = Styled.Text`
color: #1D1E1F;
font-size: 17px;
font-weight: 600;
`;

const ProfileDescripInput = Styled.TextInput`
font-size: 17px;
color: #1D1E1F;
width: ${wp('91.46%')};
height: ${wp('31.47%')};
margin-top: 16px;
`;

const PrivacySettingContainer = Styled.View`
padding-top: 19px;
padding-bottom: 19px;
align-items: center;
background-color: #FFFFFF;
`;

const PrivacySettingText = Styled.Text`
font-size: 16px;
color: #267DFF; 
`;




interface Props {
    navigation: any,
    route: any,
}

const ProfileEditScreen = ({navigation, route}: Props) => {
    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderCancelContainer>
                    <HeaderCancelText>
                        취소
                    </HeaderCancelText>
                </HeaderCancelContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>프로필 편집</HeaderTitleText>
                <HeaderFinishContainer>
                    <HeaderFinishText>완료</HeaderFinishText>
                </HeaderFinishContainer>
            </HeaderBar>
            <BodyContainer>
                <ProfileImageContainer>
                    <ProfileImageBackground>
                        <EmptyProfileImage
                        source={require('~/Assets/Images/ic_emptyImage.png')}/>
                    </ProfileImageBackground>
                    <ProfileImageChangeText>
                        프로필 사진 바꾸기
                    </ProfileImageChangeText>
                </ProfileImageContainer>
                <ProfileNicknameContainer>
                    <ProfileNicknameLabelText>이름</ProfileNicknameLabelText>
                    <ProfileNicknameInput
                    autoCapitalize={"none"}
                    />
                </ProfileNicknameContainer>
                <ProfileDescripContainer>
                    <ProfileDescripLabelText>
                        소개
                    </ProfileDescripLabelText>
                    <ProfileDescripInput
                    placeholder={"자기 소개를 적어주세요."}
                    placeholderTextColor="#8e9199"
                    multiline={"true"}
                    autoCapitalize={"none"}
                    />
                </ProfileDescripContainer>
                <PrivacySettingContainer>
                    <PrivacySettingText>개인정보 설정</PrivacySettingText>
                </PrivacySettingContainer>

            </BodyContainer>
        </Container>

    )
}

export default ProfileEditScreen;



