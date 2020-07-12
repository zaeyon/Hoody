import React from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AlarmItem from '~/Components/Presentational/AlarmScreen/AlarmItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
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

    const renderAlarmItem = ({item, index}) => {
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
                <HeaderSettingContainer>
                    <HeaderSettingIcon
                    source={require('~/Assets/Images/ic_setting.png')}/>
                </HeaderSettingContainer>
            </HeaderBar>
            <AlarmListContainer>
                <FlatList
                data={TEST_ALARM_DATA}
                renderItem={renderAlarmItem}/>
            </AlarmListContainer>
        </Container>
    )
}

export default AlarmScreen;
