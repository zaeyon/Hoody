import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

// Local Component
import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';
import SelectFeedItem from '~/Components/Presentational/AddCollectionFeedScreen/SelectFeedItem';

// Route
import POSTCreateCollection from '~/Route/Collection/POSTCreateCollection';

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
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
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
 background-color: #ffffff;
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


const LoadingContainer = Styled.View`
position: absolute;
 width: ${wp('100%')};
 height: ${hp('100%')};
 align-items: center;
 background-color: #00000030;
 justify-content: center;
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
    const [preCollectionFeedList, setPreCollectionFeedList] = useState<Array<object>>([]);
    const [changeFeedList, setChangeFeedList] = useState<boolean>(false);
    const [triggerType, setTriggerType] = useState<string>("");
    const [cancleAddFeed, setCancleAddFeed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = useSelector((state) => state.currentUser);

    useEffect(() => {
        console.log("currentUser.userAllFeeds", currentUser.userAllFeeds);
        if(route.params?.triggerType === "modifyCollection") {
            setPreCollectionFeedList(route.params.collectionFeedList);
        }
    }, [])

    useEffect(() => {
        if(currentUser.userAllFeeds) {
        var tmpSelectableFeedList = currentUser.userAllFeeds.map(function(obj) {
            obj.selected = false;
            return obj;
        })
        if(route.params?.triggerType) {
            console.log("route.params.triggerType", route.params.triggerType);
            console.log("기존의 피드 리스트", route.params.collectionFeedList);
            if(route.params?.triggerType === "collectionFeedEdit")
            {
                setTriggerType("modifyCollection");
                route.params.collectionFeedList.forEach((item:any, index:any) => {
                    console.log("선책한 피드 id", item.id);
                    var index = tmpSelectableFeedList.findIndex((feed: any) =>
                        feed.id == item.id
                    )
                    tmpSelectableFeedList.splice(index, 1);
                })

                setTimeout(() => {
                    setSelectableFeedList(tmpSelectableFeedList);
                })
            } else if(route.params.triggerType === "collectionUpload")
            {
                console.log("애드콜랙션")
                setTriggerType("collectionUpload");
                setSelectableFeedList(tmpSelectableFeedList);
            }
        } 
        }
    }, [route.params?.triggerType, route.params?.collectionFeedList])

    /*
    useEffect(() => {
       if(route.params?.triggerType) {
           console.log("route.params.triggerType", route.params.triggerType);
           if(route.params?.triggerType === "modifyCollection")
           {
               setTriggerType("modifyCollection");
               console.log("route.params.selectedFeedList", route.params.selectedFeedList);
               route.params.selectedFeedList.forEach((item:any, index:any) => {
                   console.log("선책한 피드 id", item.id);
                   
               })
           } else if(route.params.triggerType === "addCollection")
           {
               console.log("애드콜랙션")
               setTriggerType("addCollection");
           }
        } 
    }, [route.params?.triggerType])
    */

    useEffect(() => {
        if(route.params?.coverImage) {
            console.log("coverImage", route.params.coverImage);
            console.log("title", route.params.title);
            console.log("description", route.params.description);
            console.log("private", route.params.private);
            console.log("includeLocation", route.params.includeLocation);
            console.log("triggerType", route.params.triggerType);
        }
    }, [route.params?.coverImage, route.params.coverImage, route.params.title, route.params.description, route.params.private, route.params.enabledIncludeLocation, route.params.triggerType])

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

    const finishAddCollectionFeed = () => {
        setLoading(true);
        console.log("triggerType", triggerType);
        if(triggerType === "modifyCollection") {
            navigation.navigate("CollectionFeedEditScreen", {
                addedCollectionFeedList: route.params?.collectionFeedList.concat(selectingFeedList)
            })
            console.log("selectingFeedList", selectingFeedList);
        } else if(triggerType === "collectionUpload") {
            console.log("selectingFeedList", selectingFeedList);
            var selectingFeedIdList = selectingFeedList.map((obj) => {
                return obj.id
            })
            console.log("selectingFeedIdList", selectingFeedIdList);
            setTimeout(() => {
                POSTCreateCollection(route.params.coverImage, route.params.title, route.params.description, !route.params.private, route.params.includeLocation, selectingFeedIdList)
                .then(function(response) {
                    setLoading(false);
                    console.log("콜렉션 업로드 성공", response);
                    navigation.navigate("ProfileScreen", {
                        collectionListChange: true,
                    });
                })
                .catch(function(error) {
                    setLoading(false);
                    console.log("콜렉션 업로드 실패", error);
                })  
            })
        }   
     }

    const navigateGoBack = () => {
        //console.log("navigateGoBack route.params.collectionFeedList", route.params.collectionFeedList)
        //console.log("preCollectionFeedList", preCollectionFeedList);
        if(route.params.triggerType === "collectionUpload") {
            navigation.navigate("CollectionUploadScreen");
        } else if(route.params.triggerType === "collectionFeedEdit") {
            navigation.navigate("CollectionFeedEditScreen")
        }
    }

    const renderMyFeedTileItem = ({item, index}:any) => {
        console.log("renderMyFeedTileItem", item);
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
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0] : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense ? item.expense : null}
            location={item.address ? item.address.address : null}
            product={item.Products ? item.Products : null}
            />
        )
    }


    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                <HeaderTitleText>내 게시글</HeaderTitleText>
                <HeaderRightContainer>
                    {selectingFeedList.length > 0 && (
                    <TouchableWithoutFeedback onPress={() => finishAddCollectionFeed()}>
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop:16, paddingLeft:wp('4%')}}
                numColumns={2}
                data={selectableFeedList}
                renderItem={renderMyFeedTileItem}/>
            </MyFeedTileListContainer>
            {loading && (
            <LoadingContainer>
                <ActivityIndicator
                color={"#ffffff"}/>
            </LoadingContainer>
            )}
        </Container>
    )
}


export default AddCollectionFeedScreen


