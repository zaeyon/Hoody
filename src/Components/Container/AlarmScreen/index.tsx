import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AlarmItem from '~/Components/Presentational/AlarmScreen/AlarmItem';

// Route
import GETNotificationList from '~/Route/Notification/GETNotificationList';

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
padding: 10px 15px 10px 15px;
align-items: center;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #333333;
`;

const HeaderSettingContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const HeaderSettingIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const AlarmListContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TEST_ALARM_DATA = [
    {
        index: 1,
        nickname: "사용자1"
    },
    {
        index: 2,
        nickname: "사용자2"
    },
    {
        index: 3,
        nickname: "사용자3"
    },
    {
        index: 4,
        nickname: "사용자4"
    },
]

interface Props {
    navigation: any,
    route: any,
}

const AlarmScreen = ({navigation, route}: Props) => {
    const [notificationListData, setNotificationListData] = useState<Array<object>>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        getNotificationList();
    }, [])
    
    const getNotificationList = () => {
        GETNotificationList()
        .then(function(response) {
            console.log("알림 리스트 response", response);
            setRefreshing(false);

        })
        .catch(function(error) {
            console.log("알림 리스트error", error)
        })
    }

    const onRefreshNotificationList = () => {
        setRefreshing(true);
        getNotificationList();
    }

    const moveToAlarmSetting = () => {
        navigation.navigate("AlarmSettingScreen");
    }

    const renderAlarmItem = ({item, index}: any) => {
        return (
            <AlarmItem/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderTitleText>
                        알림
                    </HeaderTitleText>
                </HeaderLeftContainer>
                <TouchableWithoutFeedback onPress={() => moveToAlarmSetting()}>
                <HeaderSettingContainer>
                    <HeaderSettingIcon
                    source={require('~/Assets/Images/ic_setting.png')}/>
                </HeaderSettingContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <AlarmListContainer>
                <FlatList
                refreshing={refreshing}
                onRefresh={onRefreshNotificationList}
                data={notificationListData}
                renderItem={renderAlarmItem}/>
            </AlarmListContainer>
        </Container>
    )
}

export default AlarmScreen;
