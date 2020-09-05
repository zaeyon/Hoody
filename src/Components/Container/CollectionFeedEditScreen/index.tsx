import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, View, Text, ScrollView, StyleSheet} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist';
import allActions from '~/action';
import {useSelector, useDispatch} from 'react-redux';

import CollectionTileFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionTileFeedItem';
import CollectionDraggableFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionDraggableFeedItem';
import OrderingFeedItem from '~/Components/Presentational/CollectionFeedEditScreen/OrderingFeedItem';

import POSTCollectionFeed from '~/Route/Collection/POSTCollectionFeed';

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
 background-color:#FAFAFA;
 border-bottom-width: 1px;
 border-color: #F1F1F1;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButtonContainer = Styled.View`
padding: 12.5px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #333333;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const DisabledHeaderNextText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const HeaderFinishText = Styled.Text`
font-size: 17px;
 font-weight: 500;
 color: #3384FF;
 position: absolute;
 right: 55px;
`;

const AbledHeaderNextText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #3384FF;
`;

const DraggableGridContainer = Styled.View`
flex:1;
`;


const RemoveFeedContainer = Styled.View`
 flex: 1;
 align-items: center;
 justify-content: center;
 padding-left: 10px;
`;

const RemoveFeedIconContainer = Styled.View`
padding: 15px;
`;

const RemoveFeedIcon = Styled.Image`
width: ${wp('5%')};
height: ${wp('5%')};
`;


const FeedItemContainer = Styled.View`
padding-top: 15px;
padding-bottom: 15px;
 width: ${wp('100%')};
 height: ${wp('28%')};
 flex-direction: row;
 background-color: #FFFFFF;
 justify-content: space-between;
 border-bottom-width: 0.4px;
 border-top-width: 0.4px;
 border-color: #ECECEE;
`;

const FeedInfoContainer = Styled.View`
 padding-left: 16px;
 padding-right: 8px;
 flex-direction: column;
`;

const TagContainer = Styled.View`
 flex-direction: row
`;

const MainTagText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #1D1E1F;
`;

const MetadataContainer = Styled.View`
 margin-top: 8px;
 flex-direction: row;
 align-items: center;
`;

const RatingStarImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 1px;
 font-weight: 500;
 font-size: 13px;
 color: #56575C;
`;

const ExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #56575C;
`;

const DeleteContainer = Styled.View`
margin-top: 16px;
`;

const DeleteText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #FF3B30;
`;

const FeedImageContainer = Styled.View`
 padding-right: 3px;
 padding-left: 8px;
 flex-direction: row;
 align-items: center;
`;

const FeedImage = Styled.Image`
 width: ${wp('30%')};
 height: ${wp('21%')};
 border-radius: 10px;
 margin-right: 3px;
`;

const NoImage = Styled.View`
 width: ${wp('30%')};
 height: ${wp('21%')};
 border-radius: 10px;
 margin-right: 3px;
 background-color: #ECECEE;
`;

const RightContainer = Styled.View`
 flex-direction: row;
`;

const OrderingIconContainer = Styled.View`
 background-color: #ffffff;
 justify-content: center;
`;

const OrderingIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 margin-right: 2px;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}



const CollectionFeedEditScreen = ({navigation, route}: Props) => {

  const [collectionFeedList, setCollectionFeedList] = useState<Array<object>>([]);
  const [changeFeedList, setChangeFeedList] = useState<boolean>(false);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log("asdasd")

    if(route.params?.collectionFeedList) {
      console.log("route.params.collectionFeedList", route.params.collectionFeedList);
      if(!route.params?.addedCollectionFeedList) {
        var tmpArray = route.params.collectionFeedList.map((item: any, index: number) => {
          item[index] = index;
          return item;
        })

        setTimeout(() => {
          setCollectionFeedList(tmpArray);
        }, 10)

      } else {
        var tmpArray = route.params.addedCollectionFeedList.map((item: any, index: number) => {
          item[index] = index;
          return item;
        })

        setTimeout(() => {
          setCollectionFeedList(tmpArray);
        }, 10)
      }
    }
  }, [route.params?.collectionFeedList, route.params?.addedCollectionFeedList])
  

  const changeFeedOrder = (data: Array<object>) => {
    console.log("변경된 피드 리스트", data)
    setCollectionFeedList(data)
  } 

  const removeFeed = (index) => {
    console.log("삭제할 index", index)
    var tmpFeedList = collectionFeedList;
    var removedFeedList = tmpFeedList.splice(index, 1);
    console.log("removed tmpFeedList", tmpFeedList);
    console.log("feedList", removedFeedList);
 
    setTimeout(() => {
    setCollectionFeedList(tmpFeedList)
    setChangeFeedList(!changeFeedList);
    }, 100)
  }

  const moveToAddFeedScreen = () => {
    navigation.navigate("AddCollectionFeedScreen", {
      triggerType: "collectionFeedEdit",
      collectionFeedList: collectionFeedList,
    })
  }

  const finishCollectionFeedEdit = () => {
    var feedIdArray = new Array();
    var feedIdStr = "";
    collectionFeedList.forEach((item, index) => {
      console.log("수정된 피드아이디 리스트", item.id)
      if(index === collectionFeedList.length - 1) {
      feedIdStr = feedIdStr + item.id;
      } else {
      feedIdStr = feedIdStr + item.id + ",";
      }
    })

    setTimeout(() => {
      //feedIds = JSON.stringify(feedIdArray);
      POSTCollectionFeed(route.params?.collectionId, feedIdStr)
      .then(function(response) {
        console.log("컬렉션 피드 게시글 수정", response);
        moveToCollectionDetail();
      })
      .catch(function(error) {
        console.log("컬렉션 피드 error", error);
      })
    }, 10)
  }

  const moveToCollectionDetail = () => {
    navigation.navigate("CollectionStack", {
      screen: "CollectionDetailScreen",
      params: {
      collectionId: route.params?.collectionId,
      update: true,
      } 
    })
  }

  const renderOrderingFeedItem = ({item, index, drag, isActive}: any) => {
    console.log("renderOrderingFeedItem item", item);
    return (
      /*
      <OrderingFeedItem
      mainTag={item.mainTags?.name}
      rating={item.starRate}
      expense={item.expense}
      mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].uri : null}
      drag={drag}
      isActive={isActive}
      />
      */
     <FeedItemContainer>
     <FeedInfoContainer>
         <TagContainer>
             <MainTagText>{"#" + item.mainTags.name}</MainTagText>
         </TagContainer>
         <MetadataContainer>
         <RatingStarImage
         source={require('~/Assets/Images/ic_newStar.png')}/>
         <RatingText>{item.starRate}</RatingText>
         <ExpenseText>{item.expense ? " · " + item.expense + "원" : ""}</ExpenseText>
         </MetadataContainer>
         <DeleteContainer>
             <DeleteText>삭제</DeleteText>
         </DeleteContainer>
     </FeedInfoContainer>
     <RightContainer>
     <FeedImageContainer>
         {item.mediaFiles[0] && (
         <FeedImage
         source={{uri:item.mediaFiles[0].uri}}/>
         )}
         {!item.mediaFiles[0] && (
         <NoImage/>
         )}
     </FeedImageContainer>
     <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
     <OrderingIconContainer>
         <OrderingIcon
         source={require('~/Assets/Images/ic_ordering.png')}/>
     </OrderingIconContainer>
     </TouchableWithoutFeedback>
     </RightContainer>
 </FeedItemContainer>

    )
  }

    return (
        <Container> 
        <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <HeaderLeftContainer>
        <HeaderCancelText>취소</HeaderCancelText>
        </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>편집</HeaderTitleText>
            <HeaderRightContainer>
              <TouchableWithoutFeedback onPress={() => moveToAddFeedScreen()}>
                <HeaderFinishText>추가</HeaderFinishText>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => finishCollectionFeedEdit()}>
               <AbledHeaderNextText>완료</AbledHeaderNextText>
               </TouchableWithoutFeedback>
            </HeaderRightContainer>
        </HeaderBar>
        <BodyContainer>
          <DraggableFlatList
          style={{width:wp('100%'), height:(hp('100%') - hp('6.5%'))}}
          data={collectionFeedList}
          extraData={collectionFeedList}
          renderItem={renderOrderingFeedItem}
          onDragEnd={({data}) => changeFeedOrder(data)}
          keyExtractor={(item, index) =>
          `draggable-item-${index}`}/>
        </BodyContainer>
        </Container>
    )
}



export default CollectionFeedEditScreen;