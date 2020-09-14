import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    TouchableWithoutFeedback,
    Text,
    FlatList,
    Dimensions,
    RefreshControl,
} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

import FollowItem from '~/Components/Presentational/FollowListScreen/FollowItem';
import GETProfileFriends from '~/Route/Profile/GETProfileFriends';

import ScrollableTabView from 'rn-collapsing-tab-bar'
import FollowListTabBar from '~/Components/Presentational/FollowListScreen/FollowListTabBar'

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const EmptyContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #FFFFFF;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')}
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const BackButtonContainer = Styled.View`
padding: 12.5px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
 tint-color: #000000;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #000000;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderRightEmptyView = Styled.View`
width: ${wp('8%')};
height: ${wp('8%')};
`;

const FollowerTabContainer = Styled.View`
width:${wp('100%')};
background-color: #ffffff;
`;

const FollowingTabContainer = Styled.View`
width:${wp('100%')};
 background-color: #ffffff;

`;

const FollowerListContainer = Styled.View`
background-color: #ffffff;
`;

const FollowingListContainer = Styled.View`
background-color: #ffffff;
`;


const SearchInputContainer = Styled.View`
justify-content: center;
align-items: center;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('91%')};
 height: 36px;
 border-radius: 40px;
 background-color: #F4F4F4;
 border-width: 1px;
 border-color: #f3f3f7;
 padding-left: ${wp('10%')};
 font-size: 18px;
`;

const SearchContainer = Styled.View`
 
 flex-direction: row;
 justify-content: center;
 align-items: center;
 padding-top: 16px;
 padding-bottom: 5px;
`;


const SearchIconContainer = Styled.View`
 position: absolute;
 justify-content: center;
 left: 10px;
`;


const SearchIcon = Styled.Image`
 width: ${wp('6.0%')};
 height: ${wp('6.0%')};
`;

const TEST_FOLLOWER_DATA = [
    {
        nickname: "세브틴짱",
        profileImg: "https://image.bugsm.co.kr/essential/images/250/245/24589.jpg?_up=20171101-123825",
        feedCount: 200,
        description: "세븐틴 덕질에 쓴 돈만 서울 집한채",
    },
    {
        nickname: "팔로워 유저",
        profileImg: "https://image.bugsm.co.kr/essential/images/250/245/24589.jpg?_up=20171101-123825",
        feedCount: 2210,
        description: "설명",
    },
]

const TEST_FOLLOWING_DATA = [
    {
        nickname: "세브틴짱",
        profileImg: "https://image.bugsm.co.kr/essential/images/250/245/24589.jpg?_up=20171101-123825",
        feedCount: 200,
        description: "세븐틴 덕질에 쓴 돈만 서울 집한채",
    },
    {
        nickname: "팔로잉 유저",
        profileImg: "https://image.bugsm.co.kr/essential/images/250/245/24589.jpg?_up=20171101-123825",
        feedCount: 2210,
        description: "설명",
    },
]


interface Props {
    navigation: any,
    route: any,
}

const containerHeight = Dimensions.get("window").height;

var requestedOffset = 0;
var requestedLimit = 20;

const FollowListScreen = ({navigation, route}:Props) => {
    const [requestedType, setRequestedType] = useState<string>("followers");
    const [inputedNickname, setInputedNickname] = useState<string>("");
    const [followerCount, setFollowerCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [followerListData, setFollowerListData] = useState<Array<object>>([]);
    const [followingListData, setFollowingListData] = useState<Array<object>>([]);
    const [followerListChange, setFollowerListChange] = useState<boolean>(false);
    const [followingListChange, setFollowingListChange] = useState<boolean>(false);

    const [refreshingFollower, setRefreshingFollower] = useState<boolean>(false);
    const [refreshingFollowing, setRefreshingFollowing] = useState<boolean>(false);

    const [followerListTabHeight, setFollowerListTabHeight] = useState<number>(containerHeight);
    const [followingListTabHeight, setFollowingListTabHeight] = useState<number>(containerHeight);

    const [firstTabHeight, setFirstTabHeight] = useState<number>(300);
    const [secondTabHeight, setSecondTabHeight] = useState<number>(300);

    const FollowTopTab = createMaterialTopTabNavigator();
    

    useEffect(() => {
        if(route.params?.followerCount || route.params?.followerCount) {
            setFollowerCount(route.params.followerCount)
        }
        if(route.params?.followingCount || route.params?.followingCount) {
            setFollowingCount(route.params.followingCount);
            console.log("route.params?.requestedType11", route.params.requestedType);
            console.log("typeof(route.params.requestedType11", typeof(route.params.requestedType));
            
        }
        if(route.params?.requestedType === "followings") {
            console.log("팔로잉 누름")

            setTimeout(() => {
            //navigation.jumpTo("팔로잉 " + route.params.followingCount + "명")
            }, 10)

            GETProfileFriends("followings", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(followingResponse) {
                  console.log("GETProfileFriends response", followingResponse)
                    setFollowingListData(followingResponse);
                    GETProfileFriends("followers", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(response) {
                  console.log("GETProfileFriends response", response)
                    setFollowerListData(response);
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
                
                })
                
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
        } else {
            GETProfileFriends("followers", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(response) {
                  console.log("GETProfileFriends response", response)
                    setFollowerListData(response);
                    GETProfileFriends("followings", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(followingResponse) {
                  console.log("GETProfileFriends response", followingResponse)
                    setFollowingListData(followingResponse);
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
        }
        
    }, [])
    
    /*
    useEffect(() => {
            //setRequestedType(route.params.requestedType);
            if(route.params?.requestedType !== requestedType) {
                GETProfileFriends(requestedType, inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(response) {
                    console.log("GETProfileFriends response", response)
                    if(route.params.requestedType === "followers") {
                        setFollowerListData(response);
                    } else if(route.params.requestedType === 'followings') {
                        setFollowingListData(response);
                    }
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
            }
    }, [])
    */

    const onRefreshFollower = () => {
        setRefreshingFollower(true);
        GETProfileFriends("followers", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(response) {
                setRefreshingFollower(false);
                  console.log("GETProfileFriends response", response)
                    setFollowerListData(response);
                    GETProfileFriends("followings", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(followingResponse) {
                  console.log("GETProfileFriends response", followingResponse)
                    setFollowingListData(followingResponse);
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
    }

    const onRefreshFollowing = () => {
        setRefreshingFollowing(true);
        GETProfileFriends("followings", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(followingResponse) {
                  console.log("GETProfileFriends response", followingResponse)
                    setFollowingListData(followingResponse);
                    setRefreshingFollowing(false);
                    GETProfileFriends("followers", inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
                .then(function(response) {
                  console.log("GETProfileFriends response", response)
                    setFollowerListData(response);
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })
                })
                .catch(function(error) {
                    console.log("GETProfileFriends error", error);
                })

    }

    
    const onChangeSearchInput = (text: string) => {
    }


    const measureFollowerListTab = (event) => {
        setFollowerListTabHeight(event.nativeEvent.layout.height);
    }

    const measureFollowingListTab = (event) => {
        setFollowingListTabHeight(event.nativeEvent.layout.height);
    }


    const renderFollowItem = ({item, index}: any) => {
        console.log("renderFollowItem item", item);
        return (
            <FollowItem
            navigation={navigation}
            profileImageUri={item.thumbnailImg}
            nickname={item.nickname}
            feedCount={item.feedCount}
            description={item.description}
            followState={item.followed}
            userId={item.id}
            />
        )
    }

    const getToProfileFriendsList = (type: string) => {
        GETProfileFriends(type, inputedNickname, requestedOffset, requestedLimit, route.params.nickname)
        .then(function(response) {
            console.log("GETProfileFriends response", response)
            if(route.params.requestedType === "followers") {
                setFollowerListData(response);
                setFollowerListChange(!followerListChange);
            } else if(route.params.requestedType === 'followings') {
                setFollowingListData(response);
                setFollowingListChange(!followingListChange)
            }
        })
        .catch(function(error) {
            console.log("GETProfileFriends error", error);
        })
    }


    function FollowerListTab() {
        const isFocused = useIsFocused();

        if(isFocused) {
            console.log("팔로워 탭")
            if(requestedType !== "followers") {
                setRequestedType("followers")
                setTimeout(() => {
                 //getToProfileFriendsList("followers");   
                }, 100)
            }
    }

        return (
            <FollowerTabContainer>
                {/*
            <SearchContainer>
              <SearchInputContainer>
              <SearchInput
                placeholder="검색"
                placeholderTextColor="#979797"
                autoCapitalize={"none"}
                onChangeText={(text:string) => onChangeSearchInput(text)}
              />
              <SearchIconContainer>
                <SearchIcon
                  source={require('~/Assets/Images/ic_search.png')}
                />
                </SearchIconContainer>
                </SearchInputContainer>
            </SearchContainer>
                */}
            <FollowerListContainer
            refreshControl={
                <RefreshControl
                refreshing={refreshingFollower}
                onRefresh={onRefreshFollower}/>
            }>
                <FlatList
                scrollEnabled={false}
                data={followerListData}
                renderItem={renderFollowItem}
                />
            </FollowerListContainer>
            </FollowerTabContainer>
        )
    }

    function FollowingListTab() {

        const isFocused = useIsFocused();

        console.log("followingListData", followingListData);

        if(isFocused) {
            console.log("팔로잉 탭")
            if(requestedType !== "followings") {
                setRequestedType("followings");
                setTimeout(() => {
                //getToProfileFriendsList("followings");   
                }, 100)
            }
        }

        return (
            <FollowingTabContainer>
                {/*
                <SearchContainer>
              <SearchInputContainer>
              <SearchInput
                placeholder="검색"
                placeholderTextColor="#979797"
                onChangeText={(text:string) => onChangeSearchInput(text)}
                autoCapitalize={"none"}
              />
              <SearchIconContainer>
                <SearchIcon
                  source={require('~/Assets/Images/ic_search.png')}
                />
                </SearchIconContainer>
                </SearchInputContainer>
            </SearchContainer>
                */}
            <FollowingListContainer
            refreshControl={
                <RefreshControl
                refreshing={refreshingFollowing}
                onRefresh={onRefreshFollowing}/>
            }>
                <FlatList
                scrollEnabled={false}
                data={followingListData}
                renderItem={renderFollowItem}
                />
            </FollowingListContainer>
                
            </FollowingTabContainer>
        )
    }

    const emptyContainer = () => {
        return (
            <EmptyContainer/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <BackButtonContainer>
                    <BackButton
                    source={require('~/Assets/Images/ic_back.png')}/>
                </BackButtonContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>닉네임</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderRightEmptyView>
                    </HeaderRightEmptyView>
                </HeaderRightContainer>
            </HeaderBar>
            <ScrollableTabView
            collapsableBar={emptyContainer()}
            refreshingFeed={refreshingFollower}
            refreshingCollection={refreshingFollowing}
            onRefreshFeed={onRefreshFollower}
            onRefreshCollection={onRefreshFollowing}
            loadMoreSearchFeedData={() => 0}
            loadMoreSearchCollectionData={() => 0}
            initialPage={route.params?.requestedType === "followers" ? 0 : 1}
            tabContentHeights={[followerListTabHeight, followingListTabHeight]}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <FollowListTabBar/>}
            >
            <FollowerTabContainer
            onLayout={(event) => measureFollowerListTab(event)}
            tabLabel="팔로워">
            <FollowerListContainer
            onLayout={(event) => setFirstTabHeight(event.nativeEvent.layout.height)}>
                <FlatList
                style={firstTabHeight < hp('90%') ? {height:hp('75%'), backgroundColor:'#ffffff'} : {height: followerListTabHeight, backgroundColor:'#ffffff'}}
                scrollEnabled={false}
                data={followerListData}
                renderItem={renderFollowItem}
                />
            </FollowerListContainer>
            </FollowerTabContainer>
            <FollowingTabContainer
            onLayout={(event) => setSecondTabHeight(event.nativeEvent.layout.height)}
            tabLabel="팔로잉">
            <FollowingListContainer>
                <FlatList
                style={secondTabHeight < hp('90%') ? {height:hp('75%'), backgroundColor: '#ffffff'} : {height: followingListTabHeight}}
                scrollEnabled={false}
                data={followingListData}
                renderItem={renderFollowItem}
                />
            </FollowingListContainer>
            </FollowingTabContainer>
            </ScrollableTabView>
            {/*
            <FollowTopTab.Navigator
            initialLayout={{ width: Dimensions.get('window').width }}
            swipeEnabled={true}
            tabBarOptions={{
                activeTintColor:'#333333',
                inactiveTintColor:'#cccccc',
                tabStyle:{width: wp('50%'), height: wp('10%')},
                labelStyle:{fontSize:15, fontWeight:'600'},
                indicatorStyle:{backgroundColor:'#000000'},
            }}
            >
                <FollowTopTab.Screen
                name={"팔로워 " + followerCount + "명"}
                component={FollowerListTab}/>
                <FollowTopTab.Screen
                name={"팔로잉 " + followingCount + "명"}
                component={FollowingListTab}/>
            </FollowTopTab.Navigator>
            */}
        </Container>
    )
}

export default FollowListScreen;