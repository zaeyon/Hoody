import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import {Text, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import ProfileFeedList from '~/Components/Presentational/ProfileScreen/ProfileFeedList';
import ProfileCollectionList from '../ProfileCollectionList';



const Container = Styled.View`
 flex: 1;
 background-color: #c3c3c3;
`;

const UserScrapListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
flex:1;
`;

const TopTabMenuContainer = Styled.View`
flex-direction: row;
position: absolute;
right: 8;
top: 8;
`;

const SortTypeContainer = Styled.View`
flex-direction: row;
`;

const TypeContainer = Styled.View`
padding-bottom: 8px;
padding-left: 1px;
padding-right: 1px;
`;

const ListTypeIcon = Styled.Image`
width: ${wp('8%')};
height: ${wp('8%')};
`;

const TileTypeIcon = Styled.Image`
width: ${(wp('8%'))};
height: ${wp('8%')};
`;

const AddCollectionIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const AddCollectionContainer = Styled.View`
 padding-bottom: 8px;
 padding-top: 2px;
 padding-left: 5px;
 padding-right: 8px;
`;

const AddScrapIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;


const AddScrapContainer = Styled.View`
 padding-bottom: 8px;
 padding-top: 2px;
 padding-left: 5px;
 padding-right: 8px;
`;



  interface Props {
      navigation: any,
      route: any
      collectionList: Array<object>,
      feedList: Array<object>,
  }

const ProfileTopTabNavigator = ({navigation, route, collectionList, feedList}: Props) => {
    const [currentSortType, setCurrentSortType] = useState<string>("list");
    const [currentFocusTab, setCurrentFocusTab] = useState<string>("");
    const PostTopTab = createMaterialTopTabNavigator();

    function UserFeedList() {
        const isFocused = useIsFocused();
        if(isFocused) {
            console.log("User Feed List");
            setCurrentFocusTab("FeedList")
        }

        return (
          <ProfileFeedList
          navigation={navigation}
          feedList={feedList}
          currentSortType={currentSortType}
          />
        )
    }

    function UserCollectionList() { 
        const isFocused = useIsFocused();
        if(isFocused) {
            console.log("User Collection List");
            setCurrentFocusTab("CollectionList");
        }

        return (
            <ProfileCollectionList
            navigation={navigation}
            collectionList={collectionList}
            />
        )
    }

    function ScrapList() {
        const isFocused = useIsFocused();
        if(isFocused) {
            console.log("Scrap List");
            setCurrentFocusTab("ScrapList");
        }
        return (
            <UserScrapListContainer>
                <Text>Scrap List</Text>
            </UserScrapListContainer>
        )
    }

    const uploadCollection = () => {
        navigation.navigate("CollectionUploadScreen");
    }

    const addScrapAlbum = () => {
        navigation.navigate("AddScrapAlbumScreen");
    }


    return (
        <Container>
            <PostTopTab.Navigator
            initialRouteName="게시글"
            swipeEnabled={true}
            tabBarOptions={{
                activeTintColor:'#000000',
                inactiveTintColor:'#cccccc',
                indicatorStyle:{backgroundColor:'#000000'},
                labelStyle:{fontSize:17, fontWeight:'600'},
                tabStyle:{width: wp('19%'), height: 43, justifyContent:'center'},
                indicatorStyle:{width: wp('12.5%'), marginLeft: wp('3.25%'), backgroundColor:'#000000'},
            }}>
                <PostTopTab.Screen
                name="게시글"
                component={UserFeedList}
                />
                <PostTopTab.Screen
                name="컬렉션"
                component={UserCollectionList}
                />
                <PostTopTab.Screen
                name="스크랩"
                component={ScrapList}
                />
            </PostTopTab.Navigator>
            {currentFocusTab === "FeedList" && (
            <TopTabMenuContainer>
            <SortTypeContainer>
            <TouchableWithoutFeedback onPress={() => setCurrentSortType("list")}>
            <TypeContainer>
            <ListTypeIcon
            style={(currentSortType !== "list") && styles.unselectingListType}
            source={require('~/Assets/Images/ic_listType.png')}/>
            </TypeContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setCurrentSortType("tile")}>
            <TypeContainer>
            <TileTypeIcon
            style={(currentSortType !== 'tile') && styles.unselectingListType}
            source={require('~/Assets/Images/ic_tileType.png')}/>
            </TypeContainer>
            </TouchableWithoutFeedback>
            </SortTypeContainer>
            </TopTabMenuContainer>
            )}
            {currentFocusTab === "CollectionList" && (
                <TopTabMenuContainer>
                    <TouchableWithoutFeedback onPress={() => uploadCollection()}>
                    <AddCollectionContainer>
                        <AddCollectionIcon
                        source={require('~/Assets/Images/ic_addCollection.png')}/>
                    </AddCollectionContainer>
                    </TouchableWithoutFeedback>
                </TopTabMenuContainer>
            )}
            {currentFocusTab === 'ScrapList' && (
                <TopTabMenuContainer>
                    <TouchableWithoutFeedback onPress={() => addScrapAlbum()}>
                    <AddScrapContainer>
                        <AddScrapIcon
                        source={require('~/Assets/Images/ic_addCollection.png')}/>
                    </AddScrapContainer>
                    </TouchableWithoutFeedback>
                </TopTabMenuContainer>

            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    unselectingListType: {
        opacity: 0.25
    }
})

export default ProfileTopTabNavigator;
