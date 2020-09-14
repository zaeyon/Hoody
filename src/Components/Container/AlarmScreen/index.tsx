import React, {useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback, StyleSheet, ActivityIndicator} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

import AlarmItem from '~/Components/Presentational/AlarmScreen/AlarmItem';

// Route
import GETNotificationList from '~/Route/Notification/GETNotificationList';
import DELETENotification from '~/Route/Notification/DELETENotification';

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
background-color: #ffffff;
padding-bottom: ${isIphoneX() ? 32 : 45};
flex: 1;
`;

const RemoveContainer = Styled.View`
align-items: flex-end;
`;

const RemoveAllContainer = Styled.View`
 padding-top: 7px;
 padding-bottom: 2px;
 padding-left: 15px;
 padding-right: 15px;
`;

const RemoveAllText = Styled.Text`
font-size: 15px;
color: #C6C7CC;
`;

const OtherUsersFeedViewMoreModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('36.8%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
`;

const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 10px;
 align-items: center;
`;


const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;


const ModalTabItemContainer = Styled.View`
 height: ${wp('17%')};
 flex-direction: row;
 align-items: center;
 padding-left: 16px;
 padding-right: 16px;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const ModalTabItemIconImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #1D1E1F;
`;

const ModalTabItemLabelText = Styled.Text`
 margin-left: 11px;
 font-size: 18px;
 color: #1D1E1F;
`;

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 background-color: #FFFFFF;
 align-items: center;
 margin-top: ${hp('35%')};
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

var selectedId:any;

const AlarmScreen = ({navigation, route}: Props) => {
    const [notificationListData, setNotificationListData] = useState<Array<object>>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(!false);
    const [loading ,setLoading] = useState<boolean>(true);

    useEffect(() => {
        getNotificationList();
    }, [])

    const openNotifyModal = (notifyId: number) => {
        setVisibleModal(true);
        selectedId = notifyId
    }
    
    const getNotificationList = () => {
        GETNotificationList()
        .then(function(response) {
            console.log("알림 리스트 response", response);
            setRefreshing(false);
            setLoading(false);
            const reversedArray = response.reverse();
            setNotificationListData(reversedArray);

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
            <AlarmItem
            openNotifyModal={openNotifyModal}
            notifyId={item.id}
            navigation={navigation}
            senderProfileImage={item.senders.profileImg}
            senderNickname={item.senders.nickname}
            message={item.message}
            type={item.type}
            sentDate={item.createdAt}
            postId={item.postId}
            senderId={item.senders.id}
            />
        )
    }

    const alarmListHeaderContainer = () => {
        return (
            <RemoveContainer>
            <TouchableWithoutFeedback onPress={() => removeAllNotify()}>
            <RemoveAllContainer>
                <RemoveAllText>전체삭제</RemoveAllText>
            </RemoveAllContainer>
            </TouchableWithoutFeedback>
            </RemoveContainer>
        )
    }
    
    const removeAllNotify = () => {
        DELETENotification("all")
        .then(function(response) {
            console.log("알림 전체 삭제", response)
            setNotificationListData([]);
            setVisibleModal(false);
        })
        .catch(function(error) {
            console.log("알림 전체 삭제 실패", error)
        })
    }

    const removeNotify = (notifyId:number) => {
        DELETENotification(notifyId)
        .then(function(response) {
            console.log("알림 삭제 성공", response);
            var tmpNotificationListData = notificationListData;
            const index = tmpNotificationListData.findIndex(obj => obj.id);
            tmpNotificationListData.splice(index, 1);
            console.log("tmpNotificationListData", tmpNotificationListData);
            setNotificationListData(tmpNotificationListData);
            setVisibleModal(false);
        })
        .catch(function(error) {
            console.log("알림 삭제 실패", error);
        })
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
            {loading && (
                <LoadingContainer>
                    <ActivityIndicator/>
                </LoadingContainer>
            )}
            {!loading && (
            <AlarmListContainer>
                <FlatList
                ListHeaderComponent={alarmListHeaderContainer}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefreshNotificationList}
                data={notificationListData}
                renderItem={renderAlarmItem}/>
            </AlarmListContainer>
            )}
      <Modal
      onBackdropPress={() => setVisibleModal(false)}
      isVisible={visibleModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleModal(false)}
      swipeDirection={['down']}
      style={styles.modal}>
        <OtherUsersFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => removeNotify(selectedId)}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_remove.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >삭제하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        </OtherUsersFeedViewMoreModalContainer>
      </Modal>
        </Container>
    )
}


const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    }
  })

export default AlarmScreen;
