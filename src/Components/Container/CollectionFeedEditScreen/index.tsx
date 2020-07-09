import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, View, Text, ScrollView, StyleSheet} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist';

import CollectionTileFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionTileFeedItem';
import CollectionDraggableFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionDraggableFeedItem';


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
padding: 10px 15px 10px 15px;
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


const TileFeedImage = Styled.Image`
 width: ${wp('44.2%')};
 height: ${wp('35.1%')};
 border-radius: 5px;
`;

const FeedInfoContainer = Styled.View`
width: ${wp('44.2%')}
height: 200;
`;

const TagListContainer = Styled.View`
 margin-top: 6px;
 flex-direction: row;
`;

const TagText = Styled.Text`
 font-weight: 600;
 font-size: 15px;
 color: #333333;
`;

const RatingExpanseContainer = Styled.View`
 margin-top: 1px;
 flex-direction: row;
 align-items: center;
`;

const RatingImage = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 2px;
 font-weight: 500;
 font-size: 13px;
 color: #50555C;
`;

const ExpanseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #50555C;
`;

const LocationContainer = Styled.View`
margin-top: 1px;
 
`;

const LocationText = Styled.Text`
font-size: 13px;
color: #898A8D;
`;

const DraggableCollectionFeedListContainer = Styled.View`
flex: 1;
`;

const DraggableContainer = Styled.View`
 width: ${wp('100%')};
 flex-direction: row;
 border-top-width: 0.3px;
 border-bottom-width: 0.3px;
 border-color: #c3c3c3;
 background-color: #ffffff;
`;

const DraggableFeedContainer = Styled.View`
padding: 10px;
flex: 7;
background-color: #ffffff;
`;

const DraggableIconContainer = Styled.View`
justify-content: center;
padding: 10px;
flex: 1;
background-color: #ffffff;
`;

const DraggableIcon = Styled.Image`
 width: ${wp('7%')};
 height: ${wp('7%')};
 tint-color: #707070;
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

interface Props {
    navigation: any,
    route: any,
}



const CollectionFeedEditScreen = ({navigation, route}: Props) => {

  const [collectionFeedList, setCollectionFeedList] = useState<Array<object>>([
    {
      index: 0,
    },
    {
      index: 1,
    },
    {
      index: 2,
    },
    {
      index: 3,
    }
  ]);

  const [changeFeedList, setChangeFeedList] = useState<booelan>(false);

  const changeFeedOrder = (data: Array<object>) => {
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

  const moveAddFeedScreen = () => {
    navigation.navigate("AddCollectionFeedScreen", {
      triggerScreen: "CollectionFeedEditScreen"
    })
  }

  const renderCollectionFeedItem = ({item, index, drag, isActive}: any) => {
    return (
      <DraggableContainer>
        <RemoveFeedContainer>
          <TouchableWithoutFeedback onPress={() => removeFeed(index)}>
          <RemoveFeedIconContainer>
          <RemoveFeedIcon
          source={require('~/Assets/Images/ic_remove.png')}/>
          </RemoveFeedIconContainer>
          </TouchableWithoutFeedback>
        </RemoveFeedContainer>
        <DraggableFeedContainer>
          <CollectionTileFeedItem/>
        </DraggableFeedContainer>
        <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
        <DraggableIconContainer>
          <DraggableIcon
          source={require('~/Assets/Images/ic_orderChange.png')}/>
        </DraggableIconContainer>
        </TouchableWithoutFeedback>
      </DraggableContainer>
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
        <HeaderTitleText>게시글 편집</HeaderTitleText>
            <HeaderRightContainer>
              <TouchableWithoutFeedback onPress={() => moveAddFeedScreen()}>
                <HeaderFinishText>추가</HeaderFinishText>
                </TouchableWithoutFeedback>
               <AbledHeaderNextText>완료</AbledHeaderNextText>
            </HeaderRightContainer>
        </HeaderBar>
          <DraggableFlatList
          style={{width:wp('100%'), height:(hp('100%') - hp('6.5%')), flex: 1, backgroundColor:'#ffffff'}}
          data={collectionFeedList}
          extraData={collectionFeedList}
          renderItem={renderCollectionFeedItem}
          onDragEnd={({data}) => changeFeedOrder(data)}
          keyExtractor={(item, index) =>
          `draggable-item-${item.index}`}/>
        </Container>
    )
}



export default CollectionFeedEditScreen;