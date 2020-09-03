import React, {useEffect, useState}from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet, Alert} from 'react-native'
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

// Local Component
import ScrapFeedItem from '~/Components/Presentational/ScrapFolderFeedListScreen/ScrapFeedItem';

// Route
import GETScrapFolder from '~/Route/Scrap/GETScrapFolder';
import DELETEScrapFolder from '~/Route/Scrap/DELETEScrapFolder';


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
 background-color: #ffffff;
`;

const HeaderBackContainer = Styled.View`
 padding-top: 7px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 13px;
`;

const HeaderBackIcon = Styled.Image`
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

const HeaderEditText = Styled.Text`
color: #267DFF;
font-weight: 500;
font-size: 17px;
`;


const HeaderEditContainer = Styled.View`
padding: 7px 16px 7px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const BodyContainer = Styled.View`
 width: ${wp('100%')};
 flex: 1;
 background-color: #ffffff;
`;

const ViewMoreIcon = Styled.Image`
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
`;

const MyFeedViewMoreModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('53.86%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
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

interface Props {
    navigation: any,
    route: any,
}

const ScrapFolderFeedListScreen = ({navigation, route}: any) => {
    const [feedListData, setFeedListData] = useState<Array<object>>([]);
    const [changeFeedListData, setChangeFeedListData] = useState<boolean>(false);
    const [visibleViewMoreModal, setVisibleViewMoreModal] = useState<boolean>(false);

    useEffect(() => {
        
      GETScrapFolder(route.params?.folderId)
      .then(function(response) {
          console.log("스크랩 폴더", response)
          setFeedListData(response.Posts);
          setChangeFeedListData(!changeFeedListData);
      })
      .catch(function(error) {
          console.log("error", error)
      })

    }, [])

    const openViewMoreModal = () => {
        setVisibleViewMoreModal(true)
    }

    const moveToScrapFolderEdit = () => {
        setVisibleViewMoreModal(false);
        navigation.navigate("ScrapFolderEditScreen", {
            defaultFolderId: route.params.defaultFolderId,
            scrapFeedList: feedListData,
            folderName: route.params?.folderName,
        });
    }

    const deleteScrapFolder = () => {
        Alert.alert(
            '정말 앨범을 삭제하시겠어요?', 
            ' ', 
            [
            {
                text: '확인',
                onPress: () => {
                setVisibleViewMoreModal(false);
                DELETEScrapFolder(route.params.folderId)
                .then(function(response) {
                console.log("스크랩 폴더 삭제 성공", response)
                navigation.navigate("ScrapListScreen", {
                scrapAlbumChange: true
                })
                })
                .catch(function(error) {
                console.log("스크랩 폴더 삭제 실패", error);
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

    const renderScrapFeedItem = ({item, index}: any) => {
        return (
            <ScrapFeedItem
            navigation={navigation}
            postId={item.id}
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0].url : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense ? item.expense + "원" : null}
            location={item.address ? item.address.address : null}/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderBackContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderBackContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>{route.params?.folderName}</HeaderTitleText>
                    {route.params?.defaultFolder && (
                    <HeaderRightContainer>
                      <HeaderEmptyContainer/>
                    </HeaderRightContainer>
                    )}
                    {!route.params?.defaultFolder && (
                    <TouchableWithoutFeedback onPress={() => openViewMoreModal()}>
                    <HeaderEditContainer>
                  <ViewMoreIcon
                  source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
                    </HeaderEditContainer>
                    </TouchableWithoutFeedback>
                    )}
            </HeaderBar>
            <BodyContainer>
                {feedListData[0] && (
                <FlatList
                columnWrapperStyle={{justifyContent:'space-between',paddingTop: 14, paddingLeft: 14, paddingRight: 14, marginVertical:6}}
                numColumns={2}
                data={feedListData}
                renderItem={renderScrapFeedItem}/>
                )}
            </BodyContainer>
            <Modal
      onBackdropPress={() => setVisibleViewMoreModal(false)}
      isVisible={visibleViewMoreModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleViewMoreModal(false)}
      swipeDirection={['down']}
      style={styles.modal}>
        <MyFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToScrapFolderEdit()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_pen.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >수정하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => deleteScrapFolder()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#FF3B30'}}
          source={require('~/Assets/Images/Feed/ic_remove.png')}/>
          <ModalTabItemLabelText
          style={{color:'#FF3B30'}}
          >삭제하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        </MyFeedViewMoreModalContainer>
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

export default ScrapFolderFeedListScreen;





