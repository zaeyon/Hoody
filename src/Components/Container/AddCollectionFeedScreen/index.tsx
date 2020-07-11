import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native';

import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';
import SelectFeedItem from '~/Components/Presentational/AddCollectionFeedScreen/SelectFeedItem';

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
`;

const HeaderTitleText = Styled.Text`
font-weight: 500;
font-size: 17px;
color: #333333;
`;


const DisabledHeaderFinishText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #cccccc;
`;

const AbledHeaderFinishText = Styled.Text`
 font-size: 17px;
 font-weight: 500;
 color: #3384FF;
`;

const BackButtonContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
`;

const HeaderRightContainer = Styled.View`
`;

const FinishContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const MyFeedTileListContainer = Styled.View`
 flex:1;
`;

const FeedItemContainer = Styled.View`
`;

const SelectCircleContainer = Styled.View`
 position: absolute;
 top: 8px;
 right: ${wp('3.6%')+8}
`;

const UnselectCircle = Styled.View`
 width: ${wp('5.8%')};
 height: ${wp('5.8%')};
 border-radius: 100px;
 background-color: #ffffff60;
 border-width: 1.5px;
 border-color: #ffffff90;
`;

const SelectCircle = Styled.View`
width: ${wp('5.8%')};
height: ${wp('5.8%')};
border-radius: 100px;
background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const TEST_MY_TILE_FEED = [
    {
        index: 1
    },
    {
        index: 2
    },
    {
        index: 3
    },
    {
        index: 4
    },
    {
        index: 5
    }
]



const AddCollectionFeedScreen = ({navigation, route}: Props) => {
    const [selectableFeedList, setSelectableFeedList] = useState<Array<object>>([]);
    const [selectingFeedList, setSelectingFeedList] = useState<Array<object>>([]);
    const [changeFeedList, setChangeFeedList] = useState<boolean>(false);
    const [triggerType, setTriggerType] = useState<string>("");

    useEffect(() => {
        var tmpSelectableFeedList = TEST_MY_TILE_FEED.map(function(obj) {
            obj.selected = false;
            return obj;
        })
        setSelectableFeedList(tmpSelectableFeedList)
    }, [])

    useEffect(() => {
       if(route.params?.triggerType) {
           console.log("route.params.triggerType", route.params.triggerType);

           if(route.params?.triggerType === "modifyCollection")
           {
               setTriggerType("modifyCollection");

           } else if(route.params.triggerType === "addCollection")
           {
               console.log("애드콜랙션")
               setTriggerType("addCollection");
           }
        } 
    }, [route.params?.triggerType])

    const onSelectCircle = (index:number) => {
        var tmpFeedList = selectableFeedList;
        if(tmpFeedList[index].selected === false) {
            var tmpSelectingFeedList = selectingFeedList;
            tmpSelectingFeedList.push(tmpFeedList[index]);
            tmpFeedList[index].selected = !tmpFeedList[index].selected
            //tmpFeedList[index].selectOrder = tmpSelectingFeedList.length;

            console.log("선택완료", tmpSelectingFeedList)
            console.log("선택완료 tmpFeedList", tmpFeedList)
            setSelectingFeedList(tmpSelectingFeedList);
        } else {
            var tmpSelectingFeedList = selectingFeedList;
            var selectingIndex = tmpSelectingFeedList.indexOf(tmpFeedList[index]);
            console.log("선택해제 index", selectingIndex);
            tmpSelectingFeedList.splice(selectingIndex, 1);
             console.log("선택해제 tmpSelectingFeedList", tmpSelectingFeedList);
             setSelectingFeedList(tmpSelectingFeedList);
            tmpFeedList[index].selected = !tmpFeedList[index].selected
        }
        setSelectableFeedList(tmpFeedList)
        setChangeFeedList(!changeFeedList)
    }

    const finishAddCollection = () => {
        console.log("triggerType", triggerType);
        if(triggerType === "modifyCollection") {
            navigation.navigate("CollectionFeedEditScreen")
        } else if(triggerType === "addCollection") {
            navigation.navigate("ProfileScreen");
        }
    }

    const renderMyFeedTileItem = ({item, index}:any) => {

        var selectOrder:number;

        if(item.selected) {
        selectOrder = selectingFeedList.indexOf(item) + 1;
        console.log("selectOrder", selectOrder)
        }
        return (
            <SelectFeedItem
            index={index}
            selected={item.selected}
            selectOrder={selectOrder}
            onSelectCircle={onSelectCircle}
            />
        )
    }


    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/ic_back.png')}/>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                <HeaderTitleText>내 게시글</HeaderTitleText>
                <HeaderRightContainer>
                    {selectingFeedList.length > 0 && (
                    <TouchableWithoutFeedback onPress={() => finishAddCollection()}>
                    <FinishContainer>
                    <AbledHeaderFinishText>완료</AbledHeaderFinishText>
                    </FinishContainer>
                    </TouchableWithoutFeedback>
                    )}
                    {selectingFeedList.length <= 0 && (
                    <FinishContainer>
                        <DisabledHeaderFinishText>완료</DisabledHeaderFinishText>
                    </FinishContainer>
                    )}
                </HeaderRightContainer>
            </HeaderBar>
            <MyFeedTileListContainer>
                <FlatList
                contentContainerStyle={{paddingTop:16, paddingLeft:wp('4%')}}
                numColumns={2}
                data={selectableFeedList}
                renderItem={renderMyFeedTileItem}/>
            </MyFeedTileListContainer>
        </Container>
    )
}


export default AddCollectionFeedScreen


