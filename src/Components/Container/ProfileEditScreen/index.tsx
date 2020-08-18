import React, {useEffect ,useState} from 'react';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

import POSTProfileUpdate from '~/Route/User/POSTProfileUpdate';

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
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    const [currentUserProfile, setCurrentUserProfile] = useState<object>({});
    const [nickname ,setNickname] = useState<string>(currentUser.user?.nickname);
    const [description, setDescription] = useState<string>(currentUser.user?.description);
    const [profileImageUri, setProfileImageUri] = useState<any>(currentUser.user?.profileImage);

    useEffect(() => {
        if(currentUser.user) {
            console.log("profileEditScreen currentUser", currentUser);
            setCurrentUserProfile(currentUser.user);
            setProfileImage(currentUser.user.profileImage);
        }
    }, [])

    useEffect(() => {
        if(route.params?.selectedProfileImage) {
            setProfileImageUri(route.params?.selectedProfileImage);
        }
    }, [route.params?.selectedProfileImage])

    const onChangeNicknameInput = (text: string) => {
        setNickname(text);

    }

    const onChangeDescripInput = (text: string) => {
        setDescription(text);
    }

    const moveToAccountSetting = () => {
        navigation.navigate("AccountSettingScreen");
    }

    const completeProfileEdit = () => {
        if(currentUser.user.nickname !== nickname) {
        console.log("닉네임 바뀜")
        POSTProfileUpdate(description, profileImageUri, nickname)
        .then(function(response ){
            console.log("completeProfileEdit response", response);
            var modifiedProfile = currentUser.user;
            console.log("modifiedProfile", modifiedProfile);
            modifiedProfile.nickname = nickname;
            modifiedProfile.description = description;
            modifiedProfile.profileImage = profileImageUri;

            setTimeout(() => {
            dispatch(allActions.userActions.setUser(modifiedProfile));
            navigation.navigate("ProfileScreen", {
                profileModification: true,
            })
            })
        })
        .catch(function(error) {
            console.log("completeProfileEdit error", error);
            if(error.status === 403) {
                Alert.alert("이미 사용중인 닉네임입니다.", ' ', [
                   {
                       text: '확인',
                       onPress: () => 0,
                   }, 
                ]);
            }
        })
        } else if(currentUser.user.nickname === nickname) {
        console.log("닉네임 안바뀜");
        POSTProfileUpdate(description, profileImageUri)
        .then(function(response ){
            console.log("completeProfileEdit response", response);
            var modifiedProfile = currentUser.user;
            console.log("modifiedProfile", modifiedProfile);
            modifiedProfile.description = description;
            modifiedProfile.profileImage = profileImageUri;
            setTimeout(() => {
            dispatch(allActions.userActions.setUser(modifiedProfile));
            navigation.navigate("ProfileScreen", {
                profileModification: true,
            })
            })
        })
        .catch(function(error) {
            console.log("completeProfileEdit error", error)
        })  
        }
    }

    const moveToGallery = () => {
        navigation.navigate("Gallery_JustOne", {
            requestType: "profileEdit"
        })
    }

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
                <TouchableWithoutFeedback onPress={() => completeProfileEdit()}>
                <HeaderFinishContainer>
                    <HeaderFinishText>완료</HeaderFinishText>
                </HeaderFinishContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <BodyContainer>
                <ProfileImageContainer>
                    <TouchableWithoutFeedback onPress={() => moveToGallery()}>
                    <ProfileImageBackground>
                        {currentUserProfile.profileImage && (
                            <ProfileImage
                            source={{uri:profileImageUri}}/>
                        )}
                        {!currentUserProfile.profileImage && (
                            <EmptyProfileImage
                            source={require('~/Assets/Images/ic_emptyImage.png')}/>
                        )}
                    </ProfileImageBackground>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => moveToGallery()}>
                    <ProfileImageChangeText>
                        프로필 사진 바꾸기
                    </ProfileImageChangeText>
                    </TouchableWithoutFeedback>
                </ProfileImageContainer>
                <ProfileNicknameContainer>
                    <ProfileNicknameLabelText>닉네임</ProfileNicknameLabelText>
                    <ProfileNicknameInput
                    autoCapitalize={"none"}
                    value={nickname}
                    onChangeText={(text:string) => onChangeNicknameInput(text)}
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
                    value={description}
                    onChangeText={(text: string) => onChangeDescripInput(text)}
                    autoCapitalize={"none"}
                    />
                </ProfileDescripContainer>
                <TouchableWithoutFeedback onPress={() => moveToAccountSetting()}>
                <PrivacySettingContainer>
                    <PrivacySettingText>개인정보 설정</PrivacySettingText>
                </PrivacySettingContainer>
                </TouchableWithoutFeedback>
            </BodyContainer>
        </Container>

    )
}

export default ProfileEditScreen;



