import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Switch} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';


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


const ItemTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const MainTabItemContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('17%')};
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
`;


const SubTabItemContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('15%')};
padding-top: 19px;
padding-bottom: 19px;
padding-left: 16px;
padding-right: 16px;
justify-content: center;
background-color: #ffffff;
`;

const SubTabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('15%')};
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;

const MainTabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('17%')};
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
`;


const EventTabItemInfoContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
height: ${wp('17%')};
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

const TabItemSwitchContainer = Styled.View`
`;

const EventAlarmDescripContainer = Styled.View`
 padding-left: 16px;
 padding-right: 75px;
 padding-bottom: 21px;
 background-color: #FFFFFF;
`;

const EventDescripText = Styled.Text`
font-size: 14px;
color: #898A8D;
`;



interface Props {
    navigation: any,
    route: any,
}

const AlarmSettingScreen = ({navigation, route}: Props) => {
    const [enabledPushAlarm, setEnabledPushAlarm] = useState<boolean>(true);
    const [enabledLikeAlarm, setEnabledLikeAlarm] = useState<boolean>(true);
    const [enabledCommentAlarm, setEnabledCommentAlarm] = useState<boolean>(true);
    const [enabledFollowAlarm, setEnabledFollowAlarm] = useState<boolean>(true);
    const [enabledEventAlarm, setEnabledEventAlarm] = useState<boolean>(true);

    const togglePushAlarmSwitch = () => {
        setEnabledPushAlarm(!enabledPushAlarm);
    }

    const toggleLikeAlarmSwitch = () => {
        setEnabledLikeAlarm(!enabledLikeAlarm);
    }

    const toggleCommentAlarmSwitch = () => {
        setEnabledCommentAlarm(!enabledCommentAlarm);
    }

    const toggleFollowAlarmSwitch = () => {
        setEnabledFollowAlarm(!enabledFollowAlarm);
    }

    const toggleEventAlarmSwitch = () => {
        setEnabledEventAlarm(!enabledEventAlarm);
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
                <HeaderTitleText>알림</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <MainTabItemContainer>
                    <MainTabItemInfoContainer>
                        <ItemTitleText>푸쉬 알림</ItemTitleText>
                    <TabItemSwitchContainer>
                        <Switch
                        value={enabledPushAlarm}
                        onValueChange={togglePushAlarmSwitch}
                        />
                    </TabItemSwitchContainer>
                    </MainTabItemInfoContainer>
                </MainTabItemContainer>
                <SubTabItemContainer>
                    <SubTabItemInfoContainer>
                        <TabItemLabelText>좋아요</TabItemLabelText>
                    <TabItemSwitchContainer>
                        <Switch
                        value={enabledLikeAlarm}
                        onValueChange={toggleLikeAlarmSwitch}
                        />
                    </TabItemSwitchContainer>
                    </SubTabItemInfoContainer>
                </SubTabItemContainer>
                <SubTabItemContainer>
                    <SubTabItemInfoContainer>
                        <TabItemLabelText>댓글</TabItemLabelText>
                    <TabItemSwitchContainer>
                        <Switch
                        value={enabledCommentAlarm}
                        onValueChange={toggleCommentAlarmSwitch}
                        />
                    </TabItemSwitchContainer>
                    </SubTabItemInfoContainer>
                </SubTabItemContainer>
                <SubTabItemContainer>
                    <SubTabItemInfoContainer>
                        <TabItemLabelText>새 팔로워</TabItemLabelText>
                    <TabItemSwitchContainer>
                        <Switch
                        value={enabledFollowAlarm}
                        onValueChange={toggleFollowAlarmSwitch}
                        />
                    </TabItemSwitchContainer>
                    </SubTabItemInfoContainer>
                </SubTabItemContainer>
                <MainTabItemContainer style={{marginTop: 10}}>
                    <EventTabItemInfoContainer>
                        <ItemTitleText>이벤트 알림</ItemTitleText>
                    <TabItemSwitchContainer>
                        <Switch
                        value={enabledEventAlarm}
                        onValueChange={toggleEventAlarmSwitch}
                        />
                    </TabItemSwitchContainer>
                    </EventTabItemInfoContainer>
                </MainTabItemContainer>
                <EventAlarmDescripContainer>
                    <EventDescripText>
                    이벤트 및 다양한 정보를 빠르게 만나실 수 있습니다.
위치 정보 제공 동의를 해주시면 더욱 맞춤화된 이벤트를 제공받으실 수 있습니다.
                    </EventDescripText>
                </EventAlarmDescripContainer>
            </BodyContainer>
        </Container>
    )
}

export default AlarmSettingScreen;
